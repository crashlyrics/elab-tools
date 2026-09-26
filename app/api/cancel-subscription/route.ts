import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import {
  sendCancellationConfirmation,
  sendMail,
} from "@/lib/mail";
import { mollie } from "@/lib/mollie";

type Plan = "monthly" | "annual";
type CancellationType = "ordinary" | "extraordinary";
type EndMode = "earliest" | "date";

type AccessRow = {
  auth_user_id: string;
  email: string;
  plan: Plan;
  mollie_customer_id: string | null;
  mollie_subscription_id: string | null;
  valid_until: string | Date;
  subscription_cancelled_at: string | Date | null;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("de-DE", {
    timeZone: "Europe/Berlin",
  });
}

function formatDateTime(date: Date) {
  return date.toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cancellationType =
      body?.cancellationType as CancellationType;
    const endMode = body?.endMode as EndMode;

    const email =
      typeof body?.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const confirmationEmail =
      typeof body?.confirmationEmail === "string"
        ? body.confirmationEmail.trim().toLowerCase()
        : "";

    const contractId =
      typeof body?.contractId === "string"
        ? body.contractId.trim()
        : "";

    const requestedEndDate =
      typeof body?.requestedEndDate === "string"
        ? body.requestedEndDate.trim()
        : "";

    const reason =
      typeof body?.reason === "string"
        ? body.reason.trim()
        : "";

    if (
      (cancellationType !== "ordinary" &&
        cancellationType !== "extraordinary") ||
      (endMode !== "earliest" && endMode !== "date") ||
      !email ||
      !confirmationEmail ||
      !contractId
    ) {
      return NextResponse.json(
        { error: "Bitte prüfen Sie Ihre Angaben." },
        { status: 400 }
      );
    }

    if (endMode === "date" && !requestedEndDate) {
      return NextResponse.json(
        { error: "Bitte geben Sie den gewünschten Beendigungszeitpunkt an." },
        { status: 400 }
      );
    }

    if (cancellationType === "extraordinary" && !reason) {
      return NextResponse.json(
        { error: "Bitte geben Sie den Kündigungsgrund an." },
        { status: 400 }
      );
    }

    const rows = await sql`
      SELECT
        auth_user_id,
        email,
        plan,
        mollie_customer_id,
        mollie_subscription_id,
        valid_until,
        subscription_cancelled_at
      FROM pro_access
      WHERE email = ${email}
        AND contract_confirmation_payment_id = ${contractId}
      LIMIT 1
    `;

    const access = rows[0] as AccessRow | undefined;

    if (!access?.valid_until) {
      return NextResponse.json(
        {
          error:
            "Zu diesen Angaben konnte kein Vertrag gefunden werden. Bitte prüfen Sie E-Mail-Adresse und Vertragsnummer.",
        },
        { status: 400 }
      );
    }

    const submittedAt = new Date();
    const validUntil = new Date(access.valid_until);

    let requestedEnd: string;
    let automaticallyCancelled = false;

    if (endMode === "date") {
      const date = new Date(`${requestedEndDate}T12:00:00Z`);

      if (Number.isNaN(date.getTime())) {
        return NextResponse.json(
          { error: "Bitte geben Sie ein gültiges Datum an." },
          { status: 400 }
        );
      }

      requestedEnd = formatDate(date);
    } else if (
      cancellationType === "ordinary" &&
      access.plan === "monthly"
    ) {
      requestedEnd =
        `zum Ende des laufenden Abrechnungszeitraums am ${formatDate(validUntil)}`;
    } else if (
      cancellationType === "ordinary" &&
      access.plan === "annual"
    ) {
      requestedEnd =
        `mit Ablauf des vereinbarten Jahreszugangs am ${formatDate(validUntil)}`;
    } else {
      requestedEnd = "zum nächstmöglichen Zeitpunkt";
    }

    /*
     * Ein Monatsabo kann bei einer ordentlichen Kündigung
     * zum nächstmöglichen Zeitpunkt automatisch bei Mollie
     * beendet werden.
     */
    if (
      cancellationType === "ordinary" &&
      endMode === "earliest" &&
      access.plan === "monthly"
    ) {
      if (!access.subscription_cancelled_at) {
        if (
          !access.mollie_customer_id ||
          !access.mollie_subscription_id
        ) {
          throw new Error(
            "Für das Monatsabo fehlen die Mollie-Abonnementdaten."
          );
        }

        await mollie.customerSubscriptions.cancel(
          access.mollie_subscription_id,
          {
            customerId: access.mollie_customer_id,
          }
        );

        await sql`
          UPDATE pro_access
          SET
            subscription_cancelled_at = ${submittedAt.toISOString()},
            updated_at = NOW()
          WHERE auth_user_id = ${access.auth_user_id}
        `;
      }

      automaticallyCancelled = true;
    }

    /*
     * Interne Kopie der Kündigung.
     * Sonderfälle können dadurch manuell bearbeitet werden.
     */
    await sendMail({
      to: "info@elab.shop",
      subject: `Kündigung eingegangen – ${contractId}`,
      text: `
Kündigung über elab.shop

Vertragsnummer: ${contractId}
Vertrags-E-Mail: ${email}
Bestätigungs-E-Mail: ${confirmationEmail}
Tarif: ${access.plan}
Art: ${cancellationType}
${reason ? `Grund: ${reason}` : ""}
Gewünschter Beendigungszeitpunkt: ${requestedEnd}
Eingang: ${formatDateTime(submittedAt)}
Automatisch bei Mollie beendet: ${automaticallyCancelled ? "Ja" : "Nein"}
`.trim(),
    });

    await sendCancellationConfirmation({
      to: confirmationEmail,
      plan: access.plan,
      validUntil,
      cancellationType,
      contractId,
      reason: reason || null,
      submittedAt,
      requestedEnd,
    });

    return NextResponse.json({
      message:
        "Ihre Kündigung ist eingegangen. Die Bestätigung wurde per E-Mail versandt.",
    });
  } catch (error) {
    console.error("Kündigungsfehler:", error);

    return NextResponse.json(
      {
        error:
          "Die Kündigung konnte momentan nicht verarbeitet werden. Bitte versuchen Sie es erneut.",
      },
      { status: 500 }
    );
  }
}

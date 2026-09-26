import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { mollie } from "@/lib/mollie";

type Plan = "monthly" | "annual";

type AccessRow = {
  auth_user_id: string;
  email: string;
  plan: Plan;
  mollie_customer_id: string | null;
  mollie_subscription_id: string | null;
  subscription_cancelled_at: string | Date | null;
};

function formatDateTime(date: Date) {
  return date.toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body?.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body?.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const contractId =
      typeof body?.contractId === "string"
        ? body.contractId.trim()
        : "";

    const confirmationEmail =
      typeof body?.confirmationEmail === "string"
        ? body.confirmationEmail.trim().toLowerCase()
        : "";

    if (
      !name ||
      !email ||
      !confirmationEmail ||
      !contractId.startsWith("tr_")
    ) {
      return NextResponse.json(
        { error: "Bitte prüfen Sie Ihre Angaben." },
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
        subscription_cancelled_at
      FROM pro_access
      WHERE email = ${email}
        AND contract_confirmation_payment_id = ${contractId}
      LIMIT 1
    `;

    const access = rows[0] as AccessRow | undefined;

    if (!access) {
      return NextResponse.json(
        {
          error:
            "Zu diesen Angaben konnte kein Vertrag gefunden werden. Bitte prüfen Sie E-Mail-Adresse und Vertragsnummer.",
        },
        { status: 400 }
      );
    }

    const submittedAt = new Date();

    /*
     * Der Eingang des Widerrufs wird unabhängig davon bestätigt,
     * ob die Rückabwicklung vollständig automatisiert werden kann.
     */
    let automaticallyProcessed = false;
    let processingNote =
      "Die Rückabwicklung muss manuell geprüft werden.";

    try {
      const payment = await mollie.payments.get(contractId);

      const metadata = payment.metadata as {
        authUserId?: string;
        email?: string;
        plan?: Plan;
      } | null;

      const paymentEmail =
        typeof metadata?.email === "string"
          ? metadata.email.trim().toLowerCase()
          : "";

      if (
        metadata?.authUserId !== access.auth_user_id ||
        paymentEmail !== email
      ) {
        throw new Error(
          "Mollie-Zahlung und Vertragsdaten stimmen nicht überein."
        );
      }

      if (payment.status !== "paid") {
        throw new Error(
          "Die zugehörige Mollie-Zahlung ist nicht als bezahlt gekennzeichnet."
        );
      }

      const paidAt = payment.paidAt
        ? new Date(payment.paidAt)
        : null;

      if (!paidAt) {
        throw new Error(
          "Für die Zahlung ist kein Zahlungszeitpunkt verfügbar."
        );
      }

      /*
       * Automatische Rückabwicklung nur in einem eindeutig
       * innerhalb von 14 Tagen liegenden Zeitraum.
       * Spätere bzw. unklare Fälle werden nicht abgewiesen,
       * sondern zur manuellen Prüfung weitergeleitet.
       */
      const fourteenDays =
        14 * 24 * 60 * 60 * 1000;

      const elapsed =
        submittedAt.getTime() - paidAt.getTime();

      const withinAutomaticWindow =
        elapsed >= 0 && elapsed <= fourteenDays;

      if (!withinAutomaticWindow) {
        throw new Error(
          "Der Widerruf liegt außerhalb des automatisch bearbeiteten Zeitraums."
        );
      }

      /*
       * Beim Monatsabo zunächst weitere automatische
       * Abbuchungen stoppen.
       */
      if (
        access.plan === "monthly" &&
        !access.subscription_cancelled_at
      ) {
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

      /*
       * Zahlung vollständig zurückerstatten.
       * Der Idempotency-Key verhindert eine doppelte
       * Rückerstattung bei einer Wiederholung der Anfrage.
       */
      await mollie.paymentRefunds.create({
        paymentId: payment.id,
        amount: payment.amount,
        description: "Widerruf elab Pro",
        metadata: {
          contractId,
          reason: "withdrawal",
        },
        idempotencyKey: `elab-withdrawal-${payment.id}`,
      });

      /*
       * Pro-Zugang nach erfolgreicher automatischer
       * Rückabwicklung beenden.
       */
      await sql`
        UPDATE pro_access
        SET
          status = 'withdrawn',
          valid_until = ${submittedAt.toISOString()},
          updated_at = NOW()
        WHERE auth_user_id = ${access.auth_user_id}
      `;

      automaticallyProcessed = true;
      processingNote =
        "Rückzahlung veranlasst und Pro-Zugang beendet.";
    } catch (processingError) {
      console.error(
        "Automatische Widerrufs-Rückabwicklung nicht vollständig möglich:",
        processingError
      );

      processingNote =
        processingError instanceof Error
          ? processingError.message
          : "Unbekannter Fehler bei der automatischen Rückabwicklung.";
    }

    const submittedAtText =
      formatDateTime(submittedAt);

    /*
     * Interne Dokumentation.
     */
    await sendMail({
      to: "info@elab.shop",
      subject: `Widerruf eingegangen – ${contractId}`,
      text: `
Widerruf über elab.shop

Name: ${name}
Vertragsnummer: ${contractId}
Vertrags-E-Mail: ${email}
Bestätigungs-E-Mail: ${confirmationEmail}
Tarif: ${access.plan}
Eingang: ${submittedAtText}

Automatisch verarbeitet: ${automaticallyProcessed ? "Ja" : "Nein"}
Bearbeitungshinweis: ${processingNote}
`.trim(),
    });

    /*
     * Unverzügliche Eingangsbestätigung an die vom
     * Verbraucher angegebene elektronische Kontaktadresse.
     */
    await sendMail({
      to: confirmationEmail,
      subject: "Bestätigung Ihres Widerrufs – elab Pro",
      text: `
Ihre Widerrufserklärung ist bei elab eingegangen.

Name: ${name}
Vertragsnummer: ${contractId}
Vertrag: ${
        access.plan === "monthly"
          ? "elab Pro Monatsabo"
          : "elab Pro Jahreszugang"
      }
Eingang des Widerrufs: ${submittedAtText}

Sie haben den Widerruf des oben bezeichneten Vertrags erklärt.

${
  automaticallyProcessed
    ? "Die Rückzahlung wurde veranlasst und der Pro-Zugang beendet."
    : "Der Widerruf wird geprüft und die erforderliche Rückabwicklung bearbeitet."
}

Viele Grüße
elab.shop
`.trim(),
    });

    return NextResponse.json({
      message:
        "Ihr Widerruf ist eingegangen. Die Bestätigung wurde per E-Mail versandt.",
    });
  } catch (error) {
    console.error("Widerrufsfehler:", error);

    return NextResponse.json(
      {
        error:
          "Der Widerruf konnte momentan nicht übermittelt werden. Bitte versuchen Sie es erneut.",
      },
      { status: 500 }
    );
  }
}

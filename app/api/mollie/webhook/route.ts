import { mollie } from "@/lib/mollie";
import { sql } from "@/lib/db";

type Plan = "monthly" | "annual";

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  const day = result.getUTCDate();

  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);

  const lastDay = new Date(
    Date.UTC(
      result.getUTCFullYear(),
      result.getUTCMonth() + 1,
      0
    )
  ).getUTCDate();

  result.setUTCDate(Math.min(day, lastDay));

  return result;
}

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const paymentId = formData.get("id");

    if (
      typeof paymentId !== "string" ||
      !paymentId.startsWith("tr_")
    ) {
      return new Response("OK", { status: 200 });
    }

    const payment = await mollie.payments.get(paymentId);

    if (payment.status !== "paid") {
      return new Response("OK", { status: 200 });
    }

    /*
     * Folgezahlung eines bestehenden Monatsabos
     */
    if (payment.subscriptionId) {
      const paidAt = payment.paidAt
        ? new Date(payment.paidAt)
        : new Date();

      const validUntil = addMonths(paidAt, 1);

      await sql`
        UPDATE pro_access
        SET
          status = 'active',
          valid_until = ${validUntil.toISOString()},
          updated_at = NOW()
        WHERE mollie_subscription_id = ${payment.subscriptionId}
      `;

      console.log("elab Pro Monatsabo verlängert:", {
        subscriptionId: payment.subscriptionId,
        validUntil,
      });

      return new Response("OK", { status: 200 });
    }

    /*
     * Erste Zahlung: Monatsabo oder Jahreszugang
     */
    const metadata = payment.metadata as {
      plan?: Plan;
      email?: string;
    } | null;

    const plan = metadata?.plan;
    const email = metadata?.email?.trim().toLowerCase();

    if (
      !email ||
      (plan !== "monthly" && plan !== "annual")
    ) {
      console.error(
        "Bezahlte Mollie-Zahlung ohne gültige elab-Metadaten:",
        payment.id
      );

      return new Response("OK", { status: 200 });
    }

    const paidAt = payment.paidAt
      ? new Date(payment.paidAt)
      : new Date();

    const validUntil =
      plan === "monthly"
        ? addMonths(paidAt, 1)
        : addMonths(paidAt, 12);

    let subscriptionId: string | null = null;

    /*
     * Nur beim Monatsabo:
     * automatische Folgezahlungen bei Mollie anlegen
     */
    if (plan === "monthly") {
      const customerId = payment.customerId;

      if (!customerId) {
        throw new Error(
          "Monatszahlung hat keine Mollie-Kunden-ID."
        );
      }

      const existing = await sql`
        SELECT mollie_subscription_id
        FROM pro_access
        WHERE email = ${email}
        LIMIT 1
      `;

      subscriptionId =
        existing[0]?.mollie_subscription_id ?? null;

      /*
       * Schutz vor doppelter Subscription,
       * falls Mollie denselben Webhook erneut sendet.
       */
      if (!subscriptionId) {
        const startDate = toDateString(
          addMonths(paidAt, 1)
        );

        const webhookUrl = new URL(
          "/api/mollie/webhook",
          request.url
        ).toString();

        const subscription =
          await mollie.customerSubscriptions.create({
            customerId,

            amount: {
              currency: "EUR",
              value: "2.50",
            },

            interval: "1 month",
            startDate,

            description: "elab Pro Monatsabo",

            webhookUrl,

            metadata: {
              email,
              initialPaymentId: payment.id,
            },

            idempotencyKey: `elab-pro-${payment.id}`,
          });

        subscriptionId = subscription.id;
      }
    }

    await sql`
      INSERT INTO pro_access (
        email,
        plan,
        status,
        mollie_customer_id,
        mollie_subscription_id,
        valid_until,
        updated_at
      )
      VALUES (
        ${email},
        ${plan},
        'active',
        ${payment.customerId ?? null},
        ${subscriptionId},
        ${validUntil.toISOString()},
        NOW()
      )
      ON CONFLICT (email)
      DO UPDATE SET
        plan = EXCLUDED.plan,
        status = 'active',
        mollie_customer_id = EXCLUDED.mollie_customer_id,
        mollie_subscription_id =
          EXCLUDED.mollie_subscription_id,
        valid_until = EXCLUDED.valid_until,
        updated_at = NOW()
    `;

    console.log("elab Pro aktiviert:", {
      email,
      plan,
      subscriptionId,
      validUntil,
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Mollie-Webhook-Fehler:", error);

    return new Response("Webhook-Fehler", { status: 500 });
  }
}

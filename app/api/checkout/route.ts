import type { PaymentCreateParams } from "@mollie/api-client";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { mollie } from "@/lib/mollie";

type Plan = "monthly" | "annual";

const plans = {
  monthly: {
    amount: "2.50",
    description: "elab Pro Monatsabo",
  },
  annual: {
    amount: "25.00",
    description: "elab Pro Jahreszugang",
  },
} as const;

export async function POST(request: Request) {
  try {
    const { data: authSession } = await auth.getSession();

    const session = authSession?.session;
    const user = authSession?.user;

    if (!session || !user?.id || !user.email) {
      return NextResponse.json(
        { error: "Für den Checkout ist eine Anmeldung erforderlich." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const plan = body?.plan as Plan;

    if (plan !== "monthly" && plan !== "annual") {
      return NextResponse.json(
        { error: "Ungültiger Tarif." },
        { status: 400 }
      );
    }

    const authUserId = user.id;
    const email = user.email.trim().toLowerCase();

    const origin = new URL(request.url).origin;
    const selectedPlan = plans[plan];

    const webhookUrl =
      origin.includes("localhost")
        ? undefined
        : `${origin}/api/mollie/webhook`;

    let customerId: string | undefined;

    // Für das Monatsabo braucht Mollie einen Kunden,
    // damit später die monatlichen Zahlungen möglich sind.
    if (plan === "monthly") {
      const customer = await mollie.customers.create({
        email,
      });

      customerId = customer.id;
    }

    const payment = await mollie.payments.create({
      amount: {
        currency: "EUR",
        value: selectedPlan.amount,
      },

      description: selectedPlan.description,

      redirectUrl: `${origin}/checkout/bestaetigung`,

      ...(webhookUrl ? { webhookUrl } : {}),

      sequenceType: (plan === "monthly"
        ? "first"
        : "oneoff") as PaymentCreateParams["sequenceType"],

      ...(customerId ? { customerId } : {}),

      metadata: {
        plan,
        email,
        authUserId,
      },
    });

    const checkoutUrl = payment._links.checkout?.href;

    if (!checkoutUrl) {
      throw new Error("Mollie hat keine Checkout-URL zurückgegeben.");
    }

    return NextResponse.json({
      checkoutUrl,
    });
  } catch (error) {
    console.error("Checkout-Fehler:", error);

    return NextResponse.json(
      { error: "Checkout konnte nicht gestartet werden." },
      { status: 500 }
    );
  }
}

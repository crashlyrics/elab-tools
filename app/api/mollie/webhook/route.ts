import { mollie } from "@/lib/mollie";

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

    console.log("Mollie-Zahlungsstatus:", {
      id: payment.id,
      status: payment.status,
      metadata: payment.metadata,
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Mollie-Webhook-Fehler:", error);

    return new Response("Webhook-Fehler", { status: 500 });
  }
}

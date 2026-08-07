import "server-only";
import createMollieClient from "@mollie/api-client";

const apiKey = process.env.MOLLIE_API_KEY;

if (!apiKey) {
  throw new Error("MOLLIE_API_KEY fehlt.");
}

export const mollie = createMollieClient({
  apiKey,
});

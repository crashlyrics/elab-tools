"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";

type Plan = "monthly" | "annual";

const plans = {
  monthly: {
    name: "elab Pro Monatsabo",
    price: "2,50 € / Monat",
    note: "Verlängert sich automatisch.",
  },
  annual: {
    name: "elab Pro Jahreszugang",
    price: "25,00 € / 12 Monate",
    note: "Endet nach 12 Monaten automatisch.",
  },
} as const;

export default function CheckoutPage() {
  const params = useParams();
  const rawPlan = params.plan;

  const plan: Plan | null =
    rawPlan === "monthly" || rawPlan === "annual" ? rawPlan : null;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!plan) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <p>Ungültiger Tarif.</p>
      </main>
    );
  }

  const selectedPlan = plans[plan];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Checkout konnte nicht gestartet werden.");
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Checkout konnte nicht gestartet werden."
      );
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-800">
        {selectedPlan.name}
      </h1>

      <p className="mt-3 text-xl font-medium text-slate-700">
        {selectedPlan.price}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {selectedPlan.note}
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          E-Mail-Adresse
        </label>

        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
          placeholder="name@beispiel.de"
        />

        {error && (
          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-slate-800 px-5 py-3 font-medium text-white disabled:opacity-50"
        >
          {loading ? "Weiterleitung …" : "Weiter zur Zahlung"}
        </button>
      </form>
    </main>
  );
}

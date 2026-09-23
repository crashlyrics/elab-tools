"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";

type Plan = "monthly" | "annual";

const plans = {
  monthly: {
    name: "Monatsabo",
    price: "2,50 €",
    period: "pro Monat",
    note:
      "Verlängert sich monatlich automatisch · zum Ende des laufenden Abrechnungszeitraums kündbar",
  },
  annual: {
    name: "Jahreszugang",
    price: "25,00 €",
    period: "für 12 Monate",
    note:
      "Endet nach zwölf Monaten automatisch · keine automatische Verlängerung",
  },
} as const;

export default function CheckoutPage() {
  const params = useParams();
  const rawPlan = params.plan;

  const plan: Plan | null =
    rawPlan === "monthly" || rawPlan === "annual" ? rawPlan : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!plan) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-xl items-center justify-center px-6 py-16">
        <p className="text-slate-600">Ungültiger Tarif.</p>
      </main>
    );
  }

  const selectedPlan = plans[plan];
  const isAnnual = plan === "annual";

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
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(
          data.error || "Checkout konnte nicht gestartet werden."
        );
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
    <main className="mx-auto flex min-h-[68vh] w-full max-w-[950px] items-center justify-center px-5 py-12 sm:px-9">
      <section
        className={`w-full max-w-[520px] rounded-[1.35rem] p-4 sm:p-5 ${
          isAnnual
            ? "bg-[#2c3e4a] text-white shadow-[0_12px_36px_rgba(48,67,88,0.22)] ring-1 ring-[#314754]"
            : "bg-slate-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_28px_rgba(71,85,105,0.06)] ring-1 ring-slate-300/85"
        }`}
      >
        <div className="px-2 pb-4">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isAnnual
                  ? "bg-lime-300 shadow-[0_0_12px_rgba(190,242,100,0.55)]"
                  : "bg-slate-700"
              }`}
            />

            <span
              className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                isAnnual ? "text-slate-300" : "text-slate-500"
              }`}
            >
              elab Pro
            </span>
          </div>

          <h1
            className={`text-2xl font-semibold tracking-[-0.03em] ${
              isAnnual ? "text-slate-100" : "text-slate-800"
            }`}
          >
            {selectedPlan.name}
          </h1>
        </div>

        <div
          className={`rounded-[1rem] p-5 ${
            isAnnual
              ? "bg-[#344a57] ring-1 ring-[#3c5563] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_18px_rgba(0,0,0,0.25)]"
              : "bg-white/85 ring-1 ring-slate-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_8px_18px_rgba(71,85,105,0.05)]"
          }`}
        >
          <p
            className={`text-sm leading-5 ${
              isAnnual ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {selectedPlan.note}
          </p>

          <div className="mt-5 flex items-end gap-2">
            <span
              className={`text-4xl font-semibold tracking-[-0.05em] ${
                isAnnual ? "text-slate-100" : "text-slate-800"
              }`}
            >
              {selectedPlan.price}
            </span>

            <span
              className={`pb-1 text-sm ${
                isAnnual ? "text-slate-300" : "text-slate-500"
              }`}
            >
              {selectedPlan.period}
            </span>
          </div>

          <p
            className={`mt-2 text-xs ${
              isAnnual ? "text-slate-300" : "text-slate-500"
            }`}
          >
            einschließlich gesetzlicher Umsatzsteuer
          </p>
        </div>

        <p
          className={`mt-4 px-2 text-sm leading-5 ${
            isAnnual ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Der Zugang wird deinem angemeldeten elab-Konto zugeordnet.
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          {error && (
            <p className="mb-4 rounded-[0.8rem] bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-full px-5 py-3.5 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-50 ${
              isAnnual
                ? "bg-slate-100 text-slate-700 hover:bg-slate-300"
                : "bg-slate-700 text-slate-100 hover:bg-slate-600"
            }`}
          >
            {loading ? "Weiterleitung …" : "Weiter zur Zahlung"}
          </button>
        </form>
      </section>
    </main>
  );
}

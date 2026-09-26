"use client";

import { FormEvent, useState } from "react";

import LegalPage, { LegalSection } from "../../../../components/LegalPage";

export default function WiderrufErklaerenPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contractId, setContractId] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/withdraw-contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contractId,
          confirmationEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ?? "Der Widerruf konnte nicht übermittelt werden."
        );
      }

      setSuccess(
        data?.message ??
          "Ihr Widerruf ist eingegangen. Die Bestätigung wurde per E-Mail versandt."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Der Widerruf konnte nicht übermittelt werden."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LegalPage
      title="Vertrag widerrufen"
      intro="Hier können Sie den Widerruf eines über elab.shop geschlossenen Vertrags erklären."
    >
      <LegalSection title="Widerruf erklären">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="mb-2 block font-medium">
              Vor- und Nachname
            </span>

            <input
              required
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 outline-none ring-1 ring-slate-300 focus:ring-slate-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-medium">
              E-Mail-Adresse des Vertrags
            </span>

            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 outline-none ring-1 ring-slate-300 focus:ring-slate-500"
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-medium">
              Vertragsnummer
            </span>

            <input
              required
              type="text"
              value={contractId}
              onChange={(event) => setContractId(event.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 outline-none ring-1 ring-slate-300 focus:ring-slate-500"
            />

            <span className="mt-2 block text-sm text-slate-500">
              Die Vertragsnummer finden Sie in Ihrer Vertragsbestätigung.
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block font-medium">
              E-Mail für die Widerrufsbestätigung
            </span>

            <input
              required
              type="email"
              value={confirmationEmail}
              onChange={(event) =>
                setConfirmationEmail(event.target.value)
              }
              className="w-full rounded-xl bg-white px-4 py-3 outline-none ring-1 ring-slate-300 focus:ring-slate-500"
            />
          </label>

          <p className="text-sm leading-6 text-slate-600">
            Mit dem Absenden erklären Sie eindeutig den Widerruf des oben
            bezeichneten Vertrags.
          </p>

          {error && (
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl bg-slate-100 p-4 font-medium text-slate-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[1rem] bg-slate-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Wird übermittelt …"
              : "Widerruf bestätigen"}
          </button>
        </form>
      </LegalSection>
    </LegalPage>
  );
}

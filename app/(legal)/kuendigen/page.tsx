"use client";

import { FormEvent, useState } from "react";

import LegalPage, { LegalSection } from "../../../components/LegalPage";

type CancellationType = "ordinary" | "extraordinary";
type EndMode = "earliest" | "date";

export default function KuendigenPage() {
  const [cancellationType, setCancellationType] =
    useState<CancellationType>("ordinary");
  const [endMode, setEndMode] = useState<EndMode>("earliest");
  const [requestedEndDate, setRequestedEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [contractId, setContractId] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cancellationType,
          endMode,
          requestedEndDate:
            endMode === "date" ? requestedEndDate : null,
          email,
          confirmationEmail,
          contractId,
          reason:
            cancellationType === "extraordinary" ? reason : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ?? "Die Kündigung konnte nicht übermittelt werden."
        );
      }

      setSuccess(data.message ?? "Ihre Kündigung wurde übermittelt.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Die Kündigung konnte nicht übermittelt werden."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LegalPage
      title="Vertrag kündigen"
      intro="Hier können Sie die Kündigung eines über elab.shop geschlossenen Vertrags erklären."
    >
      <LegalSection title="Kündigung erklären">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="mb-2 block font-medium">Art der Kündigung</span>
            <select
              value={cancellationType}
              onChange={(event) =>
                setCancellationType(
                  event.target.value as CancellationType
                )
              }
              className="w-full rounded-xl bg-white px-4 py-3 ring-1 ring-slate-300"
            >
              <option value="ordinary">Ordentliche Kündigung</option>
              <option value="extraordinary">
                Außerordentliche Kündigung
              </option>
            </select>
          </label>

          {cancellationType === "extraordinary" && (
            <label className="block">
              <span className="mb-2 block font-medium">
                Kündigungsgrund
              </span>
              <textarea
                required
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                className="w-full rounded-xl bg-white px-4 py-3 ring-1 ring-slate-300"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-2 block font-medium">
              E-Mail-Adresse des Vertrags
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 ring-1 ring-slate-300"
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-medium">
              Vertragsnummer
            </span>
            <input
              required
              value={contractId}
              onChange={(event) => setContractId(event.target.value)}
              className="w-full rounded-xl bg-white px-4 py-3 ring-1 ring-slate-300"
            />
            <span className="mt-2 block text-sm text-slate-500">
              Die Vertragsnummer finden Sie in Ihrer Vertragsbestätigung.
            </span>
          </label>

          <fieldset className="space-y-3">
            <legend className="font-medium">
              Gewünschter Beendigungszeitpunkt
            </legend>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={endMode === "earliest"}
                onChange={() => setEndMode("earliest")}
                className="h-4 w-4 appearance-none rounded-full border border-slate-400 bg-[#cbd5e1] checked:border-[#2c3e4a] checked:bg-[#2c3e4a] checked:shadow-[inset_0_0_0_3px_white]"
              />
              Zum nächstmöglichen Zeitpunkt
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={endMode === "date"}
                onChange={() => setEndMode("date")}
                className="h-4 w-4 appearance-none rounded-full border border-slate-400 bg-[#cbd5e1] checked:border-[#2c3e4a] checked:bg-[#2c3e4a] checked:shadow-[inset_0_0_0_3px_white]"
              />
              Zu einem bestimmten Datum
            </label>

            {endMode === "date" && (
              <input
                required
                type="date"
                value={requestedEndDate}
                onChange={(event) =>
                  setRequestedEndDate(event.target.value)
                }
                className="rounded-xl bg-white px-4 py-3 ring-1 ring-slate-300"
              />
            )}
          </fieldset>

          <label className="block">
            <span className="mb-2 block font-medium">
              E-Mail für die Kündigungsbestätigung
            </span>
            <input
              required
              type="email"
              value={confirmationEmail}
              onChange={(event) =>
                setConfirmationEmail(event.target.value)
              }
              className="w-full rounded-xl bg-white px-4 py-3 ring-1 ring-slate-300"
            />
          </label>

          {error && (
            <p className="text-sm font-medium text-red-700">{error}</p>
          )}

          {success && (
            <p className="rounded-xl bg-slate-100 p-4 font-medium text-slate-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-[1rem] bg-slate-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-600 disabled:opacity-60"
          >
            {isSubmitting ? "Wird übermittelt …" : "jetzt kündigen"}
          </button>
        </form>
      </LegalSection>
    </LegalPage>
  );
}

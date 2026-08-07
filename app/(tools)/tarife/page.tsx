import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarife | elab",
  description:
    "elab Pro Monatsabo und elab Pro Jahreszugang im Vergleich.",
};

function Bullet({ tone }: { tone: "slate" | "lime" }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-[0.45rem] h-2 w-2 shrink-0 rounded-full ${
        tone === "slate" ? "bg-slate-500" : "bg-lime-300/90"
      }`}
    />
  );
}

export default function TarifePage() {
  return (
    <main className="mx-auto w-full max-w-[950px] pb-2 md:pb-3">
      <header className="relative -mt-4 mb-5 flex items-start justify-between gap-6 px-5">
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="flex items-center transition hover:opacity-75"
        >
          <img
            src="/logo/elab.shop-logo_oai.svg"
            alt="elab.shop"
            className="h-auto w-[180px]"
          />
        </Link>

        <nav
          aria-label="Seitennavigation"
          className="mr-5 hidden items-center gap-2 rounded-full bg-white/90 px-2 py-2 shadow-[0_8px_24px_rgba(58,76,97,0.08)] ring-1 ring-slate-200/60 backdrop-blur md:flex"
        >
          <Link
            href="/recipe-scaler"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Tools
          </Link>

          <span
            aria-current="page"
            className="rounded-full bg-slate-700 px-4 py-2 text-sm font-medium text-white"
          >
            Tarife
          </span>
        </nav>
      </header>

      <article className="rounded-[1.6rem] bg-white/90 px-6 py-8 shadow-[0_28px_70px_rgba(49,67,88,0.16)] ring-1 ring-slate-300/85 backdrop-blur sm:px-9 md:px-12 md:py-11">
        <header className="mb-9 border-b-2 border-slate-200/90 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            elab Pro
          </p>

          <h1 className="text-3xl font-semibold tracking-[-0.045em] text-slate-800 sm:text-4xl">
            Der passende Zugang für deinen Workflow
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Nutze alle verfügbaren Pro-Funktionen und speichere deine
            Rezepturen dauerhaft im persönlichen Kundenkonto.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="flex flex-col rounded-[1.35rem] bg-slate-50/80 p-6 shadow-[0_8px_32px_-7px_rgba(48,67,88,0.21)] ring-1 ring-slate-300 sm:p-7">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-800">
                Monatsabo
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Verlängert sich monatlich automatisch · jederzeit zum Ende des
                laufenden Abrechnungszeitraums kündbar
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-[-0.05em] text-slate-800">
                  2,50 €
                </span>
                <span className="pb-1 text-sm text-slate-500">
                  pro Monat
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                einschließlich gesetzlicher Umsatzsteuer
              </p>

              <ul className="mt-7 space-y-3 text-[0.95rem] leading-6 text-slate-700">
                <li className="flex gap-3">
                  <Bullet tone="slate" />
                  <span>Sämtliche aktuell verfügbaren Pro-Funktionen</span>
                </li>

                <li className="flex gap-3">
                  <Bullet tone="slate" />
                  <span>Bis zu zehn gespeicherte Rezepturen</span>
                </li>

                <li className="flex gap-3">
                  <Bullet tone="slate" />
                  <span>Rezepturen öffnen, bearbeiten und duplizieren</span>
                </li>

                <li className="flex gap-3">
                  <Bullet tone="slate" />
                  <span>Monatliche Abrechnung im Voraus</span>
                </li>
              </ul>
            </div>

            <Link
              href="/checkout/monthly"
              className="mt-8 block w-full rounded-full bg-slate-700 px-5 py-3.5 text-center text-sm font-semibold text-slate-100"
            >
              Monatsabo wählen
            </Link>
          </section>

          <section className="relative flex flex-col rounded-[1.35rem] bg-slate-700 p-6 text-white shadow-[0_8px_60px_rgba(48,67,88,0.16)] ring-1 ring-slate-300 sm:p-7">
            <span className="absolute right-5 top-5 rounded-full bg-lime-300/90 px-3 py-1 text-xs font-semibold text-slate-800">
              5 € günstiger
            </span>

            <div>
              <h2 className="pr-28 text-2xl font-semibold tracking-[-0.03em]">
                Jahreszugang
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Endet nach zwölf Monaten automatisch · keine automatische
                Verlängerung
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-[-0.05em]">
                  25,00 €
                </span>
                <span className="pb-1 text-sm text-slate-300">
                  für 12 Monate
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-300">
                einschließlich gesetzlicher Umsatzsteuer
              </p>

              <ul className="mt-7 space-y-3 text-[0.95rem] leading-6 text-slate-100">
                <li className="flex gap-3">
                  <Bullet tone="lime" />
                  <span>Sämtliche aktuell verfügbaren Pro-Funktionen</span>
                </li>

                <li className="flex gap-3">
                  <Bullet tone="lime" />
                  <span>Rezeptarchiv ohne tarifbedingte Begrenzung</span>
                </li>

                <li className="flex gap-3">
                  <Bullet tone="lime" />
                  <span>Rezepturen öffnen, bearbeiten und duplizieren</span>
                </li>

                <li className="flex gap-3">
                  <Bullet tone="lime" />
                  <span>5,00 € günstiger als zwölf Monatszahlungen</span>
                </li>
              </ul>
            </div>

            <Link
              href="/checkout/annual"
              className="mt-8 block w-full rounded-full bg-slate-100 px-5 py-3.5 text-center text-sm font-semibold text-slate-700"
            >
              Jahreszugang wählen
            </Link>
          </section>
        </div>

        <div className="mt-8 rounded-[1rem] bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-600 ring-[2.5px] ring-slate-200">
          Für elab Pro ist ein Kundenkonto erforderlich. Die Anmeldung ist über
          einen zeitlich begrenzten E-Mail-Link und optional mit einem selbst
          eingerichteten Passwort möglich.
        </div>

        <p className="mt-7 text-center text-sm leading-6 text-slate-500">
          Einzelheiten findest du in den{" "}
          <Link
            href="/agb"
            className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700"
          >
            AGB
          </Link>{" "}
          und in der{" "}
          <Link
            href="/datenschutz"
            className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-700"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
      </article>
    </main>
  );
}

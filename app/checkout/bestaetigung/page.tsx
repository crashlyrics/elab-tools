import Link from "next/link";

export default function CheckoutBestaetigungPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
      <div className="w-full rounded-[1.6rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          elab Pro
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-slate-800">
          Zahlung wird geprüft
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Du bist von Mollie zu elab.shop zurückgekehrt. Der Zahlungsstatus
          wird jetzt geprüft.
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Die Rückkehr auf diese Seite allein gilt noch nicht als
          Zahlungsbestätigung.
        </p>

        <Link
          href="/tarife"
          className="mt-8 inline-flex rounded-full bg-slate-700 px-5 py-3 text-sm font-semibold text-slate-100"
        >
          Zurück zu den Tarifen
        </Link>
      </div>
    </main>
  );
}

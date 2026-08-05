import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalPlaceholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 font-medium text-amber-950 ring-1 ring-amber-300/80">
      {children}
    </span>
  );
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="space-y-3 border-t border-slate-200/90 pt-7 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold tracking-[-0.025em] text-slate-800">
        {title}
      </h2>
      <div className="space-y-4 text-[0.98rem] leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <main className="mx-auto w-full max-w-[950px] pb-2 md:pb-3">
      <div className="-mt-1 mb-5 flex items-center justify-between gap-4 px-[1.4rem]">
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="inline-flex items-center transition hover:opacity-75"
        >
          <img
            src="/logo/elab.shop-logo_oai.svg"
            alt="elab"
            className="h-auto w-[180px]"
          />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-white/90 px-5 py-3 text-sm font-medium text-slate-600 shadow-[0_8px_24px_rgba(58,76,97,0.08)] ring-1 ring-slate-200/60 backdrop-blur transition hover:bg-white hover:text-slate-900"
        >
          ← Zur Startseite
        </Link>
      </div>

      <article className="rounded-[1.6rem] bg-white/90 px-6 py-8 shadow-[0_28px_70px_rgba(49,67,88,0.16)] ring-1 ring-slate-300/85 backdrop-blur sm:px-9 md:px-12 md:py-11">
        <header className="mb-9 border-b border-slate-200/90 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Rechtliche Informationen
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.045em] text-slate-800 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {intro}
          </p>
        </header>

        <div className="space-y-8">{children}</div>
      </article>
    </main>
  );
}

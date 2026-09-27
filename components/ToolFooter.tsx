"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ToolFooter() {
  const pathname = usePathname();
  const isTarifePage = pathname === "/tarife";

  return (
    <footer
      className={`mt-8 flex min-h-[82px] items-center rounded-t-[1.35rem] bg-white/80 px-7 py-4 text-slate-600 shadow-[0_-8px_24px_rgba(49,67,88,0.08)] ring-1 ring-slate-300/85 backdrop-blur md:mt-10 md:px-8 ${
        isTarifePage ? "mx-auto w-full max-w-[950px]" : ""
      }`}
    >
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 max-[720px]:grid-cols-1 max-[720px]:gap-4 max-[720px]:text-center">
        <nav
          aria-label="Rechtliche Informationen"
          className="flex flex-wrap items-center justify-start gap-x-1.5 gap-y-1 text-sm font-medium tracking-[0.005em] max-[720px]:justify-center"
        >
          <Link
            className="transition-colors hover:text-slate-900"
            href="/impressum"
          >
            Impressum
          </Link>

          <span aria-hidden="true" className="text-slate-400">
            ·
          </span>

          <Link
            className="transition-colors hover:text-slate-900"
            href="/datenschutz"
          >
            Datenschutz
          </Link>

          <span aria-hidden="true" className="text-slate-400">
            ·
          </span>

          <Link
            className="transition-colors hover:text-slate-900"
            href="/agb"
          >
            AGB
          </Link>

          <span aria-hidden="true" className="text-slate-400">
            ·
          </span>

          <Link
            className="transition-colors hover:text-slate-900"
            href="/nutzungshinweise"
          >
            Nutzungshinweise
          </Link>
        </nav>

        <div
          className="flex flex-col items-center justify-center gap-1 text-center"
          aria-label="Design und Entwicklung: almeviDesign by Alejandro Mestre Vives"
        >
          <div className="text-[0.62rem] uppercase leading-none tracking-[0.12em] text-slate-500">
            Design &amp; Entwicklung
          </div>

          <img
            src="/logo/almeviDesign-logo_oai.svg"
            alt="almeviDesign"
            className="block h-auto w-[100px]"
          />

          <div className="text-[0.77rem] leading-none text-slate-500">
            Alejandro Mestre Vives
          </div>
        </div>

        <nav
          aria-label="Vertrag verwalten"
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm font-semibold text-slate-700 max-sm:justify-center"
        >
          <Link
            className="transition-colors hover:text-slate-900 hover:underline"
            href="/kuendigen"
          >
            Vertrag kündigen
          </Link>

          <Link
            className="transition-colors hover:text-slate-900 hover:underline"
            href="/widerruf/erklaeren"
          >
            Vertrag widerrufen
          </Link>
        </nav>
      </div>
    </footer>
  );
}

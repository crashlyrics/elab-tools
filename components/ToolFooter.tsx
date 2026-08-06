"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function ToolFooter() {
const pathname = usePathname();
const isTarifePage = pathname === "/tarife";

  return (
    <footer
      className={`mt-8 flex min-h-[82px] items-center rounded-t-[1.35rem] bg-white/80 px-7 pt-5 pb-5 text-slate-600 shadow-[0_-8px_24px_rgba(49,67,88,0.08)] ring-1 ring-slate-300/85 backdrop-blur md:mt-10 md:px-8 ${
        isTarifePage ? "mx-auto w-full max-w-[950px]" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between gap-5 max-sm:flex-col max-sm:text-center">
        <nav
          aria-label="Rechtliche Informationen"
          className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[0.85rem] font-medium tracking-[0.005em]"
        >
          <Link className="transition hover:text-slate-900" href="/impressum">
            Impressum
          </Link>

          <span aria-hidden="true" className="text-slate-400 max-[840px]:hidden">
            ·
          </span>

          <Link className="transition hover:text-slate-900" href="/datenschutz">
            Datenschutz
          </Link>

          <span aria-hidden="true" className="text-slate-400 max-[840px]:hidden">
            ·
          </span>

          <Link className="transition hover:text-slate-900" href="/agb">
            AGB
          </Link>

          <span aria-hidden="true" className="text-slate-400 max-[840px]:hidden">
            ·
          </span>

          <Link className="transition hover:text-slate-900" href="/nutzungshinweise">
            Nutzungshinweise
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 text-right max-sm:text-center">
        <div className="text-xs uppercase leading-tight tracking-[0.12em] text-slate-500">
            Design &amp; Entwicklung
          </div>
          <div
            className="flex items-center"
            aria-label="almeviDesign by Alejandro Mestre Vives"
          >
            <img
              src="/logo/almeviDesign-logo_oai.svg"
              alt="almeviDesign"
              className="block h-auto w-[120px] shrink-0"
            />

            <span className="ml-1.5 text-sm font-normal text-slate-500">
              by Alejandro Mestre Vives
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

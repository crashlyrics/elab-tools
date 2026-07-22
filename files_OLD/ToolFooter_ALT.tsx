// components/ToolFooter.tsx

import Link from "next/link";

export default function ToolFooter() {
  return (
    <footer className="rounded-t-[1.6rem] bg-white/90 px-6 py-5 text-slate-600 shadow-[0_-10px_35px_rgba(49,67,88,0.10)] ring-1 ring-slate-300/85 backdrop-blur">
      <div className="flex flex-col items-center justify-between gap-4 text-center text-xs sm:flex-row">
        <nav className="flex flex-wrap justify-center gap-x-2 gap-y-1">
          <Link href="/impressum" className="hover:text-slate-900">
            Impressum
          </Link>

          <span aria-hidden="true">·</span>

          <Link href="/datenschutz" className="hover:text-slate-900">
            Datenschutz
          </Link>

          <span aria-hidden="true">·</span>

          <Link href="/nutzungshinweise" className="hover:text-slate-900">
            Hinweise zur Nutzung
          </Link>
        </nav>

        <div className="leading-tight">
          <div className="font-semibold text-slate-700">almeviDesign</div>
          <div className="text-[10px] uppercase tracking-[0.12em]">
            Design &amp; Entwicklung
          </div>
        </div>
      </div>
    </footer>
  );
}

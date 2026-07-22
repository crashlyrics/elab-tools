import Link from "next/link";

export default function ToolFooter() {
  return (
    <footer className="mt-8 rounded-t-[1.35rem] bg-white/80 px-7 py-4 text-slate-600 shadow-[0_-14px_40px_rgba(48,67,88,0.12)] ring-1 ring-slate-300/85 backdrop-blur md:mt-10 md:px-8">
      <div className="flex items-center justify-between gap-5 max-sm:flex-col max-sm:text-center">
        <nav
          aria-label="Rechtliche Informationen"
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.72rem] font-medium tracking-[0.01em]"
        >
          <Link className="transition hover:text-slate-900" href="/impressum">
            Impressum
          </Link>
          <span aria-hidden="true" className="text-slate-400">
            ·
          </span>
          <Link className="transition hover:text-slate-900" href="/datenschutz">
            Datenschutz
          </Link>
          <span aria-hidden="true" className="text-slate-400">
            ·
          </span>
          <Link className="transition hover:text-slate-900" href="/nutzungshinweise">
            Hinweise zur Nutzung
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 text-right max-sm:text-center">
          <div
            className="text-[0.78rem] font-semibold tracking-[-0.035em] text-[#2c3e4a]"
            aria-label="almeviDesign"
          >
            almevi<span className="font-normal">Design</span>
          </div>
          <div className="text-[0.56rem] uppercase leading-tight tracking-[0.12em] text-slate-500">
            Design &amp;
            <br />
            Entwicklung
          </div>
        </div>
      </div>
    </footer>
  );
}

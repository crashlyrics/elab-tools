import type { ReactNode } from "react";

import ToolFooter from "../../components/ToolFooter";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative min-h-screen overflow-x-auto text-slate-800"
      style={{
        background: "linear-gradient(90deg, #c9d3de 0%, #eef2f6 100%)",
        fontFamily: "Ubuntu Sans, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.11] [background-image:radial-gradient(rgba(44,62,74,0.26)_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(44,62,74,0.16)_1.6px,transparent_1.6px)] [background-size:26px_26px]" />
        <div className="absolute left-[14%] top-[9%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(218,255,74,0.07),rgba(218,255,74,0)_68%)]" />
        <div className="absolute right-[10%] top-[18%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(90,117,145,0.10),rgba(90,117,145,0)_72%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1030px] flex-col px-6 pt-8 md:pt-10 md:pt-7">
        <div className="flex-1">{children}</div>
        <div className="mx-auto w-full max-w-[950px]">
          <ToolFooter />
        </div>
      </div>
    </div>
  );
}

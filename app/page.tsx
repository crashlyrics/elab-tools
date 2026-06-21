"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [entered, setEntered] = useState(false);

  return (
    <div
      className="min-h-screen overflow-x-auto text-slate-800"
      style={{
        background: "linear-gradient(90deg, #c9d3de 0%, #eef2f6 100%)",
        fontFamily: "Ubuntu Sans, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-[950px] min-h-[600px] rounded-[1.35rem] bg-white/90 px-8 py-24 text-center shadow-[0_28px_70px_rgba(49,67,88,0.18)] ring-1 ring-slate-300/85 backdrop-blur">
          {!entered ? (
            <button
              type="button"
              onMouseEnter={() => setEntered(true)}
              onClick={() => setEntered(true)}
              className="group mx-auto flex flex-col items-center gap-6"
            >
              <div
                  className="px-24 py-14 transition group-hover:scale-[0.98]"
                  style={{ animation: "breathe 7s ease-in-out infinite" }}
                > 
                <img
                  src="/logo/elab-logo_oai.svg"
                  alt="elab"
                  className="relative top-[6px] w-[500px] h-auto drop-shadow-[0_24px_55px_rgba(44,62,74,0.24)]"
                />
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
                berühren oder klicken
              </div>
            </button>
          ) : (
            <div className="mt-10 animate-[fadeIn_700ms_ease-out] space-y-16">
              <div className="mx-auto mb-7 flex justify-center">
                <Image
                  src="/logo/elab-logo_oai.svg"
                  alt="elab.shop"
                  width={150}
                  height={54}
                  priority
                  className="h-auto w-[180px]"
                />
              </div>

              <h1 className="mb-16 text-3xl font-semibold tracking-[-0.04em] text-slate-800">
                Digitale Werkzeuge für den professionellen Workflow.
              </h1>

              <div className="mt-8 flex justify-center gap-5">
                <Link
                  href="/recipe-scaler"
                  className="inline-flex min-w-[240px] justify-center rounded-[1rem] bg-[#2c3e4a] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(44,62,74,0.22)] transition hover:-translate-y-[1px] hover:bg-[#24333d]"
                >
                  Rezept- & Einkaufsplaner öffnen
                </Link>

                <div className="inline-flex min-w-[240px] justify-center rounded-[1rem] bg-slate-300 px-5 py-4 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
                  Weitere Tools folgen ...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes breathe {
          0%, 100% {
            opacity: 0.45;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

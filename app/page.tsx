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
        <div className="w-full max-w-3xl rounded-[1.6rem] bg-white/88 px-8 py-10 text-center shadow-[0_28px_70px_rgba(49,67,88,0.18)] ring-1 ring-slate-300/85 backdrop-blur">
          {!entered ? (
            <button
              type="button"
              onMouseEnter={() => setEntered(true)}
              onClick={() => setEntered(true)}
              className="group mx-auto flex flex-col items-center gap-6"
            >
              <div className="animate-pulse rounded-[1.25rem] bg-[#2c3e4a] px-14 py-9 shadow-[0_24px_55px_rgba(44,62,74,0.24)] transition group-hover:scale-[0.98]">
                <div className="text-5xl font-semibold tracking-[-0.06em] text-white">
                  elab
                </div>
              </div>
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                berühren oder klicken
              </div>
            </button>
          ) : (
            <div className="animate-[fadeIn_700ms_ease-out]">
              <div className="mx-auto mb-7 flex justify-center">
                <Image
                  src="/logo/elab.shop-logo_oai.svg"
                  alt="elab.shop"
                  width={150}
                  height={54}
                  priority
                  className="h-auto w-[150px]"
                />
              </div>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#2c3e4a]">
                elab your workflow
              </p>

              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-800">
                Digitale Werkzeuge für professionelle Abläufe.
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
                Rezeptmengen skalieren, Verluste berücksichtigen und Einkaufseinheiten planen – direkt im Browser.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/recipe-scaler"
                  className="rounded-[1rem] bg-[#2c3e4a] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(44,62,74,0.22)] transition hover:-translate-y-[1px] hover:bg-[#24333d]"
                >
                  Rezept- & Einkaufsplaner öffnen
                </Link>

                <div className="rounded-[1rem] bg-slate-100 px-5 py-4 text-sm font-medium text-slate-500 ring-1 ring-slate-200">
                  Weitere Tools folgen
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
      `}</style>
    </div>
  );
}

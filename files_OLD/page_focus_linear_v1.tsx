"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type LandingStage = "intro" | "claim" | "landing";

const CLAIM_DURATION = 7800;
const EARLY_ADVANCE_AFTER = 4300;

function ClaimWords({ className = "" }: { className?: string }) {
  return (
    <div className={`claim-text ${className}`.trim()} aria-hidden="true">
      elab your workflow
    </div>
  );
}

function MaterializingClaim() {
  return (
    <div
      className="claim-stage"
      aria-label="elab your workflow"
      data-animation-version="focus-linear-v1"
    >
      <div className="claim-focus-stack">
        
        <>
          <ClaimWords className="claim-halo" />
          <ClaimWords className="claim-main" />
        </>
      </div>
    </div>
  );
}

export default function Page() {
  const [stage, setStage] = useState<LandingStage>("intro");
  const claimStartedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (stage !== "claim") return;

    claimStartedAtRef.current = performance.now();

    const timer = window.setTimeout(() => {
      setStage("landing");
    }, CLAIM_DURATION);

    return () => window.clearTimeout(timer);
  }, [stage]);

  useEffect(() => {
    if (stage !== "claim") return;

    let lastX: number | null = null;
    let lastY: number | null = null;

    const handlePointerMove = (event: MouseEvent) => {
      const startedAt = claimStartedAtRef.current;
      if (startedAt === null) return;

      const elapsed = performance.now() - startedAt;
      if (elapsed < EARLY_ADVANCE_AFTER) {
        lastX = event.clientX;
        lastY = event.clientY;
        return;
      }

      const nearCenter =
        Math.abs(event.clientX - window.innerWidth / 2) < Math.min(360, window.innerWidth * 0.34) &&
        Math.abs(event.clientY - window.innerHeight / 2) < Math.min(220, window.innerHeight * 0.28);

      const movedEnough =
        lastX !== null &&
        lastY !== null &&
        Math.hypot(event.clientX - lastX, event.clientY - lastY) > 16;

      lastX = event.clientX;
      lastY = event.clientY;

      if (nearCenter || movedEnough) {
        setStage("landing");
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [stage]);

  const enterLanding = () => {
    if (stage !== "intro") return;
    setStage("claim");
  };

  const showClaim = stage === "claim";
  const showIntro = stage === "intro";

  return (
    <div
      className="min-h-screen overflow-x-auto text-slate-800"
      style={{
        background: "linear-gradient(90deg, #c9d3de 0%, #eef2f6 100%)",
        fontFamily: "Ubuntu Sans, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        {showClaim ? (
          <MaterializingClaim />
        ) : (
          <div className="flex min-h-[600px] w-full max-w-[950px] flex-col justify-center rounded-[1.6rem] bg-white/90 px-8 py-14 text-center shadow-[0_28px_70px_rgba(49,67,88,0.18)] ring-1 ring-slate-300/85 backdrop-blur">
            <div className="relative -top-2">
              {showIntro ? (
                <button
                  type="button"
                  onMouseEnter={enterLanding}
                  onClick={enterLanding}
                  className="group mx-auto flex flex-col items-center gap-6"
                >
                  <div
                    className="px-24 py-14 transition group-hover:scale-[0.98]"
                    style={{ animation: "breathe 7s ease-in-out infinite" }}
                  >
                    <img
                      src="/logo/elab-logo_oai.svg"
                      alt="elab"
                      className="relative top-[6px] h-auto w-[500px] drop-shadow-[0_24px_55px_rgba(44,62,74,0.24)]"
                    />
                  </div>

                  <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    berühren oder klicken
                  </div>
                </button>
              ) : (
                <div className="animate-[fadeIn_700ms_ease-out] space-y-16">
                  <div className="mx-auto mb-7 flex justify-center">
                    <img
                      src="/logo/elab-logo_oai.svg"
                      alt="elab"
                      className="h-auto w-[181px]"
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
        )}
      </div>

      <style>{`
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

        @keyframes claimStage {
          0%, 92% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.003);
          }
        }

        @keyframes focusHaloLinear {
          0% {
            opacity: 0.34;
            filter: blur(26px);
            transform: scale(1.022);
          }
          42% {
            opacity: 0.22;
            filter: blur(14px);
            transform: scale(1.01);
          }
          74% {
            opacity: 0.07;
            filter: blur(6px);
            transform: scale(1.003);
          }
          100% {
            opacity: 0;
            filter: blur(0px);
            transform: scale(1);
          }
        }

        @keyframes focusMainLinear {
          0% {
            opacity: 0.18;
            filter: blur(18px);
            transform: scale(0.988);
            color: rgba(44, 62, 74, 0.32);
          }
          32% {
            opacity: 0.46;
            filter: blur(9px);
            transform: scale(0.994);
            color: rgba(44, 62, 74, 0.48);
          }
          68% {
            opacity: 0.84;
            filter: blur(2.8px);
            transform: scale(0.999);
            color: rgba(44, 62, 74, 0.82);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
            color: rgba(44, 62, 74, 1);
          }
        }

        .claim-stage {
          display: flex;
          width: min(90vw, 1040px);
          align-items: center;
          justify-content: center;
          animation: claimStage ${CLAIM_DURATION}ms ease-in-out both;
        }

        .claim-focus-stack {
          position: relative;
          display: grid;
          place-items: center;
          width: min(100%, 1000px);
          min-height: 160px;
          isolation: isolate;
        }

        .claim-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2c3e4a;
          font-family: "Ubuntu Sans", ui-sans-serif, system-ui, sans-serif;
          font-size: 76px;
          font-weight: 700;
          letter-spacing: 2.2px;
          word-spacing: 0.26em;
          text-align: center;
          white-space: nowrap;
          transform-origin: 50% 50%;
          will-change: opacity, filter, transform;
        }

        .claim-reduced-text {
          color: #2c3e4a;
          font-size: 76px;
          font-weight: 700;
          letter-spacing: 2.2px;
          word-spacing: 0.26em;
          text-align: center;
        }

        .claim-halo {
          animation: focusHaloLinear 4700ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .claim-main {
          animation: focusMainLinear 5200ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        @media (max-width: 720px) {
          .claim-stage {
            width: min(97vw, 1040px);
          }

          .claim-text,
          .claim-reduced-text {
            font-size: 68px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .claim-focus-stack {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

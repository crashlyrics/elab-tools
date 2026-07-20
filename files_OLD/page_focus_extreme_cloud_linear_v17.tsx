"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type LandingStage = "intro" | "claim" | "landing";

const CLAIM_DURATION = 9800;
const EARLY_ADVANCE_AFTER = 6400;

function ClaimWords({ className = "" }: { className?: string }) {
  return (
    <div className={`claim-text ${className}`.trim()} aria-hidden="true">
      {`elab\nyour\nworkflow`}
    </div>
  );
}

function MaterializingClaim() {
  return (
    <div
      className="claim-stage"
      aria-label="elab your workflow"
      data-animation-version="focus-extreme-cloud-linear-v12-max-cloud"
    >
      <div className="claim-focus-stack">
        <ClaimWords className="claim-halo" />
        <ClaimWords className="claim-main" />
      </div>
      <div className="claim-reduced-text" aria-hidden="true">
        {`elab\nyour\nworkflow`}
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
                  className="intro-trigger group mx-auto flex flex-col items-center gap-6"
                >
                  <div
                    className="intro-logo-wrap px-24 py-14 transition group-hover:scale-[0.98]"
                    style={{ animation: "breathe 7s ease-in-out infinite" }}
                  >
                    <img
                      src="/logo/elab-logo_oai.svg"
                      alt="elab"
                      className="intro-logo relative top-[6px] h-auto w-[500px] drop-shadow-[0_24px_55px_rgba(44,62,74,0.24)]"
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

                  <div className="tool-actions mt-8 flex justify-center gap-5">
                    <Link
                      href="/recipe-scaler"
                      className="tool-action inline-flex min-w-[240px] justify-center rounded-[1rem] bg-[#2c3e4a] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(44,62,74,0.22)] transition hover:-translate-y-[1px] hover:bg-[#24333d]"
                    >
                      Rezept- & Einkaufsplaner öffnen
                    </Link>

                    <div className="tool-action inline-flex min-w-[240px] justify-center rounded-[1rem] bg-slate-300 px-5 py-4 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
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

        @keyframes focusHaloLinearExtreme {
          0% {
            opacity: 0.97;
            filter: blur(184px);
            transform: scale(1.31) scaleX(1.23) skewX(-2.45deg);
            font-weight: 135;
            font-variation-settings: "wght" 135;
            letter-spacing: 9.5px;
            color: rgba(44, 62, 74, 0.24);
            text-shadow:
              0 0 128px rgba(44, 62, 74, 0.28),
              0 0 240px rgba(44, 62, 74, 0.18);
          }
          24% {
            opacity: 0.56;
            filter: blur(68px);
            transform: scale(1.11) scaleX(1.095) skewX(-1.18deg);
            font-weight: 390;
            font-variation-settings: "wght" 390;
            letter-spacing: 5.3px;
            color: rgba(44, 62, 74, 0.13);
            text-shadow:
              0 0 42px rgba(44, 62, 74, 0.14),
              0 0 90px rgba(44, 62, 74, 0.09);
          }
          100% {
            opacity: 0;
            filter: blur(0px);
            transform: scale(1) scaleX(1) skewX(0deg);
            font-weight: 700;
            font-variation-settings: "wght" 700;
            letter-spacing: 2.2px;
            color: rgba(44, 62, 74, 0);
            text-shadow: none;
          }
        }

        @keyframes focusMainLinearExtreme {
          0% {
            opacity: 0.72;
            filter: blur(58px);
            transform: scale(1.115) scaleX(1.105) skewX(-1.4deg);
            color: rgba(44, 62, 74, 0.54);
            font-weight: 145;
            font-variation-settings: "wght" 145;
            letter-spacing: 7.2px;
            text-shadow:
              0 0 44px rgba(44, 62, 74, 0.22),
              0 0 92px rgba(44, 62, 74, 0.13);
          }
          24% {
            opacity: 0.84;
            filter: blur(20px);
            transform: scale(1.038) scaleX(1.042) skewX(-0.72deg);
            color: rgba(44, 62, 74, 0.74);
            font-weight: 395;
            font-variation-settings: "wght" 395;
            letter-spacing: 4.4px;
            text-shadow:
              0 0 14px rgba(44, 62, 74, 0.10),
              0 0 30px rgba(44, 62, 74, 0.06);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1) scaleX(1) skewX(0deg);
            color: rgba(44, 62, 74, 1);
            font-weight: 700;
            font-variation-settings: "wght" 700;
            letter-spacing: 2.2px;
            text-shadow: none;
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
          display: none;
          color: #2c3e4a;
          font-size: 76px;
          font-weight: 700;
          letter-spacing: 2.2px;
          word-spacing: 0.26em;
          text-align: center;
        }

        .claim-halo {
          animation: focusHaloLinearExtreme 6000ms linear forwards;
        }

        .claim-main {
          animation: focusMainLinearExtreme 6300ms linear forwards;
        }

        @media (max-width: 720px) {
          .intro-trigger {
            width: 100%;
          }

          .intro-logo-wrap {
            width: min(78vw, 400px);
            padding: 2.5rem 0.5rem;
          }

          .intro-logo {
            width: 100%;
          }

          .claim-stage {
            width: min(94vw, 1040px);
          }

          .claim-focus-stack {
            min-height: 110px;
          }

          .claim-text,
          .claim-reduced-text {
            max-width: 90vw;
            font-size: clamp(29px, 9vw, 44px);
            line-height: 1.08;
            letter-spacing: 1.2px;
            word-spacing: 0.16em;
            white-space: nowrap;
          }

          .tool-actions {
            width: 100%;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .tool-action {
            width: 100%;
            min-width: 0;
            min-height: 3.5rem;
            align-items: center;
            text-align: center;
          }
        }

        @media (max-width: 720px) and (orientation: portrait) {
          .claim-focus-stack {
            min-height: 190px;
          }

          .claim-text,
          .claim-reduced-text {
            white-space: pre-line;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .claim-focus-stack {
            display: none;
          }

          .claim-reduced-text {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}

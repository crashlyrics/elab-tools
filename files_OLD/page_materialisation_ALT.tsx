"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LandingStage = "intro" | "claim" | "landing";

type Fragment = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  begin: number;
  duration: number;
};

const CLAIM_DURATION = 23000;
const MATERIALIZATION_DURATION = 18000;

const FRAGMENTS: readonly Fragment[] = [
  { cx: 168, cy: 74, rx: 58, ry: 32, begin: 0.8, duration: 7.2 },
  { cx: 220, cy: 105, rx: 46, ry: 24, begin: 2.1, duration: 7.8 },
  { cx: 278, cy: 61, rx: 55, ry: 27, begin: 1.4, duration: 8.6 },
  { cx: 336, cy: 98, rx: 61, ry: 31, begin: 3.2, duration: 7.5 },
  { cx: 393, cy: 70, rx: 49, ry: 34, begin: 0.3, duration: 9.4 },
  { cx: 452, cy: 108, rx: 57, ry: 25, begin: 4.0, duration: 7.7 },
  { cx: 512, cy: 58, rx: 64, ry: 29, begin: 2.7, duration: 9.1 },
  { cx: 566, cy: 96, rx: 48, ry: 35, begin: 1.1, duration: 10.2 },
  { cx: 625, cy: 68, rx: 56, ry: 25, begin: 4.8, duration: 7.9 },
  { cx: 680, cy: 105, rx: 62, ry: 31, begin: 3.6, duration: 9.0 },
  { cx: 738, cy: 57, rx: 50, ry: 28, begin: 5.5, duration: 7.4 },
  { cx: 792, cy: 92, rx: 58, ry: 35, begin: 2.3, duration: 10.4 },
  { cx: 842, cy: 69, rx: 46, ry: 29, begin: 6.2, duration: 7.2 },
  { cx: 188, cy: 48, rx: 34, ry: 18, begin: 5.0, duration: 6.8 },
  { cx: 304, cy: 118, rx: 39, ry: 18, begin: 6.8, duration: 6.1 },
  { cx: 478, cy: 80, rx: 37, ry: 22, begin: 7.4, duration: 6.4 },
  { cx: 654, cy: 45, rx: 40, ry: 20, begin: 6.0, duration: 7.2 },
  { cx: 817, cy: 118, rx: 38, ry: 18, begin: 8.1, duration: 5.7 },
] as const;

function MaterializingClaim() {
  return (
    <div
      className="claim-stage"
      aria-label="elab your workflow"
      data-animation-version="svg-growing-fragments-v5"
    >
      <svg
        className="claim-svg"
        viewBox="0 0 1000 160"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="claim-fragment-softness"
            x="-20%"
            y="-30%"
            width="140%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="2.4" />
          </filter>

          <mask
            id="claim-fragment-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="160"
          >
            <rect width="1000" height="160" fill="black" />

            <g filter="url(#claim-fragment-softness)">
              {FRAGMENTS.map((fragment, index) => (
                <ellipse
                  key={`${fragment.cx}-${fragment.cy}-${index}`}
                  cx={fragment.cx}
                  cy={fragment.cy}
                  rx="0"
                  ry="0"
                  fill="white"
                >
                  <animate
                    attributeName="rx"
                    from="0"
                    to={fragment.rx}
                    begin={`${fragment.begin}s`}
                    dur={`${fragment.duration}s`}
                    calcMode="spline"
                    keySplines="0.22 0.61 0.36 1"
                    fill="freeze"
                  />
                  <animate
                    attributeName="ry"
                    from="0"
                    to={fragment.ry}
                    begin={`${fragment.begin}s`}
                    dur={`${fragment.duration}s`}
                    calcMode="spline"
                    keySplines="0.22 0.61 0.36 1"
                    fill="freeze"
                  />
                </ellipse>
              ))}
            </g>
          </mask>
        </defs>

        <text
          className="claim-text claim-fragment-text"
          x="500"
          y="104"
          textAnchor="middle"
          mask="url(#claim-fragment-mask)"
        >
          elab your workflow
        </text>

        <text
          className="claim-text claim-final-text"
          x="500"
          y="104"
          textAnchor="middle"
        >
          elab your workflow
        </text>
      </svg>
    </div>
  );
}

export default function Page() {
  const [stage, setStage] = useState<LandingStage>("intro");

  useEffect(() => {
    if (stage !== "claim") return;

    const timer = window.setTimeout(() => {
      setStage("landing");
    }, CLAIM_DURATION);

    return () => window.clearTimeout(timer);
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
          0%, 91.3% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.004);
          }
        }

        @keyframes settleCompleteClaim {
          0%, 72% {
            opacity: 0;
          }
          82% {
            opacity: 0.08;
          }
          91% {
            opacity: 0.38;
          }
          100% {
            opacity: 1;
          }
        }

        .claim-stage {
          display: flex;
          width: min(84vw, 950px);
          align-items: center;
          justify-content: center;
          color: #2c3e4a;
          animation: claimStage ${CLAIM_DURATION}ms ease-in-out both;
        }

        .claim-svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .claim-text {
          fill: currentColor;
          font-family: "Ubuntu Sans", ui-sans-serif, system-ui, sans-serif;
          font-size: 76px;
          font-weight: 700;
          letter-spacing: 1.4px;
        }

        .claim-final-text {
          opacity: 0;
          animation: settleCompleteClaim ${MATERIALIZATION_DURATION}ms linear both;
        }

        @media (max-width: 720px) {
          .claim-stage {
            width: min(96vw, 950px);
          }

          .claim-text {
            font-size: 72px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .claim-stage,
          .claim-final-text {
            animation: none;
          }

          .claim-fragment-text {
            display: none;
          }

          .claim-final-text {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

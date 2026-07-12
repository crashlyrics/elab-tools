"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LandingStage = "intro" | "claim" | "landing";

const CLAIM_DURATION = 6800;
const MATERIALIZATION_DURATION = 5000;

type Grain = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotation: number;
  delay: number;
  duration: number;
};

function createGrains(): Grain[] {
  let seed = 0x4e6f6973;

  const random = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  const grains: Grain[] = [];
  const stepX = 9;
  const stepY = 8;

  for (let y = 34; y <= 126; y += stepY) {
    for (let x = 105; x <= 895; x += stepX) {
      const jitterX = (random() - 0.5) * 9;
      const jitterY = (random() - 0.5) * 8;
      const sizeBias = random();

      grains.push({
        x: x + jitterX,
        y: y + jitterY,
        rx: 0.9 + sizeBias * 2.9,
        ry: 0.7 + random() * 2.2,
        rotation: -38 + random() * 76,
        delay: 180 + random() * 2700,
        duration: 1100 + random() * 1900,
      });
    }
  }

  return grains;
}

const CLAIM_GRAINS = createGrains();

function MaterializingClaim() {
  return (
    <div
      className="claim-stage"
      aria-label="elab your workflow"
      data-animation-version="grain-mask-fixed-v8"
    >
      <svg
        className="claim-svg"
        viewBox="0 0 1000 160"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <mask
            id="claim-grain-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="160"
            style={{ maskType: "alpha" }}
          >
            {CLAIM_GRAINS.map((grain, index) => (
              <g
                key={index}
                transform={`rotate(${grain.rotation.toFixed(2)} ${grain.x.toFixed(2)} ${grain.y.toFixed(2)})`}
              >
                <ellipse
                  className="claim-grain"
                  cx={grain.x}
                  cy={grain.y}
                  rx={grain.rx}
                  ry={grain.ry}
                  fill="white"
                  style={{
                    animationDelay: `${grain.delay.toFixed(0)}ms`,
                    animationDuration: `${grain.duration.toFixed(0)}ms`,
                  }}
                />
              </g>
            ))}
          </mask>
        </defs>

        <text
          className="claim-text claim-fragment-text"
          x="500"
          y="104"
          textAnchor="middle"
          mask="url(#claim-grain-mask)"
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
          0%, 88% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.003);
          }
        }

        @keyframes settleCompleteClaim {
          0%, 74% {
            opacity: 0;
          }
          83% {
            opacity: 0.06;
          }
          93% {
            opacity: 0.42;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes growGrain {
          0% {
            opacity: 0;
            transform: scale(0.03);
          }
          20% {
            opacity: 0.28;
          }
          68% {
            opacity: 0.82;
          }
          100% {
            opacity: 1;
            transform: scale(1);
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

        .claim-grain {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation-name: growGrain;
          animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
          animation-fill-mode: both;
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
          .claim-grain,
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

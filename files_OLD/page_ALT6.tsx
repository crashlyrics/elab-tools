"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

type LandingStage = "intro" | "claim" | "landing";

const CLAIM_DURATION = 7200;

type Grain = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotation: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
  settleScale: number;
};

function createGrains(): Grain[] {
  let seed = 0x53616e64;

  const random = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  const grains: Grain[] = [];
  const stepX = 7;
  const stepY = 5.7;

  for (let y = 29; y <= 131; y += stepY) {
    for (let x = 62; x <= 938; x += stepX) {
      const jitterX = (random() - 0.5) * stepX * 0.94;
      const jitterY = (random() - 0.5) * stepY * 0.94;
      const sizeBias = random() ** 1.9;
      const earlyBias = random() ** 1.7;
      const normalizedX = (x - 62) / (938 - 62);

      grains.push({
        x: x + jitterX,
        y: y + jitterY,
        rx: 0.42 + sizeBias * 0.72,
        ry: 0.34 + random() ** 1.8 * 0.64,
        rotation: -58 + random() * 116,
        delay: 10 + earlyBias * 1050 + normalizedX * 150,
        duration: 3800 + random() * 1150,
        driftX: 8 + random() * 14,
        driftY: -2.4 + random() * 4.8,
        settleScale: 5.2 + random() * 1.8,
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
      data-animation-version="sand-coalescence-no-fade-v11"
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
                  style={
                    {
                      animationDelay: `${grain.delay.toFixed(0)}ms`,
                      animationDuration: `${grain.duration.toFixed(0)}ms`,
                      "--grain-drift-x": `${grain.driftX.toFixed(2)}px`,
                      "--grain-drift-y": `${grain.driftY.toFixed(2)}px`,
                      "--grain-mid-scale": (grain.settleScale * 0.62).toFixed(3),
                      "--grain-settle-scale": grain.settleScale.toFixed(3),
                    } as CSSProperties
                  }
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
          <tspan>elab</tspan>
          <tspan dx="18">your</tspan>
          <tspan dx="18">workflow</tspan>
        </text>

        <text
          className="claim-text claim-reduced-text"
          x="500"
          y="104"
          textAnchor="middle"
        >
          <tspan>elab</tspan>
          <tspan dx="18">your</tspan>
          <tspan dx="18">workflow</tspan>
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

        @keyframes growGrain {
          0% {
            opacity: 0;
            transform: translate(
                calc(-1 * var(--grain-drift-x)),
                var(--grain-drift-y)
              )
              scale(0.02);
          }
          8% {
            opacity: 0.14;
          }
          24% {
            opacity: 0.62;
            transform: translate(
                calc(-0.72 * var(--grain-drift-x)),
                calc(0.72 * var(--grain-drift-y))
              )
              scale(0.34);
          }
          50% {
            opacity: 0.94;
            transform: translate(
                calc(-0.28 * var(--grain-drift-x)),
                calc(0.28 * var(--grain-drift-y))
              )
              scale(0.92);
          }
          68% {
            opacity: 1;
            transform: translate(0, 0) scale(1.15);
          }
          86% {
            opacity: 1;
            transform: translate(0, 0)
              scale(var(--grain-mid-scale));
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(var(--grain-settle-scale));
          }
        }

        .claim-stage {
          display: flex;
          width: min(90vw, 1040px);
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
          letter-spacing: 2.2px;
        }

        .claim-reduced-text {
          display: none;
        }

        .claim-grain {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation-name: growGrain;
          animation-timing-function: cubic-bezier(0.16, 0.68, 0.24, 1);
          animation-fill-mode: both;
        }


        @media (max-width: 720px) {
          .claim-stage {
            width: min(97vw, 1040px);
          }

          .claim-text {
            font-size: 68px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .claim-stage,
          .claim-grain {
            animation: none;
          }

          .claim-fragment-text {
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

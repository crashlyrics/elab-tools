"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LandingStage = "intro" | "claim" | "landing";

const CLAIM_DURATION = 9000;
const MATERIALIZATION_DURATION = 6500;

function MaterializingClaim() {
  return (
    <div
      className="claim-stage"
      aria-label="elab your workflow"
      data-animation-version="granular-noise-mask-v6"
    >
      <svg
        className="claim-svg"
        viewBox="0 0 1000 160"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="claim-grain-fine"
            x="0"
            y="0"
            width="1000"
            height="160"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.095 0.34"
              numOctaves="2"
              seed="37"
              result="fineNoise"
            />
            <feColorMatrix
              in="fineNoise"
              type="luminanceToAlpha"
              result="fineAlpha"
            />
            <feComponentTransfer in="fineAlpha" result="fineThreshold">
              <feFuncA type="linear" slope="22" intercept="-21.4">
                <animate
                  attributeName="intercept"
                  values="-21.4;-18.8;-14.2;-10.7"
                  keyTimes="0;0.22;0.63;1"
                  dur="5.8s"
                  calcMode="spline"
                  keySplines="0.22 0.61 0.36 1;0.22 0.61 0.36 1;0.22 0.61 0.36 1"
                  fill="freeze"
                />
              </feFuncA>
            </feComponentTransfer>
            <feMorphology
              in="fineThreshold"
              operator="dilate"
              radius="0.08"
            >
              <animate
                attributeName="radius"
                values="0.08;0.18;0.34;0.52"
                keyTimes="0;0.28;0.68;1"
                dur="5.8s"
                calcMode="spline"
                keySplines="0.22 0.61 0.36 1;0.22 0.61 0.36 1;0.22 0.61 0.36 1"
                fill="freeze"
              />
            </feMorphology>
          </filter>

          <filter
            id="claim-grain-body"
            x="0"
            y="0"
            width="1000"
            height="160"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.052 0.23"
              numOctaves="3"
              seed="83"
              result="bodyNoise"
            />
            <feColorMatrix
              in="bodyNoise"
              type="luminanceToAlpha"
              result="bodyAlpha"
            />
            <feComponentTransfer in="bodyAlpha" result="bodyThreshold">
              <feFuncA type="linear" slope="17" intercept="-16.6">
                <animate
                  attributeName="intercept"
                  values="-16.6;-14.4;-9.8;-5.2"
                  keyTimes="0;0.2;0.62;1"
                  begin="0.45s"
                  dur="5.9s"
                  calcMode="spline"
                  keySplines="0.22 0.61 0.36 1;0.22 0.61 0.36 1;0.22 0.61 0.36 1"
                  fill="freeze"
                />
              </feFuncA>
            </feComponentTransfer>
            <feMorphology
              in="bodyThreshold"
              operator="dilate"
              radius="0.12"
            >
              <animate
                attributeName="radius"
                values="0.12;0.28;0.62;1.05"
                keyTimes="0;0.25;0.66;1"
                begin="0.45s"
                dur="5.9s"
                calcMode="spline"
                keySplines="0.22 0.61 0.36 1;0.22 0.61 0.36 1;0.22 0.61 0.36 1"
                fill="freeze"
              />
            </feMorphology>
          </filter>

          <mask
            id="claim-grain-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="160"
            style={{ maskType: "alpha" }}
          >
            <rect width="1000" height="160" fill="black" />
            <rect
              className="claim-grain-layer claim-grain-layer-fine"
              width="1000"
              height="160"
              fill="white"
              filter="url(#claim-grain-fine)"
            />
            <rect
              className="claim-grain-layer claim-grain-layer-body"
              width="1000"
              height="160"
              fill="white"
              filter="url(#claim-grain-body)"
            />
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
          0%, 91% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.003);
          }
        }

        @keyframes settleCompleteClaim {
          0%, 67% {
            opacity: 0;
          }
          79% {
            opacity: 0.12;
          }
          91% {
            opacity: 0.48;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes grainLayerArrival {
          from {
            opacity: 0;
          }
          to {
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

        .claim-grain-layer {
          opacity: 0;
          animation: grainLayerArrival 900ms ease-out both;
        }

        .claim-grain-layer-body {
          animation-delay: 350ms;
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
          .claim-grain-layer,
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

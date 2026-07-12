"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type LandingStage = "intro" | "claim" | "landing";

const CLAIM_DURATION = 10200;
const EARLY_ADVANCE_AFTER = 5600;
const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 160;
const CLAIM_COLOR = "44, 62, 74";

type MainParticle = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  radius: number;
  delay: number;
  duration: number;
  alpha: number;
};

type CloudParticle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
};

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createRandom(seedValue: number) {
  let seed = seedValue | 0;

  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function drawClaimText(
  context: CanvasRenderingContext2D,
  alpha = 1,
  fillStyle = `rgba(${CLAIM_COLOR}, ${alpha})`,
) {
  context.save();
  context.fillStyle = fillStyle;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.font = '700 76px "Ubuntu Sans", system-ui, sans-serif';

  const y = 104;
  const gap = 36;
  const w1 = context.measureText("elab").width;
  const w2 = context.measureText("your").width;
  const w3 = context.measureText("workflow").width;
  const totalWidth = w1 + gap + w2 + gap + w3;
  const startX = (VIEWBOX_WIDTH - totalWidth) / 2;

  context.fillText("elab", startX, y);
  context.fillText("your", startX + w1 + gap, y);
  context.fillText("workflow", startX + w1 + gap + w2 + gap, y);
  context.restore();
}

function sampleTextPoints() {
  const offscreen = document.createElement("canvas");
  offscreen.width = VIEWBOX_WIDTH;
  offscreen.height = VIEWBOX_HEIGHT;
  const context = offscreen.getContext("2d");

  if (!context) return [] as { x: number; y: number }[];

  drawClaimText(context, 1, "rgba(0, 0, 0, 1)");

  const { data, width, height } = context.getImageData(
    0,
    0,
    VIEWBOX_WIDTH,
    VIEWBOX_HEIGHT,
  );

  const points: { x: number; y: number }[] = [];
  const step = 4;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const index = (y * width + x) * 4 + 3;
      if (data[index] > 70) {
        points.push({
          x: x + 0.5,
          y: y + 0.5,
        });
      }
    }
  }

  return points;
}

function createMainParticles() {
  const random = createRandom(0x44697468);
  const points = sampleTextPoints();

  return points.map((point, index): MainParticle => {
    const burst = random() < 0.68;
    const delay = burst
      ? random() ** 2.1 * 240
      : 180 + random() ** 1.08 * 3050;

    const distanceX = 24 + random() * 94;
    const distanceY = 10 + random() * 48;
    const side = random() < 0.5 ? -1 : 1;

    return {
      startX:
        point.x + side * distanceX + (random() - 0.5) * 28 + (point.x - 500) * 0.02,
      startY: point.y + (random() - 0.5) * distanceY + (point.y - 80) * 0.06,
      targetX: point.x + (random() - 0.5) * 0.9,
      targetY: point.y + (random() - 0.5) * 0.9,
      radius: 0.75 + random() * 0.55,
      delay,
      duration: 1320 + random() * 620,
      alpha: 0.52 + random() * 0.3,
    };
  });
}

function createCloudParticles() {
  const random = createRandom(0x436c6f75);
  const particles: CloudParticle[] = [];

  for (let i = 0; i < 240; i += 1) {
    const x = 60 + random() * 880;
    const y = 16 + random() * 128;
    const centerBiasX = (500 - x) * 0.06;
    const centerBiasY = (80 - y) * 0.05;

    particles.push({
      x,
      y,
      radius: 0.45 + random() * 0.55,
      alpha: 0.08 + random() * 0.14,
      delay: random() ** 2.2 * 300,
      duration: 3200 + random() * 1800,
      driftX: centerBiasX + (random() - 0.5) * 18,
      driftY: centerBiasY + (random() - 0.5) * 12,
    });
  }

  return particles;
}

function MaterializingClaim() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const mainParticlesRef = useRef<MainParticle[] | null>(null);
  const cloudParticlesRef = useRef<CloudParticle[] | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const animationVersion = useMemo(() => "canvas-dither-cloud-v19", []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = VIEWBOX_WIDTH * dpr;
    canvas.height = VIEWBOX_HEIGHT * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!mainParticlesRef.current) {
      mainParticlesRef.current = createMainParticles();
    }
    if (!cloudParticlesRef.current) {
      cloudParticlesRef.current = createCloudParticles();
    }

    const mainParticles = mainParticlesRef.current;
    const cloudParticles = cloudParticlesRef.current;
    const start = performance.now();

    const render = (now: number) => {
      const elapsed = now - start;
      const textReveal = clamp((elapsed - 3800) / 1500, 0, 1);
      const fadeOut = clamp((elapsed - 9600) / 600, 0, 1);
      const globalAlpha = 1 - easeInOutCubic(fadeOut);

      context.clearRect(0, 0, VIEWBOX_WIDTH, VIEWBOX_HEIGHT);
      context.save();
      context.globalAlpha = globalAlpha;

      for (const particle of cloudParticles) {
        const local = clamp((elapsed - particle.delay) / particle.duration, 0, 1);
        if (local <= 0) continue;

        const move = easeInOutCubic(local);
        const x = particle.x - particle.driftX * (1 - move);
        const y = particle.y - particle.driftY * (1 - move);
        const alphaEnvelope =
          local < 0.18
            ? local / 0.18
            : local < 0.78
              ? 1
              : 1 - (local - 0.78) / 0.22;

        context.fillStyle = `rgba(${CLAIM_COLOR}, ${particle.alpha * alphaEnvelope})`;
        context.beginPath();
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      for (const particle of mainParticles) {
        const local = clamp((elapsed - particle.delay) / particle.duration, 0, 1);
        if (local <= 0) continue;

        const move = easeOutCubic(local);
        const x = particle.startX + (particle.targetX - particle.startX) * move;
        const y = particle.startY + (particle.targetY - particle.startY) * move;
        const alpha = particle.alpha * (0.24 + 0.76 * local);
        const radius = particle.radius * (0.82 + 0.18 * local);

        context.fillStyle = `rgba(${CLAIM_COLOR}, ${alpha})`;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      const solidAlpha = Math.pow(textReveal, 1.8) * 0.97;
      if (solidAlpha > 0) {
        drawClaimText(context, solidAlpha);
      }

      context.restore();

      if (elapsed < CLAIM_DURATION + 40) {
        frameRef.current = window.requestAnimationFrame(render);
      }
    };

    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [reducedMotion]);

  return (
    <div
      className="claim-stage"
      aria-label="elab your workflow"
      data-animation-version={animationVersion}
    >
      {reducedMotion ? (
        <div className="claim-reduced-text">elab your workflow</div>
      ) : (
        <canvas
          ref={canvasRef}
          className="claim-canvas"
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
          aria-hidden="true"
        />
      )}
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

        .claim-stage {
          display: flex;
          width: min(90vw, 1040px);
          align-items: center;
          justify-content: center;
          color: #2c3e4a;
          animation: claimStage ${CLAIM_DURATION}ms ease-in-out both;
        }

        .claim-canvas {
          display: block;
          width: 100%;
          height: auto;
          max-width: 1000px;
        }

        .claim-reduced-text {
          color: #2c3e4a;
          font-size: 76px;
          font-weight: 700;
          letter-spacing: 2.2px;
          text-align: center;
        }

        @media (max-width: 720px) {
          .claim-stage {
            width: min(97vw, 1040px);
          }

          .claim-reduced-text {
            font-size: 68px;
          }
        }
      `}</style>
    </div>
  );
}

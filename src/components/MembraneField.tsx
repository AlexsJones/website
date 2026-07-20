"use client";
import { useEffect, useRef } from "react";

/**
 * Membrane figure for the research section: a semi-permeable bilayer ribbon
 * with gated crossings, a faint connective mesh behind it, and signal pulses
 * that cross the membrane only at the gates. Monochrome ink on cream.
 *
 * Motion:
 *  - scroll progress (--mp, 0..1) drives layer parallax + mesh draw-in
 *  - signal pulses are ambient (SMIL animateMotion), hidden under
 *    prefers-reduced-motion via .membrane-pulse
 */

const INK = "#141414";

// Deterministic PRNG so server and client render identical geometry.
function lcg(seed: number) {
  let s = seed;
  return () => (s = (s * 48271) % 2147483647) / 2147483647;
}

const W = 1440;
const H = 640;

// ── background mesh ──────────────────────────────────────────
const rand = lcg(20260720);
const NODES: { x: number; y: number }[] = Array.from({ length: 26 }, () => ({
  x: Math.round(rand() * W),
  y: Math.round(rand() * H),
}));

const EDGES: [number, number][] = (() => {
  const edges = new Set<string>();
  NODES.forEach((n, i) => {
    const near = NODES.map((m, j) => ({
      j,
      d: (n.x - m.x) ** 2 + (n.y - m.y) ** 2,
    }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    near.forEach((e) => edges.add([Math.min(i, e.j), Math.max(i, e.j)].join("-")));
  });
  return [...edges].map((k) => k.split("-").map(Number) as [number, number]);
})();

// ── bilayer ribbon ───────────────────────────────────────────
const midY = (x: number) => 330 + 30 * Math.sin(x / 170);
const GATES = [430, 980]; // x positions where the membrane opens
const GATE_HALF = 30;

const HEADS: { x: number; y: number }[] = (() => {
  const heads: { x: number; y: number }[] = [];
  for (let x = -10; x <= W + 10; x += 26) {
    if (GATES.some((g) => Math.abs(x - g) < GATE_HALF)) continue;
    const y = midY(x);
    heads.push({ x, y: y - 11 }, { x, y: y + 11 });
  }
  return heads;
})();

// ── signal paths (cross only at the gates) ───────────────────
const g1 = { x: GATES[0], y: midY(GATES[0]) };
const g2 = { x: GATES[1], y: midY(GATES[1]) };
const PATHS = [
  `M 120 120 C 240 150, 360 ${g1.y - 140} ${g1.x} ${g1.y} S 700 560, 860 540`,
  `M 150 90 C 400 60, ${g2.x - 260} ${g2.y - 180} ${g2.x} ${g2.y} S 1280 540, 1330 560`,
  `M 1330 130 C 1150 150, ${g2.x + 160} ${g2.y - 120} ${g2.x} ${g2.y} S 520 540, 300 520`,
];

export default function MembraneField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--mp", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none select-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* far layer: connective mesh, draws in on scroll, slow drift */}
        <g
          className="membrane-motion"
          style={{
            transform: "translateY(calc(var(--mp, 0) * 26px))",
          }}
        >
          {EDGES.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke={INK}
              strokeWidth="1"
              opacity="0.09"
              pathLength={1}
              className="membrane-draw"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: "calc(1 - min(var(--mp, 0) * 2.2, 1))",
              }}
            />
          ))}
          {NODES.map((n, i) => (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r="2.5"
              fill={INK}
              opacity="0.14"
            />
          ))}
        </g>

        {/* signal layer: ghost routes + pulses, counter-drift */}
        <g
          className="membrane-motion"
          style={{
            transform: "translateY(calc(var(--mp, 0) * -18px))",
          }}
        >
          {PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={INK}
              strokeWidth="1"
              strokeDasharray="2 7"
              opacity="0.15"
            />
          ))}
          {/* agent clusters at the route endpoints */}
          {[
            { x: 120, y: 120 },
            { x: 150, y: 90 },
            { x: 1330, y: 130 },
            { x: 860, y: 540 },
            { x: 1330, y: 560 },
            { x: 300, y: 520 },
          ].map((c, i) => (
            <rect
              key={i}
              x={c.x - 5}
              y={c.y - 5}
              width="10"
              height="10"
              fill="none"
              stroke={INK}
              strokeWidth="1.5"
              opacity="0.3"
            />
          ))}
          {PATHS.map((d, i) => (
            <circle
              key={`p${i}`}
              r="3.5"
              fill={INK}
              opacity="0.55"
              className="membrane-pulse"
            >
              <animateMotion
                dur={`${9 + i * 3}s`}
                repeatCount="indefinite"
                path={d}
                begin={`${i * 2.4}s`}
              />
            </circle>
          ))}
        </g>

        {/* near layer: the bilayer membrane, slides laterally on scroll */}
        <g
          className="membrane-motion"
          style={{
            transform: "translateX(calc((var(--mp, 0) - 0.5) * 70px))",
          }}
        >
          {HEADS.map((h, i) => (
            <circle
              key={i}
              cx={h.x}
              cy={h.y}
              r="4.5"
              fill="none"
              stroke={INK}
              strokeWidth="1.3"
              opacity="0.22"
            />
          ))}
          {/* gates: open channels through the bilayer */}
          {GATES.map((gx) => {
            const gy = midY(gx);
            return (
              <g key={gx} opacity="0.45">
                <rect
                  x={gx - 13}
                  y={gy - 20}
                  width="26"
                  height="40"
                  fill="none"
                  stroke={INK}
                  strokeWidth="1.5"
                />
                <line
                  x1={gx - 13}
                  y1={gy}
                  x2={gx - 4}
                  y2={gy}
                  stroke={INK}
                  strokeWidth="1.5"
                />
                <line
                  x1={gx + 4}
                  y1={gy}
                  x2={gx + 13}
                  y2={gy}
                  stroke={INK}
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </g>

        {/* figure caption — this is a diagram, not decoration */}
        <text
          x="24"
          y={H - 22}
          fontFamily="monospace"
          fontSize="11"
          letterSpacing="2"
          fill={INK}
          opacity="0.4"
        >
          FIG. M1 / SEMI-PERMEABLE BOUNDARY — SIGNALS CROSS AT GATES
        </text>
      </svg>
    </div>
  );
}

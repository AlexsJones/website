"use client";
import { useEffect, useRef, useState } from "react";
import { Project, LANGUAGE_COLORS } from "../data/projects";
import Reveal from "./Reveal";

function formatStars(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

/** Counts up to `value` when it first scrolls into view. */
function StarCount({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{formatStars(display)}</span>;
}

function Card({
  project,
  index,
  large = false,
}: {
  project: Project;
  index: number;
  large?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <a
      ref={ref}
      href={`https://github.com/${project.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      className={`spotlight-card group relative flex h-full flex-col justify-between border border-surface-lighter bg-surface-light/60 rounded-[2px] transition-colors duration-300 hover:border-ember ${
        large ? "p-7 sm:p-9 min-h-[280px]" : "p-6 min-h-[220px]"
      }`}
    >
      {/* corner ticks — ignite on hover */}
      <span className="absolute top-1.5 left-2 font-mono text-[10px] text-ember opacity-0 group-hover:opacity-70 transition-opacity">
        +
      </span>
      <span className="absolute top-1.5 right-2 font-mono text-[10px] text-ember opacity-0 group-hover:opacity-70 transition-opacity">
        +
      </span>
      <span className="absolute bottom-1.5 left-2 font-mono text-[10px] text-ember opacity-0 group-hover:opacity-70 transition-opacity">
        +
      </span>
      <span className="absolute bottom-1.5 right-2 font-mono text-[10px] text-ember opacity-0 group-hover:opacity-70 transition-opacity">
        +
      </span>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-ash group-hover:text-ember transition-colors">
            {String(index + 1).padStart(2, "0")} /
          </span>
          <div className="flex items-center gap-2">
            {project.role && (
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white bg-ember px-1.5 py-0.5 rounded-[2px]">
                {project.role}
              </span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
              {project.repo.split("/")[0]}
            </span>
          </div>
        </div>

        <h3
          className={`font-display text-bone group-hover:text-ember transition-colors ${
            large ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
          } mb-3`}
        >
          {project.name}
        </h3>
        <p
          className={`text-bone-dark/80 leading-relaxed ${
            large ? "text-sm max-w-md" : "text-xs"
          }`}
        >
          {project.description}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4 font-mono text-[11px] text-ash">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                backgroundColor: LANGUAGE_COLORS[project.language] ?? "#8a8c82",
              }}
            />
            {project.language}
          </span>
          <span className="flex items-center gap-1 text-bone">
            <svg
              className="w-3 h-3 text-ember"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
            </svg>
            <StarCount value={project.stars} />
          </span>
        </div>
        <span className="row-arrow font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
          open &#8599;
        </span>
      </div>
    </a>
  );
}

export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  // An odd number of large featured cards leaves a lone card in the 2-col
  // grid with an awkward empty space beside it. When that happens, pull two
  // smaller projects up to sit stacked next to it (a tall-left / two-short
  // bento), so the row reads as intentional instead of half-empty.
  const hasGap = featured.length % 2 === 1;
  const leadFeatured = hasGap ? featured.slice(0, -1) : featured;
  const trailingFeatured = hasGap ? featured[featured.length - 1] : null;
  const fillers = hasGap ? rest.slice(0, 2) : [];
  const remaining = hasGap ? rest.slice(2) : rest;

  // Pick a column count that divides the remaining cards evenly so the last
  // row never leaves its own gap.
  const remainingCols =
    remaining.length === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : remaining.length === 2
        ? "sm:grid-cols-2"
        : remaining.length === 1
          ? "grid-cols-1"
          : "sm:grid-cols-2 lg:grid-cols-3";

  let n = 0; // running card number across every section

  return (
    <div className="space-y-4">
      {leadFeatured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leadFeatured.map((p) => {
            const i = n++;
            return (
              <Reveal key={p.name} delay={(i % 2) * 90}>
                <Card project={p} index={i} large />
              </Reveal>
            );
          })}
        </div>
      )}

      {trailingFeatured && (
        <div className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-4">
          <Reveal key={trailingFeatured.name} className="md:row-span-2 h-full">
            <Card project={trailingFeatured} index={n++} large />
          </Reveal>
          {fillers.map((p) => {
            const i = n++;
            return (
              <Reveal key={p.name} delay={90} className="h-full">
                <Card project={p} index={i} />
              </Reveal>
            );
          })}
        </div>
      )}

      {remaining.length > 0 && (
        <div className={`grid grid-cols-1 ${remainingCols} gap-4`}>
          {remaining.map((p) => {
            const i = n++;
            return (
              <Reveal key={p.name} delay={(i % 3) * 90}>
                <Card project={p} index={i} />
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}

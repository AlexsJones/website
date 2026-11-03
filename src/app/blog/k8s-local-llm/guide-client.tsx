"use client";
// Colours come from the v2 tokens (globals.css), so day and night both work.

import { useEffect, useRef, useState } from "react";

export const HARDWARE = [
  { id: "cpu", label: "CPU only", status: "tested" },
  { id: "intel", label: "Intel Arc", status: "tested" },
  { id: "nvidia", label: "NVIDIA", status: "tested" },
  { id: "amd", label: "AMD", status: "tested" },
] as const;

type HwId = (typeof HARDWARE)[number]["id"];
const KEY = "k8s-local-llm-hw";
const isHw = (v: string | null | undefined): v is HwId =>
  !!v && HARDWARE.some((h) => h.id === v);

/**
 * Hardware selector, styled like the section switcher on /blog (border-y rule,
 * display-face labels, mono counters). Sets data-active on #hw-guide; the
 * .hw-guide rules in globals.css hide the other hardware's blocks.
 */
export function HardwarePicker() {
  const [hw, setHw] = useState<HwId>("cpu");

  useEffect(() => {
    const fromHash = location.hash.match(/hw=(\w+)/)?.[1];
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    setHw(isHw(fromHash) ? fromHash : isHw(stored) ? stored : "cpu");
  }, []);

  useEffect(() => {
    document.getElementById("hw-guide")?.setAttribute("data-active", hw);
    try {
      localStorage.setItem(KEY, hw);
    } catch {}
  }, [hw]);

  return (
    <div id="your-hardware" className="my-12 scroll-mt-32 lg:scroll-mt-24">
      <div className="label mb-3">
        Your hardware &mdash; every hardware-specific step follows this choice
      </div>
      <div
        role="tablist"
        aria-label="Your hardware"
        className="grid grid-cols-2 sm:grid-cols-4 border border-ink"
      >
        {HARDWARE.map((h, i) => {
          const active = h.id === hw;
          const borders = [
            i % 2 === 0 ? "border-r" : "sm:border-r",
            i < 2 ? "border-b sm:border-b-0" : "",
            i === 3 ? "sm:border-r-0" : "",
          ].join(" ");
          return (
            <button
              key={h.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setHw(h.id);
                history.replaceState(null, "", `#hw=${h.id}`);
              }}
              className={`group flex flex-col items-start gap-2 border-ink px-4 py-4 text-left transition-colors ${borders} ${
                active ? "bg-ink text-surface" : "text-bone hover:bg-surface-light"
              }`}
            >
              <span className="font-display cond text-xl sm:text-2xl leading-none">
                {h.label}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.15em] ${
                  active ? "text-surface/70" : "text-ash"
                }`}
              >
                {h.status === "tested" ? "\u25CF tested" : "\u00A0"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Code block with a copy button. "output" blocks use the light stock, commands the ink plate. */
export function CopyPre({
  children,
  variant = "command",
}: {
  children?: React.ReactNode;
  variant?: "command" | "output";
}) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const ink = variant === "command";
  return (
    <div className="relative my-6">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(
              (ref.current?.innerText ?? "").replace(/\n$/, ""),
            );
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {}
        }}
        aria-label="Copy to clipboard"
        className={`absolute right-2 top-2 rounded-[2px] border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
          ink
            ? "border-surface/40 bg-ink text-surface/75 hover:bg-surface hover:text-ink"
            : "border-ink/40 bg-cream text-ash hover:bg-ink hover:text-surface"
        }`}
      >
        {copied ? "copied" : "copy"}
      </button>
      <pre
        ref={ref}
        className={`overflow-x-auto border p-5 pr-20 font-mono text-[12px] leading-relaxed ${
          ink
            ? "border-ink bg-ink text-surface shadow-[6px_6px_0_var(--shadow)]"
            : "border-ink/40 bg-cream text-bone-dark"
        }`}
      >
        {children}
      </pre>
    </div>
  );
}

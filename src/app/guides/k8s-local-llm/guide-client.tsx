"use client";

import { useEffect, useRef, useState } from "react";

export const HARDWARE = [
  { id: "cpu", label: "CPU only", status: "tested" },
  { id: "intel", label: "Intel Arc", status: "tested" },
  { id: "nvidia", label: "NVIDIA", status: "best effort" },
  { id: "amd", label: "AMD", status: "tested" },
] as const;

type HwId = (typeof HARDWARE)[number]["id"];
const KEY = "k8s-local-llm-hw";
const isHw = (v: string | null | undefined): v is HwId =>
  !!v && HARDWARE.some((h) => h.id === v);

/** Hardware tab picker. Sets data-active on #hw-guide; CSS hides the other tabs. */
export function HardwarePicker() {
  const [hw, setHw] = useState<HwId>("cpu");

  useEffect(() => {
    const fromHash = location.hash.match(/hw=(\w+)/)?.[1];
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    const initial = isHw(fromHash) ? fromHash : isHw(stored) ? stored : "cpu";
    setHw(initial);
  }, []);

  useEffect(() => {
    document.getElementById("hw-guide")?.setAttribute("data-active", hw);
    try {
      localStorage.setItem(KEY, hw);
    } catch {}
  }, [hw]);

  return (
    <div
      className="my-10 border border-bone rounded-[2px] p-4 bg-surface-light"
      role="tablist"
      aria-label="Your hardware"
    >
      <div className="label mb-3">
        Your hardware · every hardware-specific step follows this choice
      </div>
      <div className="flex flex-wrap gap-2">
        {HARDWARE.map((h) => {
          const active = h.id === hw;
          return (
            <button
              key={h.id}
              role="tab"
              aria-selected={active}
              onClick={() => {
                setHw(h.id);
                history.replaceState(null, "", `#hw=${h.id}`);
              }}
              className={`font-mono text-xs px-3 py-2 rounded-[2px] border border-bone transition-colors ${
                active ? "bg-bone text-cream" : "text-bone hover:bg-bone/10"
              }`}
            >
              {h.label}{" "}
              <span
                className={`ml-1 text-[10px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-[2px] ${
                  h.status === "tested"
                    ? active
                      ? "bg-cream text-bone"
                      : "bg-bone text-cream"
                    : "border border-dashed " +
                      (active ? "border-cream" : "border-bone")
                }`}
              >
                {h.status}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** <pre> with a copy button. */
export function CopyPre({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative my-6 group">
      <button
        type="button"
        onClick={async () => {
          const text = ref.current?.innerText ?? "";
          try {
            await navigator.clipboard.writeText(text.replace(/\n$/, ""));
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {}
        }}
        className="absolute right-2 top-2 font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-[2px] border border-cream/40 text-cream/80 bg-ink hover:bg-cream hover:text-ink transition-colors"
        aria-label="Copy to clipboard"
      >
        {copied ? "copied" : "copy"}
      </button>
      <pre
        ref={ref}
        className="overflow-x-auto rounded-[2px] border border-bone bg-ink p-5 pr-16 text-[12px] leading-relaxed text-cream/90 font-mono"
      >
        {children}
      </pre>
    </div>
  );
}

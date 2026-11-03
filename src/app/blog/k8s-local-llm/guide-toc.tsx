"use client";
// Section navigator for the guide. Entries come from the README headings
// (extracted on the server), so it follows the guide when the README changes.
// Colours are the v2 tokens, so day and night both work.

import { useCallback, useEffect, useState } from "react";
import { HARDWARE } from "./guide-client";

export type TocItem = { id: string; text: string; depth: 2 | 3; n?: string };

/** Header is fixed at the top: frame (14px) + 46px. Headings count as "current" once they pass this line. */
const LINE = 140;

function useActive(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => !!e && e.offsetParent !== null);
    if (!els.length) return;
    let current = els[0].id;
    for (const el of els) {
      if (el.getBoundingClientRect().top - LINE <= 0) current = el.id;
      else break;
    }
    const doc = document.documentElement;
    const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 4;
    if (atBottom) current = els[els.length - 1].id;
    setActive(current);

    const body = document.getElementById("guide-body");
    if (body) {
      const r = body.getBoundingClientRect();
      const line = window.innerHeight * 0.5;
      const p = atBottom ? 1 : (line - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
    }
  }, [items]);

  useEffect(() => {
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    // Headings crossing the line wake the observer; scroll/resize cover long sections
    // and jumps that skip over headings without changing their intersection state.
    const io = new IntersectionObserver(schedule, {
      rootMargin: `-${LINE}px 0px -40% 0px`,
      threshold: [0, 1],
    });
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    // Switching hardware tabs changes the page height.
    const guide = document.getElementById("hw-guide");
    const mo = guide ? new MutationObserver(schedule) : null;
    if (guide && mo) mo.observe(guide, { attributes: true, attributeFilter: ["data-active"] });
    // Lazy screenshots loading in shift the headings without any scroll event.
    const body = document.getElementById("guide-body");
    const ro = body ? new ResizeObserver(schedule) : null;
    if (body && ro) ro.observe(body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      ro?.disconnect();
      cancelAnimationFrame(raf);
      io.disconnect();
      mo?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items, update]);

  return { active, progress };
}

/*
 * Screenshots are lazy-loaded without fixed sizes, so the page can grow while a
 * smooth scroll is under way and the target drifts. After a jump, keep the target
 * lined up for a couple of seconds (once the scroll has finished, and whenever the
 * guide resizes), unless the reader starts scrolling themselves.
 */
let pending: { el: HTMLElement; until: number; moving: boolean } | null = null;
let wired = false;

function realign() {
  if (!pending || pending.moving) return;
  if (performance.now() > pending.until) {
    pending = null;
    return;
  }
  const want = parseFloat(getComputedStyle(pending.el).scrollMarginTop) || 0;
  const d = pending.el.getBoundingClientRect().top - want;
  if (Math.abs(d) > 4) window.scrollBy({ top: d, behavior: "instant" });
}

function wire() {
  if (wired) return;
  wired = true;
  const settle = () => {
    if (pending) pending.moving = false;
    realign();
  };
  window.addEventListener("scrollend", settle);
  const cancel = () => (pending = null);
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("pointerdown", cancel, { passive: true });
  window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) cancel();
  });
  const body = document.getElementById("guide-body");
  if (body) new ResizeObserver(() => realign()).observe(body);
}

function jump(e: React.MouseEvent<HTMLAnchorElement>, id: string, after?: () => void) {
  const el = document.getElementById(id);
  if (!el || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  wire();
  after?.();
  // Start loading the screenshots above the target now rather than as we fly past.
  document.querySelectorAll<HTMLImageElement>("#guide-body img[loading=lazy]").forEach((img) => {
    if (img.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) img.loading = "eager";
  });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  pending = { el, until: performance.now() + 3000, moving: !reduce };
  el.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
  // Browsers without scrollend: treat the smooth scroll as done after a beat.
  if (!("onscrollend" in window))
    setTimeout(() => {
      if (pending) pending.moving = false;
      realign();
    }, 900);
  history.replaceState(history.state, "", `#${id}`);
  // Move focus to the heading so keyboard users carry on reading from there.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

function useHardware() {
  const [hw, setHw] = useState("cpu");
  useEffect(() => {
    const guide = document.getElementById("hw-guide");
    if (!guide) return;
    const read = () => setHw(guide.getAttribute("data-active") ?? "cpu");
    read();
    const mo = new MutationObserver(read);
    mo.observe(guide, { attributes: true, attributeFilter: ["data-active"] });
    return () => mo.disconnect();
  }, []);
  return HARDWARE.find((h) => h.id === hw)?.label ?? "CPU only";
}

function Entries({
  items,
  active,
  onJump,
  rail,
}: {
  items: TocItem[];
  active: string;
  onJump?: () => void;
  rail?: boolean;
}) {
  return (
    <ol className="m-0 list-none p-0">
      {items.map((i) => {
        const on = i.id === active;
        return (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              onClick={(e) => jump(e, i.id, onJump)}
              aria-current={on ? "location" : undefined}
              className={`toc-link group relative flex gap-3 font-mono uppercase leading-snug transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] ${
                i.depth === 3
                  ? "py-1 pl-7 text-[10px] tracking-[0.1em]"
                  : "py-1.5 text-[10.5px] tracking-[0.12em]"
              } ${on ? "text-bone" : "text-ash hover:text-bone"}`}
            >
              {rail && (
                <span
                  aria-hidden
                  className={`absolute top-1/2 -translate-y-1/2 transition-all ${
                    i.depth === 3 ? "-left-[19px] h-[5px] w-[5px]" : "-left-[20px] h-[7px] w-[7px]"
                  } ${on ? "bg-ink" : "bg-transparent"}`}
                />
              )}
              {i.depth === 2 ? (
                <span className={`tabular-nums ${on ? "" : "opacity-60"}`}>
                  {i.n}
                </span>
              ) : (
                <span aria-hidden className="opacity-60">
                  &ndash;
                </span>
              )}
              <span className={on ? "underline decoration-1 underline-offset-4" : ""}>
                {i.text}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Wide screens: sticky rail in the left gutter. */
export function GuideTocRail({ items }: { items: TocItem[] }) {
  const { active, progress } = useActive(items);
  const hw = useHardware();
  return (
    <nav aria-label="Guide contents" className="font-mono">
      <div className="label mb-4 flex items-baseline justify-between border-b border-ink pb-2">
        <span>Contents</span>
        <span className="tabular-nums" aria-hidden>
          {String(Math.round(progress * 100)).padStart(2, "0")}%
        </span>
      </div>
      <div className="relative pl-5">
        <span aria-hidden className="absolute left-[3px] top-0 bottom-0 w-px bg-ink/25" />
        <span
          aria-hidden
          className="absolute left-[3px] top-0 w-px bg-ink transition-[height] duration-150"
          style={{ height: `${progress * 100}%` }}
        />
        <Entries items={items} active={active} rail />
      </div>
      <div className="mt-5 border-t border-ink/40 pt-3 space-y-1.5 text-[10px] uppercase tracking-[0.12em] text-ash">
        <div>
          Hardware &middot;{" "}
          <a
            href="#your-hardware"
            onClick={(e) => jump(e, "your-hardware")}
            className="text-bone underline underline-offset-4 decoration-1 hover:no-underline"
          >
            {hw}
          </a>
        </div>
        <div>
          <a
            href="#overview"
            onClick={(e) => jump(e, "overview")}
            className="hover:text-bone"
          >
            &uarr; Back to top
          </a>
        </div>
      </div>
    </nav>
  );
}

/** Narrow screens: a slim bar that sticks under the site header and opens the contents. */
export function GuideTocBar({ items }: { items: TocItem[] }) {
  const { active, progress } = useActive(items);
  const [open, setOpen] = useState(false);
  const current = items.find((i) => i.id === active) ?? items[0];
  const parent =
    current?.depth === 3
      ? [...items.slice(0, items.indexOf(current))].reverse().find((i) => i.depth === 2)
      : current;
  const total = items.filter((i) => i.depth === 2).length - 1;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      aria-label="Guide contents"
      className="sticky z-40 -mx-5 sm:-mx-6 mb-10 border-y border-ink bg-surface font-mono lg:hidden"
      style={{ top: "calc(var(--frame) + 46px)" }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="guide-toc-panel"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-5 sm:px-6 py-2.5 text-left text-[10px] uppercase tracking-[0.14em] text-bone focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-[var(--ink)]"
      >
        <span className="shrink-0 text-ash">Contents</span>
        <span className="shrink-0 tabular-nums text-ash">
          {parent?.n ?? "00"}/{String(total).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1 truncate">{current?.text}</span>
        <span aria-hidden className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>
          &#9662;
        </span>
      </button>
      <span
        aria-hidden
        className="absolute bottom-[-1px] left-0 h-[2px] bg-ink transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
      {open && (
        <div
          id="guide-toc-panel"
          className="absolute left-0 right-0 top-full max-h-[60vh] overflow-y-auto border-y border-ink bg-cream px-5 sm:px-6 py-3"
        >
          <Entries items={items} active={active} onJump={() => setOpen(false)} />
        </div>
      )}
    </nav>
  );
}

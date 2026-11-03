"use client";
/*
 * "Send a signal": the contact form from the v2 home page (public/v2/index.html, #tx),
 * as a modal any page can open without leaving. It posts to the same Netlify form
 * ("signal", registered by public/__forms.html), with the same fields and honeypot.
 *
 * Mount it once on a page. Inside `scope`, any link to the home contact section
 * (/#contact or axjns.dev/#contact) opens the modal instead of navigating, so links
 * written in synced markdown keep working without edits. A plain click only: modifier
 * and middle clicks still open the home page as normal. Visiting the page with
 * #contact in the URL opens it too.
 */
import { useCallback, useEffect, useRef, useState } from "react";

type State = "ready" | "sending" | "sent" | "failed";
const MORSE: Record<string, string> = { A: ".-", J: ".---" };
const HOSTS = new Set(["axjns.dev", "www.axjns.dev"]);

function isContactLink(a: HTMLAnchorElement): boolean {
  try {
    const u = new URL(a.href, location.href);
    return (
      u.hash === "#contact" &&
      u.pathname === "/" &&
      (u.host === location.host || HOSTS.has(u.hostname))
    );
  } catch {
    return false;
  }
}

export default function ContactModal({ scope = "body" }: { scope?: string }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [state, setState] = useState<State>("ready");
  const [code, setCode] = useState("");
  const [lamp, setLamp] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const busy = useRef(false);

  const openModal = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setState("ready");
    setCode("");
    setOpen(true);
    requestAnimationFrame(() => {
      setShown(true);
      formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus();
    });
  }, []);

  const closeModal = useCallback(() => {
    setShown(false);
    setTimeout(() => setOpen(false), 250);
    if (location.hash === "#contact")
      history.replaceState(null, "", location.pathname + location.search);
    lastFocus.current?.focus?.();
  }, []);

  // Intercept contact links inside the scope.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !a.closest(scope) || !isContactLink(a)) return;
      e.preventDefault();
      openModal();
    };
    document.addEventListener("click", onClick);
    if (location.hash === "#contact") openModal();
    return () => document.removeEventListener("click", onClick);
  }, [scope, openModal]);

  // Escape closes, Tab stays inside, the page behind doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key !== "Tab" || !formRef.current) return;
      const f = [...formRef.current.querySelectorAll<HTMLElement>("input:not([tabindex='-1']),textarea,button")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, closeModal]);

  // A successful post keys AJ as the acknowledgement, as on the home page.
  async function sendMorse(text: string) {
    let ac: AudioContext | null = null;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ac = new AC();
      await ac.resume();
    } catch {
      ac = null;
    }
    const unit = 90;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const beep = async (ms: number) => {
      setLamp(true);
      if (ac) {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = "sine"; o.frequency.value = 620; g.gain.value = 0.05;
        o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + ms / 1000);
      }
      await wait(ms);
      setLamp(false);
    };
    for (const ch of text) {
      for (const s of MORSE[ch]) {
        await beep(s === "." ? unit : unit * 3);
        setCode((c) => c + s);
        await wait(unit);
      }
      setCode((c) => c + " ");
      await wait(unit * 2);
    }
    ac?.close().catch(() => {});
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (busy.current) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    busy.current = true;
    setState("sending");
    setCode("");
    try {
      const body = new URLSearchParams(
        [...new FormData(form)].map(([k, v]) => [k, String(v)] as [string, string]),
      ).toString();
      const r = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!r.ok) throw new Error("status " + r.status);
      setState("sent");
      await sendMorse("AJ");
      setCode((c) => c + "· received, I will reply by email");
      form.reset();
      setTimeout(closeModal, 2400);
    } catch {
      setState("failed");
      setCode("could not send · email alexsimonjones@gmail.com instead");
    }
    busy.current = false;
  }

  if (!open) return null;
  return (
    <div
      className={`sig${shown ? " on" : ""}${state === "sent" ? " sent" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sigTitle"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <form ref={formRef} className="sig-obj" name="signal" method="POST" action="/__forms.html" noValidate onSubmit={onSubmit}>
        <input type="hidden" name="form-name" value="signal" />
        <p className="sig-hp">
          <label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
        </p>
        <div className="sig-txt">
          <div className="sig-k"><span>outgoing · DE you · TO AXJNS</span><span>{state}</span></div>
          <h3 id="sigTitle">Send a signal</h3>
          <label><span>call sign</span><input name="name" type="text" required autoComplete="name" placeholder="your name" /></label>
          <label><span>reply to</span><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
          <label><span>message</span><textarea name="message" rows={5} required placeholder="what are you working on?" /></label>
          <div className="sig-links">
            <button type="submit" disabled={state === "sending"}><span className={`sig-lamp${lamp ? " on" : ""}`} />key it</button>
            <span className={`sig-code${state === "failed" ? " err" : ""}`} aria-live="polite">{code}</span>
          </div>
        </div>
        <button type="button" className="sig-x" aria-label="Close" onClick={closeModal}>×</button>
      </form>
    </div>
  );
}

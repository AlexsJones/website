"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { THEME_KEY } from "../lib/theme";

// Same cells as the v2 header in public/v2: logo, section links, night watch
// toggle, and the "get in touch" cell. Home-page sections are plain anchors
// because / is the static v2 page, not a Next route.
const LINKS: { href: string; label: string; route?: boolean }[] = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#findings", label: "Findings" },
  { href: "/#talks", label: "Talks" },
  { href: "/#writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [night, setNight] = useState(false);

  useEffect(() => {
    setNight(document.documentElement.classList.contains("night"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("night");
    document.documentElement.classList.toggle("night", next);
    setNight(next);
    try {
      localStorage.setItem(THEME_KEY, next ? "1" : "0");
    } catch {}
  };

  return (
    <header className="v2-header">
      {/* Plain <a>, not <Link>: "/" is rewritten to the static v2 page, which
          client-side routing would bypass and render the old app home. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="logo" href="/">
        axjns.dev
      </a>
      <nav aria-label="Main">
        {LINKS.map((l) =>
          l.route ? (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname.startsWith(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ) : (
            <a
              key={l.href}
              href={l.href}
              aria-current={
                l.href === "/#writing" && pathname.startsWith("/blog") ? "page" : undefined
              }
            >
              {l.label}
            </a>
          )
        )}
      </nav>
      <div>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={night}
          aria-label="Toggle night watch"
        >
          &#9680; Night
        </button>
      </div>
      <div className="hire">
        <span>Building open source from the U.K.</span>
        <span>
          Open to interesting problems &rarr;{" "}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/#contact">Get in touch</a>
        </span>
      </div>
    </header>
  );
}

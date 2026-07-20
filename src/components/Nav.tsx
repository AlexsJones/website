"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/#projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Writing" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-7 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-surface-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-ember font-mono font-bold text-sm">&#9656;</span>
            <span className="font-display text-xl text-bone group-hover:text-ember transition-colors">
              axjns.dev
            </span>
            <span className="blink inline-block w-[7px] h-[15px] bg-ember" />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => {
              const active =
                l.href !== "/#projects" && pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`font-display text-base transition-colors ${
                    active ? "text-ember" : "text-bone-dark hover:text-ember"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href="https://github.com/AlexsJones"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.12em] font-medium px-3 py-1.5 border-2 border-bone text-bone hover:bg-bone hover:text-surface transition-colors rounded-[2px]"
            >
              GitHub
            </a>
          </div>

          <button
            className="md:hidden text-bone font-mono text-sm uppercase tracking-widest"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "[ close ]" : "[ menu ]"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-surface-lighter bg-surface px-4 py-4 flex flex-col gap-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-lg text-bone-dark hover:text-ember transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/AlexsJones"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash"
          >
            GitHub &#8599;
          </a>
        </div>
      )}
    </nav>
  );
}

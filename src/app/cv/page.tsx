import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";
import { EXPERIENCE, SKILLS } from "./data";

export const metadata = {
  title: "CV — axjns.dev",
  description: "Curriculum vitae of Alex Jones.",
};

export default function CVPage() {
  return (
    <div className="grid-lines min-h-screen">
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
        {/* dossier punch holes down the left margin */}
        <div className="punch-rail -left-10 hidden lg:block" aria-hidden />
        <PageHeader
          index="cv"
          label="service record"
          title="Curriculum"
          accent="vitae."
        />

        {/* personnel file plate */}
        <Reveal>
          <div className="inline-block border border-surface-lighter border-b-0 bg-surface-light/60 px-4 pt-2 pb-3 -mb-px rounded-t-[3px] font-mono text-[10px] uppercase tracking-[0.15em] text-bone-dark">
            Personnel file N&ordm; AJ-0001
          </div>
          <div className="relative border border-surface-lighter bg-surface-light/40 rounded-[2px] rounded-tl-none p-6 mb-4">
            <span className="stamp right-10 top-8 hidden md:block">
              Active service
            </span>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* photo frame with corner mounts */}
              <div className="shrink-0">
                <div className="relative w-28 h-28 border border-surface-lighter bg-surface p-1.5">
                  <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-bone" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-bone" />
                  <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-bone" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-bone" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/cv-portrait.jpg"
                    alt="File photo — an illustration of Arkady from Foundation, not the subject"
                    className="w-full h-full object-cover rounded-[1px]"
                  />
                </div>
                <div className="mt-1.5 w-28 font-mono text-[8px] uppercase tracking-[0.08em] text-ash leading-snug">
                  Photo substituted: Arkady &mdash; Foundation
                </div>
              </div>
              {/* file fields */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 font-mono text-[11px] uppercase tracking-[0.1em] self-center">
                <div>
                  <div className="label mb-1">Name</div>
                  <div className="text-bone">Jones, A.</div>
                </div>
                <div>
                  <div className="label mb-1">File opened</div>
                  <div className="text-bone">Jul 2010</div>
                </div>
                <div>
                  <div className="label mb-1">Station</div>
                  <div className="text-bone">London, UK</div>
                </div>
                <div>
                  <div className="label mb-1">Assignment</div>
                  <div className="text-bone">Principal Engineer @ AWS</div>
                </div>
                <div>
                  <div className="label mb-1">Status</div>
                  <div className="text-bone">Operational</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-14 grid sm:grid-cols-2 gap-4">
            <div className="border border-surface-lighter bg-surface-light/40 p-5 rounded-[2px]">
              <div className="label mb-3">[ channels ]</div>
              <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                <a href="mailto:alexsimonjones@gmail.com" className="text-bone-dark hover:text-ember transition-colors">
                  alexsimonjones@gmail.com
                </a>
                <a href="https://github.com/AlexsJones" target="_blank" rel="noopener noreferrer" className="text-bone-dark hover:text-ember transition-colors">
                  github.com/AlexsJones &#8599;
                </a>
                <a href="https://www.linkedin.com/in/jonesax/" target="_blank" rel="noopener noreferrer" className="text-bone-dark hover:text-ember transition-colors">
                  linkedin.com/in/jonesax &#8599;
                </a>
                <a href="https://sessionize.com/jonesax/" target="_blank" rel="noopener noreferrer" className="text-bone-dark hover:text-ember transition-colors">
                  sessionize.com/jonesax &#8599;
                </a>
              </div>
            </div>
            <div className="border border-surface-lighter bg-surface-light/40 p-5 rounded-[2px]">
              <div className="label mb-3">[ field summary ]</div>
              <p className="text-xs text-bone-dark/85 leading-relaxed">
                Individual contributor. My work is mysterious and important.
                Outside of work I contribute to open source. The things I know
                about: distributed systems, Kubernetes (exotic compute),
                systems design, and applications of artificial intelligence in
                cloud environments.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="label mb-4">[ service record ]</div>
        <div className="border-t border-surface-lighter mb-14">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={`${e.org}-${e.role}`} delay={(i % 4) * 50}>
              <div className="grid sm:grid-cols-[190px_1fr_auto] gap-x-6 items-baseline border-b border-surface-lighter py-4">
                <span className="font-display text-lg text-bone">{e.org}</span>
                <div>
                  <span className="text-xs text-bone-dark/80">{e.role}</span>
                  {e.detail && (
                    <p className="text-[11px] text-ash leading-relaxed mt-1.5">
                      {e.detail}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ash whitespace-nowrap">
                  {e.span}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="label mb-4">[ skills ]</div>
          <div className="flex flex-wrap gap-2 mb-14">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-bone-dark border border-surface-lighter px-2.5 py-1.5 rounded-[2px] hover:border-ember hover:text-ember transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="label mb-4">[ selected stages ]</div>
              <ul className="space-y-2 text-xs text-bone-dark/80">
                <li>KubeCon + CloudNativeCon NA — 2021, 2022</li>
                <li>KubeCon + CloudNativeCon EU — 2023, 2025</li>
              </ul>
            </div>
            <div>
              <div className="label mb-4">[ education ]</div>
              <p className="text-xs text-bone-dark/80">
                Kingston University — First-class BSc (Hons), Computer Science
                (2007 — 2010)
              </p>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

import Link from "next/link";
import { PROJECTS, Project } from "../data/projects";
import ProjectsShowcase from "../components/ProjectsShowcase";
import Reveal from "../components/Reveal";
import { ARTICLES } from "./research/articles";
import { speakingEvents } from "./speaking/events";

/** Refresh star counts daily; fall back to checked-in numbers on failure. */
async function getProjects(): Promise<Project[]> {
  return Promise.all(
    PROJECTS.map(async (p) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${p.repo}`, {
          next: { revalidate: 86400 },
        });
        if (!res.ok) return p;
        const data = await res.json();
        return { ...p, stars: data.stargazers_count ?? p.stars };
      } catch {
        return p;
      }
    })
  );
}

function Stamp() {
  return (
    <div className="relative w-40 h-40 hidden lg:block" aria-hidden>
      <svg viewBox="0 0 160 160" className="stamp-rotate w-full h-full">
        <defs>
          <path
            id="circlePath"
            d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
          />
        </defs>
        <circle
          cx="80"
          cy="80"
          r="76"
          fill="none"
          stroke="var(--color-surface-lighter)"
          strokeWidth="1"
        />
        <circle
          cx="80"
          cy="80"
          r="48"
          fill="none"
          stroke="var(--color-steel)"
          strokeWidth="0.75"
          opacity="0.5"
        />
        <text
          fontSize="11"
          letterSpacing="4"
          fill="var(--color-ash)"
          fontFamily="var(--font-jetbrains)"
        >
          <textPath href="#circlePath">
            OPEN SOURCE &#9656; FIELD TESTED &#9656; AXJNS.DEV &#9656;
          </textPath>
        </text>
        <text
          x="80"
          y="85"
          textAnchor="middle"
          fontSize="16"
          fill="var(--color-ember)"
          fontFamily="var(--font-jetbrains)"
        >
          &#9656;&#9656;&#9656;
        </text>
      </svg>
    </div>
  );
}

export default async function Home() {
  const projects = await getProjects();
  const totalStars = projects.reduce((sum, p) => sum + p.stars, 0);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative grid-pattern overflow-hidden">
        {/* deco: fanned blade crown + ghosted turbine schematic */}
        <img
          src="/deco/fan-arc.svg"
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 -top-4 w-[640px] max-w-none opacity-[0.14]"
        />
        <img
          src="/deco/blueprint-turbine.svg"
          alt=""
          aria-hidden
          className="stamp-rotate pointer-events-none select-none absolute -right-40 -top-16 w-[560px] max-w-none opacity-[0.10] hidden lg:block"
        />
        <img
          src="/deco/crosshair.svg"
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute right-8 bottom-10 w-12 opacity-30 hidden lg:block"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 corner-ticks relative">
          <div className="flex items-start justify-between gap-12">
            <div className="max-w-3xl">
              <Reveal>
                <div className="label mb-6">
                  [ 001 / identity ] &mdash; principal engineer @ aws &mdash;
                  founder, k8sgpt.ai
                </div>
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-bone leading-[0.95] mb-6">
                  Alex Jones builds{" "}
                  <span className="text-ember italic">infrastructure</span> for
                  the agentic era.
                </h1>
              </Reveal>
              <Reveal delay={150}>
                <p className="text-sm sm:text-base text-bone-dark/80 leading-relaxed max-w-xl mb-8">
                  Distributed systems, Kubernetes, and the machinery that lets
                  AI run on real hardware. Everything below is open source,
                  field tested, and in production somewhere it probably
                  shouldn&rsquo;t be.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#projects"
                    className="font-mono text-[11px] uppercase tracking-[0.12em] font-medium px-5 py-3 bg-ember text-white hover:bg-ember-dark transition-colors rounded-[2px]"
                  >
                    View projects &#9662;
                  </a>
                  <a
                    href="https://github.com/AlexsJones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.12em] font-medium px-5 py-3 border-2 border-bone text-bone hover:bg-bone hover:text-surface transition-colors rounded-[2px]"
                  >
                    github.com/AlexsJones
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={300} className="shrink-0 self-center">
              <Stamp />
            </Reveal>
          </div>

          {/* deco: unit marks — reads as a production line */}
          <Reveal delay={200}>
            <div className="mt-14 flex items-center gap-3" aria-hidden>
              <img src="/deco/rotor-ring.svg" alt="" className="w-8 h-8 opacity-70" />
              <img src="/deco/rotor-ring.svg" alt="" className="w-8 h-8 opacity-70" />
              <img src="/deco/rotor-ring.svg" alt="" className="w-8 h-8 opacity-70" />
              <span className="label ml-2">unit marks / built to aggregate</span>
              <img
                src="/deco/chevron-strip.svg"
                alt=""
                className="hidden sm:block h-2.5 ml-auto opacity-40"
              />
            </div>
          </Reveal>

          {/* spec strip */}
          <Reveal delay={250}>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 border border-surface-lighter rounded-[2px] divide-y md:divide-y-0 md:divide-x divide-surface-lighter bg-surface-light/40">
              {[
                {
                  k: "github stars",
                  v: `${(totalStars / 1000).toFixed(1)}k`,
                },
                { k: "flagship", v: "llmfit" },
                { k: "cncf project", v: "k8sgpt" },
                {
                  k: "membrane paper",
                  v:
                    ARTICLES.find((a) => a.status !== "superseded")?.version ??
                    "v1",
                },
              ].map((s) => (
                <div key={s.k} className="px-5 py-4">
                  <div className="font-display text-3xl text-bone">{s.v}</div>
                  <div className="label mt-1">{s.k}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────── */}
      <section
        id="projects"
        data-label="projects"
        className="section-industrial grid-lines scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 corner-ticks">
          <Reveal>
            <div className="label mb-4">[ 002 / manifest ]</div>
            <h2 className="font-display text-4xl sm:text-6xl text-bone mb-3">
              Selected <span className="italic text-ember">works</span>
            </h2>
            <div className="flex items-center gap-4 mb-12">
              <p className="font-mono text-xs text-ash uppercase tracking-[0.08em]">
                Live star counts &mdash; refreshed daily from GitHub
              </p>
              <img
                src="/deco/chevron-strip.svg"
                alt=""
                aria-hidden
                className="h-2.5 opacity-40 hidden sm:block"
              />
            </div>
          </Reveal>
          <ProjectsShowcase projects={projects} />
        </div>
      </section>

      {/* ── Research — cream panel ───────────────────────── */}
      <section
        data-label="research"
        className="section-industrial section-cream grid-lines-dark relative overflow-hidden"
      >
        {/* deco: dotted aperture bloom watermark */}
        <img
          src="/deco/stencil-star.svg"
          alt=""
          aria-hidden
          className="pointer-events-none select-none absolute right-6 top-10 w-24 opacity-60 hidden sm:block"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 corner-ticks">
          <Reveal>
            <div className="label mb-4">[ 003 / papers ]</div>
            <h2 className="font-display text-4xl sm:text-6xl text-ink mb-12">
              The <span className="italic text-ember">Synthetic Membrane</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {ARTICLES.filter((a) => a.status !== "superseded").map((a, i) => (
              <Reveal key={a.slug} delay={i * 100}>
                <Link
                  href={`/research/${a.slug}`}
                  className="group relative block border border-ink/15 bg-white p-7 rounded-[2px] hover:border-ember transition-colors h-full"
                >
                  {/* deco: viewfinder brackets frame the card on hover */}
                  <img
                    src="/deco/frame-corners.svg"
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] opacity-0 group-hover:opacity-40 transition-opacity"
                  />
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white bg-ink px-1.5 py-0.5 rounded-[2px]">
                      {a.type}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8880]">
                      {a.date}
                    </span>
                  </div>
                  <h3 className="font-display normal-case tracking-normal text-2xl text-ink group-hover:text-ember transition-colors mb-3 leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-xs text-[#5a5a54] leading-relaxed">
                    {a.description}
                  </p>
                  <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                    Read paper &#8599;
                  </div>
                </Link>
              </Reveal>
            ))}

            {/* lineage panel — one evolving paper, not many papers */}
            <Reveal delay={100}>
              <Link
                href="/research"
                className="group flex h-full flex-col justify-between border border-dashed border-ink/30 bg-white/40 p-7 rounded-[2px] hover:border-ember transition-colors"
              >
                <div>
                  <div className="label mb-5">[ lineage &middot; one evolving paper ]</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.1em] space-y-3">
                    {(() => {
                      const v1 = ARTICLES.find(
                        (a) => a.status === "superseded"
                      );
                      const cur = ARTICLES.find(
                        (a) => a.status !== "superseded"
                      );
                      return (
                        <>
                          <div className="flex items-center gap-2 text-[#8a8880]">
                            <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-[#8a8880]" />
                            <span>
                              {v1?.version} &middot; {v1?.date} &middot;
                              superseded
                            </span>
                          </div>
                          <div className="pl-1 text-[10px] text-[#8a8880] leading-relaxed">
                            {cur?.changes?.slice(0, 3).map((c) => (
                              <span key={c} className="inline-block mr-3">
                                + {c}
                              </span>
                            ))}
                            <span className="text-ember">&#9660;</span>
                          </div>
                          <div className="flex items-center gap-2 text-ink">
                            <span className="inline-block w-2.5 h-2.5 bg-ink" />
                            <span>
                              <span className="bg-ink text-white px-1 py-0.5 rounded-[2px]">
                                {cur?.version}
                              </span>{" "}
                              &middot; {cur?.date} &middot; current
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                  View research line &#8599;
                </div>
              </Link>
            </Reveal>
          </div>
          {/* deco: coupled rings — "systems, not machines" */}
          <img
            src="/deco/ring-chain.svg"
            alt=""
            aria-hidden
            className="mt-12 w-72 max-w-full opacity-50 hidden sm:block"
          />
        </div>
      </section>

      {/* ── Speaking + Writing ───────────────────────────── */}
      <section
        data-label="dispatches"
        className="section-industrial grid-lines"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 corner-ticks">
          {/* deco: hazard hatch divider */}
          <img
            src="/deco/hatch-band.svg"
            alt=""
            aria-hidden
            className="w-40 mb-12 opacity-40"
          />
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <Reveal>
                <div className="label mb-4">[ 004 / on stage ]</div>
                <h2 className="font-display text-4xl sm:text-5xl text-bone mb-10">
                  Speaking
                </h2>
              </Reveal>
              <div className="border-t border-surface-lighter">
                {speakingEvents.slice(0, 4).map((e, i) => (
                  <Reveal key={e.title} delay={i * 80}>
                    <a
                      href={e.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-baseline justify-between gap-4 border-b border-surface-lighter py-4 hover:bg-surface-light/40 transition-colors px-2 -mx-2"
                    >
                      <div>
                        <div className="text-sm text-bone group-hover:text-ember transition-colors leading-snug">
                          {e.title}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash mt-1">
                          {e.event} &mdash; {e.date}
                        </div>
                      </div>
                      <span className="row-arrow shrink-0 text-ember font-mono text-xs">
                        &#8599;
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={200}>
                <Link
                  href="/speaking"
                  className="inline-block mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ember hover:text-ember-dark transition-colors"
                >
                  All talks &#9656;&#9656;&#9656;
                </Link>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <div className="label mb-4">[ 005 / on record ]</div>
                <h2 className="font-display text-4xl sm:text-5xl text-bone mb-10">
                  Writing
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <Link
                  href="/blog"
                  className="group block border border-surface-lighter bg-surface-light/60 p-7 rounded-[2px] hover:border-ember transition-colors"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash mb-3">
                    Latest from the blog
                  </div>
                  <div className="font-display text-2xl text-bone group-hover:text-ember transition-colors mb-2">
                    Essays on agents, reliability &amp; infrastructure
                  </div>
                  <p className="text-xs text-bone-dark/70 leading-relaxed mb-5">
                    Long-form writing on multi-agent coordination, the sticky
                    note problem, and what it takes to keep distributed systems
                    honest.
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                    Read the blog &#8599;
                  </span>
                </Link>
              </Reveal>

              <Reveal delay={200}>
                <Link
                  href="/terminal"
                  className="group mt-4 block border border-dashed border-surface-lighter p-5 rounded-[2px] hover:border-ash transition-colors"
                >
                  <div className="font-mono text-[11px] text-ash">
                    <span className="text-ember">$</span> ssh axjns.dev{" "}
                    <span className="blink inline-block w-[6px] h-[12px] bg-ash align-middle" />
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ash/60 mt-2 normal-case">
                    Miss the old site? The terminal still boots. &#8599;
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

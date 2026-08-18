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

export default async function Home() {
  const projects = await getProjects();
  const totalStars = projects.reduce((sum, p) => sum + p.stars, 0);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative grid-pattern overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 corner-ticks relative">
          <div className="flex items-start justify-between gap-12">
            <div className="max-w-3xl">
              <Reveal>
                <div className="label mb-6">Principal Engineer at AWS · Creator of K8sGPT</div>
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-bone leading-[0.95] mb-6">
                  I build open-source systems for Kubernetes and AI.
                </h1>
              </Reveal>
              <Reveal delay={150}>
                <p className="text-sm sm:text-base text-bone-dark/80 leading-relaxed max-w-xl mb-8">
                  I&rsquo;m Alex Jones. My work focuses on infrastructure for AI
                  workloads, distributed systems, and multi-agent coordination.
                  This is where I share the projects, papers, and lessons from
                  that work.
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
              <img
                src="/cv-portrait.jpg"
                alt="Alex Jones"
                className="hidden lg:block h-52 w-44 object-cover grayscale border border-surface-lighter"
              />
            </Reveal>
          </div>

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
            <div className="label mb-4">Projects</div>
            <h2 className="font-display text-4xl sm:text-6xl text-bone mb-3">
              Selected <span className="italic text-ember">works</span>
            </h2>
            <div className="flex items-center gap-4 mb-12">
              <p className="font-mono text-xs text-ash">Open-source work I actively build and maintain. Star counts refresh daily.</p>
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 corner-ticks">
          <Reveal>
            <div className="label mb-4">Research papers</div>
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
                className="group flex h-full flex-col justify-between border border-dashed border-ink/30 bg-white/85 p-7 rounded-[2px] hover:border-ember transition-colors"
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
        </div>
      </section>

      {/* ── Speaking + Writing ───────────────────────────── */}
      <section
        data-label="dispatches"
        className="section-industrial grid-lines"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 corner-ticks">
          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <Reveal>
                <div className="label mb-4">Speaking</div>
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
                <div className="label mb-4">Writing</div>
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
                    Latest essays
                  </div>
                  <div className="font-display text-2xl text-bone group-hover:text-ember transition-colors mb-2">
                    The Cell Cannot Break
                  </div>
                  <p className="text-xs text-bone-dark/70 leading-relaxed mb-5">
                    Five DeepSeek agents tried to escape sealed, hardware-isolated
                    cells. Here is what happened at each layer.
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
                    Read this essay &#8599;
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

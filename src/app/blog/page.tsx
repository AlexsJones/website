import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";
import { ARTICLES } from "../research/articles";

export const metadata = {
  title: "Writing — axjns.dev",
  description: "Blog posts by Alex Jones.",
};

const POSTS = [
  {
    slug: "celln-deepseek-benchmark",
    title: "The Cell Cannot Break",
    description:
      "We asked five DeepSeek agents to escape their sealed hardware-isolated cells. At every layer — build, kernel, filesystem, seccomp — the cell held.",
    date: "August 2026",
  },
  {
    slug: "celln-execution-plane",
    title: "The Agent Environment Should Be a Lease",
    description:
      "Why I built Celln: an execution plane where agents borrow verified tools instead of assembling machines, and why it may become Sympozium's default substrate.",
    date: "August 2026",
  },
  {
    slug: "post-kubernetes-genai",
    title: "Post-Kubernetes Infrastructure for GenAI Workloads",
    description:
      "Field notes on Modal's million-sandbox announcement, what it says about Kubernetes' assumptions, and the coming decoupling of coordination from execution.",
    date: "July 2026",
  },
  {
    slug: "sticky-note-problem",
    title:
      "The Sticky-Note Problem: Why Multi-Agent AI Is Broken at the Coordination Layer",
    description:
      "Why every multi-agent system built today is passing sticky notes between people in different rooms, and what the MAST study tells us about fixing it.",
    date: "May 2026",
  },
  {
    slug: "synthetic-membrane",
    title: "We've been building AI agents wrong.",
    description:
      "Why two million LLM agents produced zero collective intelligence, and what a synthetic membrane between agents would look like.",
    date: "April 2026",
  },
];

function TearLine() {
  return (
    <div aria-hidden className="relative border-t border-dashed border-bone/40">
      <span className="absolute -top-[9px] left-10 bg-surface px-1.5 font-mono text-[11px] text-ash leading-none">
        &#9986;
      </span>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="grid-lines min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
        <PageHeader
          index="005"
          label="Writing"
          title="Writing"
          intro="Field notes and research on AI agents, distributed systems, and the things that break."
        />

        <nav
          aria-label="Writing sections"
          className="mb-14 flex border-y border-bone/30"
        >
          <a
            href="#field-notes"
            className="group flex flex-1 items-center justify-between gap-4 border-r border-bone/30 px-1 py-4 pr-5 text-bone hover:text-ember transition-colors"
          >
            <span className="font-display text-lg sm:text-xl">Field notes</span>
            <span className="font-mono text-[10px] text-ash group-hover:text-ember">
              {POSTS.length}
            </span>
          </a>
          <a
            href="#research"
            className="group flex flex-1 items-center justify-between gap-4 px-5 py-4 text-bone hover:text-ember transition-colors"
          >
            <span className="font-display text-lg sm:text-xl">Research</span>
            <span className="font-mono text-[10px] text-ash group-hover:text-ember">
              {ARTICLES.filter((article) => article.status !== "superseded").length}
            </span>
          </a>
        </nav>

        <section id="field-notes" className="scroll-mt-24">
        <h2 className="font-display text-2xl text-bone mb-2">Field notes</h2>
        <p className="text-xs text-ash mb-8">Notes from work in progress, written when there is something useful to say.</p>

        <div>
          {POSTS.map((post, i) => {
            const n = POSTS.length - i;
            return (
              <Reveal key={post.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-9 px-2 -mx-2 hover:bg-surface-light/40 transition-colors"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash mb-3">
                    Dispatch N&ordm; {String(n).padStart(3, "0")} &mdash;
                    London &middot; {post.date}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl text-bone group-hover:text-ember transition-colors mb-3 leading-snug max-w-3xl">
                    {post.title}
                  </h2>
                  <p className="text-xs text-bone-dark/70 leading-relaxed max-w-2xl">
                    {post.description}
                  </p>
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ember row-arrow">
                    Read essay &#8599;
                  </div>
                </Link>
                {i < POSTS.length - 1 && <TearLine />}
              </Reveal>
            );
          })}
        </div>
        </section>

        <Reveal>
          <section id="research" className="mt-20 scroll-mt-24 border-t border-bone/30 pt-10">
            <h2 className="font-display text-2xl text-bone mb-2">Research papers</h2>
            <p className="text-xs text-ash mb-8">Longer technical work. Papers may be revised as the implementation develops.</p>
            <div className="space-y-2">
              {ARTICLES.filter((article) => article.status !== "superseded").map((article) => (
                <Link key={article.slug} href={`/research/${article.slug}`} className="group block border-t border-bone/30 py-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash mb-2">
                    {article.type} · {article.version} · {article.date}
                  </div>
                  <h3 className="font-display normal-case text-2xl text-bone group-hover:text-ember transition-colors">{article.title}</h3>
                  <p className="mt-2 max-w-2xl text-xs leading-relaxed text-bone-dark/70">{article.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      </main>
    </div>
  );
}

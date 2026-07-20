import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Writing — axjns.dev",
  description: "Blog posts by Alex Jones.",
};

const POSTS = [
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

/** Punch-tape strip — dots deterministically encoding the dispatch title. */
function PunchTape({ seed }: { seed: string }) {
  const dots = Array.from({ length: 34 }, (_, i) => {
    const c = seed.charCodeAt(i % seed.length) + i * 7;
    return c % 3 !== 0; // punched or not
  });
  return (
    <div aria-hidden className="mt-4 flex items-center gap-[5px]">
      {dots.map((punched, i) => (
        <span
          key={i}
          className={`inline-block w-[5px] h-[5px] rounded-full ${
            punched
              ? "bg-bone/50 group-hover:bg-ember"
              : "border border-bone/40"
          } transition-colors`}
        />
      ))}
    </div>
  );
}

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
          label="on record"
          title="Field"
          accent="notes."
          intro="Essays on AI agents, distributed systems, and the things that break."
        />

        {/* wire-service masthead */}
        <Reveal>
          <div className="masthead-rule py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-bone">
            Axjns Wire &mdash; Field Dispatch Service
          </div>
          <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-ash mt-2 mb-12">
            <span>London relay &middot; all channels</span>
            <span>{POSTS.length} dispatches on file</span>
          </div>
        </Reveal>

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
                  <PunchTape seed={post.title} />
                  <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ember row-arrow">
                    Read dispatch &#8599;
                  </div>
                </Link>
                {i < POSTS.length - 1 && <TearLine />}
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-12 text-center font-mono text-[10px] tracking-[0.4em] text-ash uppercase">
            &middot;&middot;&middot; EOM &middot;&middot;&middot;
          </div>
        </Reveal>
      </main>
    </div>
  );
}

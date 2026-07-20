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

        <div className="space-y-4">
          {POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border border-surface-lighter bg-surface-light/60 p-7 rounded-[2px] hover:border-ember transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ash group-hover:text-ember transition-colors">
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
                    {post.date}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-bone group-hover:text-ember transition-colors mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-bone-dark/70 leading-relaxed max-w-2xl">
                  {post.description}
                </p>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ember row-arrow">
                  Read &#8599;
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}

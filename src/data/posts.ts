/** Single source of truth for blog posts — used by /blog, /feed and /feed.xml. */
export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO date, used for RSS pubDate. */
  isoDate: string;
  /** Human date for display, e.g. "August 2026". */
  date: string;
}

export const POSTS: Post[] = [
  {
    slug: "celln-deepseek-benchmark",
    title: "The Cell Cannot Break",
    description:
      "We asked five DeepSeek agents to escape their sealed hardware-isolated cells. At every layer — build, kernel, filesystem, seccomp — the cell held.",
    isoDate: "2026-08-05",
    date: "August 2026",
  },
  {
    slug: "celln-execution-plane",
    title: "The Agent Environment Should Be a Lease",
    description:
      "Why I built Celln: an execution plane where agents borrow verified tools instead of assembling machines, and why it may become Sympozium's default substrate.",
    isoDate: "2026-08-03",
    date: "August 2026",
  },
  {
    slug: "post-kubernetes-genai",
    title: "Post-Kubernetes Infrastructure for GenAI Workloads",
    description:
      "Field notes on Modal's million-sandbox announcement, what it says about Kubernetes' assumptions, and the coming decoupling of coordination from execution.",
    isoDate: "2026-07-01",
    date: "July 2026",
  },
  {
    slug: "sticky-note-problem",
    title:
      "The Sticky-Note Problem: Why Multi-Agent AI Is Broken at the Coordination Layer",
    description:
      "Why every multi-agent system built today is passing sticky notes between people in different rooms, and what the MAST study tells us about fixing it.",
    isoDate: "2026-05-01",
    date: "May 2026",
  },
  {
    slug: "synthetic-membrane",
    title: "We've been building AI agents wrong.",
    description:
      "Why two million LLM agents produced zero collective intelligence, and what a synthetic membrane between agents would look like.",
    isoDate: "2026-04-01",
    date: "April 2026",
  },
];

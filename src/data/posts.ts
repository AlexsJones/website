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
    title: "Testing Celln's Boundary",
    description:
      "Four boundary probes and one successful computation: what a small Celln demonstration shows, and what it leaves untested.",
    isoDate: "2026-08-05",
    date: "August 2026",
  },
  {
    slug: "celln-execution-plane",
    title: "The Agent Environment Should Be a Lease",
    description:
      "Why I built Celln to lend agents a defined capability set, and what that execution model still needs to prove.",
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
      "The Sticky-Note Problem: Making Agent Handoffs Reliable",
    description:
      "Why agent handoffs lose context, and how shared evidence and explicit ownership can make coordination more reliable.",
    isoDate: "2026-05-01",
    date: "May 2026",
  },
  {
    slug: "synthetic-membrane",
    title: "Agents Need Somewhere to Share Their Work",
    description:
      "What makes agents useful as a team, and how a shared, policy-controlled workspace might help.",
    isoDate: "2026-04-01",
    date: "April 2026",
  },
];

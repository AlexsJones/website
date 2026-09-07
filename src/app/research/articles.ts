export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  type: "paper" | "article";
  version?: string;
  status?: "current" | "superseded";
  /** Revision withdrawn from the site — shown on the rail but not linked. */
  unpublished?: boolean;
  /** What this revision added over the previous one (shown on the lineage rail). */
  changes?: string[];
  links?: { label: string; href: string }[];
}

/**
 * Articles in a research line share a `tag`; the index renders them as an
 * evolution timeline (oldest → current). Order here: current revision first
 * (used by the homepage grid), older revisions after.
 */
export const ARTICLES: Article[] = [
  {
    slug: "0001-synthetic-membrane-coordination-layer",
    title:
      "The Synthetic Membrane: A Coordination Layer for Multi-Agent AI Systems",
    description:
      "Revised position paper defining a coordination contract for shared evidence, selective access, and action ownership, with explicit limits and an evaluation plan.",
    date: "September 2026",
    tag: "Synthetic Membrane",
    type: "paper",
    version: "v2.2",
    status: "current",
    changes: [
      "bounded hypothesis and prior-art comparison",
      "authority and consistency contract",
      "worked incident scenario with explicit limits",
      "matched baselines and mechanism ablations",
    ],
    links: [
      { label: "github", href: "https://github.com/AlexsJones/research" },
    ],
  },
  {
    slug: "synthetic-membrane",
    title:
      "The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems",
    description:
      "Original position paper proposing a six-layer membrane architecture for multi-agent AI coordination.",
    date: "April 2026",
    tag: "Synthetic Membrane",
    type: "paper",
    version: "v1",
    status: "superseded",
    unpublished: true,
    links: [
      { label: "github", href: "https://github.com/AlexsJones/research" },
    ],
  },
];

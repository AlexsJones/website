export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  type: "paper" | "article";
  version?: string;
  status?: "current" | "superseded";
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
      "Expanded position paper (v2.1) proposing a six-layer synthetic membrane architecture, drawing on biological analogues, distributed systems theory, and incident management doctrine.",
    date: "July 2026",
    tag: "Synthetic Membrane",
    type: "paper",
    version: "v2.1",
    status: "current",
    changes: [
      "ICS/NIMS incident doctrine mapping",
      "security incident-response case study",
      "related-work survey & MAST evidence",
      "falsifiable acceptance criteria",
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
    links: [
      { label: "github", href: "https://github.com/AlexsJones/research" },
    ],
  },
];

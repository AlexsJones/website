export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  type: "paper" | "article";
  links?: { label: string; href: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "0001-synthetic-membrane-coordination-layer",
    title:
      "The Synthetic Membrane: A Coordination Layer for Multi-Agent AI Systems",
    description:
      "Expanded position paper (v2.0) proposing a six-layer synthetic membrane architecture, drawing on biological analogues, distributed systems theory, and incident management doctrine.",
    date: "May 2026",
    tag: "Synthetic Membrane",
    type: "paper",
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
    links: [
      { label: "github", href: "https://github.com/AlexsJones/research" },
    ],
  },
];

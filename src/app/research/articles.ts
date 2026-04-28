export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  links?: { label: string; href: string }[];
}

export const ARTICLES: Article[] = [
  {
    slug: "synthetic-membrane",
    title: "We've been building AI agents wrong.",
    description:
      "Why two million LLM agents produced zero collective intelligence, and what a synthetic membrane between agents would look like.",
    date: "April 2026",
    tag: "Synthetic Membrane",
    links: [
      { label: "github", href: "https://github.com/AlexsJones/research" },
      {
        label: "paper",
        href: "https://github.com/AlexsJones/research/blob/main/paper/paper.md",
      },
    ],
  },
];

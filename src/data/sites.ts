export interface Site {
  name: string;
  url: string;
  domain: string;
  tagline: string;
  description: string;
  image: string;
  modes: { k: string; v: string }[];
  tags: string[];
}

export const SITES: Site[] = [
  {
    name: "Blueprint",
    url: "https://systemsdesign.site/",
    domain: "systemsdesign.site",
    tagline: "Design any system. Or get graded on one.",
    description:
      "A system-design canvas for interview practice. Sketch an architecture, then keep it free-form or let an AI interviewer score it against a real brief.",
    image: "/img/sites/blueprint.png",
    modes: [
      { k: "practice", v: "AI-graded puzzles, climb the tower" },
      { k: "design", v: "Free-form whiteboard, Mermaid import" },
      { k: "mcp", v: "Agents draw onto editable boards" },
    ],
    tags: ["system design", "AI", "MCP"],
  },
];

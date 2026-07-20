export interface Project {
  name: string;
  repo: string; // owner/name on GitHub
  description: string;
  language: string;
  stars: number; // fallback if the live fetch fails
  role?: string;
  featured?: boolean;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    name: "llmfit",
    repo: "AlexsJones/llmfit",
    description:
      "Hundreds of models & providers. One command to find what runs on your hardware.",
    language: "Rust",
    stars: 29792,
    featured: true,
    tags: ["LLM", "CLI", "hardware"],
  },
  {
    name: "k8sgpt",
    repo: "k8sgpt-ai/k8sgpt",
    description:
      "Giving Kubernetes superpowers to everyone — AI-powered cluster analysis and troubleshooting.",
    language: "Go",
    stars: 7998,
    role: "founder",
    featured: true,
    tags: ["Kubernetes", "AI", "CNCF"],
  },
  {
    name: "sympozium",
    repo: "sympozium-ai/sympozium",
    description:
      "The coordination layer for multi-agent AI — a Kubernetes-native synthetic membrane giving agents discovery, shared state, and governance as first-class primitives.",
    language: "Go",
    stars: 571,
    role: "creator",
    featured: true,
    tags: ["agents", "Kubernetes", "AI"],
  },
  {
    name: "llmserve",
    repo: "AlexsJones/llmserve",
    description:
      "A simple TUI for serving local LLM models. Pick a model, pick a backend, serve it.",
    language: "Rust",
    stars: 314,
    tags: ["LLM", "TUI"],
  },
  {
    name: "kflow",
    repo: "AlexsJones/kflow",
    description: "Like top for Kubernetes networking.",
    language: "Rust",
    stars: 64,
    tags: ["Kubernetes", "networking"],
  },
  {
    name: "llama-panel",
    repo: "AlexsJones/llama-panel",
    description: "A macOS llama-server command centre.",
    language: "JavaScript",
    stars: 50,
    tags: ["LLM", "macOS"],
  },
  {
    name: "repo-steward",
    repo: "AlexsJones/repo-steward",
    description:
      "An autonomous agent for open-source repository management — triages issues, reviews PRs, escalates only the decisions that are yours.",
    language: "Python",
    stars: 19,
    tags: ["agents", "automation"],
  },
  {
    name: "prop-rep",
    repo: "AlexsJones/prop-rep",
    description:
      "Find out which organisations are best represented in a repository.",
    language: "Go",
    stars: 16,
    tags: ["OSS analytics"],
  },
  {
    name: "keychron-micro",
    repo: "AlexsJones/keychron-micro",
    description:
      "Turn a Keychron Q0 Max into a scriptable macropad on Linux. Keys run scripts; the board lights up with what they are doing.",
    language: "Rust",
    stars: 7,
    tags: ["Linux", "hardware"],
  },
];

export const LANGUAGE_COLORS: Record<string, string> = {
  Rust: "#dea584",
  Go: "#00add8",
  Python: "#3572a5",
  JavaScript: "#f1e05b",
  TypeScript: "#3178c6",
  Shell: "#89e051",
};

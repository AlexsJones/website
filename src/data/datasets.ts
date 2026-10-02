export interface Dataset {
  name: string;
  slug: string;
  description: string;
  format: string;
  size: string;
  tags: string[];
}

export const DATASETS: Dataset[] = [
  {
    name: "llmfit benchmarks",
    slug: "llmfit-benchmarks",
    description:
      "1,501 normalized, real-world LLM inference measurements across consumer, workstation, datacenter, and unified-memory hardware.",
    format: "Parquet",
    size: "1.5k observations",
    tags: ["LLM inference", "hardware", "llmfit"],
  },
  {
    name: "Strix Halo inference bench",
    slug: "strix-halo-inference-bench",
    description:
      "Measured prefill and decode throughput, plus real VRAM cost, for local GGUF models on AMD Strix Halo under ROCm.",
    format: "JSONL",
    size: "focused benchmark",
    tags: ["AMD", "ROCm", "llama.cpp"],
  },
];

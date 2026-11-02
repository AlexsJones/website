import { ImageResponse } from "next/og";
import { StencilOgCard, OG_SIZE } from "../../../components/og-card";

export const runtime = "edge";
export const alt = "From Zero to Serving a Model on Kubernetes, on Your Own Machine | axjns.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <StencilOgCard
        label="GUIDE / KUBERNETES / LOCAL AI"
        title="Serve a Model on"
        accent="Kubernetes"
        subtitle="kind, llmfit, Ollama and k8sgpt on your own laptop or desktop. CPU, Intel Arc, NVIDIA and AMD, tested with real output."
      />
    ),
    { ...size },
  );
}

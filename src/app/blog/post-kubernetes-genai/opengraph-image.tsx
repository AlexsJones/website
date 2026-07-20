import { ImageResponse } from "next/og";
import { StencilOgCard, OG_SIZE } from "../../../components/og-card";

export const runtime = "edge";
export const alt = "Post-Kubernetes Infrastructure for GenAI Workloads | axjns.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <StencilOgCard
        label="FIELD NOTES / INFRASTRUCTURE"
        title="Post-Kubernetes"
        accent="GenAI Infra"
        subtitle="Field notes on Modal's million-sandbox announcement, and the coming decoupling of coordination from execution."
      />
    ),
    { ...size },
  );
}

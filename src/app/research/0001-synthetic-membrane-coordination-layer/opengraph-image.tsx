import { ImageResponse } from "next/og";
import { StencilOgCard, OG_SIZE } from "../../../components/og-card";

export const runtime = "edge";
export const alt =
  "The Synthetic Membrane: A Coordination Layer for Multi-Agent AI Systems | axjns.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <StencilOgCard
        label="PAPER / V2.1"
        title="The Synthetic"
        accent="Membrane"
        subtitle="A coordination layer for multi-agent AI systems — six layers, default-deny permeability, event-sourced shared state."
      />
    ),
    { ...size },
  );
}

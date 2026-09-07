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
        label="PAPER / V2.2"
        title="The Synthetic"
        accent="Membrane"
        subtitle="Shared evidence, selective access, and action ownership: an architecture proposal with a controlled evaluation plan."
      />
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { StencilOgCard, OG_SIZE } from "../../../components/og-card";

export const runtime = "edge";
export const alt = "The Sticky-Note Problem | axjns.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <StencilOgCard
        label="FIELD NOTES / MULTI-AGENT"
        title="The Sticky-Note"
        accent="Problem"
        subtitle="Why multi-agent AI is broken at the coordination layer, and what incident commanders figured out fifty years ago."
      />
    ),
    { ...size },
  );
}

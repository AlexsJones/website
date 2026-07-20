import { ImageResponse } from "next/og";
import { StencilOgCard, OG_SIZE } from "../../../components/og-card";

export const runtime = "edge";
export const alt = "We've been building AI agents wrong. | axjns.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <StencilOgCard
        label="FIELD NOTES / MULTI-AGENT"
        title="Building AI agents"
        accent="wrong"
        subtitle="Why two million LLM agents produced zero collective intelligence, and what a synthetic membrane between agents would look like."
      />
    ),
    { ...size },
  );
}

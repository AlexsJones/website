import { ImageResponse } from "next/og";
import { StencilOgCard, OG_SIZE } from "../../../components/og-card";

export const runtime = "edge";
export const alt = "Agents Need Somewhere to Share Their Work | axjns.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <StencilOgCard
        label="FIELD NOTES / MULTI-AGENT"
        title="Agents need"
        accent="shared work"
        subtitle="What makes agents useful as a team, and how a shared, policy-controlled workspace might help."
      />
    ),
    { ...size },
  );
}

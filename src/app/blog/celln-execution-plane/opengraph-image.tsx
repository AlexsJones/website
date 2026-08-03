import { ImageResponse } from "next/og";
import { StencilOgCard, OG_SIZE } from "../../../components/og-card";

export const runtime = "edge";
export const alt = "The Agent Environment Should Be a Lease | axjns.dev";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <StencilOgCard
        label="DEVELOPMENT NOTES / EXECUTION"
        title="Environment"
        accent="as a Lease"
        subtitle="Why I built Celln, and where it may fit beneath Sympozium."
      />
    ),
    { ...size },
  );
}

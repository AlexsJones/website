import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "We've been building AI agents wrong. — axjns.dev";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0d1117",
          padding: "60px 80px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            color: "#34d399",
            fontSize: 16,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "32px",
          }}
        >
          Research · Synthetic Membrane
        </div>
        <div
          style={{
            color: "#f0f6fc",
            fontSize: 52,
            fontWeight: "bold",
            lineHeight: 1.2,
            marginBottom: "28px",
            letterSpacing: "-0.02em",
          }}
        >
          We&apos;ve been building AI agents wrong.
        </div>
        <div
          style={{
            color: "#8b949e",
            fontSize: 24,
            lineHeight: 1.5,
            maxWidth: "900px",
          }}
        >
          Why two million LLM agents produced zero collective intelligence, and
          what a synthetic membrane between agents would look like.
        </div>
        <div
          style={{
            color: "#484f58",
            fontSize: 18,
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Alex Jones · April 2026</span>
          <span style={{ color: "#34d399" }}>axjns.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

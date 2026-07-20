import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "axjns.dev — Alex Jones";
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
          justifyContent: "space-between",
          backgroundColor: "#b4b4b2",
          backgroundImage:
            "linear-gradient(rgba(20,20,20,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,20,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          padding: "64px 72px",
          fontFamily: "monospace",
          color: "#141414",
        }}
      >
        {/* top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#4c4c4a",
          }}
        >
          <span>OPERATIONAL BY DESIGN</span>
          <span>[ AXJNS.DEV ]</span>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 40,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4c4c4a",
              marginBottom: "18px",
            }}
          >
            [ 001 / IDENTITY ]
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 104,
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            <span>ALEX&nbsp;JONES&nbsp;BUILDS&nbsp;</span>
            <span
              style={{
                backgroundColor: "#141414",
                color: "#b4b4b2",
                padding: "0 14px",
              }}
            >
              INFRASTRUCTURE
            </span>
          </div>
        </div>

        {/* bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid #141414",
            paddingTop: "20px",
            fontSize: 22,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span>Principal Engineer @ AWS &mdash; Founder, K8sGPT</span>
          <span style={{ color: "#4c4c4a" }}>&gt;&gt;&gt;</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

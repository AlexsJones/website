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
          backgroundColor: "#0d1117",
          padding: "60px 80px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#f85149",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#d29922",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#3fb950",
            }}
          />
          <span style={{ color: "#484f58", fontSize: 16, marginLeft: "8px" }}>
            terminal
          </span>
        </div>
        <div style={{ color: "#34d399", fontSize: 20, marginBottom: "24px" }}>
          axjns@dev:~$
        </div>
        <div
          style={{
            color: "#e6edf3",
            fontSize: 64,
            fontWeight: "bold",
            marginBottom: "20px",
            letterSpacing: "-0.02em",
          }}
        >
          axjns.dev
        </div>
        <div style={{ color: "#8b949e", fontSize: 28, lineHeight: 1.4 }}>
          Alex Jones — Principal Engineer @ AWS
        </div>
        <div
          style={{
            color: "#34d399",
            fontSize: 18,
            marginTop: "auto",
            display: "flex",
            gap: "24px",
          }}
        >
          <span>about</span>
          <span>research</span>
          <span>speaking</span>
          <span>cv</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

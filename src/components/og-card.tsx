/**
 * Shared stencil-theme Open Graph card, matching src/app/opengraph-image.tsx:
 * grey stock, print grid, black stencil type, reversed-bar accent word.
 * Used by per-route opengraph-image.tsx files (edge runtime safe).
 */
export const OG_SIZE = { width: 1200, height: 630 };

export function StencilOgCard({
  label,
  title,
  accent,
  subtitle,
}: {
  label: string;
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  const combined = `${title} ${accent ?? ""}`.trim();
  const titleSize = combined.length > 42 ? 60 : combined.length > 24 ? 76 : 96;
  return (
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
            fontSize: 34,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#4c4c4a",
            marginBottom: "20px",
          }}
        >
          {`[ ${label} ]`}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: titleSize,
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          <span>{`${title} `}</span>
          {accent ? (
            <span
              style={{
                backgroundColor: "#141414",
                color: "#b4b4b2",
                padding: "0 14px",
              }}
            >
              {accent}
            </span>
          ) : null}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: "26px",
              fontSize: 26,
              lineHeight: 1.4,
              color: "#2e2e2c",
              maxWidth: "980px",
            }}
          >
            {subtitle}
          </div>
        ) : null}
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
        <span>Alex Jones &mdash; Principal Engineer @ AWS</span>
        <span style={{ color: "#4c4c4a" }}>&gt;&gt;&gt;</span>
      </div>
    </div>
  );
}

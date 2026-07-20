/** Top status ticker — thin dark bar with scrolling mono status text. */
export default function Ticker() {
  const items = [
    "AXJNS.DEV — OPERATIONAL",
    "PRINCIPAL ENGINEER @ AWS",
    "FOUNDER — K8SGPT.AI",
    "OPEN SOURCE: ACTIVE",
    "LOCATION: LONDON, UK",
    "DISTRIBUTED SYSTEMS / KUBERNETES / AI",
    "RUST + GO + PYTHON",
    "FIELD TESTED / STATUS — NOMINAL",
  ];

  const doubled = [...items, ...items];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-7 bg-surface border-b border-surface-lighter flex items-center overflow-hidden">
      <div className="ticker-scroll flex items-center gap-8 whitespace-nowrap">
        {doubled.map((text, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-semibold tracking-[0.15em] text-ash">
              {text}
            </span>
            <span className="text-[8px] text-ash">
              &#9656;&#9656;&#9656;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

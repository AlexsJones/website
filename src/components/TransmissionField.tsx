/**
 * Transmission backdrop for the speaking page.
 *
 * Two layers, both monochrome ink and reduced-motion safe:
 *  - EMF field: sine waves of different wavelengths drifting at different
 *    speeds and directions, intersecting as interference patterns (.emf-wave)
 *  - Comms channel: a faint protocol-exchange log — handshake traffic between
 *    AXJNS-1 and the conference stations — scrolling slowly down the right
 *    edge (.tx-comms-scroll)
 */

const INK = "#141414";
const W = 1600;

// Sample a sine into a polyline path. Width covers one extra wavelength so a
// translateX of exactly -wavelength loops seamlessly.
function wavePath(amp: number, wavelength: number, y: number, phase: number) {
  const pts: string[] = [];
  const step = Math.max(6, Math.round(wavelength / 28));
  for (let x = 0; x <= W + wavelength; x += step) {
    const yy = y + amp * Math.sin((x / wavelength) * Math.PI * 2 + phase);
    pts.push(`${x},${yy.toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

const WAVES = [
  { amp: 62, wl: 420, y: 300, phase: 0, dur: 30, dir: -1, op: 0.05, sw: 1.2 },
  { amp: 24, wl: 180, y: 330, phase: 1.2, dur: 14, dir: 1, op: 0.06, sw: 1 },
  { amp: 92, wl: 660, y: 430, phase: 2.4, dur: 44, dir: -1, op: 0.04, sw: 1.3 },
  { amp: 13, wl: 90, y: 262, phase: 0.6, dur: 9, dir: -1, op: 0.07, sw: 1 },
  { amp: 40, wl: 300, y: 560, phase: 3.4, dur: 22, dir: 1, op: 0.035, sw: 1.1 },
];

// ── protocol exchange ────────────────────────────────────────
const EXCHANGES = [
  { st: "CNCF-EU/PARIS", qrg: "2024.03", hex: "0x4F22", pl: "BEYOND THE CLOUDS" },
  { st: "KUBECON/CHI", qrg: "2023.11", hex: "0x2A4F", pl: "K8SGPT ETHICS" },
  { st: "PLATFORMCON/NET", qrg: "2023.06", hex: "0x7B01", pl: "RUST OPERATORS" },
  { st: "KUBEHUDDLE/EDI", qrg: "2022.10", hex: "0x19C8", pl: "MICROK8S CROWD" },
  { st: "WTFSRE/NET", qrg: "2022.04", hex: "0x66D3", pl: "SLO NIHILISM" },
  { st: "OPENFEATURE/VAR", qrg: "2022-24", hex: "0x0DA7", pl: "FLAG PROTOCOL" },
];

function commsBlock(x: (typeof EXCHANGES)[number], i: number) {
  const rssi = -54 - ((i * 7) % 21);
  return [
    `> CQ CQ DE AXJNS-1 K`,
    `< AXJNS-1 DE ${x.st} K`,
    `> SYN ${x.hex} · QRG ${x.qrg}`,
    `< SYN-ACK · RSSI ${rssi}DBM`,
    `> TX "${x.pl}"`,
    `< RCVD · CRC OK · QSL`,
    `> 73 · LINK DOWN`,
    `──────────────────────`,
  ].join("\n");
}

const COMMS_LOG = EXCHANGES.map(commsBlock).join("\n");

export default function TransmissionField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none select-none absolute inset-0 overflow-hidden"
    >
      {/* EMF interference field */}
      <svg
        viewBox={`0 0 ${W} 800`}
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 w-full h-full"
      >
        {WAVES.map((w, i) => (
          <path
            key={i}
            d={wavePath(w.amp, w.wl, w.y, w.phase)}
            fill="none"
            stroke={INK}
            strokeWidth={w.sw}
            opacity={w.op}
            className="emf-wave"
            style={
              {
                "--emf-shift": `${w.dir * -w.wl}px`,
                "--emf-dur": `${w.dur}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>

      {/* protocol exchange — ghost traffic down the right edge */}
      <div className="tx-comms hidden lg:block absolute top-0 bottom-0 right-6 xl:right-14 w-[300px]">
        <div className="tx-comms-scroll font-mono text-[10px] leading-[1.9] tracking-[0.08em] uppercase whitespace-pre text-bone">
          {COMMS_LOG}
          {"\n"}
          {COMMS_LOG}
        </div>
      </div>
    </div>
  );
}

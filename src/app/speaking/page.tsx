import { speakingEvents } from "./events";
import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";
import TransmissionField from "../../components/TransmissionField";

export const metadata = {
  title: "Speaking — axjns.dev",
  description: "Conference talks by Alex Jones.",
};

/** Deterministic waveform for a talk — heights derived from its title. */
function Waveform({ seed }: { seed: string }) {
  const bars = Array.from({ length: 26 }, (_, i) => {
    const c = seed.charCodeAt(i % seed.length) * (i + 3);
    return 5 + (c % 19);
  });
  return (
    <div
      aria-hidden
      className="hidden sm:flex items-end gap-[2px] h-6 self-center"
    >
      {bars.map((h, i) => (
        <span
          key={i}
          className="wf-bar inline-block w-[3px] bg-bone/50 group-hover:bg-ember"
          style={{ height: `${h}px`, animationDelay: `${i * 45}ms` }}
        />
      ))}
    </div>
  );
}

export default function SpeakingPage() {
  return (
    <div className="grid-lines min-h-screen relative">
      <TransmissionField />
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
        <PageHeader
          index="004"
          label="on stage"
          title="Talks &"
          accent="transmissions."
          intro="KubeCon, PlatformCon, KubeHuddle and beyond — on AI in cloud native, Kubernetes, and reliability."
        />

        <Reveal>
          <a
            href="https://www.youtube.com/cloudnativeskunkworks"
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-12 flex items-center justify-between border border-surface-lighter bg-surface-light/60 p-6 rounded-[2px] hover:border-ember transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="label">[ broadcast channel ]</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-cream bg-bone px-1.5 py-0.5 rounded-[2px]">
                  <span className="blink">&#9679;</span>&nbsp;On air
                </span>
              </div>
              <div className="font-display text-2xl text-bone group-hover:text-ember transition-colors">
                Cloud Native Skunkworks
              </div>
              <p className="text-xs text-ash mt-1 font-mono uppercase tracking-[0.08em]">
                YouTube — experiments, live builds, deep dives
              </p>
            </div>
            <span className="row-arrow text-ember font-mono">&#8599;</span>
          </a>
        </Reveal>

        {/* transmission log header: label + tuner ruler */}
        <Reveal>
          <div className="flex items-baseline justify-between mb-2">
            <div className="label">[ transmission log ]</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash">
              {speakingEvents.length} recorded
            </div>
          </div>
          <div className="tx-ruler mb-1" />
        </Reveal>

        <div>
          {speakingEvents.map((event, idx) => (
            <Reveal key={idx} delay={(idx % 4) * 60}>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid sm:grid-cols-[64px_1fr_150px_auto] gap-x-6 items-baseline border-b border-surface-lighter py-6 px-2 -mx-2 hover:bg-surface-light/40 transition-colors"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-ash group-hover:text-ember transition-colors">
                  TX&nbsp;{String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-display text-xl sm:text-2xl text-bone group-hover:text-ember transition-colors leading-snug">
                    {event.title}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash mt-2">
                    {event.event} &mdash; {event.location}
                  </div>
                </div>
                <Waveform seed={event.title} />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash mt-2 sm:mt-0">
                  {event.date}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}

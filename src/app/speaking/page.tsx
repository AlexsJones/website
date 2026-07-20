import { speakingEvents } from "./events";
import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Speaking — axjns.dev",
  description: "Conference talks by Alex Jones.",
};

export default function SpeakingPage() {
  return (
    <div className="grid-lines min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
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
              <div className="label mb-2">[ broadcast channel ]</div>
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

        <div className="border-t border-surface-lighter">
          {speakingEvents.map((event, idx) => (
            <Reveal key={idx} delay={(idx % 4) * 60}>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid sm:grid-cols-[56px_1fr_auto] gap-x-6 items-baseline border-b border-surface-lighter py-6 px-2 -mx-2 hover:bg-surface-light/40 transition-colors"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-ash group-hover:text-ember transition-colors">
                  {String(idx + 1).padStart(2, "0")} /
                </span>
                <div>
                  <div className="font-display text-xl sm:text-2xl text-bone group-hover:text-ember transition-colors leading-snug">
                    {event.title}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash mt-2">
                    {event.event} &mdash; {event.location}
                  </div>
                </div>
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

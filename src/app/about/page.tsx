import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "About — axjns.dev",
  description:
    "Alex Jones — Principal Engineer @ AWS, founder of K8sGPT, open-source builder.",
};

const TIMELINE = [
  { org: "AWS", role: "Principal Engineer", span: "2023 — present" },
  { org: "k8sgpt.ai", role: "Founder — CNCF project", span: "2023 — present" },
  { org: "Canonical", role: "Engineering Director, Kubernetes", span: "2022 — 2023" },
  { org: "JPMorgan Chase", role: "VP, Site Reliability Engineering", span: "2020 — 2021" },
  { org: "American Express", role: "Engineering Director, SRE", span: "2019 — 2020" },
];

export default function AboutPage() {
  return (
    <div className="grid-lines min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
        <PageHeader
          index="about"
          label="identity"
          title="An engineer with a"
          accent="soldering iron."
          intro="Principal Engineer at AWS, based in London. Founder of K8sGPT. Previously led Kubernetes at Canonical and reliability engineering at JPMorgan Chase and American Express."
        />

        <Reveal>
          <div className="space-y-6 text-sm text-bone-dark/85 leading-relaxed max-w-2xl mb-16">
            <p>
              I build the unglamorous machinery that makes ambitious systems
              possible: distributed systems, Kubernetes internals, and lately
              the infrastructure layer for AI agents — how they get scheduled,
              how they find hardware, and how they coordinate without stepping
              on each other.
            </p>
            <p>
              Most of what I make is open source. <span className="text-bone">llmfit</span>{" "}
              answers &ldquo;what model can my hardware actually run?&rdquo;{" "}
              <span className="text-bone">K8sGPT</span> gives Kubernetes
              clusters an AI-powered SRE. The{" "}
              <span className="text-bone">Synthetic Membrane</span> papers ask
              what a real coordination layer between agents would look like.
            </p>
            <p>
              I speak regularly at KubeCon and other conferences, served as
              Tech Lead of the CNCF TAG App-Delivery, and sat on the
              OpenFeature governing committee.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="label mb-6">[ service record ]</div>
          <div className="border-t border-surface-lighter mb-16">
            {TIMELINE.map((t) => (
              <div
                key={`${t.org}-${t.role}`}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[180px_1fr_auto] gap-x-6 items-baseline border-b border-surface-lighter py-4"
              >
                <span className="font-display text-xl text-bone">{t.org}</span>
                <span className="hidden sm:block text-xs text-bone-dark/70">
                  {t.role}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
                  {t.span}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
            <a
              href="mailto:alexsimonjones@gmail.com"
              className="px-5 py-3 bg-ember text-white hover:bg-ember-dark transition-colors rounded-[2px]"
            >
              Email me
            </a>
            <a
              href="https://www.linkedin.com/in/jonesax/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border-2 border-bone text-bone hover:bg-bone hover:text-surface transition-colors rounded-[2px]"
            >
              LinkedIn &#8599;
            </a>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

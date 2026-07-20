import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "CV — axjns.dev",
  description: "Curriculum vitae of Alex Jones.",
};

const EXPERIENCE = [
  { org: "Amazon Web Services", role: "Principal Engineer", span: "Aug 2023 — present", loc: "London" },
  { org: "k8sgpt.ai", role: "Founder (open-source project)", span: "Mar 2023 — present", loc: "" },
  { org: "OpenFeature", role: "Governing Committee", span: "Jul 2023 — Feb 2024", loc: "" },
  { org: "CNCF", role: "Tech Lead, TAG App-Delivery", span: "Jun 2021 — Feb 2024", loc: "" },
  { org: "Keptn", role: "Advisory Board Member", span: "May 2021 — Sep 2023", loc: "" },
  {
    org: "Canonical",
    role: "Engineering Director, Kubernetes",
    span: "Jan 2022 — Aug 2023",
    loc: "",
    detail:
      "Led the Kubernetes organisation: product and engineering vision, new MicroK8s capabilities, community ecosystem growth.",
  },
  { org: "Ondat", role: "Advisor (until Akamai acquisition)", span: "Jun 2022 — Mar 2023", loc: "UK" },
  {
    org: "Civo",
    role: "Principal SRE",
    span: "May 2021 — Jan 2022",
    loc: "",
    detail:
      "Built super-cluster capabilities, observability, recovery, backup and security systems.",
  },
  { org: "JPMorgan Chase & Co.", role: "VP, Site Reliability Engineering", span: "Dec 2020 — May 2021", loc: "London" },
  { org: "American Express", role: "Engineering Director, SRE", span: "May 2019 — Dec 2020", loc: "London" },
  { org: "Beamery", role: "Head of Platform & Infrastructure", span: "May 2017 — May 2019", loc: "London" },
  { org: "Sky", role: "Lead DevOps Engineer", span: "Apr 2016 — May 2017", loc: "London" },
  { org: "Casewise", role: "Lead Technical Architect", span: "Apr 2015 — Apr 2016", loc: "Mayfair" },
  { org: "Microsoft", role: "Senior Software Engineer", span: "Oct 2013 — Apr 2015", loc: "Lionhead Studios" },
  { org: "BSkyB", role: "Technical Lead, iOS / Mobile", span: "Apr 2011 — Oct 2013", loc: "Osterley" },
  { org: "Grapple Mobile", role: "Frontend Developer", span: "Jul 2010 — Apr 2011", loc: "" },
];

const SKILLS = [
  "Distributed Systems",
  "Kubernetes",
  "Systems Design",
  "AI in Cloud",
  "AWS",
  "Observability",
  "DevOps",
  "Platform Engineering",
  "Go",
  "Rust",
  "Linux",
  "Open Source",
  "Long-term Vision",
  "Communication",
];

export default function CVPage() {
  return (
    <div className="grid-lines min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
        <PageHeader
          index="cv"
          label="service record"
          title="Curriculum"
          accent="vitae."
        />

        <Reveal>
          <div className="mb-14 grid sm:grid-cols-2 gap-4">
            <div className="border border-surface-lighter bg-surface-light/40 p-5 rounded-[2px]">
              <div className="label mb-3">[ current post ]</div>
              <div className="font-display text-2xl text-bone">
                Principal Engineer @ AWS
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash mt-2">
                London, United Kingdom
              </div>
            </div>
            <div className="border border-surface-lighter bg-surface-light/40 p-5 rounded-[2px]">
              <div className="label mb-3">[ channels ]</div>
              <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                <a href="mailto:alexsimonjones@gmail.com" className="text-bone-dark hover:text-ember transition-colors">
                  alexsimonjones@gmail.com
                </a>
                <a href="https://github.com/AlexsJones" target="_blank" rel="noopener noreferrer" className="text-bone-dark hover:text-ember transition-colors">
                  github.com/AlexsJones &#8599;
                </a>
                <a href="https://www.linkedin.com/in/jonesax/" target="_blank" rel="noopener noreferrer" className="text-bone-dark hover:text-ember transition-colors">
                  linkedin.com/in/jonesax &#8599;
                </a>
                <a href="https://sessionize.com/jonesax/" target="_blank" rel="noopener noreferrer" className="text-bone-dark hover:text-ember transition-colors">
                  sessionize.com/jonesax &#8599;
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="label mb-4">[ summary ]</div>
          <p className="text-sm text-bone-dark/85 leading-relaxed max-w-2xl mb-14">
            Individual contributor. My work is mysterious and important.
            Outside of work I contribute to open source. The things I know
            about: distributed systems, Kubernetes (exotic compute), systems
            design, and applications of artificial intelligence in cloud
            environments.
          </p>
        </Reveal>

        <div className="label mb-4">[ experience ]</div>
        <div className="border-t border-surface-lighter mb-14">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={`${e.org}-${e.role}`} delay={(i % 4) * 50}>
              <div className="grid sm:grid-cols-[190px_1fr_auto] gap-x-6 items-baseline border-b border-surface-lighter py-4">
                <span className="font-display text-lg text-bone">{e.org}</span>
                <div>
                  <span className="text-xs text-bone-dark/80">{e.role}</span>
                  {e.detail && (
                    <p className="text-[11px] text-ash leading-relaxed mt-1.5">
                      {e.detail}
                    </p>
                  )}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ash whitespace-nowrap">
                  {e.span}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="label mb-4">[ skills ]</div>
          <div className="flex flex-wrap gap-2 mb-14">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-bone-dark border border-surface-lighter px-2.5 py-1.5 rounded-[2px] hover:border-ember hover:text-ember transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="label mb-4">[ selected stages ]</div>
              <ul className="space-y-2 text-xs text-bone-dark/80">
                <li>KubeCon + CloudNativeCon NA — 2021, 2022</li>
                <li>KubeCon + CloudNativeCon EU — 2023, 2025</li>
              </ul>
            </div>
            <div>
              <div className="label mb-4">[ education ]</div>
              <p className="text-xs text-bone-dark/80">
                Kingston University — First-class BSc (Hons), Computer Science
                (2007 — 2010)
              </p>
            </div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

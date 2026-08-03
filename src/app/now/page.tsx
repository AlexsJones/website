import Link from "next/link";
import PageHeader from "../../components/PageHeader";

export const metadata = {
  title: "Now — axjns.dev",
  description: "What Alex Jones is building and thinking about now.",
};

export default function NowPage() {
  return (
    <div className="grid-lines min-h-screen">
      <main className="max-w-3xl mx-auto px-6 py-20 corner-ticks">
        <PageHeader index="006" label="field status" title="Now" accent="building." intro="A short, dated view of the work in motion." />
        <div className="space-y-8 text-[15px] leading-[1.8] text-bone-dark">
          <section>
            <h2 className="font-display text-2xl text-bone mb-3">Celln</h2>
            <p>Building an execution plane for agents: isolated cells that borrow verified tools rather than assembling mutable environments. The immediate work is making the real KVM path easy to install, inspect and prove.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-bone mb-3">Sympozium</h2>
            <p>Exploring a clean split between coordination and execution. Sympozium should own workflow, policy and shared state; Celln may become the smaller execution primitive beneath an AgentRun.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-bone mb-3">Questions I am following</h2>
            <ul className="list-disc pl-5 space-y-2"><li>What does a useful persistent agent API require beyond one-shot jobs?</li><li>Which capabilities should an agent request explicitly: tools, files, egress, time, memory?</li><li>How do we make revocation and provenance operational rather than aspirational?</li></ul>
          </section>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">Updated August 2026 · <Link href="/blog/celln-execution-plane" className="text-ember hover:text-bone">read the Celln notes →</Link></p>
        </div>
      </main>
    </div>
  );
}

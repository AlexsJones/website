import Link from "next/link";

export const metadata = {
  title: "Post-Kubernetes Infrastructure for GenAI Workloads · axjns.dev",
  description:
    "Field notes on Modal's million-sandbox announcement, what it says about Kubernetes, and the coming decoupling of coordination from execution.",
  openGraph: {
    title: "Post-Kubernetes Infrastructure for GenAI Workloads",
    description:
      "Field notes on Modal's million-sandbox announcement, what it says about Kubernetes, and the coming decoupling of coordination from execution.",
    type: "article" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Post-Kubernetes Infrastructure for GenAI Workloads",
    description:
      "Field notes on Modal's million-sandbox announcement, what it says about Kubernetes, and the coming decoupling of coordination from execution.",
  },
};

export default function PostKubernetesGenaiPage() {
  return (
    <div className="grid-lines min-h-screen">
    <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
      <div className="mb-12">
        <div className="label mb-3">
          Field Notes · Infrastructure
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-bone leading-[1.02]">
          Post-Kubernetes Infrastructure for GenAI Workloads
        </h1>
        <p className="mt-3 text-base text-bone-dark/80">
          Field notes on Modal&apos;s million-sandbox announcement
        </p>
        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
          Alex Jones · July 2026 · Revised September 2026
        </div>
      </div>

      <Prose>
        <p>
          Modal&apos;s <a
          href="https://modal.com/blog/scaling-to-1-million-concurrent-sandboxes-in-seconds"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">million-sandbox demonstration</a>, published on 16 July 2026, is
          interesting because of what it removes from the launch path. The company reports
          creating a million concurrent sandboxes in under a minute. This is a vendor-reported
          result, not a benchmark I have reproduced.
        </p>

        <p>
          The architectural question underneath it is broader: how much durable coordination
          should sit between a request for short-lived compute and the moment it starts running?
        </p>

        <H2>A shorter creation path</H2>

        <p>
          Modal describes scheduling servers that propose placements and workers that accept or
          reject them using local resource state. Workers publish state asynchronously. The
          creation path avoids synchronous durable writes, trading a globally current view for a
          simpler route to execution.
        </p>

        <p>
          This is still coordination. The design changes where placement decisions happen and
          when the rest of the system learns about them. It is a deliberate choice about
          consistency, rejection, and recovery for a workload with very high creation rates.
        </p>

        <p>
          Modal contrasts that path with Kubernetes scheduling and the writes involved in pod
          lifecycles. Its complexity discussion describes worst-case behaviour; it should not be
          read as the cost of every pod launch or a controlled comparison with every Kubernetes
          configuration. The useful observation is that durable control-plane work can become
          material when the unit of execution is small and churn is high.
        </p>

        <H2>When creation latency dominates</H2>

        <p>
          A long-running service can amortise setup over hours or days. An agent&apos;s
          code-execution task might finish in seconds. For that task, environment preparation
          and scheduling can account for a large share of the time the user waits.
        </p>

        <p>
          This does not apply to every GenAI workload. Model training, inference services,
          evaluations, and one-shot tool calls have different resource profiles. But bursts of
          isolated, short-lived execution create a clear incentive to specialise the launch
          path. The same design that gives an operator a durable view of every workload may be
          expensive if every tiny computation has to pass through it individually.
        </p>

        <p>
          My inference from Modal&apos;s post is that this separation deserves attention. It is
          not enough evidence to declare Kubernetes obsolete or to conclude that the ecosystem
          cannot adapt. A dedicated execution service could itself run on infrastructure managed
          by Kubernetes while exposing a different unit of work above it.
        </p>

        <H2>Consistency still has to live somewhere</H2>

        <p>
          Removing a synchronous write moves responsibilities elsewhere. Workers must arbitrate
          local capacity; the surrounding system must handle retries, stale observations, and
          failures. Whether those tradeoffs are acceptable depends on the operation. Launching
          disposable compute and approving a consequential external action do not require
          identical semantics.
        </p>

        <p>
          Security isolation is another distinct concern. A sandbox may constrain what untrusted
          code can reach, but isolation alone says nothing about whether a task was authorised,
          whether it ran twice, or whether its result is trustworthy. The execution boundary and
          the coordination contract have to meet at a well-defined interface.
        </p>

        <p>
          That is the part of the stack I find most interesting: which decisions must be durable
          before execution, and which can be reconciled afterwards?
        </p>

        <H2>Where Sympozium and Celln fit</H2>

        <p>
          In <a href="https://github.com/sympozium-ai/sympozium" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">Sympozium</a>, I am exploring
          coordination as a durable responsibility: identity, policy, shared evidence, action
          ownership, and a history an operator can inspect. Kubernetes offers useful machinery
          for representing intent and reconciling state. It does not, by itself, supply all the
          application semantics an agent team needs.
        </p>

        <p>
          The execution plane has a different job. It accepts an authorised request, supplies
          the permitted capabilities, runs the work within an isolation boundary, and returns an
          outcome with provenance. <a href="/blog/celln-execution-plane" className="text-bone
          underline underline-offset-2 decoration-bone/40 hover:text-ember">Celln</a> is my
          attempt to explore that smaller unit of execution.
        </p>

        <p>
          The seam should be explicit enough that either side can change. A control plane should
          be able to request work without depending on the mechanism used to start a cell. An
          executor should be able to validate its authority without taking over the
          organisation&apos;s workflow.
        </p>

        <p>
          Modal offers one substantial example of specialising the creation path. My bet is that
          more agent infrastructure will separate durable coordination from transient execution.
          The test is whether the split improves latency and throughput while preserving the
          authority and recovery guarantees the workload actually needs.
        </p>
      </Prose>

      <footer className="mt-12 text-center text-xs font-mono text-ash">
        <Link href="/blog" className="hover:text-bone transition">
          &larr; back to blog
        </Link>
      </footer>
    </article>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-[15px] leading-[1.8] text-bone-dark">
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl sm:text-3xl text-bone mt-12 mb-4">
      {children}
    </h2>
  );
}

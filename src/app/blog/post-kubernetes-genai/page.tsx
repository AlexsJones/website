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

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-bone underline underline-offset-2 decoration-bone/40 hover:bg-bone hover:text-cream transition-colors"
    >
      {children}
    </a>
  );
}

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
          Alex Jones · July 2026
        </div>
      </div>

      <Prose>
        <p>
          Last week Modal published{" "}
          <A href="https://modal.com/blog/scaling-to-1-million-concurrent-sandboxes-in-seconds">
            Scaling to 1 million concurrent sandboxes in seconds
          </A>
          . The headline numbers: a million concurrent sandboxes, all created
          in under a minute, sub-500ms median start times, scheduling latency
          in the tens of milliseconds. The numbers are impressive. The
          architecture notes underneath them are the interesting part.
        </p>

        <H2>What they actually did</H2>

        <p>
          Modal rebuilt their sandbox platform around a single design index:{" "}
          <strong>launch speed</strong>. Their stated rule is that everything
          taking O(sandboxes) or O(nodes) load must be horizontally scalable
          by default, the creation path should be as simple as possible, and
          everything else is secondary.
        </p>

        <p>
          Follow that rule honestly and you end up somewhere radical. They
          removed central coordination entirely: a horizontally-scaled fleet
          of scheduling servers doing in-memory load balancing, proposing
          placements that workers accept or reject based on their own local
          resource state. Workers are their own source of truth and publish
          state asynchronously to streams. Nothing durable gets written on
          the creation path at all. Global consistency is traded away, on
          purpose, and they say so plainly.
        </p>

        <p>
          What I respect most about the post is that it isn&apos;t Kubernetes
          bashing. It&apos;s a precise deep dive into the{" "}
          <em>assumptions</em> Kubernetes is built on. Scheduling that is
          O(nodes &times; pods) and serialised by default. A central store
          (etcd) that takes O(containers) writes across pod lifecycles plus
          O(nodes) heartbeats, and is not natively shardable within a
          keyspace. None of these are bugs. They are the price of a strongly
          consistent view of the cluster - a price that made sense for the
          workloads Kubernetes grew up with: long-lived services, deployments
          that change a few times a day, reconciliation loops that can take
          their time because the workload lives for weeks.
        </p>

        <H2>The signal</H2>

        <p>
          GenAI workloads invert those assumptions. Agent sandboxes, eval
          runs, code-execution bursts - massive fan-out of ephemeral,
          short-lived compute where <em>creation latency is the product</em>.
          A container that lives for forty seconds cannot amortise a
          scheduling path designed for a service that lives for forty days.
        </p>

        <p>
          To my knowledge, this is the first credible signal that Kubernetes
          is not adapting fast enough to what GenAI infrastructure needs.
          Modal didn&apos;t extend it. They didn&apos;t write an operator, or
          a custom scheduler, or lean on any of the extension points the
          ecosystem usually reaches for. They looked at the assumptions,
          concluded the assumptions were the problem, and walked around the
          whole thing.
        </p>

        <p>
          If that pattern holds, my speculation is that the eventual winner
          for this class of workload looks less like Kubernetes and more like
          an HPC system with high levels of asynchronous orchestration - a
          mutation of the batch-scheduler lineage and the Kubernetes lineage.
          Throughput-first scheduling, weakly consistent by default,
          horizontally scalable in every path, comfortable with rejection and
          retry where Kubernetes insists on global agreement.
        </p>

        <H2>The caveat</H2>

        <p>
          It is very early to call any of this. And it&apos;s worth being
          honest about what shaped Modal&apos;s constraints:{" "}
          <strong>sandboxes are security permission boundaries</strong>.
          Their unit of compute is hard isolation around untrusted code. When
          that&apos;s your product, you index on creation speed and blast
          radius, and you can afford eventual consistency because sandboxes
          share almost nothing with each other. Not everyone will index
          towards those constraints. If your workload is trusted, long-lived,
          or genuinely needs a consistent global view, the Kubernetes price
          is still buying you something real.
        </p>

        <H2>Where we sit</H2>

        <p>
          In{" "}
          <A href="https://github.com/sympozium-ai/sympozium">Sympozium</A>{" "}
          we think about this as a coming{" "}
          <strong>decoupling of coordination from execution</strong>.
          Multi-agent workflows need, in places, the opposite of perfect
          isolation: overlapping security boundaries, shared memory, agents
          that can sense each other&apos;s state. That coordination plane
          wants strong semantics, governance, and provenance - the things
          Kubernetes-shaped systems are actually good at. The execution
          plane underneath it wants exactly what Modal built: isolation
          boundaries that appear in milliseconds and disappear without
          ceremony. Those are different layers with different physics, and I
          don&apos;t think one system wins both.
        </p>

        <p>
          Which is the real takeaway. The stack for GenAI infrastructure is
          not settled - not the execution layer, not the coordination layer,
          not the seam between them. Modal just showed one very sharp answer
          to one layer of it. Right now it is anyone&apos;s game to win, and
          anyone&apos;s game to define.
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

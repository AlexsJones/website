import Link from "next/link";

export const metadata = {
  title: "The Agent Environment Should Be a Lease · axjns.dev",
  description:
    "Why I built Celln, and why agent infrastructure should lend verified capabilities rather than hand every agent a mutable machine.",
  openGraph: {
    title: "The Agent Environment Should Be a Lease",
    description:
      "Why I built Celln, and why it may become Sympozium's execution plane.",
    type: "article" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "The Agent Environment Should Be a Lease",
    description:
      "Why I built Celln, and why it may become Sympozium's execution plane.",
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

export default function CellnExecutionPlanePage() {
  return (
    <div className="grid-lines min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
        <div className="mb-12">
          <div className="label mb-3">Development Notes · Execution</div>
          <h1 className="font-display text-4xl sm:text-5xl text-bone leading-[1.02]">
            The Agent Environment Should Be a Lease
          </h1>
          <p className="mt-3 text-base text-bone-dark/80">
            Why I built Celln, and where I hope it fits under Sympozium
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
            Alex Jones · August 2026 · Revised September 2026
          </div>
        </div>

        <Prose>
        <p>
          An agent often starts work by assembling a machine: finding tools, downloading
          packages, resolving dependencies, and discovering which permissions it has. Even when
          the sandbox starts quickly, preparing the environment can dominate a short task.
        </p>

        <p>
          Prebuilt images and caches already reduce that work. I built <a
          href="https://github.com/sympozium-ai/celln" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">Celln</a> to draw a clearer
          line: the host lends a task the tools it is allowed to run, with recorded identity
          and provenance, for the lifetime of the run. The environment becomes a lease on
          capabilities.
        </p>

        <H2>What the host lends</H2>

        <p>
          In Celln&apos;s terminology, a <strong>mote</strong> is a warm substrate at rest; a
          <strong>cell</strong> is a live execution environment with a particular set of tools.
          The host identifies those tools by content, supplies them read-only, and records what
          the cell received. The aim is to reuse prepared capabilities across runs while keeping
          each task&apos;s authority narrow.
        </p>

        <p>
          Isolation, immutable filesystems, and copy on write are not new.
          The question Celln asks is how to make the allowed executable and its dependencies
          the unit an operator can inspect, lend, and take back. A path is handy for finding a
          program; the content and policy behind it decide what the host is authorising.
        </p>

        <p>
          That line should make the common case easier to explain: this task got these tools,
          could write here, had these external permissions, and produced this result. It also
          means the host has to do its job. Verify the bytes, enforce the policy, and make
          failures visible.
        </p>

        <H2>Reproducible does not mean trusted</H2>

        <p>
          A model-written program remains untrusted after a successful build. Matching outputs
          from repeated builds provide evidence about reproducibility under that toolchain and
          environment. They do not prove that the source is benign, that the compiler is
          trustworthy, or that the program should inherit the permissions of a host-provided
          tool.
        </p>

        <p>
          The generated-code path described here uses a sealed KVM cell with a writable
          workspace and restricted filesystem and network access. That workspace matters: useful
          programs often need somewhere to write. The boundary is the scope of that authority,
          not a claim that the guest has no writable memory or files at all.
        </p>

        <p>
          The <a href="/blog/celln-deepseek-benchmark" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">boundary demonstration</a>
          exercises a few restrictions and a legitimate computation. It is a small engineering
          check, not a complete security evaluation. The authority distinction has to survive
          adversarial code and implementation defects, not just cooperative examples.
        </p>

        <H2>Where this sits under Sympozium</H2>

        <p>
          <a href="https://github.com/sympozium-ai/sympozium" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">Sympozium</a> is where I am
          exploring coordination: how agents share evidence, hand off work, and act under
          policy. Kubernetes gives useful control-plane machinery for that. Desired state and
          reconciliation are useful whether or not the thing underneath is a pod.
        </p>

        <p>
          A pod remains a reasonable choice for many workloads, including services and jobs. It
          can also use a read-only root filesystem; a pod does not have to be mutable. My
          concern is narrower: for bursts of small, generated tasks, creating and managing a
          separate pod may be more machinery than the run needs.
        </p>

        <p>
          The integration I want is a small contract. Sympozium submits an authorised run with a
          capability set, limits, and an output destination. Celln runs it and returns the
          outcome, provenance, and enforcement verdict. Sympozium owns the workflow; the
          executor checks the authority it is given and enforces it locally.
        </p>

        <p>
          That way coordination can stick around while execution stays short-lived. Same direction
          I discuss in the <a
          href="/blog/post-kubernetes-genai" className="text-bone underline underline-offset-2
          decoration-bone/40 hover:text-ember">post-Kubernetes field notes</a>, with Celln as
          something to try rather than a claim that every workload should move.
        </p>

        <H2>Where the lease gets difficult</H2>

        <p>
          Revocation is the first hard question. Removing a tool from a catalogue prevents
          future grants. Stopping a running cell from using authority it already holds is a
          different guarantee. The design has to specify when withdrawal takes effect, what
          happens to in-flight work, and what evidence an operator receives. It cannot undo an
          external effect that has already happened.
        </p>

        <p>
          Dependencies are another test. Useful software often expects shared libraries,
          language runtimes, and a large package graph. A capability should cover a verified
          dependency closure, not force every workload into one language. Preparing that closure
          once is attractive, but compatibility, patching, and storage costs still need
          accounting.
        </p>

        <p>
          Long-lived services push the idea harder. They need stable identity, state, upgrades,
          and an availability model. A short-lived cell is a natural place to start; a
          persistent API needs a real lifecycle, not just a longer timeout.
        </p>

        <p>
          The integration also needs to define retries. If an execution request times out, the
          control plane must learn whether the work ran before resubmitting it. A retained
          receipt and an idempotency contract are as important as a fast start.
        </p>

        <H2>What has to be true for this to matter</H2>

        <p>
          I want the user experience to stay small: request work through the agent interface,
          see it execute within a clear boundary, and inspect the retained result. The operator
          should be able to answer what ran and why it was permitted without reconstructing an
          environment from logs.
        </p>

        <p>
          Then the design has to earn its performance claims. Compare cold and warm startup,
          dependency preparation, memory sharing, total task time, and revocation behaviour
          against prebuilt containers and snapshot-based VMs. A faster fork is useful only if
          the rest of the lifecycle preserves the gain.
        </p>

        <p>
          My bet is that short agent tasks benefit from borrowing a defined capability set.
          Celln is the attempt to make that lease real, and to find out where it is simpler and
          cheaper than handing each task a general environment.
        </p>
      </Prose>

        <footer className="mt-12 text-center text-xs font-mono text-ash">
          <div className="mb-5 space-x-4">
            <A href="https://github.com/sympozium-ai/celln">Celln on GitHub</A>
            <A href="https://github.com/sympozium-ai/sympozium">Sympozium</A>
            <Link href="/blog/post-kubernetes-genai" className="text-bone underline underline-offset-2 decoration-bone/40 hover:bg-bone hover:text-cream transition-colors">Post-Kubernetes notes</Link>
          </div>
          <Link href="/blog" className="hover:text-bone transition">
            &larr; back to blog
          </Link>
        </footer>
      </article>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5 text-[15px] leading-[1.8] text-bone-dark">{children}</div>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl sm:text-3xl text-bone mt-12 mb-4">{children}</h2>;
}

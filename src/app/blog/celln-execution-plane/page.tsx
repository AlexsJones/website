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
            Why I built Celln, and where I hope it fits beneath Sympozium
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
            Alex Jones · August 2026
          </div>
        </div>

        <Prose>
          <p>
            The default way we run an agent is upside down. We give it a Linux
            image, let it install a package manager&apos;s worth of software, let
            it fetch whatever else it thinks it needs, and call the resulting
            machine a sandbox. Then we repeat that work for every agent in the
            fleet.
          </p>

          <p>
            Boot is no longer the expensive part. Snapshot forks and microVMs
            can create a hardware-isolated machine very quickly. The cost just
            moved: the agent now spends its first seconds materialising an
            environment. Downloading the same tools. Rebuilding the same
            dependencies. Expanding the same supply chain. Giving every new
            sandbox another copy of authority it did not need.
          </p>

          <p>
            I built <A href="https://github.com/sympozium-ai/celln">Celln</A>{" "}
            to try the inversion. A cell starts with almost nothing. The host
            lends it the verified tools required for one task as read-only
            memory. The agent experiences a normal enough execution
            environment; underneath, the toolchain belongs to the host and
            the authority is temporary.
          </p>

          <H2>Not another sandbox</H2>

          <p>
            Containers, jails, VMs and sandboxes are useful precedents. This
            is not a claim that isolation, read-only filesystems, or copy on
            write are new ideas. They are not. Celln is interested in a
            different boundary: making the thing an agent is allowed to run a
            first-class, measured, revocable capability.
          </p>

          <p>
            In Celln, a <strong>mote</strong> is a warm substrate at rest. A
            <strong> cell</strong> is a live, sealed mote with specific tools
            loaned into it. The host verifies bytes, records their provenance,
            maps them read-only, and keeps the ability to revoke them. The
            guest does not get to decide that a file path means executable
            authority; execution is gated by the content hash it actually
            sees.
          </p>

          <p>
            That gives us a few properties which are much harder to recover
            after handing out a general machine: tools can be shared rather
            than rebuilt, agent-authored code can be placed in a deliberately
            narrower lane, and a compromised tool can be removed from running
            cells rather than merely excluded from the next image build.
          </p>

          <H2>The important distinction</H2>

          <p>
            I do not think the answer is to pretend all code is trusted because
            it compiled successfully. A model-written program remains
            agent-authored. Celln can attest the bytes it built and reproduce
            the build, but that does not promote the program into the same
            authority lane as a host-provided tool.
          </p>

          <p>
            Today, generated programs run in an agent lane inside a sealed KVM
            cell: their executable and a writable workspace are loaned; other
            filesystem access and ambient network access are denied. A host
            that cannot provide the hardware boundary should say so. A weaker
            fallback must not wear the same security label.
          </p>

          <H2>Why this matters for Sympozium</H2>

          <p>
            <A href="https://github.com/sympozium-ai/sympozium">Sympozium</A>{" "}
            is a coordination plane. It decides how agents share context,
            hand off work, govern access, and form a system rather than a bag
            of isolated prompts. Kubernetes has been a sensible substrate for
            that work because it is very good at describing desired state,
            policy, and durable control loops.
          </p>

          <p>
            But a Kubernetes pod is a coarse execution primitive for a large
            fraction of agent work. It is a full image, a mutable environment,
            and a lifecycle designed around services that live much longer
            than a short piece of generated work. I do not want to throw away
            Kubernetes&apos; coordination semantics. I want to decouple them from
            the execution mechanism beneath them.
          </p>

          <p>
            The proposal is modest: a Sympozium run could resolve to a Celln
            execution request rather than always becoming a pod. Sympozium
            would still own the workflow, identity, policy and observability.
            Celln would own the short-lived execution boundary: the mote, the
            verified tool set, the cell lifecycle, bounded egress, outputs and
            the verdict. The control plane asks for a capability set; the
            execution plane returns a result and a record of what actually ran.
          </p>

          <H2>My bet: split the control plane from execution</H2>

          <p>
            I do not think Kubernetes disappears. It is an excellent control
            plane for declaring intent, reconciling durable state, applying
            policy, and giving operators a coherent view of a system. Those
            are hard-won ideas, and agent systems need more of them, not less.
          </p>

          <p>
            But the execution plane is changing underneath it. A task that
            exists for a few seconds should not necessarily inherit the
            lifecycle, image model, scheduler path, and mutable machine shape
            of a service that exists for months. Agent workloads make that
            mismatch painfully visible: they fan out quickly, run untrusted or
            semi-trusted code, need very particular capabilities, and then
            disappear.
          </p>

          <p>
            My bet is that the future stack splits cleanly. Kubernetes, or a
            Kubernetes-shaped system, remains the control plane: it says who
            may run, what policy applies, what work belongs together, and what
            happened. A specialised execution plane handles the physics of the
            run itself: fast isolation, capability delivery, page sharing,
            bounded egress, revocation, and disposal. The control plane should
            not need to know how a tool reached memory; the execution plane
            should not need to decide an organisation&apos;s workflow.
          </p>

          <p>
            That is the boundary I want Celln to test. Not &ldquo;replace
            Kubernetes,&rdquo; but make the execution primitive behind an AgentRun
            substantially smaller, faster, and more governable than a pod by
            default.
          </p>

          <H2>What I hope to prove</H2>

          <p>
            First, that the simple experience can be good. Install Celln,
            select the agent CLI you already use, ask a question directly, or
            ask it to build something and see a real sealed cell, a narrow
            authority boundary, output, and a retained run record. No new
            agent framework required.
          </p>

          <p>
            Second, that performance and security need not be a trade. The
            strongest version of this idea is not a VM fleet that happens to
            start quickly. It is a cache of verified capabilities that the
            host can lend to many cells, reclaim, and revoke with one control
            point.
          </p>

          <p>
            And finally, that the right seam is useful beyond one project.
            Celln is early and the persistent-service shape is unresolved. But
            I think agent infrastructure needs an execution plane with clearer
            primitives than image, shell, network, and hope. This is my attempt
            to build one.
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

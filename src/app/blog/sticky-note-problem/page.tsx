import Link from "next/link";

export const metadata = {
  title: "The Sticky-Note Problem · axjns.dev",
  description:
    "Why multi-agent AI is broken at the coordination layer, and what incident commanders figured out fifty years ago.",
  openGraph: {
    title: "The Sticky-Note Problem",
    description:
      "Why multi-agent AI is broken at the coordination layer, and what incident commanders figured out fifty years ago.",
    type: "article" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "The Sticky-Note Problem",
    description:
      "Why multi-agent AI is broken at the coordination layer, and what incident commanders figured out fifty years ago.",
  },
};

export default function StickyNoteProblemPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
      <div className="mb-12">
        <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
          Research · Sticky-Note Problem
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
          The Sticky-Note Problem
        </h1>
        <p className="mt-3 text-lg text-slate-400">
          Why Multi-Agent AI Is Broken at the Coordination Layer
        </p>
        <div className="mt-4 text-sm text-slate-400 font-mono">
          Alex Jones · May 2026
        </div>
      </div>

      <Prose>
        <H2>1. The Incident That Never Happened</H2>

        <p>
          It&apos;s 2:47 AM. A detection agent spots anomalous outbound traffic
          from a production database server - 40 GB of encrypted data heading to
          an unfamiliar IP in the Cayman Islands. The agent runs a threat
          classification model, assigns the incident a severity of 9.2, and
          generates a recommendation: isolate the server from the network.
        </p>

        <p>
          The containment agent, meanwhile, is three minutes away from executing
          a planned maintenance window that requires that exact server to be
          online. It has no idea the detection agent exists. The detection agent
          has no idea the containment agent exists. Both are receiving
          instructions from the same orchestration graph, but the graph&apos;s
          edges define <em>who talks to whom</em>, not{" "}
          <em>what everyone knows</em>.
        </p>

        <p>
          The containment agent proceeds. The database goes offline during a
          peak traffic period. The detection agent, seeing no network activity
          on its target, downgrades the incident to false positive. The 40 GB
          exfiltration completes while both agents are quietly moving on.
        </p>

        <p>
          This isn&apos;t a hypothetical. It&apos;s the default state of every
          multi-agent system built today.
        </p>

        <p>
          You don&apos;t need to be a security expert to see what went wrong.
          You don&apos;t need to be an LLM expert either. You just need to have
          watched a team of humans work through an incident, however briefly, to
          know that the <em>shared situational awareness</em> missing here is
          not a nice-to-have - it&apos;s the entire reason incident response
          works at all.
        </p>

        <p>
          Every framework on the market - LangGraph, CrewAI, AutoGen, Google
          A2A - gives you agents that send messages to each other. Messages.
          Strings of tokens that one agent serialises and another deserialises,
          with all the loss, ambiguity, and silence that implies. We are
          building systems of increasing intelligence with the equivalent of
          sticky notes passed between people in different rooms.
        </p>

        <p>
          There is a better way. We just haven&apos;t been looking for it in
          the right place.
        </p>

        <H2>2. The Problem: Everything Is Messaging</H2>

        <p>
          The dominant pattern for multi-agent LLM systems is{" "}
          <strong>orchestration</strong>. A planner decomposes a task, dispatches
          subtasks to specialised agents, and stitches the results back together.
          This pattern works fine until it doesn&apos;t - and &quot;until it
          doesn&apos;t&quot; is closer than most teams want to admit.
        </p>

        <p>
          Let&apos;s be generous to the frameworks and list what each actually
          provides:
        </p>

        <p>
          <strong>LangGraph</strong> gives you a directed graph with conditional
          edges over a centralised state object. You can express scatter-gather,
          pipeline parallelism, and subgraphs. But coordination is{" "}
          <em>top-down</em> - the graph author decides flow, and agents
          don&apos;t sense each other. Agents are graph nodes, not autonomous
          participants. There is no ambient sensing.
        </p>

        <p>
          <strong>CrewAI</strong> gives you role-based crews under a
          manager-worker pattern. The manager assigns tasks to roles, and roles
          execute sequentially. Memory is static. The manager doesn&apos;t
          actually coordinate - execution collapses to sequential task chaining,
          producing wrong tool calls and high latency. CrewAI&apos;s own
          postmortem on 1.7 billion workflows is frank about what&apos;s
          happening: <em>the gap isn&apos;t intelligence, it&apos;s architecture</em>.
        </p>

        <p>
          <strong>AutoGen</strong> (now merged into Microsoft&apos;s Agent
          Framework) gives you async event-driven patterns: sequential,
          concurrent, handoff, group chat, and Magentic-One. More capable than
          its predecessor, but still fundamentally message-passing.
          Pattern-based coordination is still explicit messaging, not ambient
          sharing.
        </p>

        <p>
          <strong>Google A2A</strong> (Agent-to-Agent Protocol) gives you typed
          task delegation, capability negotiation, and status updates over
          JSON-RPC 2.0. It&apos;s a message protocol, not a state protocol. It
          standardises <em>how agents talk</em>, not <em>what they share</em>.
        </p>

        <p>
          <strong>Anthropic MCP</strong> (Model Context Protocol) standardises
          agent-to-tool communication. It&apos;s foundational for tool access,
          but orthogonal to coordination. MCP is about agents reaching{" "}
          <em>outwards to tools</em>. Nobody has standardised how agents reach{" "}
          <em>sideways to each other</em>.
        </p>

        <p>
          That last sentence is the point. Every protocol, every framework,
          every architecture pattern solves a different problem. None solves the
          problem of a shared medium - the place where knowledge made by one
          agent becomes ambient knowledge for all of them.
        </p>

        <p>
          The result is predictable: agents maintain separate contexts,
          governance for one agent breaks for many, and debugging grows
          exponentially with team size.
        </p>

        <H2>3. The Evidence: The Gap Is Named and Measured</H2>

        <p>
          This isn&apos;t a feeling. It&apos;s been measured.
        </p>

        <p>
          The <strong>MAST study</strong> (Cemri et al., arXiv:2503.13657,
          ICLR 2025) compiled 1,600+ annotated failure traces across 7
          different frameworks. Three failure clusters emerged: system design,
          inter-agent misalignment, and task verification. The inter-agent
          cluster is where the interesting numbers live:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-5 text-slate-300">
          <li>
            <strong>13.2%</strong> of failures were reasoning-action
            mismatches - agents reasoned about one thing and acted on another.
          </li>
          <li>
            <strong>7.4%</strong> were task derailment - agents lost track of
            what they were supposed to do.
          </li>
          <li>
            <strong>6.8%</strong> were wrong-assumption failures - agents
            assumed facts about the world that weren&apos;t true.
          </li>
          <li>
            <strong>1.9%</strong> were ignoring other agents entirely.
          </li>
          <li>
            <strong>0.85%</strong> were information withholding.
          </li>
        </ul>

        <p>
          The root cause, identified by the authors, is that agents fail at{" "}
          <em>theory of mind</em> - they don&apos;t model what other agents
          need to know. And the failure mode is unstructured text ambiguity: one
          agent sends a message, the other interprets it, and something
          essential is lost in translation.
        </p>

        <img src="/mast-failures.svg" className="my-8 w-full rounded-lg border border-slate-800" alt="MAST study failure breakdown: 13.2% reasoning-action mismatch, 7.4% task derailment, 6.8% wrong-assumption, 1.9% ignoring agents, 0.85% information withholding" />

        <p>This is the coordination gap, quantified.</p>

        <p>
          The MAST study didn&apos;t invent the observation. It measured it. And
          the measurement is consistent with what any production team has
          experienced: agents that are smart individually and collectively
          broken.
        </p>

        <p>
          The blackboard architecture papers arriving in 2025
          (arXiv:2510.01285, arXiv:2507.01701) provide the strongest evidence
          that the problem is solvable. These papers revived the 1980s
          blackboard pattern for LLM multi-agent systems - instead of being
          assigned tasks, agents <em>autonomously decide</em> whether to
          contribute to a posted task on a shared knowledge board. The result:{" "}
          <strong>13-57% improvement</strong> over RAG and master-slave
          approaches on data-discovery tasks.
        </p>

        <p>
          The blackboard papers prove that shared-medium coordination works.
          They don&apos;t solve the full problem - the classical blackboard has
          a monolithic scheduler that reintroduces the orchestration
          anti-pattern - but they prove the direction is correct.
        </p>

        <H2>4. The Thesis</H2>

        <blockquote className="border-l-4 border-emerald-500/50 pl-6 py-2 my-8 text-slate-200 italic text-lg">
          Structured, gated, persistent communication is a prerequisite, not an
          accelerant, for collective intelligence.
        </blockquote>

        <p>Three claims unpack this:</p>

        <p>
          <strong>Structured.</strong> Free-form messages between agents leak
          meaning at every serialisation boundary. The medium between agents
          requires typed primitives - capability declarations, intent signals,
          structured claims - so that semantics survive transport. When
          you&apos;re shuffling strings of tokens between agents, every boundary
          is a potential failure point.
        </p>

        <p>
          <strong>Gated.</strong> Permeability must default to <em>deny</em>.
          Uncontrolled communication degrades outcomes - the MAST study showed
          that information withholding and ignoring other agents are real
          failure modes, and the token economics work (agentic tasks consume
          roughly 1000x more tokens than equivalent non-agentic tasks, with
          input tokens dominating the bill) makes it clear that every byte
          shipped between agents multiplies across every agent that reads it.
          The medium must make agents justify, by cost-benefit, every traversal.
        </p>

        <p>
          <strong>Persistent.</strong> The medium itself must outlive any single
          agent&apos;s session. Without persistence there is no compounding;
          without compounding there is no collective intelligence. This implies
          an append-only, event-sourced substrate with full provenance.
        </p>

        <p>
          The thesis reframes coordination from <em>messaging</em> to{" "}
          <em>medium</em>. The interesting object is not the message agents send
          each other; it is the shared field they live in.
        </p>

        <p>
          A useful way to think about it: biology has been solving this problem
          for 3.5 billion years. A cell doesn&apos;t send messages to its
          neighbours. It <em>senses</em> them. It reads chemical gradients,
          receptor states, quorum-sensing signals. It decides what to absorb and
          what to repel. It doesn&apos;t need a conductor - it needs a membrane.
        </p>

        <H2>5. The Architecture: Six Layers</H2>

        <p>
          The solution isn&apos;t a single component. It&apos;s a layered
          architecture - what I call the <strong>synthetic membrane</strong> -
          six conceptual layers that together provide what biology provides
          naturally: a shared, permeable boundary.
        </p>

        <img src="/architecture.svg" className="my-8 w-full rounded-lg border border-slate-800" alt="Six-layer synthetic membrane architecture: Governance, Discovery, Permeability, Shared Medium, Coordination, and Immune layers between agents" />

        <p>Here&apos;s what each layer does, in plain terms:</p>

        <p>
          <strong>Governance (L-1)</strong> is the outermost layer - circuit
          breakers that halt coordination when failure cascades exceed a
          threshold, human override mechanisms, dissent surfaces that present
          agent disagreement to humans rather than hiding it behind a consensus
          headline, and value-conflict detection for cross-provider deployments.
          Governance is not a constraint added on top; it&apos;s what makes
          adoption possible.
        </p>

        <p>
          <strong>Discovery (L0)</strong> answers the question: who can do what?
          Description-based discovery fails - semantic similarity to a
          self-reported capability statement doesn&apos;t predict whether an
          agent can actually perform a task. The membrane indexes agents by
          demonstrated behaviour: execution traces, cost profiles, success rates
          per task class. Routing decisions consult this registry; reputation
          updates flow back into it.
        </p>

        <p>
          <strong>Permeability (L1)</strong> is the membrane proper - the gates
          by which signals enter and leave each agent. It&apos;s field-level
          selective: an agent may accept the evidence field of a peer&apos;s
          claim while rejecting the conclusion field. It&apos;s default-deny: an
          agent works locally until a cost-benefit analysis justifies a
          traversal. The membrane provides the gate as a first-class service,
          not as agent-internal logic each developer must reinvent.
        </p>

        <p>
          <strong>Shared Medium (L2)</strong> is the cytoplasm - an immutable
          event log layered with CRDT documents for conflict-free concurrent
          writes. Every claim is written as an event with content-hash IDs and
          lineage pointers. This gives full provenance for every claim,
          mathematical convergence under concurrent writes, replayability for
          new agents joining mid-session, and a natural surface for failure
          attribution. The event graph <em>is</em> the causal graph.
        </p>

        <p>
          <strong>Coordination (L3)</strong> holds the swarm primitives: task
          broadcast and claim, quorum-sensing thresholds, dynamic group
          formation and dissolution, and consensus computation. Coordination is
          multi-mode - shared state, ad-hoc pairwise messaging, and broadcast
          are all first-class options; agents choose per interaction.
        </p>

        <p>
          <strong>Immune (cross-cutting)</strong> threads through every layer:
          behavioural anomaly detection, cytokine-style gossip propagation
          across the coordination layer, memory cells in the registry, and
          proportional response via gated permeability. Static rules will be
          routed around; defence must be adaptive.
        </p>

        <p>
          The architecture isn&apos;t abstract. It&apos;s the direct response to
          the failures measured by MAST, the limitations identified by framework
          authors, and the partial solutions offered by the blackboard papers.
        </p>

        <H2>6. Cross-Domain Insight: The Incident Commanders Already Knew</H2>

        <p>
          Human incident management has been solving this exact problem for over
          50 years. The <strong>Incident Command System (ICS)</strong> and the{" "}
          <strong>National Incident Management System (NIMS)</strong> emerged
          from wildfire response in the 1970s and were codified after 9/11.
          They solved a problem that any multi-agent team faces: how do multiple
          specialised actors coordinate under pressure without a single
          conductor?
        </p>

        <p>
          The answer, distilled to its essentials, maps almost one-to-one onto
          the membrane layers:
        </p>

        <p>
          <strong>Shared situational awareness</strong> is the ICS equivalent
          of the Shared Medium layer. Every responder - fire, law enforcement,
          EMS, utilities - works from the same incident command post, the same
          situational board, the same resource list. Information isn&apos;t
          passed between agencies; it&apos;s posted where everyone can see it.
        </p>

        <p>
          <strong>Structured handoffs</strong> are the Permeability layer. ICS
          defines explicit transfer-of-command procedures: a briefing, a status
          update, a confirmation. No agency assumes the other knows what they
          know. The membrane&apos;s field-level selectivity is the computational
          analogue: you share what your role needs others to have, and you
          receive what your role needs from others.
        </p>

        <p>
          <strong>Role boundaries</strong> are Discovery and Governance. ICS
          assigns roles based on demonstrated capability, not self-declared
          expertise. The Incident Commander, Operations Section Chief, Planning
          Section Chief, Logistics, Finance - each role has a defined scope, a
          defined authority, and a defined handoff boundary. The membrane&apos;s
          behavioural registry serves the same function: index agents by
          demonstrated capability, not self-report.
        </p>

        <p>
          <strong>Escalation protocols</strong> are the Governance and Immune
          layers. When an incident exceeds the current commander&apos;s
          authority, there&apos;s a defined escalation path. Circuit breakers
          in the membrane serve the same function: when failure cascades exceed
          a threshold, coordination halts and a human is notified.
        </p>

        <p>
          <strong>Incident Action Plans</strong> are the Coordination layer. ICS
          produces a structured plan that every responder follows, with clear
          objectives, assignments, and timelines. The membrane&apos;s task
          broadcast and claim mechanism serves the same function: broadcast
          objectives, agents claim tasks based on capability, progress is
          tracked in the shared medium.
        </p>

        <img src="/ics-membrane-map.svg" className="my-8 w-full rounded-lg border border-slate-800" alt="Mapping from ICS/NIMS concepts to Synthetic Membrane layers: Shared Situational Awareness to L2, Structured Handoffs to L1, Role Boundaries to L0/L-1, Escalation to Governance/Immune, Incident Action Plans to L3" />

        <p>
          The parallel isn&apos;t coincidental. ICS and NIMS emerged from the
          same observation that drives the membrane thesis:{" "}
          <em>
            more actors do not produce better outcomes without structured
            coordination
          </em>
          . The systems were designed by humans who experienced the cost of
          unstructured coordination - the 1970s wildfires that burned because
          fire crews from different agencies couldn&apos;t agree on who was in
          charge.
        </p>

        <p>We&apos;re about to make the same mistake with agents.</p>

        <H2>7. The Build: Sympozium</H2>

        <p>
          Theory is cheap. Implementation is where the thesis gets tested.
        </p>

        <p>
          <strong>Sympozium</strong> is the working implementation of the
          synthetic membrane - a coordination layer designed for production
          multi-agent systems. It&apos;s built on Kubernetes, because the
          infrastructure problems of multi-agent coordination (state management,
          discovery, governance) are the same infrastructure problems that
          Kubernetes solved for container orchestration: the hard part
          isn&apos;t running individual components; it&apos;s making them work
          together.
        </p>

        <p>
          The initial focus is on operational coordination - incident response
          scenarios where multiple agents need to follow hypotheses, share
          evidence, and execute procedures without stepping on each other.
          Incident management is the ideal validation case because the
          coordination requirements are well-understood (thanks to ICS/NIMS)
          and the failure modes are well-documented (thanks to MAST).
        </p>

        <p>
          Sympozium implements the membrane&apos;s layered architecture as a set
          of composable primitives:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-5 text-slate-300">
          <li>
            A <strong>shared medium</strong> backed by an immutable event log
            with CRDT convergence
          </li>
          <li>
            A <strong>permeability gate</strong> that evaluates whether an agent
            should read or write a claim
          </li>
          <li>
            A <strong>discovery registry</strong> that indexes agents by
            behavioural evidence
          </li>
          <li>
            <strong>Coordination primitives</strong> for task broadcast, claim,
            and quorum sensing
          </li>
          <li>
            <strong>Governance controls</strong> for circuit breakers and human
            override
          </li>
          <li>
            <strong>Immune layer</strong> for anomaly detection and failure
            attribution
          </li>
        </ul>

        <p>
          The goal isn&apos;t to replace LangGraph, CrewAI, or AutoGen.
          It&apos;s to sit beneath them - to provide the shared medium that
          those frameworks currently lack, so that agents built on different
          frameworks can coordinate without rewriting their internal logic.
        </p>

        <p>
          Think of it the way Kubernetes relates to Docker. Docker gave you
          containers. Kubernetes gave you the coordination layer that made
          containers useful at scale. Sympozium wants to be the Kubernetes for
          agent coordination.
        </p>

        <H2>8. The Open Problem</H2>

        <p>
          This isn&apos;t a solved problem. It&apos;s not even a
          well-formulated one, in most communities.
        </p>

        <p>
          The academic literature has the MAST taxonomy and the blackboard
          revival, but no unified framework. The industry has frameworks that
          solve different halves of the problem and leave the coordination gap
          wide open. The incident management world solved it for humans decades
          ago, but nobody translated those patterns to agents.
        </p>

        <p>The evidence converges from three directions:</p>

        <ol className="list-decimal pl-6 space-y-2 my-5 text-slate-300">
          <li>
            <strong>Empirical:</strong> MAST measures coordination failures at
            scale - 1,600+ traces showing that inter-agent misalignment is a
            primary failure cluster.
          </li>
          <li>
            <strong>Production:</strong> Framework authors admit their
            architectures are insufficient - CrewAI&apos;s postmortem,
            LangGraph debugging complaints, AutoGen&apos;s merge into a new
            framework.
          </li>
          <li>
            <strong>Academic:</strong> Blackboard architectures show that
            shared-medium coordination works, with 13-57% improvement over
            message-passing approaches.
          </li>
        </ol>

        <p>
          And from a fourth direction, one that&apos;s rarely mentioned in AI
          circles but should be:
        </p>

        <ol className="list-decimal pl-6 space-y-2 my-5 text-slate-300" start={4}>
          <li>
            <strong>Operational:</strong> Human incident management
            (ICS/NIMS/SRE) has solved this exact problem for 50+ years, and the
            solution maps directly to a layered membrane architecture.
          </li>
        </ol>

        <p>
          The synthetic membrane is the hypothesis that brings these threads
          together. It&apos;s not a rejection of any existing approach -
          it&apos;s a recognition that messaging and orchestration are necessary
          but insufficient, and that the medium <em>between</em> agents is the
          substrate that needs building.
        </p>

        <p>
          If you&apos;re building multi-agent systems, the question isn&apos;t
          whether you need a coordination layer. The question is whether
          you&apos;ll build one yourself, or wait until the 2:47 AM incident
          happens and discover you needed it anyway.
        </p>

        <p className="mt-8 text-sm text-slate-500 italic">
          This article is the first in a series exploring the synthetic membrane
          architecture. The position paper is available via the links below. The
          Sympozium implementation is in early development.
        </p>

        <H2>References</H2>

        <ul className="list-disc pl-6 space-y-2 my-5 text-slate-400 text-sm">
          <li>
            Cemri et al., <em>Why Do Multi-Agent LLM Systems Fail? The MAST
            Study</em>, arXiv:2503.13657 (ICLR 2025)
          </li>
          <li>
            Shen &amp; Shen, <em>DOVA: Blackboard Transparency for Multi-Agent
            Systems</em>, arXiv:2603.13327
          </li>
          <li>
            arXiv:2510.01285, <em>LLM-Based Multi-Agent Blackboard System</em>{" "}
            (Oct 2025)
          </li>
          <li>
            arXiv:2507.01701, <em>Exploring Advanced LLM Multi-Agent Systems
            Based on Blackboard Architecture</em> (Jul 2025)
          </li>
          <li>
            Tran et al., <em>Multi-Agent Collaboration Mechanisms: A Survey</em>,
            arXiv:2501.06322
          </li>
          <li>
            Li et al., <em>The Superminds Test: Two Million Agents, Zero
            Collective Intelligence</em> (2026)
          </li>
          <li>
            Bai et al., <em>Agent Token Economics</em>, arXiv:2602.XXXXXX
            (1000x token overhead)
          </li>
          <li>
            CrewAI, <em>How to Build Agentic Systems: The Missing
            Architecture</em> (blog postmortem)
          </li>
          <li>
            Federal Emergency Management Agency, <em>National Incident
            Management System (NIMS)</em>, 3rd Edition (2017)
          </li>
          <li>
            National Interagency Fire Center, <em>Incident Command System
            (ICS)</em> Training Materials
          </li>
        </ul>
      </Prose>

      <div className="mt-16 border-t border-slate-800 pt-8 grid sm:grid-cols-3 gap-4 font-mono text-sm">
        <a
          href="https://github.com/sympozium-ai/sympozium"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/50 hover:bg-slate-900 transition"
        >
          <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
            Implementation
          </div>
          <div className="text-slate-200">
            sympozium-ai / sympozium
          </div>
          <div className="text-slate-500 text-xs mt-1">github.com &rarr;</div>
        </a>
        <a
          href="https://github.com/AlexsJones/research"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/50 hover:bg-slate-900 transition"
        >
          <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
            Research
          </div>
          <div className="text-slate-200">
            AlexsJones / research
          </div>
          <div className="text-slate-500 text-xs mt-1">github.com &rarr;</div>
        </a>
        <Link
          href="/research/synthetic-membrane"
          className="block rounded-lg border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/50 hover:bg-slate-900 transition"
        >
          <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
            Paper
          </div>
          <div className="text-slate-200">Full paper, read on site</div>
          <div className="text-slate-500 text-xs mt-1">axjns.dev &rarr;</div>
        </Link>
      </div>

      <footer className="mt-12 text-center text-xs font-mono text-slate-500">
        <Link href="/blog" className="hover:text-emerald-300 transition">
          &larr; back to blog
        </Link>
      </footer>
    </article>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-[17px] leading-[1.75] text-slate-300">
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold tracking-tight text-slate-100 mt-12 mb-4">
      {children}
    </h2>
  );
}

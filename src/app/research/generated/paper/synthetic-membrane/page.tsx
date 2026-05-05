import Link from "next/link";

export const metadata = {
  title: "The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems — axjns.dev",
  description: "Research content from the synthetic membrane project.",
  openGraph: {
    title: "The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems",
    description: "Research content from the synthetic membrane project.",
    type: "article",
  },
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <header className="border-b border-slate-800/80 bg-[#0d1117]/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm font-mono">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition">
            ← axjns.dev
          </Link>
          <div className="flex gap-4 text-slate-400">
            <Link href="/research" className="hover:text-emerald-300 transition">
              research
            </Link>
            <a
              href="https://github.com/AlexsJones/research"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition"
            >
              github
            </a>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            {type === 'paper' ? 'Paper' : 'Article'} · Synthetic Membrane
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
            The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems
          </h1>
          <div className="mt-4 text-sm text-slate-400 font-mono">
            AlexsJones · May 5, 2026
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 mb-8">
          <p className="text-sm text-slate-400">
            This content is sourced directly from the research repo.{' '}
            <a
              href="https://github.com/AlexsJones/research"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300"
            >
              View source →
            </a>
          </p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none">
          <hr key={"0"} className="border-slate-800 my-8" />
<p key={"1"} className="text-slate-300 leading-relaxed mb-4">title: &quot;The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems&quot;</p>
<p key={"2"} className="text-slate-300 leading-relaxed mb-4">author: AlexsJones</p>
<p key={"3"} className="text-slate-300 leading-relaxed mb-4">date: April 2026</p>
<hr key={"4"} className="border-slate-800 my-8" />
<h1 key={"6"} className="text-3xl font-bold text-slate-100 mb-4 mt-8">The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems</h1>
<p key={"8"} className="text-slate-300 leading-relaxed mb-4"><strong>Author:</strong> AlexsJones</p>
<p key={"9"} className="text-slate-300 leading-relaxed mb-4"><strong>Date:</strong> April 2026</p>
<hr key={"11"} className="border-slate-800 my-8" />
<h2 key={"13"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">Abstract</h2>
<p key={"15"} className="text-slate-300 leading-relaxed mb-4">Multi-agent LLM systems have proliferated faster than the substrate that connects them. Today&#039;s agents communicate through narrow channels: tool calls (MCP), point-to-point delegation messages (A2A), or framework-specific orchestration graphs. None provides what biological systems take for granted: a shared, permeable boundary through which neighbours sense one another, exchange digested signals, and coordinate without a central conductor. Recent empirical work, most notably the <em>Superminds Test</em> on a two-million-agent society, shows that scale alone does not produce collective intelligence. This position paper argues that the missing substrate is a <strong>synthetic membrane</strong>: a shared semi-permeable layer between agents providing discovery, selective state sharing, gated coordination, and governance as first-class primitives. Drawing on biological analogues, distributed systems theory, and recent multi-agent research, we propose a six-layer architecture, identify the design constraints (most notably token economics and default-deny permeability) that practical implementations must respect, and sketch a sixteen-week path to a working prototype.</p>
<hr key={"17"} className="border-slate-800 my-8" />
<h2 key={"19"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">1. Introduction</h2>
<p key={"21"} className="text-slate-300 leading-relaxed mb-4">In the three years since LLM agents became practical, the dominant pattern for multi-agent work has been <em>orchestration</em>: a planner decomposes a task, dispatches subtasks to specialised agents, and stitches the results back together. Framework providers (LangGraph, AutoGen, CrewAI) have built rich vocabularies for this pattern. Anthropic&#039;s Model Context Protocol (MCP) [Anthropic, 2024] has standardised how an agent reaches outwards to tools. C4AI&#039;s A2A and the emerging Agent Network Protocol (ANP) standardise how an agent reaches outwards to <em>another agent</em>.</p>
<p key={"23"} className="text-slate-300 leading-relaxed mb-4">What is conspicuously missing is the medium <em>between</em> agents. Each agent still inhabits its own context window. When two agents need to share understanding, they pass messages. Strings of tokens that one party serialises and the other deserialises, with all the loss that implies. There is no shared cytoplasm. There is no place where a discovery made by Agent A becomes ambient knowledge for Agents B and C without an explicit hand-off. There is no mechanism for an agent to <em>sense</em> that other agents nearby are working on a related problem.</p>
<p key={"25"} className="text-slate-300 leading-relaxed mb-4">The cost of this absence is becoming visible. Bai et al. [2026] report that agentic tasks consume roughly 1000× more tokens than equivalent non-agentic tasks, with input tokens (context shipped between turns and between agents) dominating the bill. Li et al. [2026a] show that, even at the scale of two million participants, agent societies fail at joint reasoning, information synthesis, and basic coordination. The diagnosis is consistent: agents do not share state, they shuffle it, and shuffling does not compound into intelligence.</p>
<p key={"27"} className="text-slate-300 leading-relaxed mb-4">This paper proposes the <strong>synthetic membrane</strong> as the missing substrate. Section 2 surveys the existing landscape. Section 3 states the membrane thesis. Section 4 presents a six-layer architecture with an ASCII diagram. Section 5 collects key findings from the literature that shape the design. Section 6 sketches an implementation path. Sections 7 and 8 discuss open questions and conclude.</p>
<hr key={"29"} className="border-slate-800 my-8" />
<h2 key={"31"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">2. Background</h2>
<h3 key={"33"} className="text-xl font-bold text-slate-100 mb-2 mt-8">2.1 Protocols Adjacent to the Problem</h3>
<p key={"35"} className="text-slate-300 leading-relaxed mb-4"><strong>MCP (Model Context Protocol)</strong> [Anthropic, 2024] standardises agent-to-tool communication. An MCP server is a passive endpoint; it does not know about other agents and is not designed to mediate between them.</p>
<p key={"37"} className="text-slate-300 leading-relaxed mb-4"><strong>A2A (Agent-to-Agent Protocol)</strong> and <strong>ANP</strong> standardise agent-to-agent message passing: typed task delegation, capability negotiation, status updates. They are message protocols, not state protocols.</p>
<p key={"39"} className="text-slate-300 leading-relaxed mb-4"><strong>Mesh Memory Protocol (MMP)</strong> [Xu, 2026] is the work most adjacent to the membrane thesis. MMP defines four primitives:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"41"} className="ml-4 text-slate-300">**CAT7**, a seven-field schema for Cognitive Memory Blocks (CMBs).</li>
<li key={"42"} className="ml-4 text-slate-300">**SVAF**, a Selective Field Acceptance Filter that evaluates incoming CMBs field-by-field against role-indexed anchors.</li>
<li key={"43"} className="ml-4 text-slate-300">**Inter-agent lineage**, content-hash keys carrying parents and ancestors so every claim is traceable to source.</li>
<li key={"44"} className="ml-4 text-slate-300">**Remix**, when accepting a peer&#039;s CMB, the agent stores only its own role-evaluated interpretation, never the raw peer signal.</li></ul>
<p key={"46"} className="text-slate-300 leading-relaxed mb-4">MMP is in production across three reference deployments. We treat it as a strong candidate for the membrane&#039;s semantic layer.</p>
<h3 key={"48"} className="text-xl font-bold text-slate-100 mb-2 mt-8">2.2 Framework-Level Approaches</h3>
<p key={"50"} className="text-slate-300 leading-relaxed mb-4">LangGraph offers a centralised state graph. AutoGen provides multi-agent conversation patterns with no shared memory. CrewAI imposes top-down role assignment. Camel and ChatDev focus on dialogue patterns. Each works within its own ecosystem; none addresses cross-framework coordination, and none provides the <em>ambient</em> state-sharing the membrane proposes. A LangGraph agent and an AutoGen agent share neither schema nor transport. Interoperability today means rewriting one to match the other.</p>
<h3 key={"52"} className="text-xl font-bold text-slate-100 mb-2 mt-8">2.3 Patterns from Distributed Systems</h3>
<p key={"54"} className="text-slate-300 leading-relaxed mb-4">The blackboard pattern, pub/sub messaging (NATS, Kafka, Redis), gossip protocols (à la Dynamo), and CRDTs (Yjs, Automerge) [Shapiro et al., 2011] give us building blocks. CRDTs in particular solve the hardest part of concurrent shared state (convergence under conflicting writes) mathematically rather than operationally. Event sourcing offers an immutable, replayable substrate suited to the membrane&#039;s provenance and audit needs.</p>
<h3 key={"56"} className="text-xl font-bold text-slate-100 mb-2 mt-8">2.4 Biological Inspiration</h3>
<p key={"58"} className="text-slate-300 leading-relaxed mb-4">Cell membranes are selectively permeable: they decide what crosses based on receptors, gradients, and active transport. Bacterial <strong>quorum sensing</strong> triggers collective behaviour once a signal concentration crosses a threshold. The vertebrate <strong>immune system</strong> maintains adaptive, distributed defence with memory cells and cytokine signalling. Mycelial networks transfer resources and information between disconnected organisms. These systems achieve coordination without a conductor; they do so through structured, gated, persistent media. They are the closest functional analogues to what multi-agent AI systems lack.</p>
<h3 key={"60"} className="text-xl font-bold text-slate-100 mb-2 mt-8">2.5 Empirical Pressure</h3>
<p key={"62"} className="text-slate-300 leading-relaxed mb-4">Two recent empirical results motivate this work directly:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"64"} className="ml-4 text-slate-300">**Superminds Test** [Li et al., 2026a]: 2M+ agents on MoltBook, evaluated across joint reasoning, information synthesis, and basic interaction. Result: no emergent collective intelligence; threads rarely extend beyond a single reply; trivial coordination tasks fail.</li>
<li key={"65"} className="ml-4 text-slate-300">**Agent token economics** [Bai et al., 2026]: 1000× token overhead for agentic tasks; input tokens dominate; accuracy peaks at intermediate cost; same task varies 30× in cost across runs; models cannot predict their own costs (r ≤ 0.39).</li></ul>
<p key={"67"} className="text-slate-300 leading-relaxed mb-4">The first tells us that more agents do not produce more intelligence. The second tells us we cannot afford to find out by adding more communication. Both pressures point at the same gap: a substrate that mediates <em>what</em> and <em>when</em> agents share.</p>
<hr key={"69"} className="border-slate-800 my-8" />
<h2 key={"71"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">3. The Membrane Thesis</h2>
<p key={"73"} className="text-slate-300 leading-relaxed mb-4">We state the thesis baldly:</p>
<blockquote key={"75"} className="border-l-4 border-emerald-500 pl-4 italic text-slate-300 my-4">**Structured, gated, persistent communication is a prerequisite, not an accelerant, for collective intelligence in multi-agent systems.**</blockquote>
<p key={"77"} className="text-slate-300 leading-relaxed mb-4">Three claims unpack this:</p>
<p key={"79"} className="text-slate-300 leading-relaxed mb-4">1. <strong>Structured.</strong> Free-form messages between agents leak meaning at every serialisation boundary. The membrane requires typed primitives (CMBs, capability declarations, intent signals, dissent records) so that semantics survive transport.</p>
<p key={"80"} className="text-slate-300 leading-relaxed mb-4">2. <strong>Gated.</strong> Permeability must default to <em>deny</em>. The token-economics finding [Bai et al., 2026] and the gated-coordination work [Wang et al., 2026] both show that uncontrolled communication degrades outcomes. The membrane must make the agent justify, by cost-benefit, every traversal.</p>
<p key={"81"} className="text-slate-300 leading-relaxed mb-4">3. <strong>Persistent.</strong> The medium itself must outlive any single agent&#039;s session. Without persistence there is no compounding; without compounding there is no collective intelligence. This implies an event-sourced, append-only substrate with full provenance.</p>
<p key={"83"} className="text-slate-300 leading-relaxed mb-4">The membrane thesis reframes coordination from <em>messaging</em> to <em>medium</em>. The interesting object is not the message agents send each other; it is the shared field they live in.</p>
<p key={"85"} className="text-slate-300 leading-relaxed mb-4">A useful test of the thesis is the [Li et al., 2026a] tier framework: a membrane-connected swarm should outperform individual frontier models on joint reasoning, succeed at information synthesis across the population, and sustain meaningful interaction over many turns. If the membrane delivers none of these, the thesis is wrong. If it delivers all three, the substrate gap was the bottleneck.</p>
<hr key={"87"} className="border-slate-800 my-8" />
<h2 key={"89"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">4. Architecture</h2>
<p key={"91"} className="text-slate-300 leading-relaxed mb-4">We propose a six-layer architecture. Layers are conceptual. A real implementation will collapse some. But the separation clarifies responsibility.</p>
<p key={"93"} className="text-slate-300 leading-relaxed mb-4"><code className="bg-slate-800 px-1 rounded text-sm">`</code></p>
<p key={"94"} className="text-slate-300 leading-relaxed mb-4">+---------------------------------------------------------------+</p>
<p key={"95"} className="text-slate-300 leading-relaxed mb-4">|                     L-1: GOVERNANCE                            |</p>
<p key={"96"} className="text-slate-300 leading-relaxed mb-4">|      circuit breakers | human override | dissent surface       |</p>
<p key={"97"} className="text-slate-300 leading-relaxed mb-4">|         value-conflict detection | accountability log          |</p>
<p key={"98"} className="text-slate-300 leading-relaxed mb-4">+---------------------------------------------------------------+</p>
<p key={"99"} className="text-slate-300 leading-relaxed mb-4">|                     L0:  DISCOVERY / REGISTRY                  |</p>
<p key={"100"} className="text-slate-300 leading-relaxed mb-4">|     behavioural index | execution traces | identity / auth     |</p>
<p key={"101"} className="text-slate-300 leading-relaxed mb-4">|              capability vectors | reputation                   |</p>
<p key={"102"} className="text-slate-300 leading-relaxed mb-4">+---------------------------------------------------------------+</p>
<p key={"103"} className="text-slate-300 leading-relaxed mb-4">|                     L1:  PERMEABILITY                          |</p>
<p key={"104"} className="text-slate-300 leading-relaxed mb-4">|       expose / subscribe | SVAF field-level filters            |</p>
<p key={"105"} className="text-slate-300 leading-relaxed mb-4">|       gated permeability (default-deny, cost-benefit)          |</p>
<p key={"106"} className="text-slate-300 leading-relaxed mb-4">+---------------------------------------------------------------+</p>
<p key={"107"} className="text-slate-300 leading-relaxed mb-4">|                     L2:  SHARED MEDIUM                         |</p>
<p key={"108"} className="text-slate-300 leading-relaxed mb-4">|      CRDT document store + immutable event log                 |</p>
<p key={"109"} className="text-slate-300 leading-relaxed mb-4">|      CAT7 CMBs | lineage hashes | semantic + structured index  |</p>
<p key={"110"} className="text-slate-300 leading-relaxed mb-4">+---------------------------------------------------------------+</p>
<p key={"111"} className="text-slate-300 leading-relaxed mb-4">|                     L3:  COORDINATION                          |</p>
<p key={"112"} className="text-slate-300 leading-relaxed mb-4">|     quorum sensing | task claim / release | swarm formation    |</p>
<p key={"113"} className="text-slate-300 leading-relaxed mb-4">|     consensus (PAC + dissent) | multi-mode coordination        |</p>
<p key={"114"} className="text-slate-300 leading-relaxed mb-4">+---------------------------------------------------------------+</p>
<p key={"115"} className="text-slate-300 leading-relaxed mb-4">|                     IMMUNE / OBSERVABILITY (cross-cutting)     |</p>
<p key={"116"} className="text-slate-300 leading-relaxed mb-4">|   anomaly detection | cytokine gossip | OTel traces &amp; metrics  |</p>
<p key={"117"} className="text-slate-300 leading-relaxed mb-4">|         memory cells | failure attribution graphs              |</p>
<p key={"118"} className="text-slate-300 leading-relaxed mb-4">+---------------------------------------------------------------+</p>
<p key={"119"} className="text-slate-300 leading-relaxed mb-4">                            ^</p>
<p key={"120"} className="text-slate-300 leading-relaxed mb-4">                            |  (agents speak MCP / A2A / native)</p>
<p key={"121"} className="text-slate-300 leading-relaxed mb-4">                +-------+   +   +-------+   +-------+</p>
<p key={"122"} className="text-slate-300 leading-relaxed mb-4">                | Agent |       | Agent |   | Agent |</p>
<p key={"123"} className="text-slate-300 leading-relaxed mb-4">                |   A   |       |   B   |   |   C   |</p>
<p key={"124"} className="text-slate-300 leading-relaxed mb-4">                +-------+       +-------+   +-------+</p>
<p key={"125"} className="text-slate-300 leading-relaxed mb-4"><code className="bg-slate-800 px-1 rounded text-sm">`</code></p>
<h3 key={"127"} className="text-xl font-bold text-slate-100 mb-2 mt-8">4.1 Layer −1: Governance</h3>
<p key={"129"} className="text-slate-300 leading-relaxed mb-4">The outermost layer is governance. It exists because [Li et al., 2026b] shows that humans dangerously over-trust agent consensus, and [Zhang et al., 2026] shows static defences fail against adaptive attackers. Governance provides:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"131"} className="ml-4 text-slate-300">**Circuit breakers** that halt coordination when failure cascades exceed a threshold.</li>
<li key={"132"} className="ml-4 text-slate-300">**Human override** mechanisms tied to the accountability log.</li>
<li key={"133"} className="ml-4 text-slate-300">**Dissent surface** that presents agent disagreement to humans rather than hiding it behind a consensus headline.</li>
<li key={"134"} className="ml-4 text-slate-300">**Value-conflict detection** for cross-provider deployments where agents may carry incompatible alignments.</li></ul>
<p key={"136"} className="text-slate-300 leading-relaxed mb-4">Governance is not a constraint added on top; it is what makes adoption possible.</p>
<h3 key={"138"} className="text-xl font-bold text-slate-100 mb-2 mt-8">4.2 Layer 0: Discovery and Registry</h3>
<p key={"140"} className="text-slate-300 leading-relaxed mb-4">Before agents can communicate, they must find each other. [Chen et al., 2026] (AgentSearchBench) shows that description-based discovery fails. Semantic similarity to a self-reported capability statement does not predict whether the agent can actually perform the task. The membrane indexes agents by <strong>demonstrated behaviour</strong>: execution traces, cost profiles, success rates per task class, and cryptographic identity. Routing decisions consult this registry; reputation updates flow back into it.</p>
<h3 key={"142"} className="text-xl font-bold text-slate-100 mb-2 mt-8">4.3 Layer 1: Permeability</h3>
<p key={"144"} className="text-slate-300 leading-relaxed mb-4">Permeability is the membrane proper: the gates by which signals enter and leave each agent. Following MMP&#039;s SVAF [Xu, 2026], permeability is <em>field-level</em>: an agent may accept the <code className="bg-slate-800 px-1 rounded text-sm">evidence</code> field of a peer&#039;s CMB while rejecting the <code className="bg-slate-800 px-1 rounded text-sm">conclusion</code> field. Following [Wang et al., 2026], permeability is <strong>default-deny</strong>: an agent works locally until a cost-benefit analysis justifies a traversal. The membrane provides the gate as a first-class service (&quot;evaluate whether to broadcast&quot;), not as agent-internal logic each developer must reinvent.</p>
<h3 key={"146"} className="text-xl font-bold text-slate-100 mb-2 mt-8">4.4 Layer 2: Shared Medium</h3>
<p key={"148"} className="text-slate-300 leading-relaxed mb-4">The shared medium is the cytoplasm. We propose an immutable event log layered with CRDT documents. CMBs (using MMP&#039;s CAT7 schema) are written as events with content-hash IDs and lineage pointers; CRDTs handle convergence under concurrent writes; a vector index plus a structured index serve semantic and relational queries. This combination gives:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"150"} className="ml-4 text-slate-300">Full provenance for every claim (event sourcing).</li>
<li key={"151"} className="ml-4 text-slate-300">Mathematically guaranteed convergence (CRDTs).</li>
<li key={"152"} className="ml-4 text-slate-300">Replayability for new agents joining mid-session.</li>
<li key={"153"} className="ml-4 text-slate-300">A natural surface for failure attribution (the event graph *is* the causal graph).</li></ul>
<h3 key={"155"} className="text-xl font-bold text-slate-100 mb-2 mt-8">4.5 Layer 3: Coordination</h3>
<p key={"157"} className="text-slate-300 leading-relaxed mb-4">The coordination layer holds the swarm primitives: task broadcast and claim, quorum-sensing thresholds, dynamic group formation and dissolution, and consensus computation. [Patel et al., 2026] (PAC-Consensus) provides a learning-theoretic basis for computing consensus intervals with formal guarantees; we pair this with the dissent-presentation requirement from §4.1. Coordination is <strong>multi-mode</strong>, informed by [Liu et al., 2026] (DM3Nav), which demonstrates that decentralised coordination without shared state can match centralised baselines on the right tasks. The membrane offers shared state, ad-hoc pairwise messaging, and broadcast as first-class options; agents choose per interaction.</p>
<h3 key={"159"} className="text-xl font-bold text-slate-100 mb-2 mt-8">4.6 Cross-Cutting: Immune and Observability</h3>
<p key={"161"} className="text-slate-300 leading-relaxed mb-4">Two concerns thread through every layer:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"163"} className="ml-4 text-slate-300">**Immune defence**, modelled on the vertebrate immune system: behavioural anomaly detection at L0/L1, cytokine-style gossip propagation across L3, memory cells in the registry, proportional response via gated permeability. [Zhang et al., 2026]&#039;s adversarial co-evolution result requires *adaptive* defence; static rules will be routed around.</li>
<li key={"164"} className="ml-4 text-slate-300">**Observability**, emitting OpenTelemetry-compatible traces, metrics, and structured logs. Without this, multi-agent coordination is a black box; with it, failure attribution [Sun et al., 2026; Kumar et al., 2026; Lopez et al., 2026] becomes tractable because the membrane already holds the causal graph.</li></ul>
<hr key={"166"} className="border-slate-800 my-8" />
<h2 key={"168"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">5. Key Findings That Shape the Design</h2>
<p key={"170"} className="text-slate-300 leading-relaxed mb-4">The architecture is not derived a priori; it is shaped by recent empirical results.</p>
<h3 key={"172"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.1 The Superminds Test: Scale ≠ Intelligence</h3>
<p key={"174"} className="text-slate-300 leading-relaxed mb-4">Li et al. [2026a] evaluated MoltBook&#039;s 2M+ agent society across three tiers: joint reasoning, information synthesis, basic interaction. The society failed all three. Threads rarely extended beyond one reply. Distributed information was rarely synthesised. Trivial coordination tasks failed.</p>
<p key={"176"} className="text-slate-300 leading-relaxed mb-4">The implication is precise: <strong>collective intelligence does not emerge from scale alone</strong>. Without a structured substrate, more agents produce more noise. The membrane&#039;s three-tier evaluation framework (joint reasoning → synthesis → interaction) gives us measurable acceptance criteria.</p>
<h3 key={"178"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.2 Mesh Memory Protocol: Field-Level Selectivity</h3>
<p key={"180"} className="text-slate-300 leading-relaxed mb-4">MMP [Xu, 2026] is in production. Its three design problems (selectivity (P1), traceability (P2), persistence (P3)) map directly onto the membrane&#039;s L1, L2, and the lineage subsystem. The <em>remix</em> primitive (store interpretation, not raw signal) addresses an echo-chamber failure mode that any naive shared-state design will hit. We adopt CAT7, SVAF, lineage, and remix as the membrane&#039;s L2 primitives.</p>
<h3 key={"182"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.3 Token Economics: Communication Is Not Free</h3>
<p key={"184"} className="text-slate-300 leading-relaxed mb-4">Bai et al. [2026] establish:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"186"} className="ml-4 text-slate-300">**1000× token overhead** for agentic tasks vs. equivalent non-agentic ones.</li>
<li key={"187"} className="ml-4 text-slate-300">**Input tokens dominate cost**, not output.</li>
<li key={"188"} className="ml-4 text-slate-300">**Accuracy peaks at intermediate cost**, with diminishing returns then saturation.</li>
<li key={"189"} className="ml-4 text-slate-300">**30× variance** for the same task; models can&#039;t predict their own costs (r ≤ 0.39).</li></ul>
<p key={"191"} className="text-slate-300 leading-relaxed mb-4">Three design consequences follow:</p>
<p key={"193"} className="text-slate-300 leading-relaxed mb-4">1. The wire format must be compact. Every byte added to a CMB is multiplied across every agent that reads it.</p>
<p key={"194"} className="text-slate-300 leading-relaxed mb-4">2. Default-deny permeability is <em>economically</em>, not just operationally, correct.</p>
<p key={"195"} className="text-slate-300 leading-relaxed mb-4">3. The membrane must track per-agent communication budgets and enforce them.</p>
<h3 key={"197"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.4 World Models: The Membrane as Cognition</h3>
<p key={"199"} className="text-slate-300 leading-relaxed mb-4">Chu et al. [2026] (Agentic World Modeling) introduce a <em>levels x laws</em> taxonomy for world models: L1 Predictor, L2 Simulator, L3 Evolver, across Physical, Digital, Social, and Scientific regimes. The membrane is the <em>Social</em> regime made concrete. It admits a maturity ladder:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"201"} className="ml-4 text-slate-300">**L1 Membrane:** predicts which agents should communicate.</li>
<li key={"202"} className="ml-4 text-slate-300">**L2 Membrane:** simulates multi-step coordination outcomes.</li>
<li key={"203"} className="ml-4 text-slate-300">**L3 Membrane:** revises its own permeability and governance rules in response to observed outcomes.</li></ul>
<p key={"205"} className="text-slate-300 leading-relaxed mb-4">This reframes the membrane: not passive plumbing, but the social component of every connected agent&#039;s world model. An agent that better models the membrane will coordinate better through it.</p>
<h3 key={"207"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.5 Failure Attribution: The Hardest Open Problem</h3>
<p key={"209"} className="text-slate-300 leading-relaxed mb-4">Three converging results (Sun et al. [2026] (Who&amp;When), Kumar et al. [2026] (TraceElephant), Lopez et al. [2026] (CHIEF / DoVer)) establish that:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"211"} className="ml-4 text-slate-300">Best-in-class agent-level attribution is 53.5%; step-level is 14.2%. Even o1/R1 fail.</li>
<li key={"212"} className="ml-4 text-slate-300">Full execution traces improve attribution by **76%**.</li>
<li key={"213"} className="ml-4 text-slate-300">Causal graphs separate root causes from symptoms; counterfactual debugging via intervention is feasible if you have the substrate.</li></ul>
<p key={"215"} className="text-slate-300 leading-relaxed mb-4">The membrane provides exactly the substrate these methods require: complete event logs, content-hash lineage, and a coordination surface that doubles as an intervention surface.</p>
<h3 key={"217"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.6 Consensus and Dissent</h3>
<p key={"219"} className="text-slate-300 leading-relaxed mb-4">Patel et al. [2026] (PAC-Consensus) give a learning-theoretic algorithm for finding consensus regions with formal PAC guarantees. Li et al. [2026b] show that humans systematically over-trust agent consensus headlines. The membrane therefore offers consensus as a service that <em>always</em> surfaces dissent distribution alongside the headline. Multiple modes (unanimity, supermajority, plurality, interval, defer-to-human) are exposed; the right one is task-dependent.</p>
<h3 key={"221"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.7 Decentralisation Is Sometimes Better</h3>
<p key={"223"} className="text-slate-300 leading-relaxed mb-4">Liu et al. [2026] (DM3Nav) demonstrate that, for spatial coordination tasks, agents using only local observations and ad-hoc pairwise messaging match or beat centralised baselines. The membrane therefore is <strong>not</strong> mandated for every interaction. It is a toolkit that exposes shared state, pairwise messaging, and broadcast as equally first-class options. Forcing all coordination through shared state would replicate the orchestration mistake at a different layer.</p>
<h3 key={"225"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.8 Neuroscience-Inspired Memory Architectures</h3>
<p key={"227"} className="text-slate-300 leading-relaxed mb-4">ZenBrain [Zhang et al., 2026d] built a 7-layer memory architecture modelled on biological memory systems and got 91.3% oracle accuracy at 1/106th the computational budget. That is a number worth staring at. It means structured memory is not just cleaner architecture — it is dramatically cheaper, and the savings are enormous.</p>
<p key={"229"} className="text-slate-300 leading-relaxed mb-4">Prism [Kim et al., 2026] takes a different angle: an evolutionary memory substrate that achieves 2.8× improvement for multi-agent systems. Both papers point at the same conclusion for the membrane&#039;s Layer 2: the shared medium should not be a flat key-value store. It should be a structured, multi-tiered memory system that mirrors how biological organisms organise knowledge.</p>
<p key={"231"} className="text-slate-300 leading-relaxed mb-4">The implication is practical. We have concrete candidates for what Layer 2 looks like underneath the CRDT/event-sourcing layer. ZenBrain for the cognitive architecture, Prism for the evolutionary adaptation, ContextWeaver [Xu et al., 2026] for dependency-structured recall. The design space is narrowing.</p>
<h3 key={"233"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.9 Memory Lifecycle Operations</h3>
<p key={"235"} className="text-slate-300 leading-relaxed mb-4">Memory Metabolism [Patel et al., 2026b] makes a simple but important point: shared state is not a thing you store and forget. It is a thing that lives and dies. The paper proposes four lifecycle operations — TRIAGE, DECAY, CONSOLIDATE, AUDIT — that transform the membrane from passive plumbing to an active participant in knowledge management.</p>
<p key={"237"} className="text-slate-300 leading-relaxed mb-4">Entries are triaged on ingestion (what matters, what doesn&#039;t). They decay over time (old signals lose relevance). They consolidate (transient observations crystallise into durable knowledge). And they are periodically audited (what has become stale or wrong).</p>
<p key={"239"} className="text-slate-300 leading-relaxed mb-4">The Experience Compression Spectrum [Chen et al., 2026b] extends this: memory, skills, and rules are not different things, they are different compression levels. Raw observation is the uncompressed form. Skill is the compressed, reusable form. Rule is the lossy-but-fast form. This maps directly onto cognitive digestion — the remix primitive from MMP. Agents store their <em>interpretation</em> of a signal, not the signal itself, and the compression level they choose depends on how many times they expect to reuse it.</p>
<p key={"241"} className="text-slate-300 leading-relaxed mb-4">Together these two papers give Layer 2 a metabolic lifecycle and Layer 1 a principled reason for compact wire formats. They are not separate design concerns.</p>
<h3 key={"243"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.10 Memory Security and Trust</h3>
<p key={"245"} className="text-slate-300 leading-relaxed mb-4">The moment shared state becomes valuable, somebody tries to poison it. Three papers hit this from different angles.</p>
<p key={"247"} className="text-slate-300 leading-relaxed mb-4">MemEvoBench [Wang et al., 2026b] catalogues 36 memory safety risk types for LLM agent systems — prompt injection into memory, context poisoning, memory exfiltration, and more. It is not a short list.</p>
<p key={"249"} className="text-slate-300 leading-relaxed mb-4">GAMMAF [Liu et al., 2026b] gives the membrane&#039;s immune layer something concrete to detect with: graph-based anomaly detection over agent interaction patterns. Not just behavioural anomalies at the edge, but structural anomalies in the network of trust.</p>
<p key={"251"} className="text-slate-300 leading-relaxed mb-4">Spore Attack [Zhang et al., 2026e] is the one that made me stop scrolling. It demonstrates that poisoned entries in shared state can propagate across agents like biological spores — self-replicating through lineage chains. The attack is literally named after a biological mechanism. The irony is not lost. The membrane&#039;s immune layer needs quarantine, not just detection. A contaminated entry should be isolated before it spreads.</p>
<p key={"253"} className="text-slate-300 leading-relaxed mb-4">On the trust side, the Trust/Lies/Long Memories study [Li et al., 2026c] empirically confirms something the membrane assumed: LLM agents develop functional reputations through repeated interaction. Agents learn who is reliable and who is not. The membrane&#039;s Layer 0 reputation system is not a theoretical add-on — it is something that happens naturally and should be measured, not invented.</p>
<h3 key={"255"} className="text-xl font-bold text-slate-100 mb-2 mt-8">5.11 Latent Communication Advances</h3>
<p key={"257"} className="text-slate-300 leading-relaxed mb-4">Path 3 in our roadmap — latent communication via KV-cache sharing — was always the most speculative. OBF [Zhang et al., 2026f] makes it substantially less so.</p>
<p key={"259"} className="text-slate-300 leading-relaxed mb-4">Optimal Bandwidth Filtering demonstrates 89% communication cost reduction by compressing and relaying latent representations instead of text. Agents can share what they <em>computed</em> rather than what they <em>said</em>. If the membrane&#039;s wire format can carry latent relays alongside or instead of text CMBs, the token economics calculation changes dramatically.</p>
<p key={"261"} className="text-slate-300 leading-relaxed mb-4">It is still a research path, not a foundation. Cross-model compatibility and closed-source access remain blockers. But 89% cost reduction is not a number you ignore.</p>
<hr key={"263"} className="border-slate-800 my-8" />
<h2 key={"265"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">6. Implementation</h2>
<h3 key={"267"} className="text-xl font-bold text-slate-100 mb-2 mt-8">6.1 Eighteen Paths</h3>
<p key={"269"} className="text-slate-300 leading-relaxed mb-4">We catalogue eighteen implementation paths, each evaluated on novelty, feasibility, impact, and compatibility with existing frameworks.</p>
<p key={"271"} className="text-slate-300 leading-relaxed mb-4">| #   | Path                                       | Layer        | Score (F/I/N) |</p>
<p key={"272"} className="text-slate-300 leading-relaxed mb-4">|-----|--------------------------------------------|--------------|---------------|</p>
<p key={"273"} className="text-slate-300 leading-relaxed mb-4">| 1   | CRDT-based shared state                    | L2           | 9 / 8 / 7     |</p>
<p key={"274"} className="text-slate-300 leading-relaxed mb-4">| 2   | Permeability protocol as MCP extension     | L1           | 10 / 7 / 6    |</p>
<p key={"275"} className="text-slate-300 leading-relaxed mb-4">| 3   | Latent communication (KV-cache sharing)    | L1/L2        | 5 / 10 / 9    |</p>
<p key={"276"} className="text-slate-300 leading-relaxed mb-4">| 4   | Quorum-sensing swarm activation            | L3           | 8 / 6 / 7     |</p>
<p key={"277"} className="text-slate-300 leading-relaxed mb-4">| 5   | MESI-inspired synchronisation              | L2           | 7 / 6 / 8     |</p>
<p key={"278"} className="text-slate-300 leading-relaxed mb-4">| 6   | Agent reputation systems                   | L0           | 7 / 9 / 7     |</p>
<p key={"279"} className="text-slate-300 leading-relaxed mb-4">| 7   | Structured (graph) shared memory           | L2           | 6 / 8 / 6     |</p>
<p key={"280"} className="text-slate-300 leading-relaxed mb-4">| 8   | Mesh Memory Protocol integration           | L2           | 9 / 9 / 5     |</p>
<p key={"281"} className="text-slate-300 leading-relaxed mb-4">| 9   | Gated permeability                         | L1           | 8 / 7 / 6     |</p>
<p key={"282"} className="text-slate-300 leading-relaxed mb-4">| 10  | Event sourcing for shared medium           | L2           | 8 / 8 / 6     |</p>
<p key={"283"} className="text-slate-300 leading-relaxed mb-4">| 11  | Observability and telemetry                | cross-cutting| 10 / 9 / 4    |</p>
<p key={"284"} className="text-slate-300 leading-relaxed mb-4">| 12  | Cross-framework interoperability           | all          | 7 / 9 / 7     |</p>
<p key={"285"} className="text-slate-300 leading-relaxed mb-4">| 13  | Collective intelligence validation harness | meta         | 8 / 10 / 5    |</p>
<p key={"286"} className="text-slate-300 leading-relaxed mb-4">| 14  | Token-efficient wire format                | L1/L2        | 9 / 8 / 6     |</p>
<p key={"287"} className="text-slate-300 leading-relaxed mb-4">| 15  | World-model-informed membrane              | meta         | 5 / 9 / 9     |</p>
<p key={"288"} className="text-slate-300 leading-relaxed mb-4">| 16  | Failure attribution subsystem              | cross-cutting| 8 / 10 / 7    |</p>
<p key={"289"} className="text-slate-300 leading-relaxed mb-4">| 17  | Immune-inspired adaptive security          | cross-cutting| 6 / 9 / 8     |</p>
<p key={"290"} className="text-slate-300 leading-relaxed mb-4">| 18  | Governance and human oversight (L−1)       | L−1          | 7 / 8 / 7     |</p>
<p key={"292"} className="text-slate-300 leading-relaxed mb-4">(F = Feasibility, I = Impact, N = Novelty, each on /10.)</p>
<h3 key={"294"} className="text-xl font-bold text-slate-100 mb-2 mt-8">6.2 A Sixteen-Week Roadmap</h3>
<p key={"296"} className="text-slate-300 leading-relaxed mb-4"><strong>Phase 1: Foundation, Discovery, Safety (Weeks 1-4).</strong> Stand up the registry (Path 6, behavioural indexing per AgentSearchBench), implement the membrane as an MCP server (Path 2) using MMP&#039;s primitives (Path 8), wire OpenTelemetry from day one (Path 11) with failure-attribution hooks (Path 16), constrain the wire format to a token budget (Path 14), and ship the safety net first: basic immune detection (Path 17) and governance circuit breakers (Path 18).</p>
<p key={"298"} className="text-slate-300 leading-relaxed mb-4"><strong>Phase 2: Shared State, Gating, Attribution (Weeks 5-10).</strong> Layer CRDTs over the event log (Paths 1 + 10) with full provenance. Evaluate ZenBrain, Prism, and ContextWeaver as concrete Layer 2 candidates. Add gated permeability (Path 9) and reputation scoring (Path 6). Move to graph-structured memory with cognitive digestion (Path 7). Stand up PAC consensus with dissent surface (Path 20, derived from Path 18).</p>
<p key={"300"} className="text-slate-300 leading-relaxed mb-4"><strong>Phase 3: Coordination, Adaptive Defence, Validation (Weeks 11-16).</strong> Add quorum sensing (Path 4) and multi-mode coordination (Path 21, derived from DM3Nav). Build cross-framework adapters (Path 12). Expand immune defence to full co-evolving response (Path 17). Run the Superminds-derived validation harness (Path 13) end-to-end.</p>
<p key={"302"} className="text-slate-300 leading-relaxed mb-4"><strong>Phase 4: Research (Ongoing).</strong> World-model-informed membrane (Path 15). Latent communication (Path 3). MESI-style synchronisation at scale (Path 5). Cross-provider value alignment.</p>
<h3 key={"304"} className="text-xl font-bold text-slate-100 mb-2 mt-8">6.3 Acceptance Criteria</h3>
<p key={"306"} className="text-slate-300 leading-relaxed mb-4">A membrane prototype is successful if, against a fixed agent population:</p>
<p key={"308"} className="text-slate-300 leading-relaxed mb-4">1. Membrane-connected swarm outperforms individual frontier models on joint reasoning tasks (Tier 1).</p>
<p key={"309"} className="text-slate-300 leading-relaxed mb-4">2. The swarm synthesises distributed information not held by any single agent (Tier 2).</p>
<p key={"310"} className="text-slate-300 leading-relaxed mb-4">3. Multi-turn coordination sustains beyond single-reply threads (Tier 3).</p>
<p key={"311"} className="text-slate-300 leading-relaxed mb-4">4. Total token cost is no more than 2× single-agent baseline at equal quality (cost ceiling).</p>
<p key={"312"} className="text-slate-300 leading-relaxed mb-4">5. Failure attribution achieves &gt;70% agent-level accuracy on injected-fault scenarios (debuggability).</p>
<p key={"314"} className="text-slate-300 leading-relaxed mb-4">These are concrete; the prototype either meets them or the thesis is wrong about something specific.</p>
<hr key={"316"} className="border-slate-800 my-8" />
<h2 key={"318"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">7. Discussion</h2>
<h3 key={"320"} className="text-xl font-bold text-slate-100 mb-2 mt-8">7.1 Open Questions</h3>
<p key={"322"} className="text-slate-300 leading-relaxed mb-4"><strong>Centralised vs. distributed implementation.</strong> A central membrane service is simpler to build and reason about; a peer-to-peer implementation is more honest to the biological metaphor and more resilient. Our roadmap starts central and migrates outward; whether that migration is forced by scale or by trust requirements is unsettled.</p>
<p key={"324"} className="text-slate-300 leading-relaxed mb-4"><strong>Trust between agents from different providers.</strong> Cryptographic identity solves <em>who</em>; reputation solves <em>how reliable</em>; value alignment solves <em>whether to want the same things</em>. The third is the hardest. We do not assume it; the governance layer is where it surfaces.</p>
<p key={"326"} className="text-slate-300 leading-relaxed mb-4"><strong>Latent communication.</strong> KV-cache sharing [DiffMAS] offers vastly higher bandwidth than token-level messaging but requires fine-tuning, cross-model compatibility, and access closed-source providers do not grant. We treat it as a research path, not a foundation.</p>
<p key={"328"} className="text-slate-300 leading-relaxed mb-4"><strong>Adaptive vs. specified governance.</strong> Should the membrane&#039;s L−1 rules be fixed (auditable, predictable) or adaptive (effective against novel failure modes)? Both have failure modes. We default to specified rules with adaptive <em>suggestions</em> surfaced for human review.</p>
<p key={"330"} className="text-slate-300 leading-relaxed mb-4"><strong>When <em>not</em> to use the membrane.</strong> [Liu et al., 2026] is a useful corrective. Some tasks are best done by a single agent; some by ad-hoc pairs without persistent state. The membrane is a substrate, not an ideology.</p>
<h3 key={"332"} className="text-xl font-bold text-slate-100 mb-2 mt-8">7.2 Risks</h3>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"334"} className="ml-4 text-slate-300">**Substrate ossification.** A widely adopted membrane could entrench a particular schema (CAT7) or transport (MCP) before we know it is right. Versioning and migration must be planned.</li>
<li key={"335"} className="ml-4 text-slate-300">**Token cost regression.** A naive membrane that sends raw CMBs to every subscriber would *worsen* the problem [Bai et al., 2026] identifies. Default-deny and cognitive digestion are not nice-to-haves; they are load-bearing.</li>
<li key={"336"} className="ml-4 text-slate-300">**Governance theatre.** A dissent surface that humans never read is no better than no dissent surface. The L−1 design must be evaluated against actual human decision-making, not assumed-effective.</li>
<li key={"337"} className="ml-4 text-slate-300">**Adversarial co-evolution.** The membrane is a high-value target. Any defence we ship will be probed; we must plan for compromise rather than for prevention.</li>
<li key={"338"} className="ml-4 text-slate-300">**Memory contamination and spore attacks.** Poisoned entries can self-replicate across agents via lineage chains [Zhang et al., 2026e]. MemEvoBench [Wang et al., 2026b] catalogues 36 risk types. The membrane needs quarantine, not just detection — a contaminated entry should be isolated before it spreads.</li></ul>
<hr key={"340"} className="border-slate-800 my-8" />
<h2 key={"342"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">8. Conclusion</h2>
<p key={"344"} className="text-slate-300 leading-relaxed mb-4">Multi-agent AI does not lack agents. It lacks a <em>medium</em>. The synthetic membrane proposes that medium as a six-layer substrate: governance, discovery, permeability, shared medium, coordination, plus cross-cutting immune defence and observability. It is built from existing pieces (MCP, CRDTs, MMP, OpenTelemetry) and shaped by recent empirical findings about cost, attribution, consensus, the limits of scale, and the structure of memory itself. The Superminds Test gave the field its bluntest result yet: two million agents do not amount to one mind. ZenBrain suggests the missing ingredient is structured, gated, persistent communication at a fraction of the cost we assumed. Spore Attack warns that shared state demands quarantine, not just detection. The membrane is one concrete proposal for delivering all of this. Whether it succeeds will be measured against the Superminds tiers, against token-cost ceilings, and against attribution accuracy on injected faults. Not against whether the metaphor pleases us.</p>
<hr key={"346"} className="border-slate-800 my-8" />
<h2 key={"348"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">References</h2>
<p key={"350"} className="text-slate-300 leading-relaxed mb-4"><code className="bg-slate-800 px-1 rounded text-sm">`</code>bibtex</p>
<p key={"351"} className="text-slate-300 leading-relaxed mb-4">@misc{anthropic2024mcp,</p>
<p key={"352"} className="text-slate-300 leading-relaxed mb-4">  title        = {Model Context Protocol Specification},</p>
<p key={"353"} className="text-slate-300 leading-relaxed mb-4">  author       = {{Anthropic}},</p>
<p key={"354"} className="text-slate-300 leading-relaxed mb-4">  year         = {2024},</p>
<p key={"355"} className="text-slate-300 leading-relaxed mb-4">  howpublished = {\url{https://modelcontextprotocol.io}}</p>
<p key={"356"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"358"} className="text-slate-300 leading-relaxed mb-4">@article{bai2026tokens,</p>
<p key={"359"} className="text-slate-300 leading-relaxed mb-4">  title   = {How Do {AI} Agents Spend Your Money?</p>
<p key={"360"} className="text-slate-300 leading-relaxed mb-4">             Analyzing and Predicting Token Consumption in Agentic Coding Tasks},</p>
<p key={"361"} className="text-slate-300 leading-relaxed mb-4">  author  = {Bai, Longju and Huang, Zhemin and Wang, Xingyao and Sun, Jiao and</p>
<p key={"362"} className="text-slate-300 leading-relaxed mb-4">             Mihalcea, Rada and Brynjolfsson, Erik and Pentland, Alex and Pei, Jiaxin},</p>
<p key={"363"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.22750},</p>
<p key={"364"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"365"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"367"} className="text-slate-300 leading-relaxed mb-4">@article{chen2026agentsearch,</p>
<p key={"368"} className="text-slate-300 leading-relaxed mb-4">  title   = {{AgentSearchBench}: Behavioural Discovery of {LLM} Agents},</p>
<p key={"369"} className="text-slate-300 leading-relaxed mb-4">  author  = {Chen, X. and others},</p>
<p key={"370"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint},</p>
<p key={"371"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"372"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"374"} className="text-slate-300 leading-relaxed mb-4">@article{chu2026worldmodels,</p>
<p key={"375"} className="text-slate-300 leading-relaxed mb-4">  title   = {Agentic World Modeling: Foundations, Capabilities, Laws, and Beyond},</p>
<p key={"376"} className="text-slate-300 leading-relaxed mb-4">  author  = {Chu, Meng and Zhang, Xuan Billy and Lin, Kevin Qinghong and</p>
<p key={"377"} className="text-slate-300 leading-relaxed mb-4">             Kong, Lingdong and Zhang, Jize and others},</p>
<p key={"378"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.22748},</p>
<p key={"379"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"380"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"382"} className="text-slate-300 leading-relaxed mb-4">@article{kumar2026traceelephant,</p>
<p key={"383"} className="text-slate-300 leading-relaxed mb-4">  title   = {{TraceElephant}: Full-Trace Failure Attribution in Multi-Agent Systems},</p>
<p key={"384"} className="text-slate-300 leading-relaxed mb-4">  author  = {Kumar, R. and others},</p>
<p key={"385"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.22708},</p>
<p key={"386"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"387"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"389"} className="text-slate-300 leading-relaxed mb-4">@article{li2026superminds,</p>
<p key={"390"} className="text-slate-300 leading-relaxed mb-4">  title   = {Superminds Test: Actively Evaluating Collective Intelligence of</p>
<p key={"391"} className="text-slate-300 leading-relaxed mb-4">             Agent Society via Probing Agents},</p>
<p key={"392"} className="text-slate-300 leading-relaxed mb-4">  author  = {Li, Xirui and Li, Ming and Xiao, Yunze and Wong, Ryan and Li, Dianqi</p>
<p key={"393"} className="text-slate-300 leading-relaxed mb-4">             and Baldwin, Timothy and Zhou, Tianyi},</p>
<p key={"394"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.22452},</p>
<p key={"395"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"396"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"398"} className="text-slate-300 leading-relaxed mb-4">@article{li2026consensusbias,</p>
<p key={"399"} className="text-slate-300 leading-relaxed mb-4">  title   = {Multi-Agent Consensus Bias: Why Humans Over-Trust Agreeing Agents},</p>
<p key={"400"} className="text-slate-300 leading-relaxed mb-4">  author  = {Li, Y. and others},</p>
<p key={"401"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint},</p>
<p key={"402"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"403"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"405"} className="text-slate-300 leading-relaxed mb-4">@article{liu2026dm3nav,</p>
<p key={"406"} className="text-slate-300 leading-relaxed mb-4">  title   = {{DM3Nav}: Decentralised Multi-Agent Navigation Without Shared State},</p>
<p key={"407"} className="text-slate-300 leading-relaxed mb-4">  author  = {Liu, J. and others},</p>
<p key={"408"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint},</p>
<p key={"409"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"410"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"412"} className="text-slate-300 leading-relaxed mb-4">@article{lopez2026chief,</p>
<p key={"413"} className="text-slate-300 leading-relaxed mb-4">  title   = {{CHIEF}: Causal Hierarchies for Failure Attribution; and {DoVer}:</p>
<p key={"414"} className="text-slate-300 leading-relaxed mb-4">             Active Debugging via Intervention},</p>
<p key={"415"} className="text-slate-300 leading-relaxed mb-4">  author  = {Lopez, M. and others},</p>
<p key={"416"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2602.23701, arXiv:2512.06749},</p>
<p key={"417"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"418"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"420"} className="text-slate-300 leading-relaxed mb-4">@article{patel2026pac,</p>
<p key={"421"} className="text-slate-300 leading-relaxed mb-4">  title   = {{PAC}-Consensus: Probably Approximately Correct Consensus</p>
<p key={"422"} className="text-slate-300 leading-relaxed mb-4">             for Multi-Agent Systems},</p>
<p key={"423"} className="text-slate-300 leading-relaxed mb-4">  author  = {Patel, S. and others},</p>
<p key={"424"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint},</p>
<p key={"425"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"426"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"428"} className="text-slate-300 leading-relaxed mb-4">@inproceedings{shapiro2011crdt,</p>
<p key={"429"} className="text-slate-300 leading-relaxed mb-4">  title     = {Conflict-Free Replicated Data Types},</p>
<p key={"430"} className="text-slate-300 leading-relaxed mb-4">  author    = {Shapiro, Marc and Pregui{\c{c}}a, Nuno and Baquero, Carlos and</p>
<p key={"431"} className="text-slate-300 leading-relaxed mb-4">               Zawirski, Marek},</p>
<p key={"432"} className="text-slate-300 leading-relaxed mb-4">  booktitle = {Proc. 13th Int. Symp. on Stabilization, Safety, and Security</p>
<p key={"433"} className="text-slate-300 leading-relaxed mb-4">               of Distributed Systems (SSS)},</p>
<p key={"434"} className="text-slate-300 leading-relaxed mb-4">  year      = {2011}</p>
<p key={"435"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"437"} className="text-slate-300 leading-relaxed mb-4">@article{sun2026whoandwhen,</p>
<p key={"438"} className="text-slate-300 leading-relaxed mb-4">  title   = {Who and When: Benchmarking Failure Attribution in Multi-Agent Systems},</p>
<p key={"439"} className="text-slate-300 leading-relaxed mb-4">  author  = {Sun, Y. and others},</p>
<p key={"440"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2505.00212},</p>
<p key={"441"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"442"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"444"} className="text-slate-300 leading-relaxed mb-4">@article{wang2026gated,</p>
<p key={"445"} className="text-slate-300 leading-relaxed mb-4">  title   = {Gated Coordination: Default-Deny Communication for {LLM} Agent Swarms},</p>
<p key={"446"} className="text-slate-300 leading-relaxed mb-4">  author  = {Wang, H. and others},</p>
<p key={"447"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint},</p>
<p key={"448"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"449"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"451"} className="text-slate-300 leading-relaxed mb-4">@article{xu2026mmp,</p>
<p key={"452"} className="text-slate-300 leading-relaxed mb-4">  title   = {Mesh Memory Protocol: A Semantic Infrastructure for Cross-Session</p>
<p key={"453"} className="text-slate-300 leading-relaxed mb-4">             Cognitive Collaboration Among {LLM} Agents},</p>
<p key={"454"} className="text-slate-300 leading-relaxed mb-4">  author  = {Xu, Hongwei},</p>
<p key={"455"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.19540},</p>
<p key={"456"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"457"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"459"} className="text-slate-300 leading-relaxed mb-4">@article{zhang2026adversarial,</p>
<p key={"460"} className="text-slate-300 leading-relaxed mb-4">  title   = {Adversarial Co-Evolution in Multi-Agent {LLM} Systems},</p>
<p key={"461"} className="text-slate-300 leading-relaxed mb-4">  author  = {Zhang, K. and others},</p>
<p key={"462"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint},</p>
<p key={"463"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"464"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"466"} className="text-slate-300 leading-relaxed mb-4">@article{zhang2026zenbrain,</p>
<p key={"467"} className="text-slate-300 leading-relaxed mb-4">  title   = {ZenBrain: A Neuroscience-Inspired 7-Layer Memory Architecture for Autonomous {AI} Systems},</p>
<p key={"468"} className="text-slate-300 leading-relaxed mb-4">  author  = {Zhang, M. and others},</p>
<p key={"469"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.23878},</p>
<p key={"470"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"471"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"473"} className="text-slate-300 leading-relaxed mb-4">@article{kim2026prism,</p>
<p key={"474"} className="text-slate-300 leading-relaxed mb-4">  title   = {Prism: Evolutionary Memory Substrate for Multi-Agent Systems},</p>
<p key={"475"} className="text-slate-300 leading-relaxed mb-4">  author  = {Kim, J. and others},</p>
<p key={"476"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.19795},</p>
<p key={"477"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"478"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"480"} className="text-slate-300 leading-relaxed mb-4">@article{patel2026metabolism,</p>
<p key={"481"} className="text-slate-300 leading-relaxed mb-4">  title   = {Memory as Metabolism: TRIAGE, DECAY, CONSOLIDATE, AUDIT for Living Shared State},</p>
<p key={"482"} className="text-slate-300 leading-relaxed mb-4">  author  = {Patel, S. and others},</p>
<p key={"483"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.12034},</p>
<p key={"484"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"485"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"487"} className="text-slate-300 leading-relaxed mb-4">@article{chen2026compression,</p>
<p key={"488"} className="text-slate-300 leading-relaxed mb-4">  title   = {The Experience Compression Spectrum: Memory, Skills, and Rules as Compression Levels},</p>
<p key={"489"} className="text-slate-300 leading-relaxed mb-4">  author  = {Chen, X. and others},</p>
<p key={"490"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.15877},</p>
<p key={"491"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"492"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"494"} className="text-slate-300 leading-relaxed mb-4">@article{wang2026memevobench,</p>
<p key={"495"} className="text-slate-300 leading-relaxed mb-4">  title   = {MemEvoBench: Memory Safety Benchmark for {LLM} Agent Systems},</p>
<p key={"496"} className="text-slate-300 leading-relaxed mb-4">  author  = {Wang, Y. and others},</p>
<p key={"497"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.15774},</p>
<p key={"498"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"499"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"501"} className="text-slate-300 leading-relaxed mb-4">@article{liu2026gammaf,</p>
<p key={"502"} className="text-slate-300 leading-relaxed mb-4">  title   = {GAMMAF: Graph-Based Anomaly Detection for {LLM} Multi-Agent Systems},</p>
<p key={"503"} className="text-slate-300 leading-relaxed mb-4">  author  = {Liu, J. and others},</p>
<p key={"504"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.24477},</p>
<p key={"505"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"506"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"508"} className="text-slate-300 leading-relaxed mb-4">@article{zhang2026spore,</p>
<p key={"509"} className="text-slate-300 leading-relaxed mb-4">  title   = {Spore Attack: Memory Poisoning in Shared-State Multi-Agent Systems},</p>
<p key={"510"} className="text-slate-300 leading-relaxed mb-4">  author  = {Zhang, K. and others},</p>
<p key={"511"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.23711},</p>
<p key={"512"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"513"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"515"} className="text-slate-300 leading-relaxed mb-4">@article{li2026trust,</p>
<p key={"516"} className="text-slate-300 leading-relaxed mb-4">  title   = {Trust, Lies, and Long Memories: Functional Reputation in {LLM} Agent Societies},</p>
<p key={"517"} className="text-slate-300 leading-relaxed mb-4">  author  = {Li, X. and others},</p>
<p key={"518"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.20582},</p>
<p key={"519"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"520"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"522"} className="text-slate-300 leading-relaxed mb-4">@article{zhang2026obf,</p>
<p key={"523"} className="text-slate-300 leading-relaxed mb-4">  title   = {OBF: Optimal Bandwidth Filtering for Latent Relay Compression},</p>
<p key={"524"} className="text-slate-300 leading-relaxed mb-4">  author  = {Zhang, R. and others},</p>
<p key={"525"} className="text-slate-300 leading-relaxed mb-4">  journal = {arXiv preprint arXiv:2604.13349},</p>
<p key={"526"} className="text-slate-300 leading-relaxed mb-4">  year    = {2026}</p>
<p key={"527"} className="text-slate-300 leading-relaxed mb-4">}</p>
<p key={"528"} className="text-slate-300 leading-relaxed mb-4"><code className="bg-slate-800 px-1 rounded text-sm">`</code></p>
        </div>
      </article>

      <footer className="mt-16 border-t border-slate-800 pt-8 text-center text-xs font-mono text-slate-500">
        <Link href="/research" className="hover:text-emerald-300 transition">
          ← back to research
        </Link>
      </footer>
    </div>
  );
}

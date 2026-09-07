import Link from "next/link";

export const metadata = {
  title: "Agents Need Somewhere to Share Their Work · axjns.dev",
  description:
    "What makes agents useful as a team, and how a shared, policy-controlled workspace might help.",
  openGraph: {
    title: "Agents Need Somewhere to Share Their Work",
    description:
      "What makes agents useful as a team, and how a shared, policy-controlled workspace might help.",
    type: "article" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Agents Need Somewhere to Share Their Work",
    description:
      "What makes agents useful as a team, and how a shared, policy-controlled workspace might help.",
  },
};

const TERMINAL_OUTPUT = `──  Five-agent coordination simulation  ──
registration · permeability · trust · subscriptions · swarms

BOOT   membrane instantiated
       · store · permeability engine · swarm engine

▸ orchestrator  register_agent  caps=[coordination, planning, synthesis]
▸ researcher    register_agent  caps=[research, fact_check, data_analysis]
▸ writer        register_agent  caps=[writing, drafting, summarization]
▸ editor        register_agent  caps=[editing, reviewing, style]
▸ reviewer      register_agent  caps=[reviewing, critique, quality_check]

▸ orchestrator  set_trust  → writer = 0.7
▸ orchestrator  set_trust  → editor = 0.7
▸ orchestrator  set_trust  → researcher = 0.7
▸ writer        set_trust  → editor = 0.9
▸ editor        set_trust  → writer = 0.9
▸ editor        set_trust  → reviewer = 0.8

▸ orchestrator  expose  tasks.brief  [public]
▸ researcher    query tasks.* → HIT  "Write a 500-word brief..."

▸ researcher    expose  findings.heat_islands  [public]
▸ researcher    expose  findings.coastal_risk  [public]
▸ researcher    expose  findings.green_infra  [public]
▸ researcher    expose  findings.notes_internal  [PRIVATE]

▸ writer        query findings.* → 3 hits  (PRIVATE note: HIDDEN)
▸ writer        expose  drafts.intro  [trusted]
▸ writer        expose  drafts.body  [trusted]
▸ writer        expose  drafts.outro  [trusted]

▸ reviewer      query drafts.* → DENIED  (trust=0.00 < 0.50)
▸ editor        query drafts.* → HIT  (trust=0.90)

▸ editor        expose  feedback.intro  [trusted]
▸ editor        expose  feedback.body  [trusted]
▸ writer        query feedback.* → HIT → revising...
▸ writer        retract  drafts.intro  (superseded)
▸ writer        expose  final.brief  [public]

▸ orchestrator  swarm_create  "Final Review"  cap=reviewing  threshold=2
▸ editor        swarm_join  members=1/2  active=False
▸ reviewer      swarm_join  members=2/2  active=True  ★ ACTIVATED

▸ writer        broadcast  "Brief complete"  → 4 recipients

──  Final Store State  ──
events       32    registered    5    entries     8
subscriptions 4    broadcasts    1    swarms      1
trust edges  7    last seq      32

key                    owner         tier      value
────────────────────────────────────────────────────
tasks.brief            orchestrator  public    Write a 500-word brief...
findings.heat_islands  researcher    public    Urban heat islands raise...
findings.coastal_risk  researcher    public    1B people exposed to...
findings.green_infra   researcher    public    Green roofs reduce cooling...
findings.notes_internal researcher   private   TODO verify IPCC citation...
feedback.intro         editor        trusted   Strengthen the opening...
feedback.body          editor        trusted   Cite the IPCC AR6 figures...
final.brief            writer        public    Cities like Singapore...

simulation complete · 32 events · 22ms wall-clock`;

const BENCHMARK_TABLE_TEXT = `──  Baseline vs. Membrane  ·  3 agents  ·  5 facts each  ──

┏━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━┓
┃  metric               ┃  baseline  ┃  membrane  ┃           reduction  ┃
┡━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━┩
│  messages             │        60  │        18  │      70.0%  (60→18)  │
│  token-equivalent     │     7,440  │     4,320  │               41.9%  │
│  cost                 │            │            │         (7440→4320)  │
│  consensus steps      │         6  │         2  │        66.7%  (6→2)  │
└───────────────────────┴────────────┴────────────┴──────────────────────┘

──  Scaling sweep · N agents · 5 facts each  ──

┏━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┓
┃  agents  ┃  baseline estimate  ┃  membrane estimate  ┃  reduction  ┃
┡━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━┩
│       3  │            7,440  │            4,320  │      41.9%  │
│       5  │           24,800  │           10,200  │      58.9%  │
│       8  │           69,440  │           23,520  │      66.1%  │
│      12  │          163,680  │           49,680  │      69.6%  │
│      20  │          471,200  │          130,800  │      72.2%  │
└──────────┴───────────────────┴───────────────────┴─────────────┘`;

const SCALING_DATA = [
  { agents: 3, baseline: 7440, membrane: 4320, reduction: "41.9%" },
  { agents: 5, baseline: 24800, membrane: 10200, reduction: "58.9%" },
  { agents: 8, baseline: 69440, membrane: 23520, reduction: "66.1%" },
  { agents: 12, baseline: 163680, membrane: 49680, reduction: "69.6%" },
  { agents: 20, baseline: 471200, membrane: 130800, reduction: "72.2%" },
];

function BenchmarkTable() {
  return (
    <div className="overflow-x-auto rounded-[2px] border border-surface-lighter">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="bg-bone">
            <th className="px-4 py-3 text-left text-cream text-[10px] uppercase tracking-[0.15em]">Agents</th>
            <th className="px-4 py-3 text-right text-cream text-[10px] uppercase tracking-[0.15em]">Baseline Estimate</th>
            <th className="px-4 py-3 text-right text-cream text-[10px] uppercase tracking-[0.15em]">Membrane Estimate</th>
            <th className="px-4 py-3 text-right text-cream text-[10px] uppercase tracking-[0.15em]">Reduction</th>
          </tr>
        </thead>
        <tbody>
          {SCALING_DATA.map((row) => (
            <tr key={row.agents} className="border-b border-bone/15 hover:bg-surface-light/60 transition">
              <td className="px-4 py-3 text-bone">{row.agents}</td>
              <td className="px-4 py-3 text-right text-bone-dark/70">{row.baseline.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-bone">{row.membrane.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-bone font-bold">{row.reduction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SyntheticMembranePage() {
  return (
    <div className="grid-lines min-h-screen">
    <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
      <div className="mb-12">
        <div className="label mb-3">
          Research · Synthetic Membrane
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-bone leading-[1.02]">
          Agents Need Somewhere to Share Their Work
        </h1>
        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
          Alex Jones · April 2026 · Revised September 2026
        </div>
      </div>

      <Prose>
        <p>
          I keep coming back to the gap between a collection of capable agents and a team that
          can build on its own work. Adding another agent is straightforward. Making its
          contribution useful to the others is a different problem.
        </p>

        <p>
          The <a href="https://arxiv.org/abs/2604.22452" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">Superminds Test</a> makes that
          distinction hard to ignore. Researchers probed MoltBook, a platform hosting more than
          two million agents, and found weak joint reasoning, limited synthesis, and shallow
          interaction. That is a result about a particular agent society and its tests. It does
          not mean two million agents were assembled into one controlled team, or that all
          multi-agent systems fail.
        </p>

        <p>
          Still, it challenges an attractive assumption: enough individually capable
          participants will somehow become collectively capable. I want to understand what
          infrastructure helps them get there.
        </p>

        <H2>Give the work somewhere to live</H2>

        <p>
          A useful team accumulates more than messages. It has a codebase, shared documents,
          decisions that can be revisited, and a way to tell what remains unfinished. Those
          artefacts let people contribute without reconstructing every conversation that
          preceded them.
        </p>

        <p>
          Agent systems can have those properties too. Shared memory, persistent graph state,
          and blackboard architectures already exist. The question I am exploring is how to make
          the boundary around shared work explicit: what an agent can publish, what another
          agent should receive, and what either is allowed to do with it.
        </p>

        <p>
          I call that boundary a <strong>synthetic membrane</strong>. The biological metaphor is
          selective permeability. It helps name the design intention; it is not evidence that
          software agents will behave like cells. The implementation is familiar infrastructure:
          records, queries, subscriptions, policy checks, and task ownership.
        </p>

        <H2>Three responsibilities at the centre</H2>

        <p>
          First, <strong>selective exchange</strong>. An agent publishes a finding under a
          visibility policy. Other agents discover or subscribe to relevant changes within their
          permissions. Access control decides what they may receive; relevance and context
          budgets decide what is useful to deliver now. A model&apos;s confidence in a peer
          cannot override those permissions.
        </p>

        <p>
          Second, <strong>persistent shared state</strong>. Evidence, interpretations, and
          actions have stable identities. A summary points back to its source. A retracted claim
          stays identifiable as retracted. A replacement agent can read the current view and
          recent changes instead of consuming the whole conversation history.
        </p>

        <p>
          Third, <strong>explicit coordination</strong>. Agents can discover work, claim a task,
          propose an action, and transfer responsibility. An exclusive claim needs enforcement
          at execution time so that two workers cannot act on competing assumptions about
          ownership. Shared memory on its own does not provide that guarantee.
        </p>

        <p>
          Discovery and governance surround these responsibilities; defence cuts across them.
          The full proposal has six conceptual responsibilities, with observability throughout.
          They need not become six services. A small implementation with clear semantics is more
          useful than a diagram that gets ahead of the code.
        </p>

        <figure className="my-8">
          <img src="/architecture.svg" className="w-full rounded-[2px] border border-surface-lighter" alt="Proposed membrane responsibilities: governance, discovery, access, shared state, coordination, and cross-cutting defence" />
          <figcaption className="mt-2 text-xs text-ash">Conceptual responsibilities; implementation and evaluation remain in progress.</figcaption>
        </figure>

        <H2>Start with the blackboard precedent</H2>

        <p>
          The closest relative is the blackboard: specialists contribute to a common workspace.
          <a href="https://arxiv.org/abs/2507.01701" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">Han and Zhang</a> investigate
          that pattern for LLM collaboration. <a href="https://arxiv.org/abs/2510.01285v2"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">Salemi and colleagues</a> evaluate it for data discovery. Their
          results make shared work worth testing, without establishing that my particular
          combination is better.
        </p>

        <p>
          The membrane&apos;s proposed value is in connecting that workspace to permissions,
          provenance, and action ownership across runtimes. None of those ideas is individually
          new. If an existing blackboard or persistent workflow can provide the same behaviour
          more simply, it should win the comparison.
        </p>

        <p>
          That also means the membrane should compose with agent protocols. MCP can expose its
          tools and resources; A2A can carry task interactions. Agents still communicate through
          messages. The difference is that the state of the work remains addressable after a
          message has been delivered.
        </p>

        <H2>The economics depend on who reads</H2>

        <p>
          A shared store can remove repeated publication and make selective retrieval possible.
          It cannot make the cost of reading disappear. If N agents each contribute F facts and
          every agent reads every fact, the total information delivered still grows as O(N²F).
        </p>

        <p>
          This matters for the small simulation below. Its message counts and token-equivalent
          estimates describe a stipulated exchange model. They are not measurements of an LLM
          team&apos;s accuracy, latency, or API bill. Fewer envelopes can help, but fewer
          messages are not automatically less context or better decisions.
        </p>

        <p>
          The table is consistent with a baseline of 1,240N(N−1) token-equivalents and a
          membrane estimate of 300N² + 540N for five facts per agent. <strong>Both estimates are
          quadratic in N.</strong> The membrane estimate is lower under those assumptions
          because its overhead differs, not because shared storage has made all communication
          linear.
        </p>

        <p>
          Real savings would have to come from delivering fewer irrelevant facts, reusing useful
          work, or avoiding retries. Those benefits must include the cost of indexing,
          summarisation, gating, and any missed evidence. They need measurement at the model
          boundary.
        </p>

        <H2>What the prototype can tell us</H2>

        <p>
          The five-agent simulation exercises registration, visibility checks, publication,
          retraction, and group activation. Its terminal output is a recorded demonstration of
          those mechanics. The trust thresholds in that demonstration are simplified rules, not
          a validated model of identity or permission.
        </p>

        <p>
          The intended integration setting is <a
          href="https://github.com/sympozium-ai/sympozium" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">Sympozium</a>. The engineering
          task is to turn a small coordination contract into enforceable behaviour, then compare
          it with a single agent, a persistent orchestrator, and a conventional blackboard under
          matched budgets. The <a href="/research/0001-synthetic-membrane-coordination-layer"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">revised paper</a> sets out that test in more detail.
        </p>

        <p>
          I would like this to make agent teams easier to operate: less repeated context,
          clearer handoffs, and a record that explains why an action happened. I do not yet have
          evidence that it delivers all three. That is the work ahead, and the most useful
          feedback is a workload or a simpler design that puts the proposal under pressure.
        </p>
      </Prose>

      <div className="mt-16 border-t border-surface-lighter pt-8 grid sm:grid-cols-3 gap-4 font-mono text-sm">
        <a
          href="https://github.com/sympozium-ai/sympozium"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-[2px] border border-surface-lighter bg-surface-light/60 p-4 hover:border-ember transition-colors"
        >
          <div className="label mb-2">
            Implementation
          </div>
          <div className="text-bone">
            sympozium-ai / sympozium
          </div>
          <div className="text-ash text-xs mt-1">github.com →</div>
        </a>
        <a
          href="https://github.com/AlexsJones/research"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-[2px] border border-surface-lighter bg-surface-light/60 p-4 hover:border-ember transition-colors"
        >
          <div className="label mb-2">
            Research
          </div>
          <div className="text-bone">
            AlexsJones / research
          </div>
          <div className="text-ash text-xs mt-1">github.com →</div>
        </a>
        <Link
          href="/research/0001-synthetic-membrane-coordination-layer"
          className="block rounded-[2px] border border-surface-lighter bg-surface-light/60 p-4 hover:border-ember transition-colors"
        >
          <div className="label mb-2">
            Paper
          </div>
          <div className="text-bone">Full paper (v2.2), read on site</div>
          <div className="text-ash text-xs mt-1">axjns.dev →</div>
        </Link>
      </div>

      {/* === ADDITIONAL DIAGRAMS === */}
      <section className="mt-20 border-t border-surface-lighter pt-12">
        <div className="label mb-6">
          Additional Visualizations
        </div>

        <h2 className="font-display text-2xl sm:text-3xl text-bone mb-8">
          State Graph
        </h2>
        <img src="/state_graph.svg" className="w-full rounded-[2px] border border-surface-lighter" alt="State transition graph" />

        <h2 className="font-display text-2xl sm:text-3xl text-bone mt-12 mb-8">
          Illustrative Communication Costs
        </h2>
        <p className="text-sm text-bone-dark/80 mb-6 leading-relaxed">
          These are illustrative simulation results. Message and step counts describe
          the demo protocol; token-equivalents use stipulated costs of 90 tokens per
          envelope, 60 per fact, and 8 per acknowledgement. They are not measured API
          usage or evidence of better task outcomes. Store requests can carry many facts,
          so a reduction in message count need not imply the same reduction in context.
        </p>
        <img src="/benchmark.svg" className="w-full rounded-[2px] border border-surface-lighter" alt="Illustrative three-agent simulation: 60 versus 18 messages and 7,440 versus 4,320 modelled token-equivalents" />
      </section>

      {/* === TERMINAL DEMO === */}
      <section className="mt-20 border-t border-surface-lighter pt-12">
        <div className="label mb-6">
          Recorded Simulation Output
        </div>
        <h2 className="font-display text-2xl sm:text-3xl text-bone mb-8">
          Five-Agent Simulation
        </h2>

        <div className="rounded-[2px] border border-bone bg-ink overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-cream/15">
            <div className="w-3 h-3 rounded-full bg-cream/25" />
            <div className="w-3 h-3 rounded-full bg-cream/45" />
            <div className="w-3 h-3 rounded-full bg-cream/65" />
            <span className="ml-2 text-xs text-cream/40 font-mono">terminal · python -m demo</span>
          </div>
          <pre className="p-4 text-[11px] leading-tight text-cream/90 font-mono overflow-x-auto whitespace-pre">{TERMINAL_OUTPUT}</pre>
        </div>
      </section>

      {/* === BENCHMARK TABLE === */}
      <section className="mt-20 border-t border-surface-lighter pt-12">
        <div className="label mb-6">
          Illustrative Cost Model
        </div>
        <h2 className="font-display text-2xl sm:text-3xl text-bone mb-8">
          Scaling: N agents × 5 facts each
        </h2>
        <p className="text-sm text-bone-dark/80 mb-6 leading-relaxed">
          Both series are modelled token-equivalents for five facts per agent. Both
          grow quadratically: 1,240N(N−1) for the baseline and 300N² + 540N for the
          membrane. The lower estimate reflects this model&apos;s exchange assumptions,
          not a general change from quadratic to linear token consumption.
        </p>
        <BenchmarkTable />

        <div className="mt-8 rounded-[2px] border border-bone bg-ink overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-cream/15">
            <div className="w-3 h-3 rounded-full bg-cream/25" />
            <div className="w-3 h-3 rounded-full bg-cream/45" />
            <div className="w-3 h-3 rounded-full bg-cream/65" />
            <span className="ml-2 text-xs text-cream/40 font-mono">benchmark</span>
          </div>
          <pre className="p-4 text-[11px] leading-tight text-cream/90 font-mono overflow-x-auto whitespace-pre">{BENCHMARK_TABLE_TEXT}</pre>
        </div>
      </section>

      <footer className="mt-12 text-center text-xs font-mono text-ash">
        <Link href="/blog" className="hover:text-bone transition">
          ← back to blog
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

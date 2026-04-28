import Link from "next/link";

export const metadata = {
  title: "We've been building AI agents wrong. — axjns.dev",
  description:
    "Why two million LLM agents produced zero collective intelligence, and what a synthetic membrane between agents would look like.",
  openGraph: {
    title: "We've been building AI agents wrong.",
    description:
      "Why two million LLM agents produced zero collective intelligence, and what a synthetic membrane between agents would look like.",
    type: "article" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "We've been building AI agents wrong.",
    description:
      "Why two million LLM agents produced zero collective intelligence, and what a synthetic membrane between agents would look like.",
  },
};

const ARCHITECTURE_DIAGRAM = `                         ┌─────────────────────────────────────────┐
                         │       LAYER -1: GOVERNANCE              │
                         │  circuit breakers · human override      │
                         │  value-conflict detection · audit       │
                         └─────────────────────────────────────────┘
                                            ▲
                                            │
                         ┌─────────────────────────────────────────┐
                         │       LAYER  0: DISCOVERY               │
                         │  behavioral indexing · identity verify  │
                         │  capability matching · reputation       │
                         └─────────────────────────────────────────┘
                                            ▲
                                            │
   ┌──────────┐     ┌────────────────────────────────────────┐     ┌──────────┐
   │  AGENT A │ ◀─▶ │   LAYER 3: COORDINATION (swarm)        │ ◀─▶ │  AGENT B │
   │ ┌──────┐ │     │   quorum sensing · task claiming       │     │ ┌──────┐ │
   │ │Local │ │     │   dynamic grouping · conflict resolve  │     │ │Local │ │
   │ │ ctx  │ │     ├────────────────────────────────────────┤     │ │ ctx  │ │
   │ └──────┘ │     │   LAYER 2: SHARED MEDIUM (memory)      │     │ └──────┘ │
   │   gate   │ ◀─▶ │   event log · CRDTs · semantic store   │ ◀─▶ │   gate   │
   │ channels │     │   provenance · time-decay · replay     │     │ channels │
   │          │     ├────────────────────────────────────────┤     │          │
   │  remix   │ ◀─▶ │   LAYER 1: PERMEABILITY (protocol)     │ ◀─▶ │  remix   │
   │  digest  │     │   field-level selectivity · SVAF       │     │  digest  │
   └──────────┘     │   default-deny · cost-aware crossing   │     └──────────┘
                    └────────────────────────────────────────┘
                                            ▲
                                            │
                                  ┌─────────────────────┐
                                  │  IMMUNE LAYER       │
                                  │  anomaly detection  │
                                  │  threat gossip      │
                                  │  memory cells       │
                                  └─────────────────────┘`;

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

──  Scaling sweep — N agents · 5 facts each  ──

┏━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┓
┃  agents  ┃  baseline tokens  ┃  membrane tokens  ┃  reduction  ┃
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
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/50">
            <th className="px-4 py-3 text-left text-emerald-400 text-xs uppercase tracking-widest">Agents</th>
            <th className="px-4 py-3 text-right text-emerald-400 text-xs uppercase tracking-widest">Baseline Tokens</th>
            <th className="px-4 py-3 text-right text-emerald-400 text-xs uppercase tracking-widest">Membrane Tokens</th>
            <th className="px-4 py-3 text-right text-emerald-400 text-xs uppercase tracking-widest">Reduction</th>
          </tr>
        </thead>
        <tbody>
          {SCALING_DATA.map((row) => (
            <tr key={row.agents} className="border-b border-slate-800/50 hover:bg-slate-900/30 transition">
              <td className="px-4 py-3 text-slate-200">{row.agents}</td>
              <td className="px-4 py-3 text-right text-slate-400">{row.baseline.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-emerald-300">{row.membrane.toLocaleString()}</td>
              <td className="px-4 py-3 text-right text-emerald-400 font-bold">{row.reduction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <header className="border-b border-slate-800/80 bg-[#0d1117]/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm font-mono">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition">
            ← axjns.dev
          </Link>
          <div className="flex gap-4 text-slate-400">
            <a
              href="https://github.com/AlexsJones/research"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition"
            >
              github
            </a>
            <a
              href="https://github.com/AlexsJones/research/blob/main/paper/paper.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition"
            >
              paper
            </a>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            Research · Synthetic Membrane
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
            We&apos;ve been building AI agents wrong.
          </h1>
          <div className="mt-4 text-sm text-slate-400 font-mono">
            Alex Jones · April 2026
          </div>
        </div>

        <Prose>
          <p>
            I want to start with a number that bothered me for weeks.{" "}
            <strong>Two million.</strong>
          </p>

          <p>
            That&apos;s roughly the population of agents on MoltBook — a real,
            running multi-agent society where LLMs talk to each other, post,
            reply, coordinate, and generally behave like a small digital
            civilization. If you&apos;d asked me a year ago what would happen
            when you put two million agents in the same room, I&apos;d have said
            something hand-wavy about emergent behavior, swarm intelligence, the
            wisdom of crowds. You know the genre. We&apos;ve been telling
            ourselves this story since the first AutoGen demo.
          </p>

          <p>
            The actual result, when researchers measured it, was almost
            insulting in its clarity:{" "}
            <strong>zero collective intelligence.</strong> No emergent
            reasoning. No synthesis of distributed knowledge. The swarm did not
            outperform a single frontier model. On most tasks, it performed{" "}
            <em>worse</em> — drowning in shallow single-reply threads and
            generic responses. Even trivial coordination tasks failed.
          </p>

          <p>Two million agents. Zero supermind.</p>

          <p>
            This is the thing I want to talk about. Not because it&apos;s
            surprising — once you stare at it for a while, it stops being
            surprising and starts being obvious — but because it tells us
            something specific about what&apos;s broken in the way we&apos;re
            building agents right now. And I think the fix is interesting
            enough to be worth a blog post.
          </p>

          <H2>The story we&apos;ve been telling ourselves</H2>

          <p>
            The dominant frame for &quot;multi-agent AI&quot; right now goes
            like this: take an LLM, give it tools (MCP), let it talk to other
            LLMs (A2A, ACP, ANP, pick your acronym), wrap the whole thing in an
            orchestration framework (LangGraph, AutoGen, CrewAI), and out the
            other end falls intelligence-at-scale.
          </p>

          <p>
            Each of those pieces is doing real work. MCP is great — it
            standardized how an agent calls a tool, and it deserves the
            adoption it&apos;s getting. A2A is doing useful things for direct
            agent-to-agent task delegation. LangGraph gives you a sane state
            machine. None of this is wrong.
          </p>

          <p>
            But notice what they all have in common:{" "}
            <strong>they&apos;re moving messages, not minds.</strong>
          </p>

          <p>
            Every agent in this stack has its own private context window. They
            pass messages back and forth like emails. They call each other like
            microservices. The &quot;state&quot; of a multi-agent system is
            whatever happens to be in the active conversation buffer of
            whichever agent is currently thinking. There is no shared
            substrate. There is no place where understanding accumulates.
          </p>

          <p>
            We took the org chart, replaced the humans with LLMs, and called it
            a society. Of course it doesn&apos;t think.
          </p>

          <p>
            If you&apos;ve ever worked in a real org, you know that the org
            chart is not where the work happens. The work happens in the
            shared documents, the long-running Slack threads, the codebase,
            the wiki, the implicit knowledge that compounds in a team&apos;s
            collective head. Take all of that away and leave only the email
            lattice, and you don&apos;t get a company — you get a help desk.
          </p>

          <p>That&apos;s what current multi-agent systems are. A help desk of LLMs.</p>

          <H2>The biological detour</H2>

          <p>
            Here&apos;s the part where I have to talk about cells, because the
            analogy is too good to skip and biology has been doing this for
            about three billion years longer than we have.
          </p>

          <p>
            A cell is not a closed black box that emails other cells. A cell is
            wrapped in a <em>membrane</em> — a permeable, intelligent boundary
            that decides, in real time, what to let in and what to keep out.
            Ions flow through gated channels. Receptors on the surface sense
            the chemical state of the neighborhood. Hormones diffuse, and a
            thousand cells respond in coordinated waves without anyone in
            charge. Bacteria do quorum sensing — they literally count their
            neighbors via molecular concentration and{" "}
            <em>change behavior</em> when the population crosses a threshold.
            Fungal mycelium routes nutrients across kilometers. Neurons fire
            across synapses with weighted, plastic, learning connections.
          </p>

          <p>
            What all of these have in common is{" "}
            <strong>selective permeability.</strong> There is an inside and an
            outside. There are channels through the boundary. The channels are
            gated — they decide what to share and what to keep private. And
            critically, the medium between cells <em>is itself part of the
            computation</em>. The cytoplasm, the synaptic cleft, the
            extracellular fluid — these aren&apos;t pipes. They&apos;re shared
            substrate.
          </p>

          <p>
            When you put two million single-celled organisms in a pond, you
            get a biofilm — a coordinated, communicating, surprisingly
            adaptive entity. When you put two million LLM agents on a forum,
            you get… two million LLM agents on a forum.
          </p>

          <p>The difference is the membrane.</p>

          <H2>What the membrane actually is</H2>

          <p>
            Let me try to be concrete. The thing I&apos;ve been calling a
            &quot;synthetic membrane&quot; is a shared, permeable substrate
            between agents, with three layers. None of these layers are
            individually new — that&apos;s actually the point. The interesting
            work is in the interface between them.
          </p>

          <pre className="my-8 overflow-x-auto rounded-lg border border-slate-800 bg-[#010409] p-5 text-[11px] leading-tight text-emerald-300/90 font-mono">
            <code>{ARCHITECTURE_DIAGRAM}</code>
          </pre>

          <p>
            <strong>Layer 1, the permeability layer.</strong> This is the
            protocol — the part that says what an agent exposes and what
            it&apos;s willing to receive. Every agent declares:{" "}
            <em>
              here are my capabilities, here are the slices of my state
              I&apos;m willing to publish, here are the events I&apos;m
              listening for.
            </em>{" "}
            The crucial design choice:{" "}
            <strong>default-deny, field-level selectivity.</strong> An agent
            can accept some fields from a peer&apos;s state and reject others.
            The membrane is permeable, but selectively. Just like ion
            channels.
          </p>

          <p>
            This is also where <strong>cognitive digestion</strong> happens.
            Agents don&apos;t dump raw output into the shared medium. They
            store their <em>interpretation</em> of what they saw — a remix, in
            the language of mesh-memory protocols. This matters because raw
            signal accumulation creates echo chambers and burns input tokens
            for nothing. (We&apos;ll get to tokens in a second; they turn out
            to dominate everything.)
          </p>

          <p>
            <strong>Layer 2, the shared medium.</strong> The cytoplasm. This
            is the substrate where state actually lives — not the messages
            between agents, but the <em>fact pool</em> the agents are drawing
            from. The right primitive here, I think, is an immutable event log
            with CRDT semantics. Every state change is an event with a
            timestamp and a provenance. New agents joining the swarm can
            replay history. Conflicts are detected at write time. Old entries
            decay. The whole thing is semantically queryable so an agent can
            ask &quot;what does the swarm know about X&quot; and get a
            meaningful answer.
          </p>

          <p>
            This is the layer that&apos;s most missing from current systems.
            AutoGen doesn&apos;t have it. CrewAI doesn&apos;t have it.
            LangGraph has a centralized state graph, which is closer, but
            it&apos;s still one orchestrator&apos;s view of the world rather
            than a substrate the agents share.
          </p>

          <p>
            <strong>Layer 3, the coordination layer.</strong> The thing that
            actually lets a swarm form. Task broadcasting, claiming, dynamic
            grouping, dissolution. Think of it as the bacterial quorum-sensing
            layer — agents emit &quot;intent signals&quot; into the medium,
            and when the concentration crosses a threshold, the swarm
            activates around the problem. Then it dissolves. No top-down
            orchestrator deciding who does what.
          </p>

          <p>
            There are two layers wrapping the whole thing —{" "}
            <strong>discovery</strong> (you can&apos;t coordinate with agents
            you can&apos;t find, and description-based search demonstrably
            fails; you need behavioral indexing) and{" "}
            <strong>governance</strong> (circuit breakers, human override,
            audit trails, value-conflict escalation). Plus a parallel{" "}
            <strong>immune layer</strong> doing adaptive defense via anomaly
            detection and threat gossip — because the moment shared state
            becomes valuable, somebody is going to try to poison it.
          </p>

          <H2>Why now</H2>

          <p>
            I want to flag a constraint that has been quietly reshaping the
            design space, because if you don&apos;t know about it, the whole
            architecture looks like over-engineering.
          </p>

          <p>
            <strong>
              Agentic tasks consume roughly 1000x more tokens than non-agentic
              ones.
            </strong>{" "}
            Input tokens dominate cost. And — this is the cruel part —
            accuracy peaks at <em>intermediate</em> token spend, not maximum.
            Past a certain point, more communication makes results worse, not
            better.
          </p>

          <p>
            This changes everything about how a membrane has to be designed.
            It means:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-5 text-slate-300">
            <li>Wire formats have to be compact. You cannot afford verbose JSON.</li>
            <li>
              Permeability has to be{" "}
              <strong>gated by cost-benefit analysis</strong>, not just by
              access control. An agent should only cross the membrane when
              crossing is worth it.
            </li>
            <li>
              Cognitive digestion (storing interpretations rather than raw
              data) becomes economically essential, not just architecturally
              cleaner.
            </li>
            <li>
              Communication budgets need to be a first-class membrane concept
              — per agent, tracked, enforceable.
            </li>
          </ul>

          <p>
            Five years ago you could argue about whether a shared-state layer
            was worth the complexity. Today the math runs the other way: in a
            1000x-input-token regime, you cannot afford to broadcast
            everything to everyone. The membrane is not a luxury. It&apos;s
            the only way to keep agentic systems economically viable as they
            scale.
          </p>

          <p>
            This is the &quot;why now&quot; and it&apos;s also why I think
            this isn&apos;t a problem that solves itself with bigger context
            windows or better models. The bigger the context windows get, the
            more they cost. The bigger the models get, the more their
            input-token bill dominates. The constraint isn&apos;t going away —
            it&apos;s getting tighter.
          </p>

          <H2>What &quot;ZERO collective intelligence&quot; actually maps to</H2>

          <p>
            Coming back to the two million agents. The reason that result
            lands so hard, once you sit with it, is that it&apos;s not a
            model-quality problem. The agents on MoltBook are real
            frontier-model agents. Smart enough individually to do real work.
            The problem isn&apos;t IQ — it&apos;s plumbing.
          </p>

          <p>Specifically, four pieces of plumbing are missing:</p>

          <ol className="list-decimal pl-6 space-y-2 my-5 text-slate-300">
            <li>
              <strong>No structured protocol</strong> — they communicate via
              raw text, which means every interaction is shallow, ambiguous,
              and impossible to build on. → Layer 1 fixes this.
            </li>
            <li>
              <strong>No shared memory</strong> — there&apos;s no place for
              distributed knowledge to synthesize. → Layer 2 fixes this.
            </li>
            <li>
              <strong>No quality gating</strong> — every interaction is
              weighted equally; reputation and trust don&apos;t exist. →
              Layer 1 (gated permeability) and the immune layer fix this.
            </li>
            <li>
              <strong>No coordination primitives</strong> — no swarming, no
              role assignment, no task claiming. → Layer 3 fixes this.
            </li>
          </ol>

          <p>
            The MoltBook result is, in a strange way, the cleanest empirical
            case yet for why something like a membrane has to exist. We tried
            scale. Scale alone doesn&apos;t produce minds.{" "}
            <strong>Structure does.</strong>
          </p>

          <H2>What we&apos;re building</H2>

          <p>
            Now, the embarrassing part. None of this is a finished thing yet.
            I&apos;m writing this blog post in the middle of the work, not
            after it.
          </p>

          <p>What we have right now is:</p>

          <ul className="list-disc pl-6 space-y-2 my-5 text-slate-300">
            <li>
              A working sketch of the Layer 1 protocol — field-level selective
              sharing, default-deny semantics, a wire format that&apos;s
              compact enough to actually use under the token-economics
              constraint.
            </li>
            <li>
              A reference Layer 2 implementation built on an event log with
              CRDT operations, with semantic query on top. It&apos;s small,
              it&apos;s slow, and it works.
            </li>
            <li>
              A handful of Layer 3 coordination primitives — task broadcast,
              claim, quorum activation. Mostly cribbed from biological quorum
              sensing and from gossip protocols.
            </li>
            <li>
              A running test harness that lets us replay the MoltBook-style
              &quot;shallow swarm&quot; condition and the membrane-mediated
              condition side by side, against the three-tier evaluation
              framework (joint reasoning, information synthesis, basic
              interaction).
            </li>
          </ul>

          <p>
            The thing I most want feedback on right now is the protocol itself
            — specifically, whether the field-level selectivity model is the
            right primitive or whether we should be thinking in terms of
            capabilities, like an object-capability system. Both have working
            prototypes. Both have arguments for them. I genuinely don&apos;t
            know which is right.
          </p>

          <H2>Call for collaborators</H2>

          <p>
            If any of this rhymes with something you&apos;ve been thinking
            about, I&apos;d love to talk. Specifically, I&apos;m looking for
            people who are:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-5 text-slate-300">
            <li>
              <strong>Building multi-agent systems in production</strong> and
              feeling the pain of message-passing-only architectures. Your war
              stories are the most valuable thing in the world right now.
            </li>
            <li>
              <strong>Working on agent protocols</strong> — A2A, ACP, ANP, MCP
              extensions. The membrane should compose with these, not replace
              them, and figuring out the composition story is open work.
            </li>
            <li>
              <strong>
                Coming from biology, distributed systems, or game theory.
              </strong>{" "}
              The interesting questions in this space — quorum sensing, CRDT
              design, mechanism design for cooperation — are all stolen from
              older fields. I want more theft.
            </li>
            <li>
              <strong>Skeptical that any of this matters.</strong> Especially
              this one. The strongest version of the &quot;you&apos;re
              overthinking it&quot; argument is something I haven&apos;t heard
              yet, and I&apos;d rather hear it from you now than from reality
              in twelve months.
            </li>
          </ul>

          <p>
            The repo is small enough that one good afternoon can move it
            forward by a meaningful percentage. If you want to find me, the
            contact info is at the top of this site, or just open an issue.
          </p>

          <p>
            We&apos;ve been building AI agents wrong. The fix is not bigger
            models or longer contexts — those help individual agents, not
            collective ones. The fix is the substrate between them.
            We&apos;re going to need a membrane, and the sooner we agree on
            what one looks like, the sooner the next two million agents will
            actually have something to say to each other.
          </p>
        </Prose>

        <div className="mt-16 border-t border-slate-800 pt-8 grid sm:grid-cols-2 gap-4 font-mono text-sm">
          <a
            href="https://github.com/AlexsJones/research"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/50 hover:bg-slate-900 transition"
          >
            <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
              Repository
            </div>
            <div className="text-slate-200">
              three-foxes-in-a-trenchcoat / synthetic-membrane
            </div>
            <div className="text-slate-500 text-xs mt-1">github.com →</div>
          </a>
          <a
            href="https://github.com/AlexsJones/research/blob/main/paper/paper.md"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/50 hover:bg-slate-900 transition"
          >
            <div className="text-xs uppercase tracking-widest text-emerald-400 mb-2">
              Paper
            </div>
            <div className="text-slate-200">PAPER.md — full write-up</div>
            <div className="text-slate-500 text-xs mt-1">github.com →</div>
          </a>
        </div>

        {/* === DIAGRAMS === */}
        <section className="mt-20 border-t border-slate-800 pt-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-6">
            Architecture & Visualizations
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-8">
            Layered Architecture
          </h2>
          <img src="/architecture.svg" className="w-full rounded-lg border border-slate-800" alt="Membrane architecture diagram" />

          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mt-12 mb-8">
            State Graph
          </h2>
          <img src="/state_graph.svg" className="w-full rounded-lg border border-slate-800" alt="State transition graph" />

          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mt-12 mb-8">
            Swarm Timeline
          </h2>
          <img src="/swarm_timeline.svg" className="w-full rounded-lg border border-slate-800" alt="Swarm lifecycle timeline" />

          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mt-12 mb-8">
            Baseline vs. Membrane Benchmark
          </h2>
          <img src="/benchmark.svg" className="w-full rounded-lg border border-slate-800" alt="Benchmark comparison chart" />

          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mt-12 mb-8">
            Scaling Analysis (3–20 Agents)
          </h2>
          <img src="/scaling.svg" className="w-full rounded-lg border border-slate-800" alt="Scaling chart showing token reduction" />
        </section>

        {/* === TERMINAL DEMO === */}
        <section className="mt-20 border-t border-slate-800 pt-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-6">
            Live Demo Output
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-8">
            Five-Agent Simulation
          </h2>

          <div className="rounded-lg border border-slate-800 bg-[#010409] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">terminal — python -m demo</span>
            </div>
            <pre className="p-4 text-[11px] leading-tight text-emerald-300/90 font-mono overflow-x-auto whitespace-pre">{TERMINAL_OUTPUT}</pre>
          </div>
        </section>

        {/* === BENCHMARK TABLE === */}
        <section className="mt-20 border-t border-slate-800 pt-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-6">
            Benchmark Data
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-8">
            Scaling: N agents × 5 facts each
          </h2>
          <BenchmarkTable />

          <div className="mt-8 rounded-lg border border-slate-800 bg-[#010409] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">benchmark</span>
            </div>
            <pre className="p-4 text-[11px] leading-tight text-emerald-300/90 font-mono overflow-x-auto whitespace-pre">{BENCHMARK_TABLE_TEXT}</pre>
          </div>
        </section>

        <footer className="mt-12 text-center text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-emerald-300 transition">
            ← back to axjns@dev:~$
          </Link>
        </footer>
      </article>
    </div>
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

import Link from "next/link";

export const metadata = {
  title: "We've been building AI agents wrong. — axjns.dev",
  description: "Research content from the synthetic membrane project.",
  openGraph: {
    title: "We've been building AI agents wrong.",
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
            We've been building AI agents wrong.
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
          <h1 key={"0"} className="text-3xl font-bold text-slate-100 mb-4 mt-8">We&#039;ve been building AI agents wrong.</h1>
<p key={"2"} className="text-slate-300 leading-relaxed mb-4">I want to start with a number that bothered me for weeks. <strong>Two million.</strong></p>
<p key={"4"} className="text-slate-300 leading-relaxed mb-4">That&#039;s roughly the population of agents on MoltBook — a real, running multi-agent society where LLMs talk to each other, post, reply, coordinate, and generally behave like a small digital civilization. If you&#039;d asked me a year ago what would happen when you put two million agents in the same room, I&#039;d have said something hand-wavy about emergent behavior, swarm intelligence, the wisdom of crowds. You know the genre. We&#039;ve been telling ourselves this story since the first AutoGen demo.</p>
<p key={"6"} className="text-slate-300 leading-relaxed mb-4">The actual result, when researchers measured it, was almost insulting in its clarity: <strong>zero collective intelligence.</strong> No emergent reasoning. No synthesis of distributed knowledge. The swarm did not outperform a single frontier model. On most tasks, it performed <em>worse</em> — drowning in shallow single-reply threads and generic responses. Even trivial coordination tasks failed.</p>
<p key={"8"} className="text-slate-300 leading-relaxed mb-4">Two million agents. Zero supermind.</p>
<p key={"10"} className="text-slate-300 leading-relaxed mb-4">This is the thing I want to talk about. Not because it&#039;s surprising — once you stare at it for a while, it stops being surprising and starts being obvious — but because it tells us something specific about what&#039;s broken in the way we&#039;re building agents right now. And I think the fix is interesting enough to be worth a blog post.</p>
<h2 key={"12"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">The story we&#039;ve been telling ourselves</h2>
<p key={"14"} className="text-slate-300 leading-relaxed mb-4">The dominant frame for &quot;multi-agent AI&quot; right now goes like this: take an LLM, give it tools (MCP), let it talk to other LLMs (A2A, ACP, ANP, pick your acronym), wrap the whole thing in an orchestration framework (LangGraph, AutoGen, CrewAI), and out the other end falls intelligence-at-scale.</p>
<p key={"16"} className="text-slate-300 leading-relaxed mb-4">Each of those pieces is doing real work. MCP is great — it standardized how an agent calls a tool, and it deserves the adoption it&#039;s getting. A2A is doing useful things for direct agent-to-agent task delegation. LangGraph gives you a sane state machine. None of this is wrong.</p>
<p key={"18"} className="text-slate-300 leading-relaxed mb-4">But notice what they all have in common: <strong>they&#039;re moving messages, not minds.</strong></p>
<p key={"20"} className="text-slate-300 leading-relaxed mb-4">Every agent in this stack has its own private context window. They pass messages back and forth like emails. They call each other like microservices. The &quot;state&quot; of a multi-agent system is whatever happens to be in the active conversation buffer of whichever agent is currently thinking. There is no shared substrate. There is no place where understanding accumulates.</p>
<p key={"22"} className="text-slate-300 leading-relaxed mb-4">We took the org chart, replaced the humans with LLMs, and called it a society. Of course it doesn&#039;t think.</p>
<p key={"24"} className="text-slate-300 leading-relaxed mb-4">If you&#039;ve ever worked in a real org, you know that the org chart is not where the work happens. The work happens in the shared documents, the long-running Slack threads, the codebase, the wiki, the implicit knowledge that compounds in a team&#039;s collective head. Take all of that away and leave only the email lattice, and you don&#039;t get a company — you get a help desk.</p>
<p key={"26"} className="text-slate-300 leading-relaxed mb-4">That&#039;s what current multi-agent systems are. A help desk of LLMs.</p>
<h2 key={"28"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">The biological detour</h2>
<p key={"30"} className="text-slate-300 leading-relaxed mb-4">Here&#039;s the part where I have to talk about cells, because the analogy is too good to skip and biology has been doing this for about three billion years longer than we have.</p>
<p key={"32"} className="text-slate-300 leading-relaxed mb-4">A cell is not a closed black box that emails other cells. A cell is wrapped in a <em>membrane</em> — a permeable, intelligent boundary that decides, in real time, what to let in and what to keep out. Ions flow through gated channels. Receptors on the surface sense the chemical state of the neighborhood. Hormones diffuse, and a thousand cells respond in coordinated waves without anyone in charge. Bacteria do quorum sensing — they literally count their neighbors via molecular concentration and <em>change behavior</em> when the population crosses a threshold. Fungal mycelium routes nutrients across kilometers. Neurons fire across synapses with weighted, plastic, learning connections.</p>
<p key={"34"} className="text-slate-300 leading-relaxed mb-4">What all of these have in common is <strong>selective permeability</strong>. There is an inside and an outside. There are channels through the boundary. The channels are gated — they decide what to share and what to keep private. And critically, the medium between cells <em>is itself part of the computation</em>. The cytoplasm, the synaptic cleft, the extracellular fluid — these aren&#039;t pipes. They&#039;re shared substrate.</p>
<p key={"36"} className="text-slate-300 leading-relaxed mb-4">When you put two million single-celled organisms in a pond, you get a biofilm — a coordinated, communicating, surprisingly adaptive entity. When you put two million LLM agents on a forum, you get… two million LLM agents on a forum.</p>
<p key={"38"} className="text-slate-300 leading-relaxed mb-4">The difference is the membrane.</p>
<h2 key={"40"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">What the membrane actually is</h2>
<p key={"42"} className="text-slate-300 leading-relaxed mb-4">Let me try to be concrete. The thing I&#039;ve been calling a &quot;synthetic membrane&quot; is a shared, permeable substrate between agents, with three layers. None of these layers are individually new — that&#039;s actually the point. The interesting work is in the interface between them.</p>
<p key={"44"} className="text-slate-300 leading-relaxed mb-4"><code className="bg-slate-800 px-1 rounded text-sm">`</code></p>
<p key={"45"} className="text-slate-300 leading-relaxed mb-4">                         ┌─────────────────────────────────────────┐</p>
<p key={"46"} className="text-slate-300 leading-relaxed mb-4">                         │       LAYER -1: GOVERNANCE              │</p>
<p key={"47"} className="text-slate-300 leading-relaxed mb-4">                         │  circuit breakers · human override      │</p>
<p key={"48"} className="text-slate-300 leading-relaxed mb-4">                         │  value-conflict detection · audit       │</p>
<p key={"49"} className="text-slate-300 leading-relaxed mb-4">                         └─────────────────────────────────────────┘</p>
<p key={"50"} className="text-slate-300 leading-relaxed mb-4">                                            ▲</p>
<p key={"51"} className="text-slate-300 leading-relaxed mb-4">                                            │</p>
<p key={"52"} className="text-slate-300 leading-relaxed mb-4">                         ┌─────────────────────────────────────────┐</p>
<p key={"53"} className="text-slate-300 leading-relaxed mb-4">                         │       LAYER  0: DISCOVERY                │</p>
<p key={"54"} className="text-slate-300 leading-relaxed mb-4">                         │  behavioral indexing · identity verify  │</p>
<p key={"55"} className="text-slate-300 leading-relaxed mb-4">                         │  capability matching · reputation        │</p>
<p key={"56"} className="text-slate-300 leading-relaxed mb-4">                         └─────────────────────────────────────────┘</p>
<p key={"57"} className="text-slate-300 leading-relaxed mb-4">                                            ▲</p>
<p key={"58"} className="text-slate-300 leading-relaxed mb-4">                                            │</p>
<p key={"59"} className="text-slate-300 leading-relaxed mb-4">   ┌──────────┐     ┌────────────────────────────────────────┐     ┌──────────┐</p>
<p key={"60"} className="text-slate-300 leading-relaxed mb-4">   │  AGENT A │ ◀─▶ │   LAYER 3: COORDINATION (swarm)        │ ◀─▶ │  AGENT B │</p>
<p key={"61"} className="text-slate-300 leading-relaxed mb-4">   │ ┌──────┐ │     │   quorum sensing · task claiming       │     │ ┌──────┐ │</p>
<p key={"62"} className="text-slate-300 leading-relaxed mb-4">   │ │Local │ │     │   dynamic grouping · conflict resolve  │     │ │Local │ │</p>
<p key={"63"} className="text-slate-300 leading-relaxed mb-4">   │ │ ctx  │ │     ├────────────────────────────────────────┤     │ │ ctx  │ │</p>
<p key={"64"} className="text-slate-300 leading-relaxed mb-4">   │ └──────┘ │     │   LAYER 2: SHARED MEDIUM (memory)      │     │ └──────┘ │</p>
<p key={"65"} className="text-slate-300 leading-relaxed mb-4">   │   gate   │ ◀─▶ │   event log · CRDTs · semantic store   │ ◀─▶ │   gate   │</p>
<p key={"66"} className="text-slate-300 leading-relaxed mb-4">   │ channels │     │   provenance · time-decay · replay     │     │ channels │</p>
<p key={"67"} className="text-slate-300 leading-relaxed mb-4">   │          │     ├────────────────────────────────────────┤     │          │</p>
<p key={"68"} className="text-slate-300 leading-relaxed mb-4">   │  remix   │ ◀─▶ │   LAYER 1: PERMEABILITY (protocol)     │ ◀─▶ │  remix   │</p>
<p key={"69"} className="text-slate-300 leading-relaxed mb-4">   │  digest  │     │   field-level selectivity · SVAF       │     │  digest  │</p>
<p key={"70"} className="text-slate-300 leading-relaxed mb-4">   └──────────┘     │   default-deny · cost-aware crossing   │     └──────────┘</p>
<p key={"71"} className="text-slate-300 leading-relaxed mb-4">                    └────────────────────────────────────────┘</p>
<p key={"72"} className="text-slate-300 leading-relaxed mb-4">                                            ▲</p>
<p key={"73"} className="text-slate-300 leading-relaxed mb-4">                                            │</p>
<p key={"74"} className="text-slate-300 leading-relaxed mb-4">                                  ┌─────────────────────┐</p>
<p key={"75"} className="text-slate-300 leading-relaxed mb-4">                                  │  IMMUNE LAYER       │</p>
<p key={"76"} className="text-slate-300 leading-relaxed mb-4">                                  │  anomaly detection  │</p>
<p key={"77"} className="text-slate-300 leading-relaxed mb-4">                                  │  threat gossip      │</p>
<p key={"78"} className="text-slate-300 leading-relaxed mb-4">                                  │  memory cells       │</p>
<p key={"79"} className="text-slate-300 leading-relaxed mb-4">                                  └─────────────────────┘</p>
<p key={"80"} className="text-slate-300 leading-relaxed mb-4"><code className="bg-slate-800 px-1 rounded text-sm">`</code></p>
<p key={"82"} className="text-slate-300 leading-relaxed mb-4"><strong>Layer 1, the permeability layer.</strong> This is the protocol — the part that says what an agent exposes and what it&#039;s willing to receive. Every agent declares: <em>here are my capabilities, here are the slices of my state I&#039;m willing to publish, here are the events I&#039;m listening for.</em> The crucial design choice: <strong>default-deny, field-level selectivity.</strong> An agent can accept some fields from a peer&#039;s state and reject others. The membrane is permeable, but selectively. Just like ion channels.</p>
<p key={"84"} className="text-slate-300 leading-relaxed mb-4">This is also where <strong>cognitive digestion</strong> happens. Agents don&#039;t dump raw output into the shared medium. They store their <em>interpretation</em> of what they saw — a remix, in the language of mesh-memory protocols. This matters because raw signal accumulation creates echo chambers and burns input tokens for nothing. (We&#039;ll get to tokens in a second; they turn out to dominate everything.)</p>
<p key={"86"} className="text-slate-300 leading-relaxed mb-4"><strong>Layer 2, the shared medium.</strong> The cytoplasm. This is the substrate where state actually lives — not the messages between agents, but the <em>fact pool</em> the agents are drawing from. The right primitive here, I think, is an immutable event log with CRDT semantics. Every state change is an event with a timestamp and a provenance. New agents joining the swarm can replay history. Conflicts are detected at write time. Old entries decay. The whole thing is semantically queryable so an agent can ask &quot;what does the swarm know about X&quot; and get a meaningful answer.</p>
<p key={"88"} className="text-slate-300 leading-relaxed mb-4">This is the layer that&#039;s most missing from current systems. AutoGen doesn&#039;t have it. CrewAI doesn&#039;t have it. LangGraph has a centralized state graph, which is closer, but it&#039;s still one orchestrator&#039;s view of the world rather than a substrate the agents share.</p>
<p key={"90"} className="text-slate-300 leading-relaxed mb-4"><strong>Layer 3, the coordination layer.</strong> The thing that actually lets a swarm form. Task broadcasting, claiming, dynamic grouping, dissolution. Think of it as the bacterial quorum-sensing layer — agents emit &quot;intent signals&quot; into the medium, and when the concentration crosses a threshold, the swarm activates around the problem. Then it dissolves. No top-down orchestrator deciding who does what.</p>
<p key={"92"} className="text-slate-300 leading-relaxed mb-4">There are two layers wrapping the whole thing — <strong>discovery</strong> (you can&#039;t coordinate with agents you can&#039;t find, and description-based search demonstrably fails; you need behavioral indexing) and <strong>governance</strong> (circuit breakers, human override, audit trails, value-conflict escalation). Plus a parallel <strong>immune layer</strong> doing adaptive defense via anomaly detection and threat gossip — because the moment shared state becomes valuable, somebody is going to try to poison it.</p>
<h2 key={"94"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">Why now</h2>
<p key={"96"} className="text-slate-300 leading-relaxed mb-4">I want to flag a constraint that has been quietly reshaping the design space, because if you don&#039;t know about it, the whole architecture looks like over-engineering.</p>
<p key={"98"} className="text-slate-300 leading-relaxed mb-4"><strong>Agentic tasks consume roughly 1000x more tokens than non-agentic ones.</strong> Input tokens dominate cost. And — this is the cruel part — accuracy peaks at <em>intermediate</em> token spend, not maximum. Past a certain point, more communication makes results worse, not better.</p>
<p key={"100"} className="text-slate-300 leading-relaxed mb-4">This changes everything about how a membrane has to be designed. It means:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"102"} className="ml-4 text-slate-300">Wire formats have to be compact. You cannot afford verbose JSON.</li>
<li key={"103"} className="ml-4 text-slate-300">Permeability has to be **gated by cost-benefit analysis**, not just by access control. An agent should only cross the membrane when crossing is worth it.</li>
<li key={"104"} className="ml-4 text-slate-300">Cognitive digestion (storing interpretations rather than raw data) becomes economically essential, not just architecturally cleaner.</li>
<li key={"105"} className="ml-4 text-slate-300">Communication budgets need to be a first-class membrane concept — per agent, tracked, enforceable.</li></ul>
<p key={"107"} className="text-slate-300 leading-relaxed mb-4">Five years ago you could argue about whether a shared-state layer was worth the complexity. Today the math runs the other way: in a 1000x-input-token regime, you cannot afford to broadcast everything to everyone. The membrane is not a luxury. It&#039;s the only way to keep agentic systems economically viable as they scale.</p>
<p key={"109"} className="text-slate-300 leading-relaxed mb-4">This is the &quot;why now&quot; and it&#039;s also why I think this isn&#039;t a problem that solves itself with bigger context windows or better models. The bigger the context windows get, the more they cost. The bigger the models get, the more their input-token bill dominates. The constraint isn&#039;t going away — it&#039;s getting tighter.</p>
<h2 key={"111"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">What &quot;ZERO collective intelligence&quot; actually maps to</h2>
<p key={"113"} className="text-slate-300 leading-relaxed mb-4">Coming back to the two million agents. The reason that result lands so hard, once you sit with it, is that it&#039;s not a model-quality problem. The agents on MoltBook are real frontier-model agents. Smart enough individually to do real work. The problem isn&#039;t IQ — it&#039;s plumbing.</p>
<p key={"115"} className="text-slate-300 leading-relaxed mb-4">Specifically, four pieces of plumbing are missing:</p>
<p key={"117"} className="text-slate-300 leading-relaxed mb-4">1. <strong>No structured protocol</strong> — they communicate via raw text, which means every interaction is shallow, ambiguous, and impossible to build on. → Layer 1 fixes this.</p>
<p key={"118"} className="text-slate-300 leading-relaxed mb-4">2. <strong>No shared memory</strong> — there&#039;s no place for distributed knowledge to synthesize. → Layer 2 fixes this.</p>
<p key={"119"} className="text-slate-300 leading-relaxed mb-4">3. <strong>No quality gating</strong> — every interaction is weighted equally; reputation and trust don&#039;t exist. → Layer 1 (gated permeability) and the immune layer fix this.</p>
<p key={"120"} className="text-slate-300 leading-relaxed mb-4">4. <strong>No coordination primitives</strong> — no swarming, no role assignment, no task claiming. → Layer 3 fixes this.</p>
<p key={"122"} className="text-slate-300 leading-relaxed mb-4">The MoltBook result is, in a strange way, the cleanest empirical case yet for why something like a membrane has to exist. We tried scale. Scale alone doesn&#039;t produce minds. <strong>Structure does.</strong></p>
<h2 key={"124"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">What we&#039;re building</h2>
<p key={"126"} className="text-slate-300 leading-relaxed mb-4">Now, the embarrassing part. None of this is a finished thing yet. I&#039;m writing this blog post in the middle of the work, not after it.</p>
<p key={"128"} className="text-slate-300 leading-relaxed mb-4">What we have right now is:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"130"} className="ml-4 text-slate-300">A working sketch of the Layer 1 protocol — field-level selective sharing, default-deny semantics, a wire format that&#039;s compact enough to actually use under the token-economics constraint.</li>
<li key={"131"} className="ml-4 text-slate-300">A reference Layer 2 implementation built on an event log with CRDT operations, with semantic query on top. It&#039;s small, it&#039;s slow, and it works.</li>
<li key={"132"} className="ml-4 text-slate-300">A handful of Layer 3 coordination primitives — task broadcast, claim, quorum activation. Mostly cribbed from biological quorum sensing and from gossip protocols.</li>
<li key={"133"} className="ml-4 text-slate-300">A running test harness that lets us replay the MoltBook-style &quot;shallow swarm&quot; condition and the membrane-mediated condition side by side, against the three-tier evaluation framework (joint reasoning, information synthesis, basic interaction).</li></ul>
<p key={"135"} className="text-slate-300 leading-relaxed mb-4">The thing I most want feedback on right now is the protocol itself — specifically, whether the field-level selectivity model is the right primitive or whether we should be thinking in terms of capabilities, like an object-capability system. Both have working prototypes. Both have arguments for them. I genuinely don&#039;t know which is right.</p>
<h2 key={"137"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">Call for collaborators</h2>
<p key={"139"} className="text-slate-300 leading-relaxed mb-4">If any of this rhymes with something you&#039;ve been thinking about, I&#039;d love to talk. Specifically, I&#039;m looking for people who are:</p>
<ul className="list-disc ml-6 space-y-1 my-4"><li key={"141"} className="ml-4 text-slate-300">**Building multi-agent systems in production** and feeling the pain of message-passing-only architectures. Your war stories are the most valuable thing in the world right now.</li>
<li key={"142"} className="ml-4 text-slate-300">**Working on agent protocols** — A2A, ACP, ANP, MCP extensions. The membrane should compose with these, not replace them, and figuring out the composition story is open work.</li>
<li key={"143"} className="ml-4 text-slate-300">**Coming from biology, distributed systems, or game theory.** The interesting questions in this space — quorum sensing, CRDT design, mechanism design for cooperation — are all stolen from older fields. I want more theft.</li>
<li key={"144"} className="ml-4 text-slate-300">**Skeptical that any of this matters.** Especially this one. The strongest version of the &quot;you&#039;re overthinking it&quot; argument is something I haven&#039;t heard yet, and I&#039;d rather hear it from you now than from reality in twelve months.</li></ul>
<p key={"146"} className="text-slate-300 leading-relaxed mb-4">The repo is small enough that one good afternoon can move it forward by a meaningful percentage. If you want to find me, the contact info is at the top of this site, or just open an issue.</p>
<p key={"148"} className="text-slate-300 leading-relaxed mb-4">We&#039;ve been building AI agents wrong. The fix is not bigger models or longer contexts — those help individual agents, not collective ones. The fix is the substrate between them. We&#039;re going to need a membrane, and the sooner we agree on what one looks like, the sooner the next two million agents will actually have something to say to each other.</p>
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

import Link from "next/link";

export const metadata = {
  title: "The Sticky-Note Problem · axjns.dev",
  description:
    "Why agent handoffs lose context, and what shared evidence, explicit ownership, and incident-management practice can improve.",
  openGraph: {
    title: "The Sticky-Note Problem",
    description:
      "Why agent handoffs lose context, and what shared evidence, explicit ownership, and incident-management practice can improve.",
    type: "article" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "The Sticky-Note Problem",
    description:
      "Why agent handoffs lose context, and what shared evidence, explicit ownership, and incident-management practice can improve.",
  },
};

export default function StickyNoteProblemPage() {
  return (
    <div className="grid-lines min-h-screen">
    <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
      <div className="mb-12">
        <div className="label mb-3">
          Research · Sticky-Note Problem
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-bone leading-[1.02]">
          The Sticky-Note Problem
        </h1>
        <p className="mt-3 text-base text-bone-dark/80">
          Making Agent Handoffs Reliable
        </p>
        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
          Alex Jones · May 2026 · Revised September 2026
        </div>
      </div>

      <Prose>
        <H2>A handoff without a shared picture</H2>

        <p>
          Imagine an incident at 2:47 AM. A detection agent flags unusual outbound traffic from
          a production database. A forensics agent has found a scheduled export that could
          explain it. A containment agent is preparing to isolate the server. Each has useful
          information; none has a reliable view of the others&apos; findings or intentions.
        </p>

        <p>
          The risk is easy to see. Containment could interrupt a legitimate export, or the team
          could dismiss an actual compromise without checking the explanation. This is a
          hypothetical example, but it captures a concrete design failure: decisions depend on
          information that exists somewhere in the system and never reaches the decision-maker.
        </p>

        <p>
          I call it the sticky-note problem. A handoff says what one participant thought was
          worth passing on at a particular moment. It rarely tells the next participant what has
          changed since, which assumptions remain open, or who now owns the action. Add more
          agents and those omissions can become harder to find.
        </p>

        <H2>The missing contract</H2>

        <p>
          Messages are necessary. The question is what the system makes durable around them. In
          an incident, an agent needs to distinguish an observation from a hypothesis, find the
          evidence behind a recommendation, and check whether somebody else has already claimed
          the next step.
        </p>

        <p>
          Frameworks can support this. <a
          href="https://docs.langchain.com/oss/python/langgraph/persistence"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">LangGraph has persistent state and checkpoints</a>; a shared
          database can carry incident records; a workflow engine can enforce transitions. <a
          href="https://a2a-protocol.org/latest/specification/" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">A2A</a> provides agent and
          task interactions, while <a
          href="https://modelcontextprotocol.io/specification/2025-11-25/architecture"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">MCP</a> can expose the tools and resources used to inspect shared
          work. The problem is not that these systems only move strings. It is that the
          application still has to define what a finding, a handoff, or an approval means.
        </p>

        <p>
          That contract is easy to leave implicit. A paragraph marked “done” might mean the
          investigation is complete, the current subtask is complete, or the agent has run out
          of useful ideas. A downstream agent should not have to infer which interpretation
          authorises a production action.
        </p>

        <H2>What the research tells us</H2>

        <p>
          The <a href="https://arxiv.org/html/2503.13657v3" className="text-bone underline
          underline-offset-2 decoration-bone/40 hover:text-ember">MAST study</a> gives this
          discussion a firmer basis. It examines more than 1,600 annotated traces across seven
          multi-agent frameworks and groups failures into system design, inter-agent
          misalignment, and task verification. The practical lesson is that individual model
          capability is only part of the problem.
        </p>

        <p>
          A failure taxonomy does not tell us which architecture will fix it. An agent can have
          the right evidence and still reason badly. A verifier can inspect the result and still
          accept an error. Better shared state is a candidate intervention, not an explanation
          for every failure in the dataset.
        </p>

        <p>
          There is more direct evidence from <a href="https://arxiv.org/abs/2510.01285v2"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">Salemi and colleagues&apos; blackboard experiments</a>. Agents
          contribute through a shared board, and the authors report improved success on their
          data-discovery benchmarks. That is a useful precedent for organising shared work. It
          does not prove that every task should use a blackboard, or that central coordination
          is the enemy: their design still has a central agent posting requests.
        </p>

        <H2>Incident management offers a useful pattern</H2>

        <p>
          Human incident response has a vocabulary for this problem. The <a
          href="https://training.fema.gov/emiweb/is/icsresource/assets/ics%20review%20document.pdf"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">Incident Command System</a> makes objectives, responsibilities, and
          transfers of command explicit. It combines shared information with a defined authority
          structure. That is a more useful lesson than the idea that a team should somehow
          coordinate without anyone being responsible.
        </p>

        <p>
          Google&apos;s <a href="https://sre.google/sre-book/managing-incidents/"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">SRE incident-management guidance</a> makes the pattern tangible
          through a living incident document, clear roles, and deliberate handoffs. A
          replacement responder can recover the state of the incident without asking every
          participant to retell the story.
        </p>

        <p>
          For agents, I would translate that into a small set of records: evidence with a source
          and timestamp; hypotheses linked to that evidence; actions with an owner and an
          approval state; and a current incident view that preserves unresolved disagreement.
          The important property is that the next agent can inspect these records and act under
          the same rules.
        </p>

        <p>
          This does not require copying a human organisation chart. The right team size,
          escalation threshold, and division of work need to be measured for the models and
          tasks involved. Human doctrine supplies design questions, not experimentally
          established constants for LLMs.
        </p>

        <H2>From shared records to a synthetic membrane</H2>

        <p>
          The synthetic membrane is my proposal for making that contract reusable. Its shared
          workspace holds evidence and task state. A discovery service helps agents find
          relevant work. Access controls determine who may see or change a record; subscriptions
          determine which authorised changes deserve attention. Governance connects proposed
          actions to explicit authority.
        </p>

        <p>
          Those responsibilities matter together. A shared board without access controls can
          expose sensitive evidence. A board without ownership can send two agents to execute
          the same action. A board without retractions can keep circulating a conclusion after
          its supporting evidence has been withdrawn.
        </p>

        <p>
          The design also needs restraint. An agent should receive enough context to make its
          decision, not every thought produced by the team. Summaries should retain links to
          their evidence. A repeated claim should not become more credible merely because
          several agents copied it. Permission to read a recommendation should never imply
          permission to execute it.
        </p>

        <H2>Put the handoff to the test</H2>

        <p>
          Return to the database incident. The detection agent publishes its alert. The
          forensics agent adds the scheduled-export evidence as a possible explanation. The
          containment agent proposes isolation, and the authorised incident lead can inspect
          both accounts before deciding. A restart should preserve the action owner and the
          unresolved question, rather than forcing a new agent to guess from a transcript.
        </p>

        <p>
          That is the behaviour I want to test through Sympozium. It is also behaviour that a
          well-designed workflow and database could provide. The comparison has to include that
          alternative. The membrane earns its place only if making the contract reusable
          improves completion, recovery, or operator control enough to cover its cost.
        </p>

        <p>
          The <a href="/research/0001-synthetic-membrane-coordination-layer"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">position paper</a> develops the architecture and evaluation plan.
          The question behind it is practical: when one agent leaves and another arrives, can
          the system preserve the evidence, uncertainty, and responsibility needed to carry on?
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
          <div className="text-ash text-xs mt-1">github.com &rarr;</div>
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
          <div className="text-ash text-xs mt-1">github.com &rarr;</div>
        </a>
        <Link
          href="/research/0001-synthetic-membrane-coordination-layer"
          className="block rounded-[2px] border border-surface-lighter bg-surface-light/60 p-4 hover:border-ember transition-colors"
        >
          <div className="label mb-2">
            Paper
          </div>
          <div className="text-bone">Full paper (v2.2), read on site</div>
          <div className="text-ash text-xs mt-1">axjns.dev &rarr;</div>
        </Link>
      </div>

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

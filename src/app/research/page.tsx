import Link from "next/link";
import { ARTICLES, Article } from "./articles";
import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Research — axjns.dev",
  description: "Research papers by Alex Jones.",
};

function NodeCard({ article }: { article: Article }) {
  const superseded = article.status === "superseded";
  const inner = (
    <>
      <div className="flex items-center justify-between mb-4">
        <span
          className={`font-mono text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-[2px] ${
            superseded
              ? "text-ash border border-ash/50"
              : "text-surface bg-bone"
          }`}
        >
          {superseded
            ? `${article.version} · superseded`
            : `current · ${article.version}`}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
          {article.date}
        </span>
      </div>
      {superseded && (
        <span className="stamp right-8 top-9 hidden sm:block">Superseded</span>
      )}
      <h2
        className={`font-display text-bone group-hover:text-ember transition-colors mb-3 leading-snug ${
          superseded ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"
        }`}
      >
        {article.title}
      </h2>
      <p className="text-xs text-bone-dark/70 leading-relaxed max-w-2xl">
        {article.description}
      </p>
      {article.unpublished ? (
        <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
          Archived &mdash; superseded by current revision
        </div>
      ) : (
        <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ember row-arrow">
          {superseded ? "Read original ↗" : "Read paper ↗"}
        </div>
      )}
    </>
  );

  if (article.unpublished) {
    return (
      <div className="relative border rounded-[2px] border-surface-lighter/60 bg-surface-light/30 p-5 opacity-70">
        {inner}
      </div>
    );
  }
  return (
    <Link
      href={`/research/${article.slug}`}
      className={`group relative block border rounded-[2px] transition-colors ${
        superseded
          ? "border-surface-lighter/60 bg-surface-light/30 p-5 opacity-70 hover:opacity-100 hover:border-ember"
          : "border-surface-lighter bg-surface-light/60 p-7 hover:border-ember"
      }`}
    >
      {inner}
    </Link>
  );
}

export default function ResearchIndex() {
  // Group articles into research lines by tag; render each line as an
  // evolution timeline, oldest revision first, current revision emphasised.
  const lines = new Map<string, Article[]>();
  for (const a of ARTICLES) {
    lines.set(a.tag, [...(lines.get(a.tag) ?? []), a]);
  }

  return (
    <div className="grid-lines min-h-screen">
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
        {/* dossier punch holes down the left margin */}
        <div className="punch-rail -left-10 hidden lg:block" aria-hidden />
        <PageHeader
          index="003"
          label="papers"
          title="Research"
          accent="dossier."
          intro="Long-form technical writing on things I'm actively building. Papers evolve; each research line shows its revisions."
        />

        <Reveal>
          <div className="mb-10 border-y border-surface-lighter py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-ash flex flex-wrap gap-x-6 gap-y-1">
            <span>
              File 0001 &middot; Subject:{" "}
              <span className="redact">agent coordination</span> substrate
            </span>
            <span>Status: active research</span>
          </div>
        </Reveal>

        <div className="space-y-14">
          {[...lines.entries()].map(([tag, articles], lineIdx) => {
            const chronological = [...articles].reverse(); // oldest first
            return (
              <section key={tag}>
                <Reveal>
                  {/* folder tab */}
                  <div className="inline-block border border-surface-lighter border-b-0 bg-surface-light/60 px-4 pt-2 pb-3 -mb-px rounded-t-[3px] font-mono text-[10px] uppercase tracking-[0.15em] text-bone-dark">
                    File {String(lineIdx + 1).padStart(4, "0")} &middot; {tag}
                  </div>
                  <div className="border-t border-surface-lighter" />
                </Reveal>

                <ol className="relative border-l-2 border-bone/30 ml-[5px] mt-8 pl-6 sm:pl-10 space-y-0">
                  {chronological.map((article, i) => {
                    const isCurrent = article.status !== "superseded";
                    const next = chronological[i + 1];
                    return (
                      <li key={article.slug} className="relative pb-2">
                        {/* node marker on the rail */}
                        <span
                          aria-hidden
                          className={`absolute -left-[31px] sm:-left-[47px] top-7 w-3 h-3 ${
                            isCurrent
                              ? "bg-bone"
                              : "bg-surface border-2 border-bone/60 rounded-full"
                          }`}
                        />
                        <Reveal delay={i * 90}>
                          <NodeCard article={article} />
                        </Reveal>

                        {/* delta between this revision and the next */}
                        {next?.changes && next.changes.length > 0 && (
                          <Reveal delay={i * 90 + 60}>
                            <div className="py-4 pl-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ash leading-relaxed">
                              {next.changes.map((c) => (
                                <span
                                  key={c}
                                  className="inline-block mr-4"
                                >
                                  + {c}
                                </span>
                              ))}
                              <span className="text-ember">&#9660;</span>
                            </div>
                          </Reveal>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>

        <Reveal delay={150}>
          <div className="mt-14 pt-8 border-t border-surface-lighter">
            <div className="label mb-4">[ source ]</div>
            <a
              href="https://github.com/AlexsJones/research"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-dashed border-surface-lighter p-5 rounded-[2px] hover:border-ember transition-colors"
            >
              <div className="font-mono text-xs text-ember">
                AlexsJones/research
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ash mt-1.5">
                Papers, articles, and reference implementation on GitHub &#8599;
              </div>
            </a>
          </div>
        </Reveal>
      </main>
    </div>
  );
}

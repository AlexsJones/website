import Link from "next/link";
import { ARTICLES } from "./articles";
import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";

export const metadata = {
  title: "Research — axjns.dev",
  description: "Research papers by Alex Jones.",
};

export default function ResearchIndex() {
  return (
    <div className="grid-lines min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
        <PageHeader
          index="003"
          label="papers"
          title="Research"
          accent="dossier."
          intro="Long-form technical writing on things I'm actively building."
        />

        <div className="space-y-4">
          {ARTICLES.map((article, i) => (
            <Reveal key={article.slug} delay={i * 90}>
              <Link
                href={`/research/${article.slug}`}
                className="group block border border-surface-lighter bg-surface-light/60 p-7 rounded-[2px] hover:border-ember transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-surface bg-bone px-1.5 py-0.5 rounded-[2px]">
                    {article.tag} &middot; {article.type}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ash">
                    {article.date}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-bone group-hover:text-ember transition-colors mb-3 leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs text-bone-dark/70 leading-relaxed max-w-2xl">
                  {article.description}
                </p>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ember row-arrow">
                  Read paper &#8599;
                </div>
              </Link>
            </Reveal>
          ))}
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

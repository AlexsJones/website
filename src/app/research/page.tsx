import Link from "next/link";
import { ARTICLES } from "./articles";

export const metadata = {
  title: "Research - axjns.dev",
  description: "Research papers by Alex Jones.",
};

export default function ResearchIndex() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
          Research
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
          Research
        </h1>
        <p className="mt-4 text-slate-400 text-lg">
          Long-form technical writing on things I&apos;m actively building.
        </p>
      </div>

      <div className="space-y-6">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/research/${article.slug}`}
            className="block rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition group"
          >
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">
              {article.tag} · {article.type}
            </div>
            <h2 className="text-xl font-bold text-slate-100 group-hover:text-emerald-300 transition mb-2">
              {article.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {article.description}
            </p>
            <div className="mt-3 text-xs text-slate-500 font-mono">
              {article.date}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-800">
        <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-4">
          Source
        </div>
        <a
          href="https://github.com/AlexsJones/research"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg border border-slate-800 bg-slate-900/40 p-4 hover:border-emerald-500/50 hover:bg-slate-900 transition text-sm"
        >
          <div className="text-emerald-400 font-mono">AlexsJones/research</div>
          <div className="text-slate-500 text-xs mt-1">
            Papers, articles, and reference implementation on GitHub
          </div>
        </a>
      </div>
    </div>
  );
}

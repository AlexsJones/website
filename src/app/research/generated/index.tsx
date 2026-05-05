import Link from "next/link";

const ITEMS = [
  {
    "slug": "blog-post",
    "title": "We've been building AI agents wrong.",
    "type": "Article",
    "date": "2026",
    "description": "Research article on synthetic membrane topics."
  },
  {
    "slug": "0001-sticky-note-problem",
    "title": "The Sticky-Note Problem: Why Multi-Agent AI Is Broken at the Coordination Layer",
    "type": "Article",
    "date": "2026",
    "description": "Research article on synthetic membrane topics."
  },
  {
    "slug": "synthetic-membrane",
    "title": "The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems",
    "type": "Paper",
    "date": "2026",
    "description": "Research paper on synthetic membrane coordination layer."
  },
  {
    "slug": "0001-synthetic-membrane-coordination-layer",
    "title": "The Synthetic Membrane: A Coordination Layer for Multi-Agent AI Systems",
    "type": "Paper",
    "date": "2026",
    "description": "Research paper on synthetic membrane coordination layer."
  }
];

export const metadata = {
  title: "Research — axjns.dev",
  description: "Research papers and articles from the synthetic membrane project.",
  openGraph: {
    title: "Research — axjns.dev",
    description: "Research papers and articles from the synthetic membrane project.",
    type: "website",
  },
};

export default function ResearchIndex() {
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
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            Research
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
            Research
          </h1>
          <p className="mt-4 text-slate-400 text-lg">
            Papers and articles on multi-agent coordination and the synthetic membrane.
          </p>
        </div>

        <div className="space-y-6">
          {ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={"/research/generated/" + item.type.toLowerCase() + "/" + item.slug}
              className="block rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition group"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono mb-3">
                <span className="text-emerald-400">{item.type}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-500">{item.date}</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-100 mb-2 group-hover:text-emerald-300 transition">
                {item.title}
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed">
                {item.description}
              </p>
              <div className="mt-3 text-emerald-400 font-mono text-xs">
                read →
              </div>
            </Link>
          ))}
        </div>
      </article>

      <footer className="mt-16 border-t border-slate-800 pt-8 text-center text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-300 transition">
          ← back to axjns@dev:~$
        </Link>
      </footer>
    </div>
  );
}

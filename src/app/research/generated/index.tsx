import Link from "next/link";

const ITEMS = [
  {
    "slug": "0001-synthetic-membrane-coordination-layer",
    "title": "The Synthetic Membrane: A Coordination Layer for Multi-Agent AI Systems",
    "type": "Paper",
    "date": "2026",
    "description": "Research paper on synthetic membrane topics."
  },
  {
    "slug": "synthetic-membrane",
    "title": "The Synthetic Membrane: A Shared Permeable Boundary for Multi-Agent AI Systems",
    "type": "Paper",
    "date": "2026",
    "description": "Research paper on synthetic membrane topics."
  },
  {
    "slug": "0001-sticky-note-problem",
    "title": "The Sticky-Note Problem: Why Multi-Agent AI Is Broken at the Coordination Layer",
    "type": "Article",
    "date": "2026",
    "description": "Research article on synthetic membrane topics."
  },
  {
    "slug": "blog-post",
    "title": "We've been building AI agents wrong.",
    "type": "Article",
    "date": "2026",
    "description": "Research article on synthetic membrane topics."
  }
];

export default function ResearchIndex() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <header className="border-b border-slate-800/80 bg-[#0d1117]/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm font-mono">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition">← axjns.dev</Link>
          <span className="text-slate-500">Synthetic Membrane</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-100 mb-8">Research Papers & Articles</h1>
        <div className="space-y-4">
          {ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={"/research/generated/" + item.type.toLowerCase() + "/" + item.slug}
              className="block p-6 border border-slate-800 rounded-lg hover:border-emerald-500/50 transition"
            >
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">
                {item.type} · {item.date}
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h2>
              <p className="text-slate-400">{item.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

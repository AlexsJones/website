import Link from "next/link";

export const metadata = {
  title: "Blog — axjns.dev",
  description: "Notes on synthetic membranes, multi-agent systems, and whatever else is on my mind.",
};

const POSTS = [
  {
    slug: "the-sticky-note-problem",
    title: "The Sticky-Note Problem: Why Multi-Agent AI Is Broken at the Coordination Layer",
    date: "May 5, 2026",
    excerpt:
      "Every framework gives you agents that send messages to each other. There is a better way. This is the first article in a series on the synthetic membrane — a coordination layer for multi-agent AI.",
    tag: "Synthetic Membrane",
  },
  {
    slug: "synthetic-membrane-research-update",
    title: "17 Papers. One Thesis Getting Harder to Dismiss.",
    date: "April 29, 2026",
    excerpt:
      "A research sweep turned up 17 new papers. None of them break the thesis. Most of them strengthen it.",
    tag: "Synthetic Membrane",
  },
];

export default function BlogPage() {
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

      <main className="max-w-3xl mx-auto px-6 py-16 font-sans">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
            Notes from the work in progress.
          </h1>
        </div>

        <ul className="space-y-6">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono mb-3">
                  <span className="text-emerald-400">{post.tag}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-500">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-100 mb-2">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-[15px] leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-3 text-emerald-400 font-mono text-xs">
                  read post →
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-16 border-t border-slate-800 pt-8 text-center text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-emerald-300 transition">
            ← back to axjns@dev:~$
          </Link>
        </footer>
      </main>
    </div>
  );
}

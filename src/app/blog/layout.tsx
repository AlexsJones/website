import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <header className="border-b border-slate-800/80 bg-[#0d1117]/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm font-mono">
          <Link
            href="/"
            className="text-emerald-400 hover:text-emerald-300 transition"
          >
            ← axjns.dev
          </Link>
          <Link
            href="/blog"
            className="text-slate-400 hover:text-emerald-300 transition"
          >
            blog
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

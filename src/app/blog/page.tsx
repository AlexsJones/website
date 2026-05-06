import Link from "next/link";
import { GENERATED_POSTS } from "../../data/generated-content";

export const metadata = {
  title: "Blog — axjns.dev",
  description: "Blog posts by Alex Jones.",
};

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
          Blog
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
          Blog
        </h1>
        <p className="mt-4 text-slate-400 text-lg">
          Thoughts on AI agents, distributed systems, and the things that break.
        </p>
      </div>

      <div className="space-y-6">
        {GENERATED_POSTS.length === 0 && (
          <p className="text-slate-500 text-sm font-mono">No posts yet. Check back soon.</p>
        )}
        {GENERATED_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/generated/${post.slug}`}
            className="block rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition group"
          >
            <h2 className="text-xl font-bold text-slate-100 group-hover:text-emerald-300 transition mb-2">
              {post.title}
            </h2>
            {post.description && (
              <p className="text-slate-400 text-sm leading-relaxed">
                {post.description}
              </p>
            )}
            <div className="mt-3 text-xs text-slate-500 font-mono">
              {post.date}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

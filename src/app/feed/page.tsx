import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import Reveal from "../../components/Reveal";
import { POSTS } from "../../data/posts";

export const metadata = {
  title: "Feed — axjns.dev",
  description:
    "Latest dispatches on the wire, plus a short, dated view of the work in motion.",
};

function TearLine() {
  return (
    <div aria-hidden className="relative border-t border-dashed border-bone/40">
      <span className="absolute -top-[9px] left-10 bg-surface px-1.5 font-mono text-[11px] text-ash leading-none">
        &#9986;
      </span>
    </div>
  );
}

export default function FeedPage() {
  return (
    <div className="grid-lines min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 corner-ticks">
        <PageHeader
          index="006"
          label="transmissions"
          title="Feed"
          accent="wire."
          intro="Latest dispatches on the wire — plus a short, dated view of the work in motion."
        />

        {/* ── Now (consolidated from /now) ─────────────────── */}
        <Reveal>
          <section className="mb-14">
            <div className="label mb-4">[ field status ]</div>
            <h2 className="font-display text-3xl sm:text-4xl text-bone mb-8">
              Now
            </h2>
            <div className="space-y-8 text-[15px] leading-[1.8] text-bone-dark">
              <section>
                <h3 className="font-display text-2xl text-bone mb-3">Celln</h3>
                <p>
                  Building an execution plane for agents: isolated cells that
                  borrow verified tools rather than assembling mutable
                  environments. The immediate work is making the real KVM path
                  easy to install, inspect and prove.
                </p>
              </section>
              <section>
                <h3 className="font-display text-2xl text-bone mb-3">
                  Sympozium
                </h3>
                <p>
                  Exploring a clean split between coordination and execution.
                  Sympozium should own workflow, policy and shared state; Celln
                  may become the smaller execution primitive beneath an
                  AgentRun.
                </p>
              </section>
              <section>
                <h3 className="font-display text-2xl text-bone mb-3">
                  Questions I am following
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    What does a useful persistent agent API require beyond
                    one-shot jobs?
                  </li>
                  <li>
                    Which capabilities should an agent request explicitly:
                    tools, files, egress, time, memory?
                  </li>
                  <li>
                    How do we make revocation and provenance operational rather
                    than aspirational?
                  </li>
                </ul>
              </section>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
                Updated August 2026 &middot;{" "}
                <Link
                  href="/blog/celln-execution-plane"
                  className="text-ember hover:text-bone"
                >
                  read the Celln notes &#8594;
                </Link>
              </p>
            </div>
          </section>
        </Reveal>

        <TearLine />

        {/* ── Feed items ───────────────────────────────────── */}
        <Reveal>
          <section className="mt-14">
            <div className="label mb-4">[ on the wire ]</div>
            <h2 className="font-display text-3xl sm:text-4xl text-bone mb-3">
              Latest dispatches
            </h2>
            <p className="font-mono text-xs text-ash uppercase tracking-[0.08em] mb-8">
              {POSTS.length} items &middot; also available as an RSS feed
            </p>

            <div className="border-t border-surface-lighter">
              {POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block py-6 px-2 -mx-2 border-b border-surface-lighter hover:bg-surface-light/40 transition-colors"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ash mb-2">
                    {post.date}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-bone group-hover:text-ember transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-bone-dark/70 leading-relaxed max-w-2xl">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] font-medium px-4 py-2.5 border-2 border-bone text-bone hover:bg-bone hover:text-surface transition-colors rounded-[2px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 fill-current"
                >
                  <circle cx="5" cy="19" r="2.25" />
                  <path d="M3 10.5v3.25A7.25 7.25 0 0 1 10.25 21H13.5C13.5 15.2 8.8 10.5 3 10.5Z" />
                  <path d="M3 3v3.25C11.85 6.25 18.75 13.15 18.75 22H22C22 11.35 13.65 3 3 3Z" />
                </svg>
                Subscribe via RSS &#8599;
              </a>
            </div>
          </section>
        </Reveal>
      </main>
    </div>
  );
}

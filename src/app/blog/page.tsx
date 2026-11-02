import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { POSTS } from "../../data/posts";
import { ARTICLES } from "../research/articles";

export const metadata = {
  title: "Writing — axjns.dev",
  description: "Field notes and research by Alex Jones.",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function month(iso: string) {
  const [, m] = iso.split("-");
  return MONTHS[Number(m) - 1] ?? "";
}

/** A ruled sub-head, like the teleprinter lines between v2 sections. */
function SubHead({ id, n, title, count, note }: { id: string; n: string; title: string; count: number; note: string }) {
  return (
    <div id={id} className="scroll-mt-24 mb-2 mt-4 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-3">
      <h2 className="font-display cond text-[clamp(28px,4vw,48px)] leading-[0.9] text-bone">
        {title}
      </h2>
      <span className="label">
        {n} &middot; {note} &middot; {count}
      </span>
    </div>
  );
}

export default function BlogPage() {
  const papers = ARTICLES.filter((a) => a.status !== "superseded");
  return (
    <div className="px-5 sm:px-8 py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px]">
        <PageHeader
          index="005"
          label="field notes · research"
          title="Writing"
          intro="Field notes and research on AI agents, distributed systems, and the things that break."
        />

        <SubHead id="field-notes" n="01" title="Field notes" count={POSTS.length} note="dispatches" />
        <div className="v2-list mb-20">
          <ol>
            {POSTS.map((post) => (
              <li key={post.slug}>
                <span className="yr">{month(post.isoDate)}</span>
                <span>
                  <Link className="t" href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                  <span className="d">{post.description}</span>
                  <span className="ev">{post.date}</span>
                </span>
                <span className="loc">{post.slug === "k8s-local-llm" ? "guide" : "note"}</span>
              </li>
            ))}
          </ol>
        </div>

        <SubHead id="research" n="02" title="Research papers" count={papers.length} note="formal work" />
        <div className="v2-list">
          <ol>
            {papers.map((a) => (
              <li key={a.slug}>
                <span className="yr">{a.version ?? a.type}</span>
                <span>
                  <Link className="t" href={`/research/${a.slug}`}>
                    {a.title}
                  </Link>
                  <span className="d">{a.description}</span>
                  <span className="ev">
                    {a.type} &middot; {a.date}
                  </span>
                </span>
                <span className="loc">{a.type}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

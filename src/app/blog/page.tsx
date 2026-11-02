import Link from "next/link";
import PageHeader from "../../components/PageHeader";
import { POSTS } from "../../data/posts";
import { ARTICLES } from "../research/articles";

export const metadata = {
  title: "Writing — axjns.dev",
  description: "Field notes and research by Alex Jones.",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = (iso: string) => MONTHS[Number(iso.split("-")[1]) - 1] ?? "";
const kind = (slug: string) => (slug === "k8s-local-llm" ? "guide" : "note");

function Meter({ on }: { on: number }) {
  return (
    <span className="v2-meter" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <i key={i} className={i < on ? "on" : undefined} />
      ))}
    </span>
  );
}

// Laid out like the v2 home page's Findings section: section head + lede,
// the newest piece as the "current" card, then ruled ledgers.
export default function BlogPage() {
  const [latest, ...rest] = POSTS;
  const papers = ARTICLES.filter((a) => a.status !== "superseded");
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <PageHeader
          index="005"
          label="field notes · research · what came out of the work"
          title="Writing"
          intro={
            <>
              Notes from work in progress and the longer papers behind them:{" "}
              <b>AI agents, distributed systems, and the things that break.</b>
            </>
          }
        />

        <div className="v2-cur">
          <div className="v">
            <b>{month(latest.isoDate)}</b>
            <span>latest {kind(latest.slug)}</span>
            <span>{latest.date}</span>
            <span>N&ordm; {String(POSTS.length).padStart(2, "0")}</span>
          </div>
          <div className="t">
            <h3>{latest.title}</h3>
            <p>{latest.description}</p>
            <div className="links">
              <Link className="solid" href={`/blog/${latest.slug}`}>
                read the {kind(latest.slug)}
              </Link>
              {latest.slug === "k8s-local-llm" && (
                <a href="https://github.com/AlexsJones/axjns-k8s-local-llm" target="_blank" rel="noopener noreferrer">
                  source &#8599;
                </a>
              )}
            </div>
          </div>
        </div>

        <div id="field-notes" className="v2-sec-sub scroll-mt-24">
          <span className="label">field notes · dispatch ledger</span>
          <span className="label">{POSTS.length} entries</span>
        </div>
        <div className="v2-ledger" aria-label="Field notes">
          {rest.map((post, i) => (
            <div className="row" key={post.slug}>
              <span className="v">
                {String(rest.length - i).padStart(2, "0")}
              </span>
              <span>
                <Link className="ti" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
                <span className="ds">{post.description}</span>
              </span>
              <span className="st">
                {month(post.isoDate)} {post.isoDate.slice(0, 4)} &middot; {kind(post.slug)}
              </span>
            </div>
          ))}
        </div>

        <div id="research" className="v2-sec-sub scroll-mt-24">
          <span className="label">research papers · revision ledger</span>
          <span className="label">{papers.length} current</span>
        </div>
        <div className="v2-ledger" aria-label="Research papers">
          {papers.map((a) => (
            <div className="row" key={a.slug}>
              <span className="v">
                {a.version ?? a.type} <Meter on={5} />
              </span>
              <span>
                <Link className="ti" href={`/research/${a.slug}`}>
                  {a.title}
                </Link>
                <span className="ds">{a.description}</span>
              </span>
              <span className="st">
                {a.date} &middot; {a.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { CopyPre, HardwarePicker } from "./guide-client";

/*
 * Source of truth: README.md in github.com/AlexsJones/axjns-k8s-local-llm.
 * Fetched from GitHub raw at build time (revalidated hourly), falling back to the
 * vendored copy in content/blog/k8s-local-llm (refresh with
 * scripts/sync-k8s-local-llm-guide.sh), so the build never depends on the network.
 */
const REPO = "AlexsJones/axjns-k8s-local-llm";
const REPO_URL = `https://github.com/${REPO}`;
const RAW = `https://raw.githubusercontent.com/${REPO}/main`;
const LOCAL_IMG = "/blog/k8s-local-llm/img";

export const revalidate = 3600;

const TITLE = "From Zero to Serving a Model on Kubernetes, on Your Own Machine";
const DESCRIPTION =
  "A tested, hands-on guide to running an LLM on Kubernetes on your own laptop or desktop: kind, llmfit, Ollama, Intel Arc, NVIDIA and AMD GPUs, and debugging with k8sgpt.";

export const metadata = {
  title: `${TITLE} · axjns.dev`,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" as const },
  twitter: {
    card: "summary_large_image" as const,
    title: TITLE,
    description: DESCRIPTION,
  },
};

async function loadGuide(): Promise<{ md: string; remote: boolean }> {
  if (process.env.GUIDE_REMOTE !== "0") {
    try {
      const res = await fetch(`${RAW}/README.md`, {
        next: { revalidate },
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) return { md: await res.text(), remote: true };
    } catch {
      // fall through to the vendored copy
    }
  }
  const file = path.join(process.cwd(), "content/blog/k8s-local-llm/README.md");
  return { md: await readFile(file, "utf8"), remote: false };
}

type Segment =
  | { kind: "md"; md: string }
  | { kind: "tab"; hw: string; md: string }
  | { kind: "picker" };

/** Strip what the post chrome renders natively, then split on the tab markers. */
function splitGuide(src: string): { subtitle: string; segments: Segment[] } {
  let subtitle = "";
  const md = src
    .replace(/^# .*\n/, "")
    .replace(/^\[!\[contribute to this guide\][^\n]*\n/m, "")
    .replace(/^\*([^*\n]+)\*\n/m, (_, t: string) => {
      subtitle = t;
      return "";
    })
    .replace(/^\[Edit this page on GitHub\][^\n]*\n?/m, "")
    .replace(
      "On GitHub you'll just see all four versions one after another.",
      "Your choice is remembered.",
    );
  const segments: Segment[] = [];
  const re = /<!-- picker -->|<!-- tab:([a-z ]+) -->\n?([\s\S]*?)<!-- \/tab -->/g;
  let last = 0;
  for (const m of md.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) segments.push({ kind: "md", md: md.slice(last, i) });
    if (m[0] === "<!-- picker -->") segments.push({ kind: "picker" });
    else segments.push({ kind: "tab", hw: m[1].trim(), md: m[2] });
    last = i + m[0].length;
  }
  if (last < md.length) segments.push({ kind: "md", md: md.slice(last) });
  return { subtitle, segments };
}

function text(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  if (node && typeof node === "object" && "props" in node)
    return text((node as { props: { children?: React.ReactNode } }).props.children);
  return "";
}
const slug = (n: React.ReactNode) =>
  text(n)
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function components(remote: boolean): Components {
  const imgSrc = (src: string) =>
    /^https?:/.test(src)
      ? src
      : src.startsWith("img/")
        ? remote
          ? `${RAW}/site/${src}`
          : `${LOCAL_IMG}/${src.slice(4)}`
        : src;
  return {
    h2: ({ children }) => (
      <h2
        id={slug(children)}
        className="font-display cond text-3xl sm:text-4xl leading-[0.95] text-bone mt-14 mb-4 pt-4 border-t border-ink scroll-mt-24"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={slug(children)}
        className="font-display cond text-xl sm:text-2xl leading-none text-bone mt-10 mb-3 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    // A paragraph holding only a screenshot becomes a figure (no <figure> inside <p>).
    p: ({ node, children }) => {
      const kids = node?.children ?? [];
      if (kids.length === 1 && kids[0].type === "element" && kids[0].tagName === "img")
        return <>{children}</>;
      return <p>{children}</p>;
    },
    strong: ({ children }) => <strong className="font-bold text-bone">{children}</strong>,
    a: ({ href, children }) => {
      const internal = href?.startsWith("#") || href?.startsWith("/");
      return (
        <a
          href={href}
          {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="text-bone underline underline-offset-2 decoration-bone/40 hover:text-ember"
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt }) => {
      const s = imgSrc(typeof src === "string" ? src : "");
      return (
        <figure className="my-8">
          <a href={s} target="_blank" rel="noopener noreferrer" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s}
              alt={alt ?? ""}
              loading="lazy"
              className="block w-full h-auto border border-ink bg-ink shadow-[6px_6px_0_var(--shadow)]"
            />
          </a>
          {alt && (
            <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] leading-relaxed text-ash">
              Fig. &mdash; {alt}
            </figcaption>
          )}
        </figure>
      );
    },
    ul: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2">{children}</ol>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-ink bg-surface-light pl-5 pr-4 py-1 [&>p]:my-3">
        {children}
      </blockquote>
    ),
    hr: () => (
      <div aria-hidden className="relative my-14 border-t border-dashed border-bone/40">
        <span className="absolute -top-[9px] left-10 bg-surface px-1.5 font-mono text-[11px] text-ash leading-none">
          &#9986;
        </span>
      </div>
    ),
    pre: ({ node, children }) => {
      const code = node?.children?.[0];
      const cls =
        code && code.type === "element" ? String(code.properties?.className ?? "") : "";
      return (
        <CopyPre variant={cls.includes("language-text") ? "output" : "command"}>
          {children}
        </CopyPre>
      );
    },
    code: ({ children, className }) =>
      className ? (
        <code>{children}</code>
      ) : (
        <code className="font-mono text-[13px] text-bone bg-cream px-1 py-0.5 break-words">
          {children}
        </code>
      ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 font-mono text-sm">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead>{children}</thead>,
    th: ({ children }) => (
      <th className="border-b border-ink py-2 pr-4 text-left text-ash text-xs uppercase tracking-wider">
        {children}
      </th>
    ),
    tr: ({ children }) => <tr className="border-b border-ink/30">{children}</tr>,
    td: ({ children }) => (
      <td className="py-2 pr-4 align-top text-bone-dark text-[13px] leading-relaxed">
        {children}
      </td>
    ),
  };
}

function Card({
  href,
  label,
  title,
  sub,
}: {
  href: string;
  label: string;
  title: string;
  sub: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-ink bg-cream p-4 transition-transform hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[var(--depth)_var(--depth)_0_var(--shadow)]"
    >
      <div className="label mb-2">{label}</div>
      <div className="text-bone">{title}</div>
      <div className="text-ash text-xs mt-1">{sub} &rarr;</div>
    </a>
  );
}

export default async function K8sLocalLlmPage() {
  const { md, remote } = await loadGuide();
  const comps = components(remote);
  const { subtitle, segments } = splitGuide(md);
  const render = (s: string, key: number) => (
    <ReactMarkdown key={key} remarkPlugins={[remarkGfm]} components={comps}>
      {s}
    </ReactMarkdown>
  );

  return (
    <div className="min-h-screen">
      <article
        id="hw-guide"
        data-active="cpu"
        className="hw-guide max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-20 font-sans"
      >
        <div className="mb-12">
          <div className="label mb-3">Guide · Kubernetes · Local AI</div>
          <h1 className="font-display cond ext text-[clamp(38px,6.4vw,76px)] text-bone leading-[0.9]">
            {TITLE}
          </h1>
          {subtitle && (
            <p className="mt-5 font-[family-name:var(--font-archivo)] text-[clamp(17px,1.6vw,21px)] leading-[1.45] text-ash">{subtitle}</p>
          )}
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
            Alex Jones · November 2026 · Tested on real hardware
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 border border-ink px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone hover:bg-ink hover:text-surface transition-colors"
          >
            Contribute to this guide &#8599;
          </a>
        </div>

        <div className="space-y-5 text-[15px] leading-[1.8] text-bone-dark">
          {segments.map((s, i) =>
            s.kind === "picker" ? (
              <HardwarePicker key={i} />
            ) : s.kind === "tab" ? (
              <div key={i} data-hw={s.hw} className="space-y-5">
                {render(s.md, i)}
              </div>
            ) : (
              render(s.md, i)
            ),
          )}
        </div>

        <div className="mt-16 border-t border-ink pt-8 grid sm:grid-cols-3 gap-4 font-mono text-sm">
          <Card
            href={REPO_URL}
            label="Repository"
            title="AlexsJones / axjns-k8s-local-llm"
            sub="github.com"
          />
          <Card
            href={`${REPO_URL}/edit/main/README.md`}
            label="Spotted a mistake?"
            title="Edit this page"
            sub="open a pull request"
          />
          <Card
            href="https://axjns.dev/#contact"
            label="Ran it on other hardware?"
            title="Tell me how it went"
            sub="axjns.dev/#contact"
          />
        </div>

        <footer className="mt-12 text-center text-xs font-mono text-ash">
          <Link href="/blog" className="hover:text-bone transition">
            &larr; all writing
          </Link>
        </footer>
      </article>
    </div>
  );
}

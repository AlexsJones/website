import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { CopyPre, HardwarePicker } from "./guide-client";

/*
 * The guide's source of truth is README.md in github.com/AlexsJones/axjns-k8s-local-llm.
 * We fetch it from GitHub raw (revalidated hourly) and fall back to the vendored copy in
 * content/guides/k8s-local-llm (refresh with scripts/sync-k8s-local-llm-guide.sh), so the
 * build never depends on the network or on the repo being public.
 */
const REPO = "AlexsJones/axjns-k8s-local-llm";
const RAW = `https://raw.githubusercontent.com/${REPO}/main`;
const LOCAL_IMG = "/guides/k8s-local-llm/img";

export const revalidate = 3600;

const TITLE = "From zero to serving a model on Kubernetes, on your own machine";
const DESCRIPTION =
  "Run an LLM on Kubernetes on your own laptop or desktop: kind, llmfit, Ollama, GPUs (Intel Arc, NVIDIA, AMD) and debugging with k8sgpt. Tested, with real output.";

export const metadata = {
  title: `${TITLE} · axjns.dev`,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "article" as const },
  twitter: { card: "summary_large_image" as const, title: TITLE, description: DESCRIPTION },
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
  const file = path.join(process.cwd(), "content/guides/k8s-local-llm/README.md");
  return { md: await readFile(file, "utf8"), remote: false };
}

type Segment =
  | { kind: "md"; md: string }
  | { kind: "tab"; hw: string; md: string }
  | { kind: "picker" };

function splitGuide(src: string): Segment[] {
  const md = src
    .replace(/^# .*\n/, "") // the page renders its own title
    .replace(
      "On GitHub you'll just see all four versions one after another.",
      "Your choice is remembered.",
    );
  const out: Segment[] = [];
  const re = /<!-- picker -->|<!-- tab:([a-z ]+) -->\n?([\s\S]*?)<!-- \/tab -->/g;
  let last = 0;
  for (const m of md.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ kind: "md", md: md.slice(last, i) });
    if (m[0] === "<!-- picker -->") out.push({ kind: "picker" });
    else out.push({ kind: "tab", hw: m[1].trim(), md: m[2] });
    last = i + m[0].length;
  }
  if (last < md.length) out.push({ kind: "md", md: md.slice(last) });
  return out;
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
        className="font-display text-2xl sm:text-3xl text-bone mt-16 mb-4 scroll-mt-24"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={slug(children)}
        className="font-display text-lg sm:text-xl text-bone mt-10 mb-3 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-[15px] leading-[1.8] text-bone-dark mb-5">{children}</p>
    ),
    strong: ({ children }) => <strong className="font-bold text-bone">{children}</strong>,
    em: ({ children }) => <em className="italic text-bone-dark">{children}</em>,
    a: ({ href, children }) => {
      const internal = href?.startsWith("#");
      return (
        <a
          href={href}
          {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="text-bone underline underline-offset-2 decoration-bone/40 hover:bg-bone hover:text-cream transition-colors"
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt }) => {
      const s = imgSrc(typeof src === "string" ? src : "");
      if (s.includes("img.shields.io")) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={s} alt={alt ?? ""} className="inline h-5 align-middle" />;
      }
      return (
        <a href={s} target="_blank" rel="noopener noreferrer" className="block my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s}
            alt={alt ?? ""}
            loading="lazy"
            className="w-full h-auto rounded-[2px] border border-bone bg-ink"
          />
        </a>
      );
    },
    ul: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 my-5 text-bone-dark">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 my-5 text-bone-dark">{children}</ol>
    ),
    li: ({ children }) => <li className="text-[15px] leading-[1.8]">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-bone pl-6 my-6 text-bone-dark bg-surface-light/60 py-1">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="border-bone/20 my-12" />,
    pre: ({ children }) => <CopyPre>{children}</CopyPre>,
    code: ({ children, className }) =>
      className ? (
        <code>{children}</code>
      ) : (
        <code className="bg-bone text-cream px-1.5 py-0.5 rounded-[2px] text-[13px] break-words">
          {children}
        </code>
      ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-8 rounded-[2px] border border-surface-lighter">
        <table className="w-full text-sm font-mono">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-bone">{children}</thead>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-cream text-[10px] uppercase tracking-[0.15em]">
        {children}
      </th>
    ),
    tr: ({ children }) => <tr className="border-b border-bone/15">{children}</tr>,
    td: ({ children }) => <td className="px-4 py-3 text-bone-dark align-top">{children}</td>,
  };
}

export default async function K8sLocalLlmGuidePage() {
  const { md, remote } = await loadGuide();
  const comps = components(remote);
  const segments = splitGuide(md);

  return (
    <div className="grid-lines min-h-screen">
      <article
        id="hw-guide"
        data-active="cpu"
        className="hw-guide max-w-3xl mx-auto px-6 py-16 font-sans"
      >
        <div className="mb-12">
          <div className="label mb-3">Guide · Kubernetes · Local AI</div>
          <h1 className="font-display text-4xl sm:text-5xl text-bone leading-[1.02]">
            {TITLE}
          </h1>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
            Alex Jones · November 2026
          </div>
        </div>

        {segments.map((s, i) =>
          s.kind === "picker" ? (
            <HardwarePicker key={i} />
          ) : s.kind === "tab" ? (
            <div key={i} data-hw={s.hw}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={comps}>
                {s.md}
              </ReactMarkdown>
            </div>
          ) : (
            <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={comps}>
              {s.md}
            </ReactMarkdown>
          ),
        )}

        <footer className="mt-12 pt-8 border-t border-surface-lighter flex justify-between text-xs font-mono text-ash">
          <Link href="/blog" className="hover:text-bone transition">
            &larr; writing
          </Link>
          <a
            href={`https://github.com/${REPO}/edit/main/README.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bone transition"
          >
            edit this page on GitHub &rarr;
          </a>
        </footer>
      </article>
    </div>
  );
}

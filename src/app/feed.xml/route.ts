const posts = [
  ["The Agent Environment Should Be a Lease", "celln-execution-plane", "2026-08-03", "Why I built Celln, and why agent infrastructure should lend verified capabilities rather than hand every agent a mutable machine."],
  ["Post-Kubernetes Infrastructure for GenAI Workloads", "post-kubernetes-genai", "2026-07-01", "Field notes on the coming decoupling of coordination from execution."],
  ["The Sticky-Note Problem", "sticky-note-problem", "2026-05-01", "Why multi-agent systems need shared coordination infrastructure."],
] as const;

const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const items = posts.map(([title, slug, date, description]) => `
    <item><title>${esc(title)}</title><link>https://axjns.dev/blog/${slug}</link><guid isPermaLink="true">https://axjns.dev/blog/${slug}</guid><pubDate>${new Date(date).toUTCString()}</pubDate><description>${esc(description)}</description></item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>axjns.dev — Field Notes</title><link>https://axjns.dev/blog</link><description>Essays on AI agents, distributed systems, and infrastructure.</description>${items}</channel></rss>`, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}

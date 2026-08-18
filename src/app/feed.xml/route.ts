import { POSTS } from "../../data/posts";

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const items = POSTS.map(
    (p) => `
    <item><title>${esc(p.title)}</title><link>https://axjns.dev/blog/${p.slug}</link><guid isPermaLink="true">https://axjns.dev/blog/${p.slug}</guid><pubDate>${new Date(p.isoDate).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`
  ).join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>axjns.dev — Field Notes</title><link>https://axjns.dev/blog</link><description>Essays on AI agents, distributed systems, and infrastructure.</description>${items}</channel></rss>`,
    { headers: { "content-type": "application/rss+xml; charset=utf-8" } }
  );
}

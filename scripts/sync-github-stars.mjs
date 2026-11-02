#!/usr/bin/env node
// Refreshes GitHub star counts baked into public/v2/index.html (PROJECTS array and
// the "GitHub stars · all repos" total) and the fallbacks in src/data/projects.ts.
// Total = listed project repos + every other non-fork repo owned by AlexsJones.
// Runs in prebuild. Any API failure keeps the existing numbers; never fails the build.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const V2 = join(root, "public/v2/index.html");
const DATA = join(root, "src/data/projects.ts");
const headers = { "User-Agent": "axjns-site-build", Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function get(url) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 10000);
  try {
    const r = await fetch(url, { headers, signal: ctl.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
    return await r.json();
  } finally { clearTimeout(t); }
}

async function main() {
  let html = readFileSync(V2, "utf8");
  let data = readFileSync(DATA, "utf8");
  const repos = [...html.matchAll(/repo:'([^']+)'[^\n]*?stars:(\d+)/g)].map((m) => m[1]);
  const stars = {};
  for (const repo of repos) {
    try { stars[repo] = (await get(`https://api.github.com/repos/${repo}`)).stargazers_count; }
    catch (e) { console.warn(`[stars] ${repo}: ${e.message}, keeping existing`); }
  }
  for (const [repo, n] of Object.entries(stars)) {
    const esc = repo.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
    html = html.replace(new RegExp(`(repo:'${esc}'[^\\n]*?stars:)\\d+`), `$1${n}`);
    data = data.replace(new RegExp(`(repo: "${esc}",[\\s\\S]*?stars: )\\d+`), `$1${n}`);
    console.log(`[stars] ${repo}: ${n}`);
  }
  // all-repos total, only if every lookup succeeded
  try {
    if (Object.keys(stars).length !== repos.length) throw new Error("incomplete project lookups");
    let total = Object.values(stars).reduce((a, b) => a + b, 0);
    const listed = new Set(repos.map((r) => r.toLowerCase()));
    for (let page = 1; page < 20; page++) {
      const list = await get(`https://api.github.com/users/AlexsJones/repos?per_page=100&type=owner&page=${page}`);
      for (const r of list) if (!r.fork && !listed.has(r.full_name.toLowerCase())) total += r.stargazers_count;
      if (list.length < 100) break;
    }
    html = html.replace(/(data-count=")\d+("[^>]*>0<\/span><span class="sub">GitHub stars · all repos)/, `$1${total}$2`);
    console.log(`[stars] total: ${total}`);
  } catch (e) { console.warn(`[stars] total: ${e.message}, keeping existing`); }
  writeFileSync(V2, html); writeFileSync(DATA, data);
}
main().catch((e) => console.warn(`[stars] skipped: ${e.message}`));

#!/usr/bin/env node

/**
 * Generate Next.js pages from research markdown files at build time.
 * 
 * Scans content/research/papers/ and content/research/articles/
 * and generates corresponding Next.js page components.
 * 
 * This runs as part of the build process to convert research markdown
 * into static Next.js pages.
 * 
 * Usage: node scripts/generate-research-pages.mjs
 */

import { mkdirSync, writeFileSync, readdirSync, existsSync, readFileSync } from 'fs';
import { join, basename } from 'path';

const RESEARCH_DIR = join(process.cwd(), 'content/research');
const GENERATED_DIR = join(process.cwd(), 'src/app/research/generated');

// Ensure directories exist
mkdirSync(GENERATED_DIR, { recursive: true });

// Generate a Next.js page component for a markdown file
function generatePage(slug, title, content, type = 'paper') {
  const pageDir = join(GENERATED_DIR, type, slug);
  mkdirSync(pageDir, { recursive: true });
  
  const pagePath = join(pageDir, 'page.tsx');

  // Parse markdown into JSX
  const bodyJSX = parseMarkdownToJSX(content);

  const pageContent = `import Link from "next/link";

export const metadata = {
  title: "${title} — axjns.dev",
  description: "Research content from the synthetic membrane project.",
  openGraph: {
    title: "${title}",
    description: "Research content from the synthetic membrane project.",
    type: "article",
  },
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <header className="border-b border-slate-800/80 bg-[#0d1117]/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm font-mono">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition">
            ← axjns.dev
          </Link>
          <div className="flex gap-4 text-slate-400">
            <Link href="/research" className="hover:text-emerald-300 transition">
              research
            </Link>
            <a
              href="https://github.com/AlexsJones/research"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition"
            >
              github
            </a>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            {type === 'paper' ? 'Paper' : 'Article'} · Synthetic Membrane
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
            ${title}
          </h1>
          <div className="mt-4 text-sm text-slate-400 font-mono">
            AlexsJones · ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 mb-8">
          <p className="text-sm text-slate-400">
            This content is sourced directly from the research repo.{' '}
            <a
              href="https://github.com/AlexsJones/research"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300"
            >
              View source →
            </a>
          </p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none">
          ${bodyJSX}
        </div>
      </article>

      <footer className="mt-16 border-t border-slate-800 pt-8 text-center text-xs font-mono text-slate-500">
        <Link href="/research" className="hover:text-emerald-300 transition">
          ← back to research
        </Link>
      </footer>
    </div>
  );
}
`;

  writeFileSync(pagePath, pageContent);
  return pagePath;
}

// Parse markdown to JSX elements
function parseMarkdownToJSX(markdown) {
  const lines = markdown.split('\n');
  const elements = [];
  let inList = false;
  let listItems = [];

  function closeList() {
    if (inList && listItems.length > 0) {
      elements.push('<ul className="list-disc ml-6 space-y-1 my-4">' + listItems.join('\n') + '</ul>');
      listItems = [];
      inList = false;
    }
  }

  lines.forEach((line, index) => {
    // Headers
    if (line.startsWith('### ')) {
      closeList();
      elements.push('<h3 key={"' + index + '"} className="text-xl font-bold text-slate-100 mb-2 mt-8">' + escapeJSX(line.replace('### ', '')) + '</h3>');
    } else if (line.startsWith('## ')) {
      closeList();
      elements.push('<h2 key={"' + index + '"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">' + escapeJSX(line.replace('## ', '')) + '</h2>');
    } else if (line.startsWith('# ')) {
      closeList();
      elements.push('<h1 key={"' + index + '"} className="text-3xl font-bold text-slate-100 mb-4 mt-8">' + escapeJSX(line.replace('# ', '')) + '</h1>');
    }
    // Blockquotes
    else if (line.startsWith('> ')) {
      closeList();
      elements.push(
        '<blockquote key={"' + index + '"} className="border-l-4 border-emerald-500 pl-4 italic text-slate-300 my-4">' +
        escapeJSX(line.replace('> ', '')) +
        '</blockquote>'
      );
    }
    // List items
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      listItems.push(
        '<li key={"' + index + '"} className="ml-4 text-slate-300">' +
        escapeJSX(line.replace(/^[-*] /, '')) +
        '</li>'
      );
    }
    // Horizontal rules
    else if (line.match(/^---+$/)) {
      closeList();
      elements.push('<hr key={"' + index + '"} className="border-slate-800 my-8" />');
    }
    // Empty lines
    else if (line.trim() === '') {
      closeList();
    }
    // Regular paragraphs
    else {
      closeList();
      // Handle inline formatting
      let processed = escapeJSX(line);
      // Bold
      processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Italic
      processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Links
      processed = processed.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" className="text-emerald-400 hover:text-emerald-300">$1</a>');
      // Code
      processed = processed.replace(/`(.+?)`/g, function(m, p1) { return '<code className="bg-slate-800 px-1 rounded text-sm">' + p1 + '</code>'; });
      
      elements.push(
        '<p key={"' + index + '"} className="text-slate-300 leading-relaxed mb-4">' +
        processed +
        '</p>'
      );
    }
  });

  closeList();
  return elements.join('\n');
}

// Escape JSX special characters
function escapeJSX(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate index page
function generateIndexPage(items) {
  const indexPath = join(GENERATED_DIR, 'index.tsx');
  
  const itemsJSON = JSON.stringify(items, null, 2);

  const indexContent = `import Link from "next/link";

const ITEMS = ${itemsJSON};

export const metadata = {
  title: "Research — axjns.dev",
  description: "Research papers and articles from the synthetic membrane project.",
  openGraph: {
    title: "Research — axjns.dev",
    description: "Research papers and articles from the synthetic membrane project.",
    type: "website",
  },
};

export default function ResearchIndex() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <header className="border-b border-slate-800/80 bg-[#0d1117]/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm font-mono">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition">
            ← axjns.dev
          </Link>
          <div className="flex gap-4 text-slate-400">
            <a
              href="https://github.com/AlexsJones/research"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition"
            >
              github
            </a>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">
            Research
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-50">
            Research
          </h1>
          <p className="mt-4 text-slate-400 text-lg">
            Papers and articles on multi-agent coordination and the synthetic membrane.
          </p>
        </div>

        <div className="space-y-6">
          {ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={"/research/generated/" + item.type.toLowerCase() + "/" + item.slug}
              className="block rounded-lg border border-slate-800 bg-slate-900/40 p-6 hover:border-emerald-500/50 hover:bg-slate-900 transition group"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono mb-3">
                <span className="text-emerald-400">{item.type}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-500">{item.date}</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-100 mb-2 group-hover:text-emerald-300 transition">
                {item.title}
              </h2>
              <p className="text-slate-400 text-[15px] leading-relaxed">
                {item.description}
              </p>
              <div className="mt-3 text-emerald-400 font-mono text-xs">
                read →
              </div>
            </Link>
          ))}
        </div>
      </article>

      <footer className="mt-16 border-t border-slate-800 pt-8 text-center text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-300 transition">
          ← back to axjns@dev:~$
        </Link>
      </footer>
    </div>
  );
}
`;

  writeFileSync(indexPath, indexContent);
  return indexPath;
}

// Main logic
function main() {
  console.log('Generating research pages from content/research...');

  // Scan papers
  const papersDir = join(RESEARCH_DIR, 'papers');
  const papers = [];
  if (existsSync(papersDir)) {
    const files = readdirSync(papersDir).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const slug = basename(file, '.md');
      const content = readFileSync(join(papersDir, file), 'utf8');
      const titleMatch = content.match(/^# (.+)$/m);
      const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const descMatch = content.match(/^\*\*Description:\*\*\s*(.+)$/m);
      const description = descMatch ? descMatch[1] : 'Research paper on synthetic membrane coordination layer.';
      
      papers.push({
        slug,
        title,
        date: '2026',
        description,
      });
    });
  }

  // Scan articles
  const articlesDir = join(RESEARCH_DIR, 'articles');
  const articles = [];
  if (existsSync(articlesDir)) {
    const files = readdirSync(articlesDir).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const slug = basename(file, '.md');
      const content = readFileSync(join(articlesDir, file), 'utf8');
      const titleMatch = content.match(/^# (.+)$/m);
      const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const descMatch = content.match(/^\*\*Description:\*\*\s*(.+)$/m);
      const description = descMatch ? descMatch[1] : 'Research article on synthetic membrane topics.';
      
      articles.push({
        slug,
        title,
        date: '2026',
        description,
      });
    });
  }

  // Generate pages
  console.log(`Found ${papers.length} papers, ${articles.length} articles`);

  papers.forEach(p => {
    const content = readFileSync(join(papersDir, `${p.slug}.md`), 'utf8');
    generatePage(p.slug, p.title, content, 'paper');
  });

  articles.forEach(a => {
    const content = readFileSync(join(articlesDir, `${a.slug}.md`), 'utf8');
    generatePage(a.slug, a.title, content, 'article');
  });

  // Generate index
  const items = [
    ...papers.map(p => ({
      slug: p.slug,
      title: p.title,
      type: 'Paper',
      date: p.date || '2026',
      description: p.description || 'Research paper on synthetic membrane coordination layer.',
    })),
    ...articles.map(a => ({
      slug: a.slug,
      title: a.title,
      type: 'Article',
      date: a.date || '2026',
      description: a.description || 'Research article on synthetic membrane topics.',
    })),
  ].sort((a, b) => (b.date > a.date ? 1 : -1));

  generateIndexPage(items);

  console.log(`✓ Generated ${papers.length + articles.length + 1} pages`);
}

main();

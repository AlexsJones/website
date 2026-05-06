#!/usr/bin/env node

import { mkdirSync, writeFileSync, readdirSync, existsSync, readFileSync, rmSync } from 'fs';
import { join, basename } from 'path';

const RESEARCH_DIR = join(process.cwd(), 'content/research');
const GENERATED_BLOG_DIR = join(process.cwd(), 'src/app/blog/generated');
const RESEARCH_APP_DIR = join(process.cwd(), 'src/app/research');
const MANIFEST_PATH = join(process.cwd(), 'src/data/generated-manifest.json');
const DATA_DIR = join(process.cwd(), 'src/data');

// Clean up previously generated files
if (existsSync(MANIFEST_PATH)) {
  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  for (const slug of manifest.paperSlugs || []) {
    const dir = join(RESEARCH_APP_DIR, slug);
    if (existsSync(dir)) rmSync(dir, { recursive: true });
  }
}
if (existsSync(GENERATED_BLOG_DIR)) rmSync(GENERATED_BLOG_DIR, { recursive: true });

mkdirSync(GENERATED_BLOG_DIR, { recursive: true });
mkdirSync(DATA_DIR, { recursive: true });

function parseMarkdownToJSX(markdown) {
  const lines = markdown.split('\n');
  var elements = [];
  var inList = false;
  var listItems = [];
  var listIndex = 0;
  var blockquoteIndex = 0;
  var headerIndex = 0;
  var inCodeBlock = false;
  var codeBlockContent = [];
  var codeBlockLang = '';
  var codeBlockIndex = 0;
  var paragraphIndex = 0;
  var hrIndex = 0;

  function closeList() {
    if (inList && listItems.length > 0) {
      elements.push('<ul className="list-disc ml-6 space-y-1 my-4">' + listItems.join('\n') + '</ul>');
      listItems = [];
      inList = false;
    }
  }

  function closeCodeBlock() {
    if (inCodeBlock && codeBlockContent.length > 0) {
      const escapedContent = codeBlockContent.map(function(line) { return escapeJSX(line); }).join('\n');
      elements.push(
        '<pre key={"code-' + codeBlockIndex + '"} className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto my-4"><code className="text-sm font-mono text-slate-300">' +
        escapedContent +
        '</code></pre>'
      );
      codeBlockContent = [];
      codeBlockLang = '';
      inCodeBlock = false;
      codeBlockIndex++;
    }
  }

  function escapeJSX(str) {
    return str
      .replace(/'/g, '&#039;')
      .replace(/"/g, '&quot;')
      .replace(/{/g, '&#123;')
      .replace(/}/g, '&#125;')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (line.match(/^```/)) {
      closeList();
      closeCodeBlock();
      if (inCodeBlock) {
        closeCodeBlock();
      } else {
        inCodeBlock = true;
        codeBlockLang = line.replace(/^```/, '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    if (line.startsWith('### ')) {
      closeList();
      headerIndex++;
      elements.push('<h3 key={"h3-' + headerIndex + '"} className="text-xl font-bold text-slate-100 mb-2 mt-8">' + escapeJSX(line.replace('### ', '')) + '</h3>');
    } else if (line.startsWith('## ')) {
      closeList();
      headerIndex++;
      elements.push('<h2 key={"h2-' + headerIndex + '"} className="text-2xl font-bold text-slate-100 mb-3 mt-8">' + escapeJSX(line.replace('## ', '')) + '</h2>');
    } else if (line.startsWith('# ')) {
      closeList();
      headerIndex++;
      elements.push('<h1 key={"h1-' + headerIndex + '"} className="text-3xl font-bold text-slate-100 mb-4 mt-8">' + escapeJSX(line.replace('# ', '')) + '</h1>');
    } else if (line.startsWith('> ')) {
      closeList();
      blockquoteIndex++;
      elements.push(
        '<blockquote key={"bq-' + blockquoteIndex + '"} className="border-l-4 border-emerald-500 pl-4 italic text-slate-300 my-4">' +
        escapeJSX(line.replace('> ', '')) +
        '</blockquote>'
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true;
      listIndex++;
      listItems.push(
        '<li key={"li-' + listIndex + '"} className="ml-4 text-slate-300">' +
        escapeJSX(line.replace(/^[-*] /, '')) +
        '</li>'
      );
    } else if (line.match(/^---+$/)) {
      closeList();
      hrIndex++;
      elements.push('<hr key={"hr-' + hrIndex + '"} className="border-slate-800 my-8" />');
    } else if (line.trim() === '') {
      closeList();
    } else {
      closeList();
      paragraphIndex++;
      var processed = line.replace(/`(.+?)`/g, function(m, p1) { return '<<INLINE_CODE>>' + p1 + '<</INLINE_CODE>>'; });
      processed = escapeJSX(processed);
      processed = processed.replace(/<<INLINE_CODE>>(.+?)<<\/INLINE_CODE>>/g, '<code className="bg-slate-800 px-1 rounded text-sm">$1</code>');
      processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
      processed = processed.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" className="text-emerald-400 hover:text-emerald-300">$1</a>');

      elements.push(
        '<p key={"p-' + paragraphIndex + '"} className="text-slate-300 leading-relaxed mb-4">' +
        processed +
        '</p>'
      );
    }
  }

  closeList();
  closeCodeBlock();
  return elements.join('\n');
}

function escapeStringForTS(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function generateResearchPage(slug, title, content) {
  var bodyJSX = parseMarkdownToJSX(content);

  var pageContent = `export const metadata = {
  title: "${escapeStringForTS(title)} — axjns.dev",
  description: "Research paper by Alex Jones.",
  openGraph: {
    title: "${escapeStringForTS(title)}",
    description: "Research paper by Alex Jones.",
    type: "article",
  },
};

export default function ResearchPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">Paper</div>
      <div className="prose prose-invert prose-slate max-w-none">
        ${bodyJSX}
      </div>
    </main>
  );
}
`;

  // Write directly to /research/[slug] for clean URLs
  const pageDir = join(RESEARCH_APP_DIR, slug);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, 'page.tsx'), pageContent);
}

function generateBlogPage(slug, title, content) {
  const pageDir = join(GENERATED_BLOG_DIR, slug);
  mkdirSync(pageDir, { recursive: true });

  var bodyJSX = parseMarkdownToJSX(content);

  var pageContent = `export const metadata = {
  title: "${escapeStringForTS(title)} — axjns.dev",
  description: "Blog post by Alex Jones.",
  openGraph: {
    title: "${escapeStringForTS(title)}",
    description: "Blog post by Alex Jones.",
    type: "article",
  },
};

export default function BlogPost() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">Blog</div>
      <div className="prose prose-invert prose-slate max-w-none">
        ${bodyJSX}
      </div>
    </main>
  );
}
`;

  writeFileSync(join(pageDir, 'page.tsx'), pageContent);
}

function generateDataFile(papers, articles) {
  const dataContent = `// Auto-generated by scripts/generate-research-pages.mjs
// Do not edit manually

export interface GeneratedPaper {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface GeneratedPost {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export const GENERATED_PAPERS: GeneratedPaper[] = ${JSON.stringify(papers, null, 2)};

export const GENERATED_POSTS: GeneratedPost[] = ${JSON.stringify(articles, null, 2)};
`;

  writeFileSync(join(process.cwd(), 'src/data/generated-content.ts'), dataContent);
}

console.log('Generating research pages from content/research...');

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
    const dateMatch = content.match(/^\*\*Date:\*\*\s*(.+)$/m);
    const description = descMatch ? descMatch[1] : 'Research paper on multi-agent AI coordination.';
    const date = dateMatch ? dateMatch[1] : '2026';

    papers.push({ slug, title, date, description });
  });
}

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

    // Try multiple date formats: "**By X** · May 2026 · site" or "**Date:** May 2026"
    let date = '2026';
    const bylineMatch = content.match(/\*\*By .+?\*\*\s*·\s*([A-Z][a-z]+ \d{4})/);
    const dateFieldMatch = content.match(/\*\*Date:\*\*\s*(.+)$/m);
    if (bylineMatch) date = bylineMatch[1];
    else if (dateFieldMatch) date = dateFieldMatch[1].trim();

    // Use first substantive paragraph as description if no explicit one
    let description = '';
    if (descMatch) {
      description = descMatch[1];
    } else {
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('*') && !trimmed.startsWith('---') && trimmed.length > 50) {
          description = trimmed.length > 200 ? trimmed.slice(0, 197) + '...' : trimmed;
          break;
        }
      }
    }

    articles.push({ slug, title, date, description });
  });
}

console.log(`Found ${papers.length} papers, ${articles.length} articles`);

// Generate individual pages
papers.forEach(p => {
  const content = readFileSync(join(papersDir, p.slug + '.md'), 'utf8');
  generateResearchPage(p.slug, p.title, content);
});

articles.forEach(a => {
  const content = readFileSync(join(articlesDir, a.slug + '.md'), 'utf8');
  generateBlogPage(a.slug, a.title, content);
});

// Generate shared data file
generateDataFile(papers, articles);

// Write manifest so next run knows what to clean
writeFileSync(MANIFEST_PATH, JSON.stringify({
  paperSlugs: papers.map(p => p.slug),
}, null, 2));

console.log('Generated research pages and blog posts from research repo.');

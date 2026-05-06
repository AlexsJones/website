#!/usr/bin/env node

import { mkdirSync, writeFileSync, readdirSync, existsSync, readFileSync } from 'fs';
import { join, basename } from 'path';

const RESEARCH_DIR = join(process.cwd(), 'content/research');
const GENERATED_DIR = join(process.cwd(), 'src/app/research/generated');
mkdirSync(GENERATED_DIR, { recursive: true });

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

function generatePage(slug, title, content, type) {
  const pageDir = join(GENERATED_DIR, type, slug);
  mkdirSync(pageDir, { recursive: true });
  
  var bodyJSX = parseMarkdownToJSX(content);
  
  var pageContent = `import Link from "next/link";
/* eslint-disable react/no-unescaped-entities */

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
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition">← axjns.dev</Link>
          <span className="text-slate-500">Synthetic Membrane</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">${title}</h1>
        <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-3">${type === 'paper' ? 'Paper' : 'Article'} · Synthetic Membrane</div>
        <div className="prose prose-invert prose-slate max-w-none">
          ${bodyJSX}
        </div>
      </main>
    </div>
  );
}
`;
  
  const pagePath = join(pageDir, 'page.tsx');
  writeFileSync(pagePath, pageContent);
}

function generateIndexPage(items) {
  const indexPath = join(GENERATED_DIR, 'index.tsx');
  
  const itemsJSON = JSON.stringify(items, null, 2);

  const indexContent = `import Link from "next/link";

const ITEMS = ${itemsJSON};

export default function ResearchIndex() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <header className="border-b border-slate-800/80 bg-[#0d1117]/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm font-mono">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition">← axjns.dev</Link>
          <span className="text-slate-500">Synthetic Membrane</span>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-100 mb-8">Research Papers & Articles</h1>
        <div className="space-y-4">
          {ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={"/research/generated/" + item.type.toLowerCase() + "/" + item.slug}
              className="block p-6 border border-slate-800 rounded-lg hover:border-emerald-500/50 transition"
            >
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono mb-2">
                {item.type} · {item.date}
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h2>
              <p className="text-slate-400">{item.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
`;
  
  writeFileSync(indexPath, indexContent);
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
    const description = descMatch ? descMatch[1] : 'Research paper on synthetic membrane topics.';
    
    papers.push({
      slug,
      title,
      date: '2026',
      description,
    });
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
    const description = descMatch ? descMatch[1] : 'Research article on synthetic membrane topics.';
    
    articles.push({
      slug,
      title,
      date: '2026',
      description,
    });
  });
}

console.log(`Found ${papers.length} papers, ${articles.length} articles`);

papers.forEach(p => {
  const content = readFileSync(join(papersDir, p.slug + '.md'), 'utf8');
  generatePage(p.slug, p.title, content, 'paper');
});

articles.forEach(a => {
  const content = readFileSync(join(articlesDir, a.slug + '.md'), 'utf8');
  generatePage(a.slug, a.title, content, 'article');
});

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
];

generateIndexPage(items);
console.log('Generated pages from research repo.');

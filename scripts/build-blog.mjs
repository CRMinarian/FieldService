// Field Service Nerd | Blog generator
// Reads blog/posts/*.md (frontmatter + markdown) -> web/blog/<slug>.html + index + RSS.
// Field Manual brand (web/tokens via styles.css/app.css), same pattern as build-episode-pages.mjs.
// status: draft -> noindex + staging banner, unlisted on index.  published -> live + listed + RSS.
// Run: node scripts/build-blog.mjs

import fs from 'fs';
import path from 'path';

const SITE = 'https://fieldservicenerd.com';
const SRC = 'blog/posts';
const OUT = 'web/blog';

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  if (!m) return { meta, body: md };
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: md.slice(m[0].length) };
}

// Minimal markdown -> HTML (headings, bold/italic/code, links, lists, quotes, fences, hr, callout).
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) =>
      `<a href="${u}"${u.startsWith('http') && !u.startsWith(SITE) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
}

function render(body) {
  const lines = body.split('\n');
  const out = [];
  let para = [], list = null, quote = [], fence = null;
  const flushP = () => { if (para.length) { out.push(`<p>${inline(para.join(' '))}</p>`); para = []; } };
  const flushL = () => { if (list) { out.push(`<${list.tag}>` + list.items.map(i => `<li>${inline(i)}</li>`).join('') + `</${list.tag}>`); list = null; } };
  const flushQ = () => { if (quote.length) { out.push(`<blockquote>${inline(quote.join(' '))}</blockquote>`); quote = []; } };
  const flushAll = () => { flushP(); flushL(); flushQ(); };
  let table = null;
  const flushT = () => {
    if (!table) return;
    const [head, ...rows] = table;
    out.push('<div class="tablewrap"><table><thead><tr>' +
      head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
      rows.map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
      '</tbody></table></div>');
    table = null;
  };
  for (const raw of lines) {
    const s = raw.replace(/\s+$/, '');
    if (fence !== null) {
      if (s.startsWith('```')) { out.push(`<pre><code>${esc(fence.join('\n'))}</code></pre>`); fence = null; }
      else fence.push(raw);
      continue;
    }
    if (s.startsWith('|') && s.endsWith('|')) {
      flushP(); flushL(); flushQ();
      const cells = s.slice(1, -1).split('|').map(c => c.trim());
      if (cells.every(c => /^:?-{2,}:?$/.test(c))) continue;   // separator row
      (table = table || []).push(cells);
      continue;
    }
    flushT();
    const img = s.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (img) { flushAll(); out.push(`<figure class="whimsy"><img src="${img[2]}" alt="${esc(img[1])}" loading="lazy"></figure>`); }
    else if (s.startsWith('```')) { flushAll(); fence = []; }
    else if (s.startsWith('### ')) { flushAll(); out.push(`<h3>${inline(s.slice(4))}</h3>`); }
    else if (s.startsWith('## ')) { flushAll(); out.push(`<h2>${inline(s.slice(3))}</h2>`); }
    else if (s.startsWith('> ')) { flushP(); flushL(); quote.push(s.slice(2)); }
    else if (/^:::try/.test(s)) { flushAll(); out.push('<div class="trythis"><div class="tag">TRY THIS</div>'); }
    else if (/^:::$/.test(s)) { flushAll(); out.push('</div>'); }
    else if (/^[-*] /.test(s)) { flushP(); flushQ(); if (!list || list.tag !== 'ul') { flushL(); list = { tag: 'ul', items: [] }; } list.items.push(s.slice(2)); }
    else if (/^\d+\. /.test(s)) { flushP(); flushQ(); if (!list || list.tag !== 'ol') { flushL(); list = { tag: 'ol', items: [] }; } list.items.push(s.replace(/^\d+\. /, '')); }
    else if (s.trim() === '---') { flushAll(); out.push('<hr>'); }
    else if (s.trim() === '') flushAll();
    else para.push(s.trim());
  }
  flushT();
  flushAll();
  return out.join('\n');
}

const CSS = `
  body { background: var(--surface-base, #17140F); color: var(--text-body, #EDE6D6); }
  .wrap { max-width: 760px; margin: 0 auto; padding: 24px 20px 80px; }
  .topbar { display:flex; align-items:center; justify-content:space-between; padding: 14px 0; }
  .topbar img { height: 44px; }
  .topbar a.back { color: var(--color-accent, #E36B2C); text-decoration:none; font-family: var(--font-mono, monospace); font-size: 13px; }
  .staging { background:#5A2B0E; color:#FFD9B8; font-family: var(--font-mono, monospace); font-size: 13px; padding: 10px 14px; border-radius: 8px; margin: 10px 0 18px; letter-spacing:.03em; }
  .eyebrow { font-family: var(--font-mono, monospace); color: var(--color-accent, #E36B2C); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
  h1.post { font-family: var(--font-display, sans-serif); font-size: clamp(30px, 5vw, 44px); line-height: 1.06; margin: 10px 0 8px; color: var(--text-strong, #fff); }
  .meta { color: var(--text-muted, #A79E8C); font-size: 14px; margin-bottom: 26px; font-family: var(--font-mono, monospace); }
  article { font-size: 17px; }
  article p { line-height: 1.75; margin: 0 0 16px; }
  article h2 { font-family: var(--font-display, sans-serif); font-size: 24px; color: var(--text-strong, #fff); margin: 36px 0 12px; }
  article h3 { font-family: var(--font-display, sans-serif); font-size: 19px; color: var(--text-strong, #fff); margin: 26px 0 10px; }
  article a { color: var(--cyan, #7FBFD4); }
  article blockquote { border-left: 4px solid var(--steel, #4A6B8A); margin: 18px 0; padding: 8px 16px; color: var(--text-muted, #CFC8B8); font-style: italic; }
  article ul, article ol { margin: 0 0 16px; padding-left: 24px; }
  article li { margin-bottom: 8px; line-height: 1.6; }
  article code { background: #2A2A2A; border-radius: 4px; padding: 1px 6px; font-size: 15px; }
  article pre { background: #12100C; border: 1px solid var(--border-subtle,#333); border-radius: 10px; padding: 14px 16px; overflow-x: auto; }
  article hr { border: 0; border-top: 2px dashed var(--border-subtle,#3A362E); margin: 30px 0; }
  .whimsy { margin: 26px auto; text-align: center; }
  .whimsy img { max-width: min(360px, 100%); border-radius: 12px; border: 1px solid var(--border-subtle,#3A362E); }
  .tablewrap { overflow-x: auto; margin: 0 0 18px; }
  article table { border-collapse: collapse; width: 100%; font-size: 15px; }
  article th { text-align: left; font-family: var(--font-mono, monospace); font-size: 13px; letter-spacing: .06em; text-transform: uppercase; color: var(--color-accent,#E36B2C); border-bottom: 2px solid var(--border-subtle,#3A362E); padding: 8px 12px 6px; }
  article td { border-bottom: 1px solid var(--border-subtle,#2E2B24); padding: 9px 12px; vertical-align: top; line-height: 1.5; }
  .trythis { background: rgba(227,107,44,.08); border: 1px solid var(--color-accent,#E36B2C); border-radius: 12px; padding: 16px 20px 8px; margin: 22px 0; }
  .trythis .tag { display:inline-block; background: var(--color-accent,#E36B2C); color:#17140F; font-family: var(--font-display,sans-serif); font-weight:700; font-size: 12px; letter-spacing:.14em; padding: 4px 12px; border-radius: 100px; margin-bottom: 10px; }
  .cta { text-align:center; background: var(--surface-card, #1F1B14); border: 1px solid var(--color-accent, #E36B2C); border-radius: 12px; padding: 26px 22px; margin-top: 44px; }
  .cta a.btn { display:inline-block; background: var(--color-accent, #E36B2C); color: #17140F; font-family: var(--font-display, sans-serif); font-weight: 700; padding: 12px 26px; border-radius: 8px; text-decoration:none; margin-top: 12px; }
  footer { margin-top: 50px; text-align:center; color: var(--text-muted, #A79E8C); font-size: 13px; }
  footer a { color: var(--cyan, #7FBFD4); }
  .postcard { display:block; background: var(--surface-card, #1F1B14); border: 1px solid var(--border-subtle,#333); border-radius: 12px; padding: 20px 22px; margin: 16px 0; text-decoration:none; color: inherit; transition: border-color .15s; }
  .postcard:hover { border-color: var(--color-accent,#E36B2C); }
  .postcard h2 { font-family: var(--font-display,sans-serif); font-size: 21px; margin: 6px 0 8px; color: var(--text-strong,#fff); }
  .postcard p { color: var(--text-muted,#CFC8B8); line-height: 1.6; margin: 0; }
`;

const shell = ({ title, desc, canonical, robots, bodyHtml }) => `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${robots}
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/png" href="../assets/fsn-logo-avatar.png">
<link rel="alternate" type="application/rss+xml" title="Field Service Nerd Blog" href="${SITE}/blog/rss.xml">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L1S6DQHF4Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-L1S6DQHF4Z');
</script>
<link rel="stylesheet" href="../styles.css">
<link rel="stylesheet" href="../app.css">
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
  <div class="topbar">
    <a href="/"><img src="../assets/fsn-logo-patch.png" alt="Field Service Nerd"></a>
    <a class="back" href="/blog">← all posts</a>
  </div>
${bodyHtml}
  <div class="cta">
    <div class="eyebrow">Free Download</div>
    <h2 style="margin:8px 0 4px;font-family:var(--font-display,sans-serif);">The Field Service AI Playbook</h2>
    <p style="color:var(--text-muted,#A79E8C);">21 pages.  What&#x27;s real, what&#x27;s hype, and where AI actually pays off.</p>
    <a class="btn" href="/#join">Get the Playbook →</a>
  </div>
  <footer>
    Field Service Nerd · <a href="/">Home</a> · <a href="/blog">Blog</a> · <a href="/consulting">Consulting</a> · <a href="https://www.youtube.com/@FieldServiceNerd" target="_blank" rel="noopener">YouTube</a>
  </footer>
</div>
</body>
</html>`;

// ---- build ----
fs.mkdirSync(OUT, { recursive: true });
const posts = [];
for (const f of fs.readdirSync(SRC).filter(f => f.endsWith('.md')).sort()) {
  const { meta, body } = frontmatter(fs.readFileSync(path.join(SRC, f), 'utf8'));
  const slug = meta.slug || f.replace(/\.md$/, '');
  const status = meta.status || 'draft';
  const words = body.split(/\s+/).length;
  const mins = Math.max(2, Math.round(words / 220));
  const canonical = `${SITE}/blog/${slug}`;
  const draft = status !== 'published';
  const banner = draft ? `<div class="staging">DRAFT PREVIEW | not published, not indexed.</div>` : '';
  const html = shell({
    title: `${meta.title} | Field Service Nerd`,
    desc: meta.description || meta.title,
    canonical,
    robots: draft ? '<meta name="robots" content="noindex,nofollow">' : '',
    bodyHtml: `  ${banner}
  <div class="eyebrow">${esc(meta.tag || 'Field Notes')} · ${mins} min read</div>
  <h1 class="post">${esc(meta.title)}</h1>
  <div class="meta">${esc(meta.date || '')} · Pierre Hulsebus</div>
  <article>
${render(body)}
  </article>`,
  });
  fs.writeFileSync(path.join(OUT, slug + '.html'), html);
  console.log('built', `${OUT}/${slug}.html`, `(${status}, ${mins} min)`);
  if (!draft) posts.push({ ...meta, slug, mins, canonical });
}

// Index (published only, newest first by date string YYYY-MM-DD)
posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const cards = posts.map(p => `  <a class="postcard" href="/blog/${p.slug}">
    <div class="eyebrow">${esc(p.tag || 'Field Notes')} · ${p.mins} min · ${esc(p.date || '')}</div>
    <h2>${esc(p.title)}</h2>
    <p>${esc(p.description || '')}</p>
  </a>`).join('\n');
const index = shell({
  title: 'Blog | Field Service Nerd',
  desc: 'Long-form field notes on Dynamics 365 Field Service, RSO, AI, and running service operations that actually work.',
  canonical: `${SITE}/blog`,
  robots: '',
  bodyHtml: `  <div class="eyebrow">The Long Form</div>
  <h1 class="post">Field Notes</h1>
  <div class="meta">The written version.  No fluff, no vendor spin, same as the channel.</div>
${cards || '  <p>First post drops soon.</p>'}`,
}).replace('<a class="back" href="/blog">← all posts</a>', '<a class="back" href="/">← fieldservicenerd.com</a>');
fs.writeFileSync(path.join(OUT, 'index.html'), index);
console.log('built', `${OUT}/index.html`, `(${posts.length} published)`);

// RSS
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>Field Service Nerd Blog</title>
<link>${SITE}/blog</link>
<description>Long-form field notes on Dynamics 365 Field Service, RSO, AI, and service operations.</description>
${posts.map(p => `<item>
<title>${esc(p.title)}</title>
<link>${p.canonical}</link>
<guid>${p.canonical}</guid>
<pubDate>${new Date(p.date + 'T14:00:00Z').toUTCString()}</pubDate>
<description>${esc(p.description || '')}</description>
</item>`).join('\n')}
</channel></rss>`;
fs.writeFileSync(path.join(OUT, 'rss.xml'), rss);
console.log('built', `${OUT}/rss.xml`);

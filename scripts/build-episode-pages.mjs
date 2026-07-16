// Field Service Nerd | Episode landing-page generator
// Reads youtube/scripts/epNN-*.md -> writes web/ep/<slug>.html
// STAGING pages: noindex, unlinked, not in sitemap.  Flip status to 'published' to
// drop the noindex + banner (then ask WM/SCO to add the URL to sitemap.xml).
// Run: node scripts/build-episode-pages.mjs

import fs from 'fs';
import path from 'path';

const EPISODES = [
  {
    slug: 'ep01-why-implementations-fail',
    num: 'EP01', status: 'staging',
    title: 'Why Most Dynamics Field Service Implementations Fail',
    playlist: 'Fundamentals', publish: 'Tue Jul 21, 2026', length: '~14 min',
    script: 'youtube/scripts/ep01-teleprompter.md',
    youtubeId: '',            // filled at publish
    refs: [
      ['Microsoft Learn | Dynamics 365 Field Service overview', 'https://learn.microsoft.com/en-us/dynamics365/field-service/overview'],
      ['Microsoft Learn | Resource Scheduling Optimization overview', 'https://learn.microsoft.com/en-us/dynamics365/field-service/rso-overview'],
      ['The Field Service AI Playbook (free 21-page download)', 'https://fieldservicenerd.com/#join'],
    ],
    downloads: [['The 5 Questions | printable checklist', null]],
  },
  {
    slug: 'ep02-what-i-wish-i-knew',
    num: 'EP02', status: 'staging',
    title: 'What I Wish I Knew Before My First Field Service Project',
    playlist: 'From The Field', publish: 'Tue Jul 28, 2026', length: '~13 min',
    script: 'youtube/scripts/ep02-teleprompter.md',
    youtubeId: '',
    refs: [
      ['Microsoft | Business Process Catalog (Field Service)', 'https://learn.microsoft.com/en-us/dynamics365/guidance/business-processes/about'],
      ['Microsoft Learn | Schedule Assistant', 'https://learn.microsoft.com/en-us/dynamics365/field-service/schedule-assistant'],
      ['The Field Service AI Playbook (free 21-page download)', 'https://fieldservicenerd.com/#join'],
    ],
    downloads: [['The 5 Lessons | one-page takeaway', null]],
  },
  {
    slug: 'ep03-ugly-truth-rso',
    num: 'EP03', status: 'staging',
    title: 'The Ugly Truth About Resource Scheduling Optimization (RSO)',
    playlist: 'Fundamentals', publish: 'Tue Aug 4, 2026', length: '~14 min',
    script: 'youtube/scripts/ep03-ugly-truth-rso.md',
    youtubeId: '',
    refs: [
      ['Microsoft Learn | RSO overview', 'https://learn.microsoft.com/en-us/dynamics365/field-service/rso-overview'],
      ['Microsoft Learn | RSO optimization goals', 'https://learn.microsoft.com/en-us/dynamics365/field-service/rso-optimization-goal'],
      ['Microsoft Learn | Scheduling Operations Agent (preview)', 'https://learn.microsoft.com/en-us/dynamics365/field-service/soa-overview'],
      ['Microsoft Learn | Schedule Assistant', 'https://learn.microsoft.com/en-us/dynamics365/field-service/schedule-assistant'],
    ],
    downloads: [['The RSO Readiness Checklist | 4 questions', null]],
  },
  {
    slug: 'ep04-copilot-honest-review',
    num: 'EP04', status: 'staging',
    title: 'Copilot in Field Service | The Honest Review (2026)',
    playlist: 'Fundamentals', publish: 'Tue Aug 11, 2026', length: '~13 min',
    script: 'youtube/scripts/ep04-copilot-honest-review.md',
    youtubeId: '',
    refs: [
      ['Microsoft Learn | Copilot in Field Service overview', 'https://learn.microsoft.com/en-us/dynamics365/field-service/copilot-overview'],
      ['Microsoft Learn | Field Service deprecations (the graveyard, official)', 'https://learn.microsoft.com/en-us/dynamics365/field-service/deprecations-field-service'],
      ['Microsoft Learn | Connected Field Service architecture', 'https://learn.microsoft.com/en-us/dynamics365/field-service/connected-field-service-architecture'],
    ],
    downloads: [['GA vs Preview vs Gone | the status card', null]],
  },
];

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const clean = s => s.replace(/\*\*/g,'').replace(/`/g,'').replace(/\*/g,'');

function renderScript(md) {
  // Skip the H1 + metadata bullet block: content starts after the FIRST '---'.
  const all = md.split('\n');
  const firstHr = all.findIndex(l => l.trim() === '---');
  const lines = all.slice(firstHr >= 0 ? firstHr + 1 : 1);
  const out = [];
  let buf = [];
  const flush = () => {
    if (!buf.length) return;
    const j = clean(buf.map(x => x.trim()).join(' ').trim());
    buf = [];
    if (!j) return;
    const e = esc(j);
    if (j.includes('[YOUR STORY')) out.push(`<p class="story">${e}</p>`);
    else if (j.startsWith('[')) out.push(`<p class="cue">${e}</p>`);
    else out.push(`<p>${e}</p>`);
  };
  for (const raw of lines) {
    const s = raw.rstrip !== undefined ? raw.rstrip() : raw.replace(/\s+$/,'');
    if (s.startsWith('## Upload metadata') || s.startsWith('## Production notes')) { flush(); break; }
    if (s.startsWith('## ')) { flush(); out.push(`<h2>${esc(clean(s.slice(3)))}</h2>`); }
    else if (s.trim() === '---') flush();
    else if (s.startsWith('- ')) { flush(); }   // metadata bullets: skip (shown in hero)
    else if (s.trim() === '') flush();
    else buf.push(s);
  }
  flush();
  return out.join('\n');
}

function page(ep, scriptHtml) {
  const canonical = `https://fieldservicenerd.com/ep/${ep.slug}`;
  const staging = ep.status !== 'published';
  const robots = staging ? '<meta name="robots" content="noindex,nofollow">' : '';
  const banner = staging ? `<div class="staging">STAGING PREVIEW | not published.  Annotate and send notes back to the content desk.</div>` : '';
  const video = ep.youtubeId
    ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${ep.youtubeId}" title="${esc(ep.title)}" frameborder="0" allowfullscreen></iframe></div>`
    : `<div class="video placeholder"><span>▶ Video drops ${esc(ep.publish)} · 10:00 AM ET</span></div>`;
  const refs = ep.refs.map(([t,u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('\n');
  const dls = ep.downloads.map(([t,u]) => u
    ? `<li><a href="${u}" download>${esc(t)}</a></li>`
    : `<li><span class="soon">${esc(t)}</span> <em>(coming with the episode)</em></li>`).join('\n');
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${robots}
<title>${esc(ep.num)} | ${esc(ep.title)} | Field Service Nerd</title>
<meta name="description" content="${esc(ep.num)} of the Field Service Nerd show: ${esc(ep.title)}.  Full show notes, script, references, and takeaways.">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/png" href="../assets/fsn-logo-avatar.png">
<link rel="apple-touch-icon" href="../assets/fsn-logo-avatar.png">
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
<style>
  body { background: var(--surface-base, #17140F); color: var(--text-body, #EDE6D6); }
  .wrap { max-width: 780px; margin: 0 auto; padding: 24px 20px 80px; }
  .topbar { display:flex; align-items:center; justify-content:space-between; padding: 14px 0; }
  .topbar img { height: 44px; }
  .topbar a.back { color: var(--color-accent, #E36B2C); text-decoration:none; font-family: var(--font-mono, monospace); font-size: 13px; }
  .staging { background:#5A2B0E; color:#FFD9B8; font-family: var(--font-mono, monospace); font-size: 13px; padding: 10px 14px; border-radius: 8px; margin: 10px 0 18px; letter-spacing:.03em; }
  .eyebrow { font-family: var(--font-mono, monospace); color: var(--color-accent, #E36B2C); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
  h1.ep { font-family: var(--font-display, sans-serif); font-size: clamp(30px, 5vw, 44px); line-height: 1.05; margin: 10px 0 8px; color: var(--text-strong, #fff); }
  .meta { color: var(--text-muted, #A79E8C); font-size: 14px; margin-bottom: 22px; font-family: var(--font-mono, monospace); }
  .video { aspect-ratio: 16/9; background: #0F0D0A; border: 1px solid var(--border-subtle, #333); border-radius: 12px; overflow: hidden; margin-bottom: 30px; display:flex; align-items:center; justify-content:center; }
  .video iframe { width: 100%; height: 100%; }
  .video.placeholder span { color: var(--text-muted, #A79E8C); font-family: var(--font-mono, monospace); font-size: 15px; }
  h2 { font-family: var(--font-display, sans-serif); font-size: 20px; color: var(--text-strong, #fff); margin: 30px 0 10px; }
  .notes p { line-height: 1.7; margin: 0 0 14px; }
  .cue { color: var(--color-accent, #E36B2C); font-style: italic; font-size: 14px; opacity: .85; }
  .story { border-left: 4px solid var(--color-accent, #E36B2C); background: rgba(227,107,44,.08); padding: 10px 14px; border-radius: 6px; font-weight: 600; }
  .panel { background: var(--surface-card, #1F1B14); border: 1px solid var(--border-subtle, #333); border-radius: 12px; padding: 20px 22px; margin: 26px 0; }
  .panel ul { margin: 8px 0 0; padding-left: 20px; }
  .panel li { margin-bottom: 8px; line-height: 1.5; }
  .panel a { color: var(--cyan, #7FBFD4); }
  .soon { color: var(--text-muted, #A79E8C); }
  .cta { text-align:center; background: var(--surface-card, #1F1B14); border: 1px solid var(--color-accent, #E36B2C); border-radius: 12px; padding: 26px 22px; margin-top: 40px; }
  .cta a.btn { display:inline-block; background: var(--color-accent, #E36B2C); color: #17140F; font-family: var(--font-display, sans-serif); font-weight: 700; padding: 12px 26px; border-radius: 8px; text-decoration:none; margin-top: 12px; }
  footer { margin-top: 50px; text-align:center; color: var(--text-muted, #A79E8C); font-size: 13px; }
  footer a { color: var(--cyan, #7FBFD4); }
</style>
</head>
<body>
<div class="wrap">
  <div class="topbar">
    <a href="/"><img src="../assets/fsn-logo-patch.png" alt="Field Service Nerd"></a>
    <a class="back" href="/">← fieldservicenerd.com</a>
  </div>
  ${banner}
  <div class="eyebrow">${esc(ep.num)} · ${esc(ep.playlist)} · ${esc(ep.length)}</div>
  <h1 class="ep">${esc(ep.title)}</h1>
  <div class="meta">Publishes ${esc(ep.publish)} · 10:00 AM ET · The Field Service Nerd Show</div>
  ${video}
  <h2>Show Notes</h2>
  <div class="notes">
${scriptHtml}
  </div>
  <div class="panel">
    <h2 style="margin-top:0;">References &amp; Research</h2>
    <ul>
${refs}
    </ul>
  </div>
  <div class="panel">
    <h2 style="margin-top:0;">Downloads &amp; Takeaways</h2>
    <ul>
${dls}
    </ul>
  </div>
  <div class="cta">
    <div class="eyebrow">Free Download</div>
    <h2 style="margin:8px 0 4px;">The Field Service AI Playbook</h2>
    <p style="color:var(--text-muted,#A79E8C);">21 pages.  What&#x27;s real, what&#x27;s hype, and where AI actually pays off.</p>
    <a class="btn" href="/#join">Get the Playbook →</a>
  </div>
  <footer>
    Field Service Nerd · <a href="/">Home</a> · <a href="/consulting">Consulting</a> · <a href="https://www.youtube.com/@FieldServiceNerd" target="_blank" rel="noopener">YouTube</a>
  </footer>
</div>
</body>
</html>`;
}

fs.mkdirSync('web/ep', { recursive: true });
for (const ep of EPISODES) {
  const md = fs.readFileSync(ep.script, 'utf8');
  const html = page(ep, renderScript(md));
  const out = path.join('web/ep', ep.slug + '.html');
  fs.writeFileSync(out, html);
  console.log('built', out, `(${ep.status})`);
}
console.log('done');

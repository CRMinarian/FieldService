// FSN go-link redirector generator
// redirects/go-links.json -> web/go/<slug>.html
// Each page: GA4 click event + instant redirect (JS) + meta-refresh fallback + noindex.
// Run: node scripts/build-go-links.mjs

import fs from 'fs';

const { links } = JSON.parse(fs.readFileSync('redirects/go-links.json', 'utf8'));
fs.mkdirSync('web/go', { recursive: true });

for (const [slug, { dest, label }] of Object.entries(links)) {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex,nofollow">
<title>Field Service Nerd | redirecting…</title>
<meta http-equiv="refresh" content="1;url=${dest}">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L1S6DQHF4Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-L1S6DQHF4Z', { transport_type: 'beacon' });
  gtag('event', 'go_click', { link_slug: '${slug}', link_dest: '${dest}', transport_type: 'beacon' });
  setTimeout(function(){ window.location.replace('${dest}'); }, 150);
</script>
<style>body{background:#17140F;color:#A79E8C;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}</style>
</head>
<body><span>→ ${label}</span></body>
</html>`;
  fs.writeFileSync(`web/go/${slug}.html`, html);
  console.log(`built /go/${slug} -> ${dest}`);
}
console.log('done');

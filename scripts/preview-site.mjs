#!/usr/bin/env node
/**
 * Serve ./dist the way Firebase Hosting will: cleanUrls, configured
 * redirects, and a real 404.html. No catch-all rewrite to index.html.
 *
 * Usage: npm run preview   (or PORT=4173 node scripts/preview-site.mjs)
 */
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PORT || 4173);
const firebase = JSON.parse(readFileSync(join(ROOT, 'firebase.json'), 'utf8'));
const hosting = firebase.hosting || {};
const REDIRECTS = hosting.redirects || [];
const REWRITES = hosting.rewrites || [];

const TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

if (!existsSync(DIST)) {
  throw new Error('dist/ is missing. Run npm run build first.');
}

if (REWRITES.some((rule) => rule.source === '**' && /index\.html$/.test(rule.destination || ''))) {
  throw new Error('firebase.json has a catch-all rewrite to index.html. Missing assets would be served as HTML.');
}

function matchSource(pattern, urlPath) {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*');
  return new RegExp(`^${escaped}$`).test(urlPath);
}

function resolveFile(urlPath) {
  const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '').replace(/^[/\\]+/, '');
  const candidates = [];
  if (!safe) candidates.push(join(DIST, 'index.html'));
  else {
    candidates.push(join(DIST, safe));
    if (!extname(safe) && hosting.cleanUrls !== false) {
      candidates.push(join(DIST, `${safe}.html`));
      candidates.push(join(DIST, safe, 'index.html'));
    }
  }

  for (const file of candidates) {
    if (!file.startsWith(DIST)) continue;
    if (existsSync(file) && statSync(file).isDirectory()) {
      const index = join(file, 'index.html');
      if (existsSync(index) && statSync(index).isFile()) return index;
      continue;
    }
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);

  for (const rule of REDIRECTS) {
    if (!matchSource(rule.source, urlPath)) continue;
    res.writeHead(rule.type || 301, { Location: rule.destination });
    res.end();
    return;
  }

  const file = resolveFile(urlPath);
  if (file) {
    const type = TYPES[extname(file).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    createReadStream(file).pipe(res);
    return;
  }

  const notFound = join(DIST, '404.html');
  if (existsSync(notFound)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    createReadStream(notFound).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found\n');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Serving ${DIST} at http://127.0.0.1:${PORT} (cleanUrls, no catch-all)`);
});

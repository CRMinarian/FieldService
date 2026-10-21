#!/usr/bin/env node
/**
 * Fail if HTML/CSS in the deploy dir references a local file that is missing.
 * Follows CSS @import (including nested token files). Skips http(s), data:,
 * mailto:, tel:, javascript:, and hash-only refs.
 *
 * Usage: node scripts/check-deploy-assets.mjs [dir]
 * Default dir: ./dist
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(process.argv[2] || join(ROOT, 'dist'));
const WALK_EXT = new Set(['.html', '.css', '.jsx']);

if (!existsSync(DIST) || !statSync(DIST).isDirectory()) {
  throw new Error(`Deploy dir missing: ${DIST}. Run npm run build first.`);
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (WALK_EXT.has(extname(name).toLowerCase())) acc.push(full);
  }
  return acc;
}

function stripQueryHash(raw) {
  return raw.split('#')[0].split('?')[0].trim();
}

function isRemote(ref) {
  return /^(https?:|data:|mailto:|tel:|javascript:|\/\/)/i.test(ref);
}

function looksLikeLocalFile(ref) {
  if (!ref || ref === '/' || ref.startsWith('#')) return false;
  if (isRemote(ref)) return false;
  const leaf = ref.split('/').pop() || '';
  if (/\.(css|js|jsx|mjs|html|htm|png|jpe?g|gif|svg|webp|pdf|xml|txt|woff2?|ico|json|mp4|webm)$/i.test(leaf)) {
    return true;
  }
  return ref.startsWith('/') || ref.startsWith('./') || ref.startsWith('../');
}

function stripComments(source, ext) {
  if (ext === '.css') {
    return source.replace(/\/\*[\s\S]*?\*\//g, ' ');
  }
  return source
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

function collectRefs(source, ext) {
  const refs = [];
  const push = (raw) => {
    if (!raw) return;
    const cleaned = stripQueryHash(raw.trim());
    if (!looksLikeLocalFile(cleaned)) return;
    refs.push(cleaned);
  };

  const body = stripComments(source, ext);

  const attrRe = /(?<![.\w])(?:href|src|poster)\s*=\s*(['"])([^'"]+)\1/gi;
  let m;
  while ((m = attrRe.exec(body))) push(m[2]);

  const importRe = /@import\s+(?:url\(\s*)?(['"])([^'"]+)\1/gi;
  while ((m = importRe.exec(body))) push(m[2]);

  const urlRe = /url\(\s*(['"]?)([^'")]+)\1\s*\)/gi;
  while ((m = urlRe.exec(body))) push(m[2]);

  return refs;
}

function resolveLocal(fromFile, ref) {
  const decoded = decodeURIComponent(ref);
  if (decoded.startsWith('/')) return join(DIST, decoded.replace(/^\/+/, ''));
  return normalize(join(dirname(fromFile), decoded));
}

const missing = [];
const checked = new Set();
const queue = walk(DIST);

while (queue.length) {
  const file = queue.shift();
  if (checked.has(file)) continue;
  checked.add(file);
  if (!existsSync(file) || !statSync(file).isFile()) continue;
  if (!WALK_EXT.has(extname(file).toLowerCase())) continue;

  const source = readFileSync(file, 'utf8');
  for (const ref of collectRefs(source, extname(file).toLowerCase())) {
    const target = resolveLocal(file, ref);
    if (!target.startsWith(DIST)) continue;
    if (existsSync(target) && statSync(target).isFile()) {
      if (extname(target).toLowerCase() === '.css') queue.push(target);
      continue;
    }
    const htmlFallback = `${target}.html`;
    if (existsSync(htmlFallback) && statSync(htmlFallback).isFile()) continue;
    const indexFallback = join(target, 'index.html');
    if (existsSync(indexFallback) && statSync(indexFallback).isFile()) continue;
    missing.push({
      from: relative(DIST, file).replaceAll('\\', '/'),
      ref,
      expected: relative(DIST, target).replaceAll('\\', '/'),
    });
  }
}

if (missing.length) {
  const lines = missing.map((row) => `  ${row.from} → ${row.ref} (missing ${row.expected})`);
  console.error(`Missing deploy assets (${missing.length}):\n${lines.join('\n')}`);
  process.exit(1);
}

console.log(`Asset check passed for ${DIST} (${checked.size} files scanned).`);

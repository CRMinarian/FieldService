#!/usr/bin/env node
/**
 * Stage the Field Service Nerd hosting tree.
 *
 * Source of truth is web/. styles.css @imports ./tokens/*.css, so the
 * folder that actually gets hosted must have tokens/ next to styles.css.
 *
 * The parked GitHub Pages workflow built Jekyll from the repo root into
 * _site. That emit has no top-level tokens/ directory (token CSS lives
 * under web/tokens/), so /tokens/*.css misses and the host falls through
 * to index.html. Firebase Hosting of web/ should have included the
 * folder, but the live tree does not — this build makes the copy
 * explicit and is what deploy/preview serve.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WEB = join(ROOT, 'web');
const DIST = join(ROOT, 'dist');
const TOKEN_FILES = ['colors.css', 'effects.css', 'fonts.css', 'spacing.css', 'typography.css'];

if (!existsSync(WEB)) {
  throw new Error(`Missing site source: ${WEB}`);
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(WEB, DIST, {
  recursive: true,
  filter: (src) => {
    const name = src.split(/[\\/]/).pop();
    if (name === 'node_modules') return false;
    if (name.startsWith('.')) return false;
    return true;
  },
});

const srcTokens = join(WEB, 'tokens');
const destTokens = join(DIST, 'tokens');
mkdirSync(destTokens, { recursive: true });

for (const file of TOKEN_FILES) {
  const from = join(srcTokens, file);
  if (!existsSync(from)) {
    throw new Error(`Missing token file: ${from}`);
  }
  cpSync(from, join(destTokens, file));
}

const missing = TOKEN_FILES.filter((file) => {
  const to = join(destTokens, file);
  return !existsSync(to) || statSync(to).size === 0;
});
if (missing.length) {
  throw new Error(`Token file(s) missing from deploy output: ${missing.join(', ')}`);
}

const listed = readdirSync(destTokens).filter((file) => file.endsWith('.css')).sort();
console.log(`Staged ${DIST}`);
console.log(`tokens/ → ${listed.join(', ')}`);

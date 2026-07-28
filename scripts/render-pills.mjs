// Render transparent pill overlay PNGs from youtube/edit/pills.json
// -> edit/pills/<id>.png (alpha, 2x scale for crisp downscale in 1080p composite)
import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';

const manifest = JSON.parse(readFileSync('youtube/edit/pills.json', 'utf8'));
const tpl = pathToFileURL('web/brand/value-pill.html').href;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 700, deviceScaleFactor: 2 });

for (const pill of manifest.pills) {
  const q = new URLSearchParams();
  q.set('kind', pill.kind);
  q.set('text', pill.text);
  if (pill.num) q.set('num', pill.num);
  if (pill.tag) q.set('tag', pill.tag);
  await page.goto(`${tpl}?${q}`, { waitUntil: 'networkidle0' });
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await new Promise(r => setTimeout(r, 250));
  const el = await page.$('#root');
  await el.screenshot({ path: `edit/pills/${pill.id}.png`, omitBackground: true });
  console.log(`rendered edit/pills/${pill.id}.png`);
}
await browser.close();

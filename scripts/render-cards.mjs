import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
const tpl = pathToFileURL('web/brand/ep01-cards.html').href;
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
for (const card of ['title', 'end']) {
  await page.goto(`${tpl}?card=${card}`, { waitUntil: 'networkidle0' });
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await new Promise(r => setTimeout(r, 300));
  const el = await page.$('.card');
  await el.screenshot({ path: `edit/card-${card}.png` });
  console.log(`rendered edit/card-${card}.png`);
}
await browser.close();

'use strict';
// One-off: render the primer's Paged.js pages to PNGs for quick inline preview.
const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  const htmlPath = path.resolve(__dirname, '../web/ebook/fs-ai-primer.html');
  const outDir = path.resolve(__dirname, '../web/ebook');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 850, height: 1100, deviceScaleFactor: 2 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.__pagedReady === true, { timeout: 120000 });

  const pages = await page.$$('.pagedjs_page');
  const wanted = [0, 1, 4]; // cover, contents, a section
  for (const i of wanted) {
    if (!pages[i]) continue;
    const out = path.join(outDir, `preview-p${i + 1}.png`);
    await pages[i].screenshot({ path: out });
    console.log('wrote ' + out);
  }
  await browser.close();
}
run().catch((e) => { console.error(e.message); process.exit(1); });

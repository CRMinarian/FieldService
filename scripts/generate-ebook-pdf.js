'use strict';
const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  const htmlPath = path.resolve(__dirname, '../web/ebook/fs-ai-primer.html');
  const pdfPath  = path.resolve(__dirname, '../web/ebook/fs-ai-primer.pdf');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  // Wait for Paged.js to finish chunking content into pages (sets window.__pagedReady
  // via PagedConfig.after). Without this the PDF captures before page numbers + margins render.
  await page.waitForFunction(() => window.__pagedReady === true, { timeout: 120000 });

  // preferCSSPageSize honors the @page size/margins that Paged.js already applied —
  // no Puppeteer format/margin, which would otherwise double-paginate.
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log('PDF written to: ' + pdfPath);
}

run().catch(e => { console.error(e.message); process.exit(1); });

'use strict';
// Render the Quality Quiz scoresheet page of the primer to a PNG for review.
const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  const htmlPath = path.resolve('Z:/Projects/FieldService/.claude/worktrees/field-service-ai-ebook-57c092/web/ebook/fs-ai-primer.html');
  const outDir = process.env.QUIZ_PNG_OUT || path.dirname(__filename);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 850, height: 1100, deviceScaleFactor: 2 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.__pagedReady === true, { timeout: 120000 });

  // Find the paged page that contains the quiz section, plus the page before it (the Try This).
  const quizPageIndex = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.pagedjs_page'));
    return pages.findIndex(p => p.querySelector('#quiz03, [id="quiz03"]') || p.querySelector('.quiz'));
  });
  console.log('quiz on paged page index: ' + quizPageIndex);

  const pages = await page.$$('.pagedjs_page');
  for (const i of [quizPageIndex - 1, quizPageIndex]) {
    if (i < 0 || !pages[i]) continue;
    const out = path.join(outDir, `quiz-review-p${i + 1}.png`);
    await pages[i].screenshot({ path: out });
    console.log('wrote ' + out);
  }
  await browser.close();
}
run().catch((e) => { console.error(e.message); process.exit(1); });

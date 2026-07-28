import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 960, deviceScaleFactor: 2 });
await page.goto(pathToFileURL('web/brand/ep01-cheat-card.html').href, { waitUntil: 'networkidle0' });
try { await page.evaluate(() => document.fonts.ready); } catch {}
await new Promise(r => setTimeout(r, 400));
const el = await page.$('.card');
await (el ?? page).screenshot({ path: 'youtube/scripts/ep01-cheat-card.png' });
await browser.close();
console.log('rendered youtube/scripts/ep01-cheat-card.png');

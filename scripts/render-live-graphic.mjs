import puppeteer from 'puppeteer';
import { pathToFileURL } from 'url';
const htmlPath = 'web/brand/linkedin-live-ep01.html';
const out = 'social/linkedin-live-ep01-kickoff.png';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });
try { await page.evaluate(() => document.fonts.ready); } catch {}
await new Promise(r => setTimeout(r, 400));
const el = await page.$('.t');
await (el ?? page).screenshot({ path: out });
await browser.close();
console.log('rendered', out);

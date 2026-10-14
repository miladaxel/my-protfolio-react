// Check a production build at a repository subpath, without an SPA fallback.
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const directory = fileURLToPath(new URL('../dist/', import.meta.url));
const screenshots = fileURLToPath(new URL('../.verification/', import.meta.url));
const prefix = process.argv[2] ?? '/portfolio-check/';
assert(prefix.startsWith('/') && prefix.endsWith('/'), 'Pass a base path with leading and trailing slashes.');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain', '.pdf': 'application/pdf' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith(prefix)) throw new Error('Wrong path');
    const filename = resolve(directory, pathname.slice(prefix.length) || 'index.html');
    if (!filename.startsWith(resolve(directory) + sep)) throw new Error('Wrong file');
    const content = await readFile(filename);
    response.writeHead(200, { 'Content-Type': types[extname(filename)] ?? 'application/octet-stream' });
    response.end(content);
  } catch { response.writeHead(404); response.end('Not found'); }
});

await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
const origin = `http://127.0.0.1:${server.address().port}`;
const url = origin + prefix;
const content = JSON.parse(await readFile(new URL('../src/data/content.json', import.meta.url), 'utf8'));
const firstProject = content.projects.find((project) => project.featured) ?? content.projects[0];
let browser;
try {
  browser = await chromium.launch(process.env.PORTFOLIO_CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.PORTFOLIO_CHROMIUM_EXECUTABLE_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, reducedMotion: 'reduce', colorScheme: 'light' });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  page.on('request', (request) => { if (!request.url().startsWith(origin)) errors.push(`External request: ${request.url()}`); });
  await page.goto(url);
  await page.getByRole('heading', { level: 1 }).filter({ hasText: content.profile.name.en }).waitFor();
  for (const image of await page.locator('img').all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate((element) => element.decode()); }
  await page.evaluate(() => document.fonts.ready);
  assert(await page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0)), 'Broken image in production build');
  await mkdir(screenshots, { recursive: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: resolve(screenshots, 'hero-desktop-en.png') });
  await page.screenshot({ path: resolve(screenshots, 'home-desktop-en.png'), fullPage: true });
  await page.locator('#work a').first().click();
  await page.reload();
  assert.equal(await page.getByRole('heading', { level: 1 }).innerText(), firstProject.title.en);
  assert(page.url().includes(`${prefix}#/projects/${firstProject.slug}`), 'Subpath must be retained');
  await page.screenshot({ path: resolve(screenshots, 'project-desktop-en.png'), fullPage: true });
  await page.getByRole('button', { name: 'View site in Persian' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url);
  await page.getByRole('heading', { level: 1 }).filter({ hasText: content.profile.name.fa }).waitFor();
  assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile page overflows');
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: resolve(screenshots, 'hero-mobile-fa.png') });
  await page.screenshot({ path: resolve(screenshots, 'home-mobile-fa.png'), fullPage: true });
  await page.getByRole('button', { name: 'استفاده از پوسته تیره' }).click();
  await page.screenshot({ path: resolve(screenshots, 'home-mobile-fa-dark.png'), fullPage: true });
  assert.deepEqual(errors, []);
  console.log(`Production build passed at ${prefix}: local assets, direct project reload, Persian mobile, light/dark, and no browser errors.`);
  console.log('Screenshots saved in .verification/.');
} finally {
  if (browser) await browser.close();
  await new Promise((done) => server.close(done));
}

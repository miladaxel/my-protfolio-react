import { test, expect } from '@playwright/test';

test('language, direction, metadata, and theme survive reloads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Alex');
  await page.getByRole('button', { name: 'View site in Persian' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('الکس');
  await page.getByRole('button', { name: 'استفاده از پوسته تیره' }).click();
  await expect(page.locator('html')).toHaveClass('dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('html')).toHaveClass('dark');
  await expect(page).toHaveTitle(/الکس/);
  await page.getByRole('button', { name: 'نمایش سایت به زبان انگلیسی' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('every project opens directly, reloads, and returns to the work section', async ({ page }) => {
  for (const [slug, title] of [
    ['northstar-commerce', 'Northstar commerce'],
    ['focus-workspace', 'Focus workspace'],
    ['pulse-api-monitor', 'Pulse API monitor'],
  ]) {
    await page.goto(`/#/projects/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.getByRole('heading', { name: 'A closer look' })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await page.getByRole('link', { name: /Back to selected work/ }).click();
    await expect(page).toHaveURL(/#\/#work$/);
    await expect.poll(() => page.locator('#work').evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeLessThan(100);
  }
  await page.goto('/');
  await page.locator('#work a').first().click();
  await expect(page).toHaveURL(/#\/projects\/northstar-commerce$/);
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Alex');
});

test('contact validates fields and only previews without sending or storing a message', async ({ page }) => {
  const writes = [];
  page.on('request', (request) => { if (request.method() !== 'GET') writes.push(request.url()); });
  await page.goto('/#/#contact');
  await page.getByRole('button', { name: 'Preview message' }).click();
  await expect(page.locator('#contact-name-error')).toHaveText('Please complete this field.');
  await expect(page.getByRole('alert')).toHaveText('Enter an email, Telegram ID, or phone number.');
  await page.getByLabel('Name', { exact: false }).fill('Sample visitor');
  await page.getByLabel('Subject', { exact: false }).fill('Sample project');
  await page.getByLabel('Message', { exact: false }).fill('A demo message, not a real inquiry.');
  await page.getByLabel('Email', { exact: true }).fill('invalid-email');
  await page.getByRole('button', { name: 'Preview message' }).click();
  await expect(page.locator('#contact-email-error')).toHaveText('Enter a valid email address.');
  await page.getByLabel('Email', { exact: true }).fill('visitor@example.com');
  await page.getByRole('button', { name: 'Preview message' }).click();
  await expect(page.getByRole('status')).toContainText('No message was sent or saved.');
  await expect(page.getByRole('heading', { name: 'Your message preview' })).toBeVisible();
  expect(writes).toEqual([]);
  const storage = await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage }));
  expect(storage).not.toContain('visitor@example.com');
  await page.reload();
  await expect(page.getByLabel('Email', { exact: true })).toHaveValue('');
  await expect(page.getByRole('heading', { name: 'Your message preview' })).toHaveCount(0);
});

test('mobile menu and Persian pages have no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle navigation' }).click();
  await expect(page.getByRole('button', { name: 'Toggle navigation' })).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#mobile-menu').getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Toggle navigation' })).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'View site in Persian' }).click();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/#/projects/northstar-commerce');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('فروشگاه نورث‌استار');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'باز و بسته کردن منو' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'باز و بسته کردن منو' })).toHaveAttribute('aria-expanded', 'false');
});

test('all assets are local and pages have no browser errors or broken images', async ({ page }) => {
  const errors = [];
  const external = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => { if (!request.url().startsWith('http://127.0.0.1:5173')) external.push(request.url()); });
  for (const path of ['/', '/#/projects/northstar-commerce', '/#/projects/focus-workspace', '/#/projects/pulse-api-monitor']) {
    await page.goto(path);
    for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
  }
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test('unknown paths and unknown projects offer a working home link', async ({ page }) => {
  for (const path of ['/#/missing', '/#/projects/missing']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page could not be found.');
    await page.getByRole('link', { name: 'Return home', exact: true }).click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Alex');
  }
});

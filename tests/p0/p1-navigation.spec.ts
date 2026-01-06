import { test, expect, type Page } from '@playwright/test';

const ROUTES = ['/', '/leistungen', '/galerie', '/preise', '/anfrage', '/about'];

async function clickByHref(page: Page, href: string) {
  // Click the first link matching the target href
  const locator = page.locator(`a[href="${href}"]`).first();
  await expect(locator).toBeVisible({ timeout: 5000 });
  await locator.click();
}

async function assertPath(page: Page, expected: string) {
  await page.waitForLoadState('networkidle');
  await expect.poll(() => new URL(page.url()).pathname).toBe(expected);
}

test.describe('P0: Core navigation flows (desktop and mobile)', () => {
  test('desktop: navigate across core links repeatedly without breaking', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    // Run two full cycles across core routes to catch regressions after multiple clicks
    for (let cycle = 0; cycle < 2; cycle++) {
      for (const path of ROUTES) {
        await clickByHref(page, path);
        await assertPath(page, path);
      }
    }
  });

  test('mobile: footer links navigate correctly (avoids relying on mobile menu selectors)', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');

    // Scroll to footer area to prefer footer links if present
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Click through a subset of core routes using href targeting
    for (const path of ['/galerie', '/anfrage', '/about', '/']) {
      await clickByHref(page, path);
      await assertPath(page, path);
    }
  });
});

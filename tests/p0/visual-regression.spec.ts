/**
 * Visual Regression Tests
 * =======================
 * Captures screenshots of key pages and compares against baselines.
 * Uses Playwright's built-in screenshot comparison.
 *
 * Usage:
 *   npm run test:p0 -- --grep "visual"
 *   npx playwright test visual-regression.spec.ts --update-snapshots
 */

import { test, expect } from '@playwright/test';

// Key pages to test for visual regressions
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'leistungen', path: '/leistungen' },
  { name: 'firmenfeiern', path: '/firmenfeiern' },
  { name: 'preise', path: '/preise' },
  { name: 'galerie', path: '/galerie' },
  { name: 'about', path: '/about' },
  { name: 'anfrage', path: '/anfrage' },
  { name: 'faq', path: '/faq' },
];

// Viewports to test
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 }, // iPhone X
  { name: 'tablet', width: 768, height: 1024 }, // iPad
  { name: 'desktop', width: 1440, height: 900 }, // Standard desktop
];

test.describe('Visual Regression Tests', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const page of PAGES) {
    for (const viewport of VIEWPORTS) {
      test(`${page.name} - ${viewport.name} viewport`, async ({ page: browserPage }) => {
        // Set viewport
        await browserPage.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });

        // Navigate to page
        await browserPage.goto(page.path, { waitUntil: 'networkidle' });

        // Wait for fonts to load
        await browserPage.waitForFunction(() => document.fonts.ready);

        // Wait for animations to settle
        await browserPage.waitForTimeout(500);

        // Hide dynamic content that may change between runs
        await browserPage.evaluate(() => {
          // Hide timestamps, dates, or other dynamic content
          document.querySelectorAll('[data-testid="dynamic"]').forEach((el) => {
            (el as HTMLElement).style.visibility = 'hidden';
          });
        });

        // Take screenshot and compare
        await expect(browserPage).toHaveScreenshot(`${page.name}-${viewport.name}.png`, {
          fullPage: true,
          maxDiffPixels: 100, // Allow small differences
          threshold: 0.2, // 20% pixel difference threshold
          animations: 'disabled',
        });
      });
    }
  }
});

test.describe('Component Visual Tests', () => {
  test('Navigation bar - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const navHeader = page
      .locator('header')
      .filter({ has: page.getByRole('link', { name: 'Velo.Bar' }) })
      .first();
    await navHeader.waitFor({ state: 'visible' });
    await expect(navHeader).toHaveScreenshot('nav-desktop.png', {
      maxDiffPixels: 50,
      timeout: 15000,
    });
  });

  test('Navigation bar - mobile (hamburger)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const navHeader = page
      .locator('header')
      .filter({ has: page.getByRole('link', { name: 'Velo.Bar' }) })
      .first();
    await navHeader.waitFor({ state: 'visible' });
    await expect(navHeader).toHaveScreenshot('nav-mobile.png', {
      maxDiffPixels: 50,
      timeout: 15000,
    });
  });

  test('Footer', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const footer = page.locator('footer').first();
    await expect(footer).toHaveScreenshot('footer-desktop.png', {
      maxDiffPixels: 50,
    });
  });

  test('Pricing cards', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/preise', { waitUntil: 'networkidle' });

    // Wait for pricing section to load
    await page.waitForSelector('[data-testid="pricing-section"]', { timeout: 5000 }).catch(() => {
      // Fallback if no test ID
    });

    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('pricing-cards.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Interaction Visual Tests', () => {
  test('Button hover states', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // Find CTA within the sticky nav (avoid hidden mobile menu buttons)
    const navHeader = page
      .locator('header')
      .filter({ has: page.getByRole('link', { name: 'Velo.Bar' }) })
      .first();
    await navHeader.waitFor({ state: 'visible' });
    const ctaButton = navHeader.locator('a[href="/anfrage"]').first();
    await ctaButton.waitFor({ state: 'visible' });

    // Hover over button
    await ctaButton.hover();
    await page.waitForTimeout(300); // Wait for transition

    await expect(ctaButton).toHaveScreenshot('button-hover.png', {
      maxDiffPixels: 30,
    });
  });

  test('Mobile menu open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // Click hamburger menu
    const navHeader = page
      .locator('header')
      .filter({ has: page.getByRole('link', { name: 'Velo.Bar' }) })
      .first();
    await navHeader.waitFor({ state: 'visible' });
    const menuButton = navHeader
      .locator('button[aria-label="Menü öffnen"], button[aria-label="Menü schließen"]')
      .first();
    await menuButton.waitFor({ state: 'visible' });
    await menuButton.click();
    await page.waitForTimeout(500); // Wait for animation

    await expect(page).toHaveScreenshot('mobile-menu-open.png', {
      maxDiffPixels: 100,
    });
  });
});

import { test, expect } from '@playwright/test';
import { P0TestHelpers, TEST_DATA, EXPECTED_FONT_WEIGHTS } from './helpers.ts';

/**
 * T4: Computed Font Weights Compliance
 *
 * Verifies that typography renders with expected font weights from design tokens.
 * This complements the static code analysis by checking actual computed styles.
 */

test.describe('T4: Computed Font Weights Compliance', () => {
  let helpers: P0TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new P0TestHelpers(page);
  });

  test('should render headings with correct font weights on home page', async ({ page }) => {
    await helpers.logStep('Testing font weights on home page');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    await helpers.takeScreenshot('t4-01-home-page-typography', true);

    // Test main heading (h1)
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();

    if (h1Count > 0) {
      const h1FontWeight = await helpers.getComputedStyle('h1', 'font-weight');
      await helpers.logStep(`H1 font-weight: ${h1FontWeight}`);

      // Should be bold (700) or extra-bold (800) for main headings
      expect(['700', '800', '900']).toContain(h1FontWeight);

      // Test multiple h1s if they exist
      for (let i = 0; i < Math.min(h1Count, 3); i++) {
        const weight = await h1Elements
          .nth(i)
          .evaluate((el) => window.getComputedStyle(el).fontWeight);
        expect(['700', '800', '900']).toContain(weight);
      }
    }

    // Test secondary headings (h2)
    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();

    if (h2Count > 0) {
      const h2FontWeight = await helpers.getComputedStyle('h2', 'font-weight');
      await helpers.logStep(`H2 font-weight: ${h2FontWeight}`);

      // Should be semibold (600) or bold (700)
      expect(['600', '700', '800']).toContain(h2FontWeight);
    }

    // Test body text
    const bodyElements = page.locator('p, .text-body, main p');
    const bodyCount = await bodyElements.count();

    if (bodyCount > 0) {
      const bodyFontWeight = await helpers.getComputedStyle('p', 'font-weight');
      await helpers.logStep(`Body text font-weight: ${bodyFontWeight}`);

      // Should be normal (400) or medium (500)
      expect(['400', '500']).toContain(bodyFontWeight);
    }

    await helpers.logStep('[OK] Home page font weights test passed');
  });

  test('should use consistent font weights across all pages', async ({ page }) => {
    await helpers.logStep('Testing font weight consistency across pages');

    const pages = [
      { route: TEST_DATA.routes.home, name: 'Home' },
      { route: TEST_DATA.routes.about, name: 'About' },
      { route: TEST_DATA.routes.services, name: 'Services' },
      { route: TEST_DATA.routes.gallery, name: 'Gallery' },
      { route: TEST_DATA.routes.contact, name: 'Contact' },
    ];

    const fontWeightResults: Record<string, Record<string, string>> = {};

    for (const pageInfo of pages) {
      await helpers.logStep(`Testing ${pageInfo.name} page typography`);

      await page.goto(pageInfo.route);
      await page.waitForLoadState('networkidle');

      const pageResults: Record<string, string> = {};

      // Test h1 if exists
      if ((await page.locator('h1').count()) > 0) {
        pageResults.h1 = await helpers.getComputedStyle('h1', 'font-weight');
      }

      // Test h2 if exists
      if ((await page.locator('h2').count()) > 0) {
        pageResults.h2 = await helpers.getComputedStyle('h2', 'font-weight');
      }

      // Test h3 if exists
      if ((await page.locator('h3').count()) > 0) {
        pageResults.h3 = await helpers.getComputedStyle('h3', 'font-weight');
      }

      // Test body text
      if ((await page.locator('p').count()) > 0) {
        pageResults.body = await helpers.getComputedStyle('p', 'font-weight');
      }

      fontWeightResults[pageInfo.name] = pageResults;

      await helpers.takeScreenshot(`t4-02-${pageInfo.name.toLowerCase()}-typography`, false);
    }

    // Analyze consistency
    const elements = ['h1', 'h2', 'h3', 'body'];

    for (const element of elements) {
      const weights = Object.values(fontWeightResults)
        .map((page) => page[element])
        .filter(Boolean);

      if (weights.length > 1) {
        // Check if weights are consistent (allowing some variation for design purposes)
        const uniqueWeights = [...new Set(weights)];
        await helpers.logStep(
          `${element.toUpperCase()} weights across pages: ${uniqueWeights.join(', ')}`,
        );

        // For headings, we expect consistency or intentional variation
        if (element.startsWith('h')) {
          expect(uniqueWeights.every((w) => ['600', '700', '800', '900'].includes(w))).toBeTruthy();
        } else if (element === 'body') {
          expect(uniqueWeights.every((w) => ['400', '500'].includes(w))).toBeTruthy();
        }
      }
    }

    await helpers.logStep('[OK] Cross-page consistency test passed');
  });

  test('should use design tokens for button typography', async ({ page }) => {
    await helpers.logStep('Testing button font weights');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    // Look for buttons
    const buttons = page.locator('button, .button, .btn, a[role="button"]');
    const buttonCount = await buttons.count();

    expect(buttonCount).toBeGreaterThan(0);

    await helpers.takeScreenshot('t4-03-buttons-highlighted', false);

    // Test first few buttons
    const testCount = Math.min(buttonCount, 5);

    for (let i = 0; i < testCount; i++) {
      const button = buttons.nth(i);
      const isVisible = await button.isVisible();

      if (isVisible) {
        const fontWeight = await button.evaluate((el) => window.getComputedStyle(el).fontWeight);

        const buttonText = await button.textContent();
        await helpers.logStep(`Button "${buttonText?.trim()}" font-weight: ${fontWeight}`);

        // Buttons typically use medium (500) or semibold (600) weights
        expect(['400', '500', '600', '700']).toContain(fontWeight);
      }
    }

    await helpers.logStep('[OK] Button typography test passed');
  });

  test('should render navigation typography correctly', async ({ page }) => {
    await helpers.logStep('Testing navigation font weights');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    // Test navigation links
    const navLinks = page.locator('nav a, .navigation a, .nav-link');
    const navCount = await navLinks.count();

    if (navCount > 0) {
      await helpers.takeScreenshot('t4-04-navigation-typography', false);

      const navFontWeight = await navLinks
        .first()
        .evaluate((el) => window.getComputedStyle(el).fontWeight);

      await helpers.logStep(`Navigation font-weight: ${navFontWeight}`);

      // Navigation typically uses medium (500) or semibold (600)
      expect(['400', '500', '600']).toContain(navFontWeight);

      // Test consistency across nav items
      const testCount = Math.min(navCount, 5);
      for (let i = 0; i < testCount; i++) {
        const linkWeight = await navLinks
          .nth(i)
          .evaluate((el) => window.getComputedStyle(el).fontWeight);

        // All nav links should have the same weight
        expect(linkWeight).toBe(navFontWeight);
      }
    }

    await helpers.logStep('[OK] Navigation typography test passed');
  });

  test('should handle custom typography classes correctly', async ({ page }) => {
    await helpers.logStep('Testing custom typography classes');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    // Look for elements with custom typography classes
    const customTypographySelectors = [
      '.font-light',
      '.font-normal',
      '.font-medium',
      '.font-semibold',
      '.font-bold',
      '.font-extrabold',
      '.text-light',
      '.text-normal',
      '.text-medium',
      '.text-semibold',
      '.text-bold',
    ];

    for (const selector of customTypographySelectors) {
      const elements = page.locator(selector);
      const count = await elements.count();

      if (count > 0) {
        const fontWeight = await elements
          .first()
          .evaluate((el) => window.getComputedStyle(el).fontWeight);

        await helpers.logStep(`${selector} renders with font-weight: ${fontWeight}`);

        // Validate that the class name matches expected weight
        if (selector.includes('light')) {
          expect(['300']).toContain(fontWeight);
        } else if (selector.includes('normal')) {
          expect(['400']).toContain(fontWeight);
        } else if (selector.includes('medium')) {
          expect(['500']).toContain(fontWeight);
        } else if (selector.includes('semibold')) {
          expect(['600']).toContain(fontWeight);
        } else if (selector.includes('bold') && !selector.includes('extrabold')) {
          expect(['700']).toContain(fontWeight);
        } else if (selector.includes('extrabold')) {
          expect(['800']).toContain(fontWeight);
        }
      }
    }

    await helpers.takeScreenshot('t4-05-custom-typography-classes', false);
    await helpers.logStep('[OK] Custom typography classes test passed');
  });

  test('should validate font weights in dark/light theme modes', async ({ page }) => {
    await helpers.logStep('Testing font weights across theme modes');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    // Test default theme
    const defaultH1Weight = await page
      .locator('h1')
      .first()
      .evaluate((el) => window.getComputedStyle(el).fontWeight);

    await helpers.takeScreenshot('t4-06-default-theme-typography', false);

    // Try to toggle theme if theme switcher exists
    const themeSwitcher = page.locator(
      '[data-testid="theme-toggle"], .theme-toggle, button[aria-label*="theme"]',
    );

    if ((await themeSwitcher.count()) > 0 && (await themeSwitcher.isVisible())) {
      await themeSwitcher.click();
      await page.waitForTimeout(500); // Wait for theme change

      const altThemeH1Weight = await page
        .locator('h1')
        .first()
        .evaluate((el) => window.getComputedStyle(el).fontWeight);

      await helpers.takeScreenshot('t4-07-alternative-theme-typography', false);

      // Font weights should remain consistent across themes
      expect(altThemeH1Weight).toBe(defaultH1Weight);

      await helpers.logStep('[OK] Theme consistency test passed');
    } else {
      await helpers.logStep('No theme switcher found, skipping theme test');
    }
  });

  test('should verify CSS custom properties for font weights', async ({ page }) => {
    await helpers.logStep('Testing CSS custom properties for font weights');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    // Check if CSS custom properties are defined
    const customProperties = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      const fontWeightProps: Record<string, string> = {};

      // Look for font-weight CSS custom properties
      const propNames = [
        '--font-weight-light',
        '--font-weight-normal',
        '--font-weight-medium',
        '--font-weight-semibold',
        '--font-weight-bold',
        '--font-weight-extrabold',
        '--font-weight-black',
      ];

      for (const prop of propNames) {
        const value = styles.getPropertyValue(prop);
        if (value) {
          fontWeightProps[prop] = value.trim();
        }
      }

      return fontWeightProps;
    });

    await helpers.logStep(
      `Found font weight custom properties: ${JSON.stringify(customProperties)}`,
    );

    // Verify expected mappings
    const expectedMappings: Record<string, string> = {
      '--font-weight-light': '300',
      '--font-weight-normal': '400',
      '--font-weight-medium': '500',
      '--font-weight-semibold': '600',
      '--font-weight-bold': '700',
      '--font-weight-extrabold': '800',
      '--font-weight-black': '900',
    };

    for (const [prop, expectedValue] of Object.entries(expectedMappings)) {
      if (customProperties[prop]) {
        expect(customProperties[prop]).toBe(expectedValue);
        await helpers.logStep(
          `[OK] ${prop}: ${customProperties[prop]} (expected: ${expectedValue})`,
        );
      }
    }

    // At least some custom properties should be defined
    expect(Object.keys(customProperties).length).toBeGreaterThan(0);

    await helpers.logStep('[OK] CSS custom properties test passed');
  });
});

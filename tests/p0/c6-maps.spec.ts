import { test, expect } from '@playwright/test';
import { P0TestHelpers, TEST_DATA } from './helpers';

/**
 * C6: Google Maps Integration & Fallback
 *
 * Verifies that Google Maps component:
 * 1. Uses environment variable for API key
 * 2. Shows proper map embed when key is present
 * 3. Shows graceful fallback when key is missing/invalid
 * 4. Fallback includes message and working external links
 */

test.describe('C6: Google Maps Integration & Fallback', () => {
  let helpers: P0TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new P0TestHelpers(page);
  });

  test('should display map embed when API key is present', async ({ page }) => {
    await helpers.logStep('Testing Google Maps with valid API key');

    // Mock environment with valid API key
    await helpers.mockEnvironment({
      VITE_GOOGLE_MAPS_API_KEY: 'mock-api-key-for-testing',
    });

    // Navigate to page with map (likely contact page)
    await page.goto(TEST_DATA.routes.contact);
    await page.waitForLoadState('networkidle');

    await helpers.takeScreenshot('c6-01-contact-page-with-api-key', true);

    // Look for map iframe or embed element
    const mapIframe = page.locator(
      'iframe[src*="google.com/maps"], iframe[src*="maps.google.com"]',
    );
    const mapContainer = page.locator('[data-testid="map-embed"], .map-container, .google-map');

    // Check if map is embedded (either iframe or container should be visible)
    const hasMapIframe = (await mapIframe.count()) > 0;
    const hasMapContainer = (await mapContainer.count()) > 0;

    if (hasMapIframe) {
      await expect(mapIframe).toBeVisible();
      await helpers.logStep('[OK] Found Google Maps iframe');
    } else if (hasMapContainer) {
      await expect(mapContainer).toBeVisible();
      await helpers.logStep('[OK] Found Google Maps container');
    } else {
      // Look for any map-related element
      const anyMapElement = page.locator('.google-map, .map, [class*="map"], [data-testid*="map"]');
      const mapCount = await anyMapElement.count();

      if (mapCount > 0) {
        await helpers.logStep(`Found ${mapCount} map-related elements`);
        await expect(anyMapElement.first()).toBeVisible();
      } else {
        throw new Error('No map element found on the page');
      }
    }

    await helpers.takeScreenshot('c6-02-map-embed-visible', false);
  });

  test('should display fallback UI when API key is missing', async ({ page }) => {
    await helpers.logStep('Testing Google Maps fallback behavior');

    // Mock environment without API key
    await helpers.mockEnvironment({
      VITE_GOOGLE_MAPS_API_KEY: '',
    });

    await page.goto(TEST_DATA.routes.contact);
    await page.waitForLoadState('networkidle');

    // Wait a bit for any fallback logic to trigger
    await page.waitForTimeout(1000);

    await helpers.takeScreenshot('c6-03-contact-page-no-api-key', true);

    // Look for fallback UI elements
    const fallbackMessage = page.locator(
      'text=/map.*temporarily.*unavailable/i, text=/karte.*temporär.*nicht.*verfügbar/i, text=/map.*not.*available/i',
    );
    const fallbackContainer = page.locator(
      '[data-testid="map-fallback"], .map-fallback, .static-map-fallback',
    );

    // Check for fallback message
    let hasFallbackMessage = false;
    if ((await fallbackMessage.count()) > 0) {
      await expect(fallbackMessage.first()).toBeVisible();
      hasFallbackMessage = true;
      await helpers.logStep('[OK] Found fallback message');
    }

    // Check for fallback container
    let hasFallbackContainer = false;
    if ((await fallbackContainer.count()) > 0) {
      await expect(fallbackContainer.first()).toBeVisible();
      hasFallbackContainer = true;
      await helpers.logStep('[OK] Found fallback container');
    }

    // If no specific fallback found, look for general map container with text content
    if (!hasFallbackMessage && !hasFallbackContainer) {
      const mapArea = page.locator('.google-map, .map, [class*="map"], [data-testid*="map"]');
      if ((await mapArea.count()) > 0) {
        const mapText = await mapArea.first().textContent();
        if (
          mapText &&
          (mapText.includes('unavailable') ||
            mapText.includes('verfügbar') ||
            mapText.includes('map'))
        ) {
          hasFallbackMessage = true;
          await helpers.logStep('[OK] Found fallback text in map area');
        }
      }
    }

    // Look for external Google Maps links
    const externalLinks = page.locator('a[href*="maps.google.com"], a[href*="google.com/maps"]');
    const externalLinksCount = await externalLinks.count();

    expect(externalLinksCount).toBeGreaterThan(0);
    await helpers.logStep(`[OK] Found ${externalLinksCount} external Google Maps links`);

    // Verify link properties
    const firstLink = externalLinks.first();
    await expect(firstLink).toBeVisible();

    const linkTarget = await firstLink.getAttribute('target');
    const linkRel = await firstLink.getAttribute('rel');

    expect(linkTarget).toBe('_blank');
    expect(linkRel).toContain('noopener');

    await helpers.takeScreenshot('c6-04-fallback-ui-visible', false);

    // Verify at least one fallback indicator is present
    expect(hasFallbackMessage || hasFallbackContainer).toBeTruthy();

    await helpers.logStep('[OK] Fallback UI test passed');
  });

  test('should have working external Google Maps links', async ({ page }) => {
    await helpers.logStep('Testing external Google Maps links functionality');

    // Use fallback scenario (no API key)
    await helpers.mockEnvironment({
      VITE_GOOGLE_MAPS_API_KEY: '',
    });

    await page.goto(TEST_DATA.routes.contact);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Find external Google Maps links
    const externalLinks = page.locator('a[href*="maps.google.com"], a[href*="google.com/maps"]');
    const linkCount = await externalLinks.count();

    expect(linkCount).toBeGreaterThan(0);

    // Test first link
    const firstLink = externalLinks.first();
    const linkHref = await firstLink.getAttribute('href');
    const linkText = await firstLink.textContent();

    await helpers.logStep(`Testing link: "${linkText}" -> ${linkHref}`);

    // Verify link structure
    expect(linkHref).toMatch(/maps\.google\.com|google\.com\/maps/);
    expect(linkText).toBeTruthy();
    expect(linkText!.length).toBeGreaterThan(0);

    // Verify link contains business information
    const businessTerms = ['velobar', 'velo', 'bar', 'münchen', 'coburg', 'mobile'];
    const linkContainsBusinessInfo = businessTerms.some(
      (term) => linkHref!.toLowerCase().includes(term) || linkText!.toLowerCase().includes(term),
    );

    expect(linkContainsBusinessInfo).toBeTruthy();

    await helpers.takeScreenshot('c6-05-external-links-highlighted', false);

    await helpers.logStep('[OK] External links test passed');
  });

  test('should handle API key environment variable correctly', async ({ page }) => {
    await helpers.logStep('Testing environment variable handling');

    // Test with various API key scenarios
    const scenarios = [
      { key: 'valid-test-key', description: 'valid key' },
      { key: '', description: 'empty key' },
      { key: undefined, description: 'undefined key' },
    ];

    for (const scenario of scenarios) {
      await helpers.logStep(`Testing with ${scenario.description}`);

      if (scenario.key === undefined) {
        // Don't set the env var at all
        await page.addInitScript(() => {
          // Clear any existing env var
          if ((window as any).import?.meta?.env) {
            delete (window as any).import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          }
        });
      } else {
        await helpers.mockEnvironment({
          VITE_GOOGLE_MAPS_API_KEY: scenario.key,
        });
      }

      await page.goto(TEST_DATA.routes.contact);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Check if environment variable is accessible
      const envVarValue = await page.evaluate(() => {
        return (window as any).import?.meta?.env?.VITE_GOOGLE_MAPS_API_KEY;
      });

      if (scenario.key === undefined) {
        expect(envVarValue).toBeUndefined();
      } else {
        expect(envVarValue).toBe(scenario.key);
      }

      await helpers.takeScreenshot(
        `c6-06-env-test-${scenario.description.replace(' ', '-')}`,
        false,
      );
    }

    await helpers.logStep('[OK] Environment variable handling test passed');
  });

  test('should be responsive across different viewport sizes', async ({ page }) => {
    await helpers.logStep('Testing map responsiveness across viewports');

    const viewports = [
      { width: 1280, height: 720, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' },
    ];

    for (const viewport of viewports) {
      await helpers.logStep(
        `Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`,
      );

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(TEST_DATA.routes.contact);
      await page.waitForLoadState('networkidle');

      // Look for map container
      const mapContainer = page
        .locator('.google-map, .map, [class*="map"], [data-testid*="map"]')
        .first();

      if ((await mapContainer.count()) > 0) {
        await expect(mapContainer).toBeVisible();

        // Check container dimensions
        const boundingBox = await mapContainer.boundingBox();

        if (boundingBox) {
          // Map should be reasonably sized for the viewport
          expect(boundingBox.width).toBeGreaterThan(200);
          expect(boundingBox.height).toBeGreaterThan(150);

          // On mobile, map might be smaller but still visible
          if (viewport.name === 'mobile') {
            expect(boundingBox.width).toBeLessThanOrEqual(viewport.width);
          }
        }
      }

      await helpers.takeScreenshot(`c6-07-responsive-${viewport.name}`, true);
    }

    await helpers.logStep('[OK] Responsive test passed');
  });
});

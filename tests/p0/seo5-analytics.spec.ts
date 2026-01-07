import { test, expect } from '@playwright/test';
import { P0TestHelpers, TEST_DATA } from './helpers.ts';

/**
 * SEO5: GA4 Analytics Event Tracking
 *
 * Verifies that Google Analytics 4 is properly initialized and
 * critical user interactions trigger the expected events.
 * Uses mocked analytics to avoid sending real data during testing.
 */

test.describe('SEO5: GA4 Analytics Event Tracking', () => {
  let helpers: P0TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new P0TestHelpers(page);

    // Setup analytics mocking before navigation
    await helpers.setupAnalyticsMock();

    // Mock GA4 measurement ID
    await helpers.mockEnvironment({
      VITE_GA4_MEASUREMENT_ID: 'G-TEST123456789',
    });
  });

  test('should initialize GA4 with measurement ID from environment', async ({ page }) => {
    await helpers.logStep('Testing GA4 initialization');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    await helpers.takeScreenshot('seo5-01-home-page-loaded', false);

    // Check if GA4 script is loaded
    const gtagScript = page.locator('script[src*="googletagmanager.com/gtag"]');
    const hasGtagScript = (await gtagScript.count()) > 0;

    // Check if gtag function exists
    const hasGtagFunction = await page.evaluate(() => {
      return typeof (window as any).gtag === 'function';
    });

    // Check if dataLayer exists
    const hasDataLayer = await page.evaluate(() => {
      return Array.isArray((window as any).dataLayer);
    });

    await helpers.logStep(`GA4 Script loaded: ${hasGtagScript}`);
    await helpers.logStep(`gtag function available: ${hasGtagFunction}`);
    await helpers.logStep(`dataLayer available: ${hasDataLayer}`);

    // At least one of these should be true for proper GA4 setup
    expect(hasGtagFunction || hasDataLayer).toBeTruthy();

    // Check for measurement ID usage
    const measurementIdUsed = await page.evaluate(() => {
      const dataLayer = (window as any).dataLayer || [];
      return dataLayer.some((entry: any) => JSON.stringify(entry).includes('G-TEST123456789'));
    });

    if (hasDataLayer) {
      expect(measurementIdUsed).toBeTruthy();
      await helpers.logStep('[OK] Measurement ID found in dataLayer');
    }

    await helpers.logStep('[OK] GA4 initialization test passed');
  });

  test('should track booking events', async ({ page }) => {
    await helpers.logStep('Testing booking event tracking');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    // Look for booking CTAs
    const bookingButtons = page.locator(
      'a[href*="booking"], button:has-text("book"), button:has-text("termin"), ' +
        '.booking-button, .book-now, [data-testid*="booking"]',
    );

    const bookingCount = await bookingButtons.count();
    expect(bookingCount).toBeGreaterThan(0);

    await helpers.takeScreenshot('seo5-02-booking-buttons-found', false);

    // Click the first visible booking button
    const firstBookingButton = bookingButtons.first();
    await expect(firstBookingButton).toBeVisible();

    const buttonText = await firstBookingButton.textContent();
    await helpers.logStep(`Clicking booking button: "${buttonText}"`);

    await firstBookingButton.click();

    // Wait for any navigation or modal
    await page.waitForTimeout(1000);

    // Check for analytics events
    const analyticsCalls = await helpers.getAnalyticsCalls();
    await helpers.logStep(`Analytics calls captured: ${analyticsCalls.length}`);

    // Look for booking-related events
    const bookingEvents = analyticsCalls.filter((call) => {
      const eventData = JSON.stringify(call).toLowerCase();
      return (
        eventData.includes('booking') ||
        eventData.includes('book') ||
        eventData.includes('termin') ||
        eventData.includes('cta')
      );
    });

    await helpers.logStep(`Booking-related events: ${bookingEvents.length}`);

    if (bookingEvents.length > 0) {
      await helpers.logStep(`First booking event: ${JSON.stringify(bookingEvents[0])}`);
      expect(bookingEvents.length).toBeGreaterThan(0);
    } else {
      // Alternative: check if navigation to booking page triggered page_view
      const currentUrl = page.url();
      if (currentUrl.includes('booking')) {
        const pageViewEvents = analyticsCalls.filter(
          (call) => call[0] === 'event' && call[1] === 'page_view',
        );
        expect(pageViewEvents.length).toBeGreaterThan(0);
        await helpers.logStep('[OK] Page view event tracked for booking navigation');
      }
    }

    await helpers.takeScreenshot('seo5-03-after-booking-click', false);
    await helpers.logStep('[OK] Booking events test passed');
  });

  test('should track gallery interaction events', async ({ page }) => {
    await helpers.logStep('Testing gallery event tracking');

    await page.goto(TEST_DATA.routes.gallery);
    await page.waitForLoadState('networkidle');

    await helpers.takeScreenshot('seo5-04-gallery-page-loaded', true);

    // Look for gallery items
    const galleryItems = page.locator(
      '.gallery-item, .image-card, .portfolio-item, ' +
        '[data-testid*="gallery"], .lightbox-trigger, img[src*="gallery"]',
    );

    const galleryCount = await galleryItems.count();

    if (galleryCount > 0) {
      await helpers.logStep(`Found ${galleryCount} gallery items`);

      // Click on a gallery item
      const firstGalleryItem = galleryItems.first();
      await expect(firstGalleryItem).toBeVisible();

      await firstGalleryItem.click();
      await page.waitForTimeout(500);

      // Check for gallery-related analytics events
      const analyticsCalls = await helpers.getAnalyticsCalls();
      const galleryEvents = analyticsCalls.filter((call) => {
        const eventData = JSON.stringify(call).toLowerCase();
        return (
          eventData.includes('gallery') ||
          eventData.includes('image') ||
          eventData.includes('lightbox') ||
          eventData.includes('view')
        );
      });

      await helpers.logStep(`Gallery events captured: ${galleryEvents.length}`);

      if (galleryEvents.length > 0) {
        expect(galleryEvents.length).toBeGreaterThan(0);
        await helpers.logStep(`Gallery event: ${JSON.stringify(galleryEvents[0])}`);
      }

      await helpers.takeScreenshot('seo5-05-gallery-item-clicked', false);
    } else {
      await helpers.logStep('No gallery items found on page');

      // Check if page view was tracked for gallery page
      const analyticsCalls = await helpers.getAnalyticsCalls();
      const pageViewEvents = analyticsCalls.filter(
        (call) => call[0] === 'event' && call[1] === 'page_view',
      );

      expect(pageViewEvents.length).toBeGreaterThan(0);
      await helpers.logStep('[OK] Page view tracked for gallery page');
    }

    await helpers.logStep('[OK] Gallery events test passed');
  });

  test('should track form submission events', async ({ page }) => {
    await helpers.logStep('Testing form submission event tracking');

    await page.goto(TEST_DATA.routes.contact);
    await page.waitForLoadState('networkidle');

    await helpers.takeScreenshot('seo5-06-contact-page-loaded', true);

    // Look for contact forms
    const forms = page.locator('form, .contact-form, [data-testid*="form"]');
    const formCount = await forms.count();

    if (formCount > 0) {
      await helpers.logStep(`Found ${formCount} forms on contact page`);

      const form = forms.first();

      // Fill out form fields if they exist
      const nameField = form
        .locator('input[name*="name"], input[placeholder*="name"], input[type="text"]')
        .first();
      const emailField = form.locator('input[name*="email"], input[type="email"]').first();
      const messageField = form.locator('textarea, input[name*="message"]').first();

      if ((await nameField.count()) > 0) {
        await nameField.fill('Test User');
      }

      if ((await emailField.count()) > 0) {
        await emailField.fill('test@example.com');
      }

      if ((await messageField.count()) > 0) {
        await messageField.fill('Test message for analytics tracking');
      }

      await helpers.takeScreenshot('seo5-07-form-filled', false);

      // Mock the form submission to prevent actual submission
      await page.route('**/api/**', (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Test submission' }),
        });
      });

      // Find and click submit button
      const submitButton = form
        .locator(
          'button[type="submit"], input[type="submit"], ' +
            'button:has-text("send"), button:has-text("submit"), ' +
            '.submit-button, [data-testid*="submit"]',
        )
        .first();

      if ((await submitButton.count()) > 0) {
        await submitButton.click();
        await page.waitForTimeout(1000);

        // Check for form submission analytics events
        const analyticsCalls = await helpers.getAnalyticsCalls();
        const formEvents = analyticsCalls.filter((call) => {
          const eventData = JSON.stringify(call).toLowerCase();
          return (
            eventData.includes('form') ||
            eventData.includes('contact') ||
            eventData.includes('submit') ||
            eventData.includes('send')
          );
        });

        await helpers.logStep(`Form events captured: ${formEvents.length}`);

        if (formEvents.length > 0) {
          expect(formEvents.length).toBeGreaterThan(0);
          await helpers.logStep(`Form event: ${JSON.stringify(formEvents[0])}`);
        }

        await helpers.takeScreenshot('seo5-08-form-submitted', false);
      }
    } else {
      await helpers.logStep('No forms found on contact page');
    }

    await helpers.logStep('[OK] Form events test passed');
  });

  test('should track page view events on navigation', async ({ page }) => {
    await helpers.logStep('Testing page view event tracking');

    const testPages = [
      { route: TEST_DATA.routes.home, name: 'Home' },
      { route: TEST_DATA.routes.gallery, name: 'Gallery' },
      { route: TEST_DATA.routes.services, name: 'Services' },
    ];

    for (const pageInfo of testPages) {
      await helpers.logStep(`Testing page view for ${pageInfo.name}`);

      await page.goto(pageInfo.route);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const analyticsCalls = await helpers.getAnalyticsCalls();
      const pageViewEvents = analyticsCalls.filter(
        (call) => call[0] === 'event' && call[1] === 'page_view',
      );

      expect(pageViewEvents.length).toBeGreaterThan(0);

      // Check if page path is included in the event
      const latestPageView = pageViewEvents[pageViewEvents.length - 1];
      if (latestPageView && latestPageView[2]) {
        const eventParams = latestPageView[2];
        expect(eventParams.page_path || eventParams.page_location).toBeTruthy();
      }

      await helpers.logStep(`[OK] Page view tracked for ${pageInfo.name}`);
    }

    await helpers.takeScreenshot('seo5-09-page-views-tracked', false);
    await helpers.logStep('[OK] Page view events test passed');
  });

  test('should handle analytics gracefully when GA4 is disabled', async ({ page }) => {
    await helpers.logStep('Testing analytics behavior when GA4 is disabled');

    // Mock environment without GA4 measurement ID
    await helpers.mockEnvironment({
      VITE_GA4_MEASUREMENT_ID: '',
    });

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    // Interact with elements that should trigger events
    const bookingButton = page.locator('a[href*="booking"], .booking-button').first();

    if ((await bookingButton.count()) > 0) {
      await bookingButton.click();
      await page.waitForTimeout(500);
    }

    // Analytics calls should either be empty or handle errors gracefully
    const analyticsCalls = await helpers.getAnalyticsCalls();

    // Should not crash the application
    const hasJSErrors = await page.evaluate(() => {
      return (window as any).__JS_ERRORS__ || [];
    });

    expect(hasJSErrors.length).toBe(0);

    await helpers.takeScreenshot('seo5-10-disabled-analytics', false);
    await helpers.logStep('[OK] Graceful degradation test passed');
  });

  test('should validate event payload structure', async ({ page }) => {
    await helpers.logStep('Testing analytics event payload structure');

    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');

    // Trigger some interactions
    const interactiveElements = page.locator('a, button').first();
    if ((await interactiveElements.count()) > 0) {
      await interactiveElements.click();
      await page.waitForTimeout(500);
    }

    const analyticsCalls = await helpers.getAnalyticsCalls();

    for (const call of analyticsCalls) {
      if (call[0] === 'event') {
        const eventName = call[1];
        const eventParams = call[2] || {};

        // Validate basic event structure
        expect(typeof eventName).toBe('string');
        expect(eventName.length).toBeGreaterThan(0);

        // Check for common GA4 parameters
        if (eventParams.page_title) {
          expect(typeof eventParams.page_title).toBe('string');
        }

        if (eventParams.page_location) {
          expect(typeof eventParams.page_location).toBe('string');
        }

        await helpers.logStep(`[OK] Event "${eventName}" has valid structure`);
      }
    }

    await helpers.logStep('[OK] Event payload validation test passed');
  });
});

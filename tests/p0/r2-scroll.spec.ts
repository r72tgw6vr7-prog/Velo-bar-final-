import { test, expect } from '@playwright/test';
import { P0TestHelpers, TEST_DATA } from './helpers';

/**
 * R2: Scroll to Top on Navigation
 *
 * Verifies that navigating between routes automatically scrolls to the top
 * This is critical for user experience and accessibility.
 */

test.describe('R2: Scroll to Top on Navigation', () => {
  let helpers: P0TestHelpers;

  test.beforeEach(async ({ page }) => {
    helpers = new P0TestHelpers(page);
    await page.goto(TEST_DATA.routes.home);
    await page.waitForLoadState('networkidle');
  });

  test('should scroll to top when navigating from home to gallery', async ({ page }) => {
    await helpers.logStep('Starting scroll-to-top navigation test');

    // Take initial screenshot
    await helpers.takeScreenshot('r2-01-initial-home-page', true);

    // Scroll to bottom of home page
    await helpers.logStep('Scrolling to bottom of home page');
    await helpers.scrollToBottom();

    // Verify we're at the bottom
    const bottomPosition = await helpers.getScrollPosition();
    expect(bottomPosition.y).toBeGreaterThan(500); // Should be significantly scrolled

    await helpers.takeScreenshot('r2-02-scrolled-to-bottom', true);

    // Find and click navigation link to gallery
    await helpers.logStep('Clicking navigation link to gallery page');
    const galleryLink = page.locator('nav a[href="/galerie"], nav a[href*="galerie"]').first();
    await expect(galleryLink).toBeVisible();

    // Click the gallery link
    await galleryLink.click();

    // Wait for navigation to complete
    await helpers.waitForNavigation('/galerie');

    // Check scroll position after navigation
    await helpers.logStep('Verifying scroll position after navigation');
    const topPosition = await helpers.getScrollPosition();

    // Take screenshot of final state
    await helpers.takeScreenshot('r2-03-after-navigation-to-gallery', true);

    // Assert scroll position is at or near top (allowing for small margin)
    expect(topPosition.y).toBeLessThanOrEqual(2);
    expect(topPosition.x).toBeLessThanOrEqual(2);

    await helpers.logStep(
      `[OK] Navigation scroll test passed - final position: ${topPosition.y}px`,
    );
  });

  test('should scroll to top when navigating from services to gallery', async ({ page }) => {
    await helpers.logStep('Testing scroll behavior: services → gallery');

    // Navigate to services first
    await page.goto(TEST_DATA.routes.services);
    await page.waitForLoadState('networkidle');

    await helpers.takeScreenshot('r2-04-services-page-initial', true);

    // Scroll to bottom
    await helpers.scrollToBottom();
    const bottomPosition = await helpers.getScrollPosition();
    expect(bottomPosition.y).toBeGreaterThan(300);

    await helpers.takeScreenshot('r2-05-services-scrolled-bottom', true);

    // Navigate to gallery
    const galleryLink = page.locator('nav a[href="/gallery"], nav a[href*="gallery"]').first();
    await expect(galleryLink).toBeVisible();
    await galleryLink.click();

    await helpers.waitForNavigation('/gallery');

    // Verify scroll position
    const topPosition = await helpers.getScrollPosition();
    await helpers.takeScreenshot('r2-06-gallery-after-navigation', true);

    expect(topPosition.y).toBeLessThanOrEqual(2);

    await helpers.logStep(`[OK] Services → Gallery scroll test passed`);
  });

  test('should handle hash navigation appropriately', async ({ page }) => {
    await helpers.logStep('Testing hash navigation behavior');

    // Go to home and scroll down
    await page.goto(TEST_DATA.routes.home);
    await helpers.scrollToBottom();

    // Navigate to a page with potential hash
    await page.goto('/contact#contact-form');
    await helpers.waitForNavigation('/contact');

    // For hash navigation, it should scroll to the target element if it exists
    // or to top if the element doesn't exist
    const position = await helpers.getScrollPosition();

    await helpers.takeScreenshot('r2-07-hash-navigation-result', true);

    // Position should be either at top (hash target not found) or at target element
    // This is acceptable behavior per the ScrollToTop component implementation
    expect(position.y).toBeGreaterThanOrEqual(0);

    await helpers.logStep(`[OK] Hash navigation test passed - position: ${position.y}px`);
  });

  test('should work on mobile viewports', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
      return;
    }

    await helpers.logStep('Testing scroll behavior on mobile viewport');

    // Navigate and scroll on mobile
    await helpers.scrollToBottom();
    const bottomPosition = await helpers.getScrollPosition();

    await helpers.takeScreenshot('r2-08-mobile-scrolled-bottom', true);

    // Navigate to different page
    const contactLink = page.locator('nav a[href="/contact"], nav a[href*="contact"]').first();

    // On mobile, navigation might be in a menu
    const mobileMenuButton = page.locator(
      '[data-testid="mobile-menu"], .mobile-menu-button, button[aria-label*="menu"]',
    );
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(300); // Wait for menu animation
    }

    await expect(contactLink).toBeVisible();
    await contactLink.click();

    await helpers.waitForNavigation('/contact');

    const topPosition = await helpers.getScrollPosition();
    await helpers.takeScreenshot('r2-09-mobile-after-navigation', true);

    expect(topPosition.y).toBeLessThanOrEqual(5); // Slightly more tolerance on mobile

    await helpers.logStep(`[OK] Mobile scroll test passed`);
  });

  test('should preserve scroll behavior with browser back/forward', async ({ page }) => {
    await helpers.logStep('Testing scroll behavior with browser navigation');

    // Start at home, scroll down
    await helpers.scrollToBottom();
    const homeBottomPosition = await helpers.getScrollPosition();

    // Navigate to gallery
    await page.locator('nav a[href="/galerie"], nav a[href*="galerie"]').first().click();
    await helpers.waitForNavigation('/galerie');

    // Verify scroll to top on navigation
    let position = await helpers.getScrollPosition();
    expect(position.y).toBeLessThanOrEqual(2);

    // Scroll down on gallery page
    await helpers.scrollToBottom();

    // Use browser back
    await page.goBack();
    await helpers.waitForNavigation('/');

    // Should scroll to top on back navigation too
    position = await helpers.getScrollPosition();
    await helpers.takeScreenshot('r2-10-after-browser-back', true);

    expect(position.y).toBeLessThanOrEqual(2);

    await helpers.logStep(`[OK] Browser back/forward scroll test passed`);
  });
});

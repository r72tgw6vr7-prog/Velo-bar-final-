import { test, expect } from '@playwright/test';

/**
 * Demo P0 Test - Framework Validation
 *
 * This test demonstrates the P0 testing framework is working correctly.
 * It can run without a local dev server by testing against a simple webpage.
 */

test.describe('P0 Framework Demo', () => {
  test('should validate test framework setup', async ({ page }) => {
    // Navigate to a simple test page
    await page.goto(
      'data:text/html,<html><body><h1>P0 Test Framework Demo</h1><p>Framework is working!</p></body></html>',
    );

    // Basic assertions to validate framework
    await expect(page.locator('h1')).toHaveText('P0 Test Framework Demo');
    await expect(page.locator('p')).toBeVisible();

    // Test screenshot capability
    await page.screenshot({ path: 'tests/p0/artifacts/demo-framework-test.png' });

    // Test computed styles (T4 style)
    const h1FontWeight = await page
      .locator('h1')
      .evaluate((el) => window.getComputedStyle(el).fontWeight);

    expect(h1FontWeight).toBeTruthy();

    // Test scroll position (R2 style)
    const scrollPosition = await page.evaluate(() => ({
      x: window.scrollX,
      y: window.scrollY,
    }));

    expect(scrollPosition.y).toBe(0);

    // eslint-disable-next-line no-console -- debug marker to confirm P0 framework demo test ran successfully
    console.log('[OK] P0 Test Framework validation complete');
  });

  test('should validate helper functions', async ({ page }) => {
    await page.goto(
      'data:text/html,<html><body><button>Test Button</button><form><input type="email" placeholder="Email"/><button type="submit">Submit</button></form></body></html>',
    );

    // Test element selection
    const button = page.locator('button').first();
    await expect(button).toBeVisible();

    // Test form interaction
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('test@example.com');

    const inputValue = await emailInput.inputValue();
    expect(inputValue).toBe('test@example.com');

    // Test analytics-style event tracking (mocked)
    await page.addInitScript(() => {
      (window as any).__TEST_EVENTS__ = [];
      (window as any).trackEvent = (event: string) => {
        (window as any).__TEST_EVENTS__.push(event);
      };
    });

    await page.reload(); // Reload to apply the init script

    await page.evaluate(() => {
      (window as any).trackEvent('test_button_click');
    });

    const events = await page.evaluate(() => (window as any).__TEST_EVENTS__);
    expect(events).toContain('test_button_click');

    // eslint-disable-next-line no-console -- debug marker to confirm helper utilities behave as expected
    console.log('[OK] Helper functions validation complete');
  });
});

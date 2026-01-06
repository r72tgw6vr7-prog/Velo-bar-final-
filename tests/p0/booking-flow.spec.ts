import { test, expect } from '@playwright/test';

// Adjust selectors and URLs as needed for your booking flow

test('Booking flow: landing → form → success', async ({ page }) => {
  // 1. Go to the landing page
  await page.goto('/');
  // Confirm landing page loaded (adjust selector as needed)
  await expect(page.locator('text=Jetzt buchen')).toBeVisible();

  // 2. Click the booking CTA/button to open the booking form
  await page.click('text=Jetzt buchen');

  // 3. Wait for the booking form to appear
  await expect(page.locator('form')).toBeVisible();

  // 4. Fill out the booking form (adjust selectors/fields as needed)
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="phone"]', '1234567890');
  // Add more fields as required by your form

  // 5. Submit the form
  await page.click('button[type="submit"]');

  // 6. Wait for the success state/confirmation (adjust selector/text as needed)
  await expect(page.locator('text=Vielen Dank')).toBeVisible();
});

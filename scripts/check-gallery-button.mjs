import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5175/galerie', { waitUntil: 'networkidle' });

  // Check for button by aria-controls or exact text
  const byAria = await page.locator('button[aria-controls="velo-gallery-grid"]').count();
  const byText = await page.getByRole('button', { name: 'Mehr Bilder anzeigen' }).count();

  console.log('ariaCount:', byAria);
  console.log('textCount:', byText);

  if (byAria || byText) {
    const visible = await page
      .locator('button[aria-controls="velo-gallery-grid"]')
      .first()
      .isVisible()
      .catch(() => false);
    console.log('visible:', visible);
  }

  await browser.close();
})();

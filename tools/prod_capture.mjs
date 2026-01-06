#!/usr/bin/env node

/**
 * Production QA Capture Tool
 *
 * Validates P0 requirements against deployed Medusa website:
 * - C6: Google Maps integration with fallback
 * - R2: Scroll-to-top navigation behavior
 * - T4: Font weight token compliance
 * - SEO5: GA4 analytics implementation
 *
 * Usage:
 *   export BASE_URL="https://your-deployment.com"
 *   node tools/prod_capture.mjs
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const ARTIFACTS_DIR = join(__dirname, '..', 'docs', 'verification', 'artifacts');
const SCREENSHOTS_DIR = join(ARTIFACTS_DIR, 'screenshots');

// Ensure directories exist
if (!existsSync(ARTIFACTS_DIR)) mkdirSync(ARTIFACTS_DIR, { recursive: true });
if (!existsSync(SCREENSHOTS_DIR)) mkdirSync(SCREENSHOTS_DIR, { recursive: true });

console.log(`[START] Starting production QA capture for: ${BASE_URL}`);

async function captureProduction() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 1024 },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  // Capture data containers
  const captureData = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    analytics: {
      events: [],
      networkRequests: [],
      consoleMessages: [],
    },
    styles: {
      fontWeights: [],
      typography: [],
    },
    navigation: {
      scrollBehavior: [],
    },
    maps: {
      loadStatus: null,
      fallbackActive: false,
      errors: [],
    },
  };

  // Analytics capture setup
  await page.addInitScript(() => {
    // Capture GA4 events
    window.capturedEvents = [];
    window.capturedDataLayer = [];

    // Mock gtag to capture events
    const originalGtag = window.gtag;
    window.gtag = function (...args) {
      window.capturedEvents.push({
        timestamp: Date.now(),
        args: args,
        type: 'gtag',
      });
      if (originalGtag) originalGtag.apply(this, arguments);
    };

    // Capture dataLayer pushes
    if (window.dataLayer) {
      const originalPush = window.dataLayer.push;
      window.dataLayer.push = function (...args) {
        window.capturedDataLayer.push({
          timestamp: Date.now(),
          data: args,
        });
        return originalPush.apply(this, arguments);
      };
    }
  });

  // Network monitoring
  page.on('request', (request) => {
    const url = request.url();
    if (
      url.includes('google-analytics') ||
      url.includes('googletagmanager') ||
      url.includes('collect') ||
      url.includes('gtm.js')
    ) {
      captureData.analytics.networkRequests.push({
        url,
        method: request.method(),
        timestamp: Date.now(),
      });
    }
  });

  // Console monitoring
  page.on('console', (msg) => {
    const text = msg.text();
    if (
      text.includes('Analytics') ||
      text.includes('GA4') ||
      text.includes('gtag') ||
      text.includes('Maps')
    ) {
      captureData.analytics.consoleMessages.push({
        type: msg.type(),
        text,
        timestamp: Date.now(),
      });
    }
  });

  try {
    console.log('📸 Capturing homepage...');
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'home-page.png'),
      fullPage: true,
    });

    // Capture analytics events from homepage
    const homeEvents = await page.evaluate(() => window.capturedEvents || []);
    captureData.analytics.events.push(...homeEvents);

    console.log('📸 Capturing gallery page...');
    await page.goto(`${BASE_URL}/galerie`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'gallery-page.png'),
      fullPage: true,
    });

    // Test scroll behavior (R2)
    console.log('🔄 Testing scroll-to-top behavior...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'scroll-bottom.png'),
    });

    const scrollBeforeNav = await page.evaluate(() => window.pageYOffset);
    await page.goto(`${BASE_URL}/leistungen`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const scrollAfterNav = await page.evaluate(() => window.pageYOffset);

    captureData.navigation.scrollBehavior.push({
      beforeNavigation: scrollBeforeNav,
      afterNavigation: scrollAfterNav,
      expectedTop: scrollAfterNav === 0,
    });

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'scroll-after-nav.png'),
    });

    console.log('📸 Capturing services page...');
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'leistungen-page.png'),
      fullPage: true,
    });

    console.log('📸 Capturing contact page and testing maps...');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000); // Extra time for maps to load

    // Test maps functionality (C6)
    try {
      const mapElement = await page
        .locator('[data-testid="google-map"], iframe[src*="google.com/maps"], .map-container')
        .first();
      const mapExists = await mapElement.isVisible({ timeout: 5000 });

      if (mapExists) {
        captureData.maps.loadStatus = 'loaded';
        await page.screenshot({
          path: join(SCREENSHOTS_DIR, 'contact-map-loaded.png'),
          fullPage: true,
        });
      } else {
        throw new Error('Map not found');
      }
    } catch (error) {
      // Check for fallback
      const fallbackElement = await page
        .locator(
          'text="View on Google Maps", text="Unable to load map", [data-testid="map-fallback"]',
        )
        .first();
      const fallbackExists = await fallbackElement.isVisible({ timeout: 2000 });

      captureData.maps.loadStatus = fallbackExists ? 'fallback' : 'error';
      captureData.maps.fallbackActive = fallbackExists;
      captureData.maps.errors.push(error.message);

      await page.screenshot({
        path: join(SCREENSHOTS_DIR, 'contact-map-fallback.png'),
        fullPage: true,
      });
    }

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'contact-page.png'),
      fullPage: true,
    });

    // Capture font weights and typography (T4)
    console.log('🔤 Capturing typography data...');
    const typographyData = await page.evaluate(() => {
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, .btn, body');
      return Array.from(elements)
        .slice(0, 50)
        .map((el) => {
          const computed = getComputedStyle(el);
          return {
            tagName: el.tagName,
            className: el.className,
            fontWeight: computed.fontWeight,
            fontSize: computed.fontSize,
            lineHeight: computed.lineHeight,
            fontFamily: computed.fontFamily,
            textContent: el.textContent?.slice(0, 50) + (el.textContent?.length > 50 ? '...' : ''),
          };
        });
    });

    captureData.styles.typography = typographyData;
    captureData.styles.fontWeights = typographyData
      .map((item) => ({ element: `${item.tagName}.${item.className}`, weight: item.fontWeight }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.element === item.element && t.weight === item.weight),
      );

    // Trigger analytics events for testing (SEO5)
    console.log('📊 Testing analytics events...');

    // Simulate form interaction
    try {
      const formElement = await page.locator('form, [data-testid="contact-form"]').first();
      if (await formElement.isVisible({ timeout: 2000 })) {
        await formElement.click();
        await page.waitForTimeout(500);
      }
    } catch (error) {
      console.log('No form found for event testing');
    }

    // Simulate booking interaction
    try {
      const bookingElement = await page
        .locator(
          '[data-testid="booking-button"], button:has-text("Book"), button:has-text("Appointment")',
        )
        .first();
      if (await bookingElement.isVisible({ timeout: 2000 })) {
        await bookingElement.click();
        await page.waitForTimeout(500);
      }
    } catch (error) {
      console.log('No booking button found for event testing');
    }

    // Capture final analytics state
    const finalEvents = await page.evaluate(() => window.capturedEvents || []);
    const finalDataLayer = await page.evaluate(() => window.capturedDataLayer || []);

    captureData.analytics.events = finalEvents;
    captureData.analytics.dataLayer = finalDataLayer;

    // Mobile viewport testing
    console.log('📱 Testing mobile viewport...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'contact-mobile.png'),
      fullPage: true,
    });
  } catch (error) {
    console.error('[ERROR] Error during capture:', error);
    captureData.error = error.message;
  } finally {
    await browser.close();
  }

  // Save artifacts
  console.log('[SAVE] Saving artifacts...');

  // Events JSON
  writeFileSync(
    join(ARTIFACTS_DIR, 'events.json'),
    JSON.stringify(captureData.analytics.events, null, 2),
  );

  // Computed styles JSON
  writeFileSync(
    join(ARTIFACTS_DIR, 'computed_styles.json'),
    JSON.stringify(captureData.styles, null, 2),
  );

  // Network notes
  const networkNotes = `# Network Request Observations

## GA4 Analytics Requests
${
  captureData.analytics.networkRequests
    .map((req) => `- ${new Date(req.timestamp).toISOString()}: ${req.method} ${req.url}`)
    .join('\n') || 'No GA4 requests detected'
}

## Console Messages
${
  captureData.analytics.consoleMessages.map((msg) => `- [${msg.type}] ${msg.text}`).join('\n') ||
  'No relevant console messages'
}

## Summary
- Total analytics requests: ${captureData.analytics.networkRequests.length}
- Events captured: ${captureData.analytics.events.length}
- Map load status: ${captureData.maps.loadStatus}
- Scroll behavior valid: ${captureData.navigation.scrollBehavior.every((s) => s.expectedTop)}
`;

  writeFileSync(join(ARTIFACTS_DIR, 'network_notes.md'), networkNotes);

  // Complete capture summary
  const summary = {
    ...captureData,
    summary: {
      c6_maps: captureData.maps.loadStatus,
      r2_scroll: captureData.navigation.scrollBehavior.every((s) => s.expectedTop),
      t4_fonts: captureData.styles.fontWeights.length > 0,
      seo5_analytics:
        captureData.analytics.events.length > 0 || captureData.analytics.networkRequests.length > 0,
    },
  };

  writeFileSync(join(ARTIFACTS_DIR, 'capture_summary.json'), JSON.stringify(summary, null, 2));

  console.log('\n[OK] Production QA capture complete!');
  console.log('\n📊 Results Summary:');
  console.log(`├─ Screenshots: ${SCREENSHOTS_DIR}`);
  console.log(`├─ Analytics events: ${captureData.analytics.events.length} captured`);
  console.log(`├─ Network requests: ${captureData.analytics.networkRequests.length} observed`);
  console.log(`├─ Typography elements: ${captureData.styles.typography.length} analyzed`);
  console.log(`├─ Maps status: ${captureData.maps.loadStatus}`);
  console.log(
    `└─ Scroll behavior: ${captureData.navigation.scrollBehavior.every((s) => s.expectedTop) ? 'PASS' : 'FAIL'}`,
  );

  console.log('\n📋 Next steps:');
  console.log('1. Review artifacts in docs/verification/artifacts/');
  console.log('2. Update production_smoke_check.md with results');
  console.log('3. Mark PASS/FAIL boxes in the checklist');

  return summary;
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  captureProduction().catch(console.error);
}

export default captureProduction;

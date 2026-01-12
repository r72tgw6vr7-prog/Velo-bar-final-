#!/usr/bin/env node
/*
Capture screenshots for a set of pages and widths using Playwright.
Usage: node scripts/capture-screenshots.mjs --baseUrl=http://localhost:4173 --output=tests/baseline
*/
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const argv = Object.fromEntries(process.argv.slice(2).map((arg) => arg.split('=').map((s) => s.replace(/^--/, ''))));
const baseUrl = argv.baseUrl || 'http://localhost:4173';
const output = argv.output || 'tests/baseline';

const pages = [
  { path: '/', name: 'home', url: '/' },
  { path: '/velobar/buchungmuc', name: 'buchungmuc', url: '/velobar/buchungmuc' },
  { path: '/anfrage', name: 'anfrage', url: '/anfrage' },
  { path: '/galerie', name: 'galerie', url: '/galerie' },
  { path: '/blog/nachhaltige-firmenfeier', name: 'blog-nachhaltige-firmenfeier', url: '/blog/nachhaltige-firmenfeier' },
];
const widths = [375, 768, 1024, 1440];

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

async function run() {
  await ensureDir(output);

  const browser = await chromium.launch();
  // Preview uses HTTPS with a dev certificate — allow insecure HTTPS for local preview
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, ignoreHTTPSErrors: true });
  const page = await context.newPage();

  for (const w of widths) {
    for (const p of pages) {
      console.log(`Capturing ${p.url} @ ${w}px`);
      await page.setViewportSize({ width: w, height: 900 });
      const url = (baseUrl + p.url).replace(/([^:]?)\/\/+/, '$1/');
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      if (!res || res.status() >= 400) {
        console.warn(`Warning: ${url} returned status ${res ? res.status() : 'none'}`);
      }

      // Wait for short delay to let animations/JS initialize (but not to run long animations)
      await page.waitForTimeout(800);

      const fileName = `${p.name}-${w}.png`;
      const outPath = path.join(output, fileName);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Saved ${outPath}`);
    }
  }

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

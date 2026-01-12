#!/usr/bin/env node
/*
Capture screenshots by loading the built index.html via file:// and using history.pushState for client-side routes.
Usage: node scripts/capture-screenshots-file.mjs --output=tests/baseline
*/
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const argv = Object.fromEntries(process.argv.slice(2).map((arg) => arg.split('=').map((s) => s.replace(/^--/, ''))));
const output = argv.output || 'tests/baseline';

const pages = [
  { path: '/', name: 'home', route: '/' },
  { path: '/velobar/buchungmuc', name: 'buchungmuc', route: '/velobar/buchungmuc' },
  { path: '/anfrage', name: 'anfrage', route: '/anfrage' },
  { path: '/galerie', name: 'galerie', route: '/galerie' },
  { path: '/blog/nachhaltige-firmenfeier', name: 'blog-nachhaltige-firmenfeier', route: '/blog/nachhaltige-firmenfeier' },
];
const widths = [375, 768, 1024, 1440];

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

async function run() {
  const indexPath = path.resolve(process.cwd(), 'dist', 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found — ensure you have built the project first.');
    process.exit(1);
  }

  await ensureDir(output);

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  const fileUrl = `file://${indexPath}`;
  console.log(`Loading ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'load' });

  for (const w of widths) {
    for (const p of pages) {
      console.log(`Rendering ${p.route} @ ${w}px`);
      await page.setViewportSize({ width: w, height: 900 });
      // Use pushState navigation for SPA routes
      await page.evaluate((route) => {
        history.pushState({}, '', route);
        window.dispatchEvent(new Event('popstate'));
      }, p.route);

      // Wait for network idle for any lazy JS
      await page.waitForTimeout(1000);

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

#!/usr/bin/env node
/**
 * One-off hero viewport check (no snapshot baselines)
 * - Starts Vite dev server (localhost only)
 * - Visits `/` at 320/375/414 widths
 * - Asserts no horizontal overflow
 * - Captures screenshots into tests/p0/artifacts/hero-oneoff/<timestamp>/
 *
 * Run:
 *   npm run hero:check
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Playwright is installed via @playwright/test; it re-exports browser launchers.
import { chromium } from '@playwright/test';

const PROJECT_ROOT = process.cwd();
const PORT = Number(process.env.HERO_CHECK_PORT || 5175);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${PORT}`;

const VIEWPORTS = [
  { name: 'w320', width: 320, height: 700 },
  { name: 'w375', width: 375, height: 812 },
  { name: 'w414', width: 414, height: 896 },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok) return;
    } catch {
      // ignore
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for server: ${url}`);
}

function startDevServer() {
  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const child = spawn(
    cmd,
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    {
      cwd: PROJECT_ROOT,
      stdio: 'pipe',
      env: {
        ...process.env,
        // reduce noise
        FORCE_COLOR: '0',
      },
    },
  );

  child.stdout.on('data', (d) => process.stdout.write(d));
  child.stderr.on('data', (d) => process.stderr.write(d));

  return child;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function timestampSlug() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

async function main() {
  const outDir = path.join(
    PROJECT_ROOT,
    'tests',
    'p0',
    'artifacts',
    'hero-oneoff',
    timestampSlug(),
  );
  ensureDir(outDir);

  const server = startDevServer();
  try {
    await waitForServer(BASE_URL, 90_000);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => document.fonts.ready);
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          innerWidth: window.innerWidth,
          scrollWidth: doc.scrollWidth,
          overflow: doc.scrollWidth - window.innerWidth,
        };
      });

      const screenshotPath = path.join(outDir, `home-${vp.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // Allow 1px tolerance for subpixel rounding.
      if (overflow.scrollWidth > overflow.innerWidth + 1) {
        throw new Error(
          `Horizontal overflow detected at ${vp.name}: scrollWidth=${overflow.scrollWidth} innerWidth=${overflow.innerWidth} (delta=${overflow.overflow})`,
        );
      }
    }

    await browser.close();

    console.log(
      `✅ Hero one-off check passed. Screenshots: ${path.relative(PROJECT_ROOT, outDir)}`,
    );
  } finally {
    // Best-effort cleanup
    server.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error(`❌ Hero one-off check failed: ${err?.message || err}`);
  process.exit(1);
});

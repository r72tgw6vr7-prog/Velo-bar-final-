#!/usr/bin/env node
/**
 * Performance Benchmarking Script
 * ================================
 * Runs Lighthouse audits and captures Web Vitals metrics
 * Usage: node scripts/performance-benchmark.mjs [url]
 */

import { execFileSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';

const DEFAULT_URL = 'http://localhost:5173';
const OUTPUT_DIR = './artifacts/performance';

// Performance budgets (from README targets)
const BUDGETS = {
  lighthouse: {
    performance: 90,
    accessibility: 90,
    bestPractices: 90,
    seo: 90,
  },
  webVitals: {
    LCP: 2500, // Largest Contentful Paint < 2.5s
    FID: 100, // First Input Delay < 100ms
    CLS: 0.1, // Cumulative Layout Shift < 0.1
    FCP: 1500, // First Contentful Paint < 1.5s
    TTI: 3500, // Time to Interactive < 3.5s
  },
};

async function runBenchmark(url = DEFAULT_URL) {
  console.log('🚀 Starting Performance Benchmark');
  console.log(`   URL: ${url}`);
  console.log('');

  let targetUrl;
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Only http/https URLs are supported');
    }
    targetUrl = parsed.toString();
  } catch {
    console.error('❌ Invalid URL provided. Expected http(s) URL.');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const basePath = `${OUTPUT_DIR}/lighthouse-${timestamp}`;
  const reportPath = `${basePath}.report.html`;
  const jsonPath = `${basePath}.report.json`;

  try {
    // Run Lighthouse CLI
    console.log('📊 Running Lighthouse audit...');
    execFileSync(
      'npx',
      [
        'lighthouse',
        targetUrl,
        '--output=html',
        '--output=json',
        `--output-path=${basePath}`,
        '--chrome-flags=--headless --no-sandbox',
      ],
      { stdio: 'pipe' },
    );

    // Parse results
    const results = JSON.parse(readFileSync(`${jsonPath}`, 'utf8'));
    const scores = {
      performance: Math.round(results.categories.performance.score * 100),
      accessibility: Math.round(results.categories.accessibility.score * 100),
      bestPractices: Math.round(results.categories['best-practices'].score * 100),
      seo: Math.round(results.categories.seo.score * 100),
    };

    // Print results
    console.log('');
    console.log('📈 Lighthouse Scores:');
    console.log('─'.repeat(40));

    Object.entries(scores).forEach(([key, score]) => {
      const budget = BUDGETS.lighthouse[key];
      const status = score >= budget ? '✅' : '❌';
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      console.log(`   ${status} ${label}: ${score} (target: ${budget})`);
    });

    // Web Vitals
    console.log('');
    console.log('⚡ Core Web Vitals:');
    console.log('─'.repeat(40));

    const audits = results.audits;
    const vitals = {
      LCP: audits['largest-contentful-paint']?.numericValue,
      FCP: audits['first-contentful-paint']?.numericValue,
      CLS: audits['cumulative-layout-shift']?.numericValue,
      TTI: audits['interactive']?.numericValue,
    };

    Object.entries(vitals).forEach(([key, value]) => {
      if (value !== undefined) {
        const budget = BUDGETS.webVitals[key];
        const displayValue = key === 'CLS' ? value.toFixed(3) : `${Math.round(value)}ms`;
        const status = value <= budget ? '✅' : '❌';
        console.log(
          `   ${status} ${key}: ${displayValue} (target: ${key === 'CLS' ? budget : budget + 'ms'})`,
        );
      }
    });

    // Summary
    console.log('');
    console.log('─'.repeat(40));
    console.log(`📄 Full report: ${reportPath}`);
    console.log('');

    // Check if all budgets pass
    const allPass = Object.entries(scores).every(
      ([key, score]) => score >= BUDGETS.lighthouse[key],
    );

    if (allPass) {
      console.log('✅ All performance budgets met!');
      process.exit(0);
    } else {
      console.log('❌ Some performance budgets not met.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Benchmark failed:', error.message);
    console.log('');
    console.log('Make sure:');
    console.log('  1. Dev server is running (npm run dev)');
    console.log('  2. Lighthouse CLI is available (npx lighthouse)');
    console.log('  3. Chrome/Chromium is installed');
    process.exit(1);
  }
}

// Run with provided URL or default
const url = process.argv[2] || DEFAULT_URL;
runBenchmark(url);

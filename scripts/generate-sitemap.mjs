#!/usr/bin/env node

/**
 * Sitemap Generator for Vite + React Router
 * Generates sitemap.xml for SEO optimization
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Prefer VITE_SITE_URL when available; fall back to production domain
const BASE_URL = process.env.VITE_SITE_URL || 'https://www.velo-bar.com';

// Canonical routes for Velo.Bar corporate site (no legacy redirects)
const routes = [
  // Core entry points
  { url: '/', changefreq: 'weekly', priority: '1.0' },

  // Service detail pages (8 total)
  { url: '/firmenfeiern', changefreq: 'monthly', priority: '0.9' },
  { url: '/weihnachtsfeiern', changefreq: 'monthly', priority: '0.9' },
  { url: '/messe-catering', changefreq: 'monthly', priority: '0.9' },
  { url: '/team-events-workshops', changefreq: 'monthly', priority: '0.9' },
  { url: '/private-feiern', changefreq: 'monthly', priority: '0.9' },
  { url: '/hochzeiten', changefreq: 'monthly', priority: '0.9' },
  { url: '/velobar/buchungmuc', changefreq: 'monthly', priority: '0.9' },
  { url: '/velobarco', changefreq: 'monthly', priority: '0.9' },

  // Cross-service marketing pages
  { url: '/preise', changefreq: 'monthly', priority: '0.8' },
  { url: '/galerie', changefreq: 'weekly', priority: '0.8' },
  { url: '/about', changefreq: 'monthly', priority: '0.6' },
  { url: '/menu', changefreq: 'monthly', priority: '0.6' },

  // Primary inquiry funnel
  { url: '/anfrage', changefreq: 'weekly', priority: '0.9' },

  // Legal pages
  { url: '/impressum', changefreq: 'yearly', priority: '0.3' },
  { url: '/datenschutz', changefreq: 'yearly', priority: '0.3' },
  { url: '/agb', changefreq: 'yearly', priority: '0.3' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, xml, 'utf8');

  console.log(`[OK] Sitemap generated: ${outputPath}`);
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`[FILE] Routes: ${routes.length}`);
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export default generateSitemap;

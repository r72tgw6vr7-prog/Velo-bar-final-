/**
 * Sitemap Generator for Programmatic SEO
 * =====================================
 * Generates sitemap entries for all Munich district pages
 * Can be used for static sitemap generation or dynamic sitemap API
 */

import { munichDistricts } from '../data/munich-districts.ts';
import { SITE_URL } from '@/lib/site.ts';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateDistrictSitemapEntries = (): SitemapEntry[] => {
  const baseUrl = SITE_URL;
  const currentDate = new Date().toISOString().split('T')[0];

  return munichDistricts.map((district) => ({
    url: `${baseUrl}/firmenfeieren/${district.slug}`,
    lastmod: currentDate,
    changefreq: 'monthly' as const,
    priority:
      district.seo.searchVolume === 'high'
        ? 0.8
        : district.seo.searchVolume === 'medium'
          ? 0.6
          : 0.4,
  }));
};

export const generateSitemapXML = (entries: SitemapEntry[]): string => {
  const xmlEntries = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
};

// For Next.js API route or similar dynamic generation
export const getSitemapForDistrict = (districtSlug: string): string | null => {
  const district = munichDistricts.find((d) => d.slug === districtSlug);
  if (!district) return null;

  const baseUrl = SITE_URL;
  const currentDate = new Date().toISOString().split('T')[0];

  return generateSitemapXML([
    {
      url: `${baseUrl}/firmenfeieren/${district.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority:
        district.seo.searchVolume === 'high'
          ? 0.8
          : district.seo.searchVolume === 'medium'
            ? 0.6
            : 0.4,
    },
  ]);
};

// Generate robots.txt content
export const generateRobotsTxt = (): string => {
  const districtUrls = munichDistricts
    .map((district) => `${SITE_URL}/firmenfeieren/${district.slug}`)
    .join('\n');

  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /.well-known/

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-districts.xml

# Priority pages for crawling
${districtUrls}`;
};

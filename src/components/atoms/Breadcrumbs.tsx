/**
 * Breadcrumbs Component
 * =====================
 * SEO-friendly breadcrumb navigation with structured data (JSON-LD)
 * Examples:
 * - Home > Firmenfeiern
 * - Home > Firmenfeiern > München
 *
 * Design: Minimal, matches Velo.Bar aesthetic
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Route label mapping for automatic breadcrumb generation
const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/firmenfeiern': 'Firmenfeiern',
  '/weihnachtsfeiern': 'Weihnachtsfeiern',
  '/messe-catering': 'Messe & Promotions',
  '/team-events-workshops': 'Team-Events & Workshops',
  '/private-feiern': 'Private Feiern',
  '/hochzeiten': 'Hochzeiten',
  '/preise': 'Preise',
  '/galerie': 'Galerie',
  '/menu': 'Drinks',
  '/about': 'Über uns',
  '/faq': 'FAQ',
  '/anfrage': 'Anfrage',
  '/impressum': 'Impressum',
  '/datenschutz': 'Datenschutz',
  '/agb': 'AGB',
  '/velobar/buchungmuc': 'München',
  '/velobarco': 'Coburg',
};

// Known safe routes - only these paths are allowed in breadcrumbs
const SAFE_ROUTES = new Set(Object.keys(routeLabels));

function escapeJsonLd(json: unknown): string {
  return JSON.stringify(json)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

function sanitizeBreadcrumbItems(items: BreadcrumbItem[]): BreadcrumbItem[] {
  return items.filter((item) => {
    if (!item) return false;
    if (typeof item.label !== 'string' || typeof item.path !== 'string') return false;
    if (!item.path.startsWith('/')) return false;
    return SAFE_ROUTES.has(item.path);
  });
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current path if not provided
  // Security: Only uses statically defined route labels, never dynamic user input
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

    // Check if current path is a known safe route
    const pathname = location.pathname;
    if (SAFE_ROUTES.has(pathname)) {
      // Use the predefined label (static, not user-controlled)
      crumbs.push({ label: routeLabels[pathname], path: pathname });
    } else {
      // For nested routes, try to match parent paths only
      const segments = pathname.split('/').filter(Boolean);
      let currentPath = '';
      for (const segment of segments) {
        // Only allow alphanumeric and hyphens, max 50 chars
        if (!/^[a-zA-Z0-9-]{1,50}$/.test(segment)) continue;
        currentPath += `/${segment}`;
        if (SAFE_ROUTES.has(currentPath)) {
          crumbs.push({ label: routeLabels[currentPath], path: currentPath });
        }
      }
    }

    return crumbs;
  };

  const breadcrumbs = items ? sanitizeBreadcrumbItems(items) : generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') return null;

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://velo.bar${item.path}`,
    })),
  };

  const jsonLdString = escapeJsonLd(jsonLd);

  return (
    <>
      {/* JSON-LD for SEO */}
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: jsonLdString }} />

      {/* Visual Breadcrumbs */}
      <nav aria-label='Breadcrumb' className={`px-4 py-4 sm:px-6 lg:px-8 ${className}`}>
        <ol className='flex flex-wrap items-center gap-0 text-sm text-gray-500'>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.path} className='flex items-center'>
                {index > 0 && (
                  <ChevronRight
                    size={14}
                    className='mx-0 shrink-0 text-gray-300'
                    aria-hidden='true'
                  />
                )}

                {isLast ? (
                  <span className='font-medium text-gray-900' aria-current='page'>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className='hover:text-accent-primary flex items-center gap-0 transition-colors duration-200'
                  >
                    {isFirst && <Home size={14} className='shrink-0' />}
                    <span className={isFirst ? 'sr-only sm:not-sr-only' : ''}>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;

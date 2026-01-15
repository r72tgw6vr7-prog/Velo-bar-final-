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
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Home from 'lucide-react/dist/esm/icons/home';
import ROUTE_CONFIG from '@/core/constants/routes.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const EXTRA_ROUTE_LABELS: Record<string, { de: string; en: string }> = {
  '/agb': { de: 'AGB', en: 'Terms & Conditions' },
  '/locations': { de: 'Event-Locations', en: 'Event Venues' },
  '/firmenfeieren': { de: 'Firmenfeiern München', en: 'Corporate Events Munich' },
};

const SAFE_ROUTES = new Set([
  ...Object.values(ROUTE_CONFIG).map((config) => config.path),
  ...Object.keys(EXTRA_ROUTE_LABELS),
]);

function getRouteLabel(path: string, language: 'de' | 'en', t: (key: string) => string): string {
  if (path === '/') return t('nav.home');

  const fromConfig = Object.values(ROUTE_CONFIG).find((config) => config.path === path);
  if (fromConfig) return fromConfig.label[language];

  const extra = EXTRA_ROUTE_LABELS[path];
  if (extra) return extra[language];

  return path;
}

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

    if (SAFE_ROUTES.has(item.path)) return true;

    const match = item.path.match(/^\/(locations|firmenfeieren)\/([a-zA-Z0-9-]{1,50})$/);
    if (!match) return false;

    // Programmatic routes (validated by strict regex above)
    return match[1] === 'locations' || match[1] === 'firmenfeieren';
  });
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const { language, t } = useLanguage();

  // Auto-generate breadcrumbs from current path if not provided
  // Security: Only uses statically defined route labels, never dynamic user input
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ label: getRouteLabel('/', language, t), path: '/' }];

    // Check if current path is a known safe route
    const pathname = location.pathname;
    if (SAFE_ROUTES.has(pathname)) {
      // Use the predefined label (static, not user-controlled)
      crumbs.push({ label: getRouteLabel(pathname, language, t), path: pathname });
    } else {
      // For nested routes, try to match parent paths only
      const segments = pathname.split('/').filter(Boolean);
      let currentPath = '';
      for (const segment of segments) {
        // Only allow alphanumeric and hyphens, max 50 chars
        if (!/^[a-zA-Z0-9-]{1,50}$/.test(segment)) continue;
        currentPath += `/${segment}`;
        if (SAFE_ROUTES.has(currentPath)) {
          crumbs.push({ label: getRouteLabel(currentPath, language, t), path: currentPath });
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
      <nav aria-label={t('common.breadcrumbAria')} className={`px-4 py-4 sm:px-6 lg:px-8 ${className}`}>
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

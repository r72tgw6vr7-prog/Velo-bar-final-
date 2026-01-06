/**
 * PageLayout Component
 * ====================
 * Standardized page layout wrapper that includes:
 * - Breadcrumbs navigation (auto-generated or custom)
 * - Consistent spacing and structure
 * - Optional hero section support
 *
 * Use this wrapper for all content pages to ensure consistency.
 */

import React from 'react';
import { Breadcrumbs } from '@/components/atoms/Breadcrumbs';
import { cn } from '@/utils/classname';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  /** Custom breadcrumb items. If not provided, auto-generated from URL */
  breadcrumbs?: BreadcrumbItem[];
  /** Whether to show breadcrumbs (default: true, hidden on home) */
  showBreadcrumbs?: boolean;
  /** Additional class names for the wrapper */
  className?: string;
  /** Background style variant */
  variant?: 'default' | 'light' | 'dark';
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  breadcrumbs,
  showBreadcrumbs = true,
  className = '',
  variant = 'default',
}) => {
  const bgStyles = {
    default: 'bg-navy text-white',
    light: 'bg-navy-light text-white',
    dark: 'bg-navy-dark text-white',
  };

  return (
    <div className={cn('min-h-screen', bgStyles[variant], className)}>
      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <div className='mx-auto max-w-7xl'>
          <Breadcrumbs items={breadcrumbs} className='pt-8' />
        </div>
      )}

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;

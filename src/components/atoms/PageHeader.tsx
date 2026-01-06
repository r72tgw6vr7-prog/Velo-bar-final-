/**
 * PageHeader Component
 * ====================
 * Clean, minimal page header with eyebrow, title, and subtitle
 * Matches the Support Center reference design
 */

import React from 'react';
import { cn } from '@/utils/classname';

export interface PageHeaderProps {
  /** Main page title (h1) */
  title: string;
  /** Optional subtitle text displayed below the title */
  subtitle?: string;
  /** Optional small text displayed above the title (eyebrow) */
  eyebrow?: string;
  /** Text alignment within the header */
  alignment?: 'left' | 'center' | 'right';
  /** Optional additional CSS classes */
  className?: string;
  /** Optional elements to render below the subtitle */
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  alignment = 'center',
  className,
  children,
}: PageHeaderProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const alignClass = alignmentClasses[alignment];

  return (
    <header
      className={cn(
        // 8pt grid: pt-12 (48px mobile), pt-16 (64px tablet), pt-20 (80px desktop)
        // pb-8 (32px) for content separation
        'w-full pt-12 pb-8 md:pt-16 md:pb-10 lg:pt-20 lg:pb-12',
        className,
      )}
    >
      <div className={cn('mx-auto flex max-w-4xl flex-col px-4 sm:px-6 lg:px-8', alignClass)}>
        {eyebrow && (
          // Eyebrow → H1: 8px gap (mb-2)
          <span className='mb-0 text-sm font-semibold text-[rgb(238,120,104)]'>{eyebrow}</span>
        )}

        {/* H1 → Subtitle: 16px gap (mb-4) */}
        <h1 className='mb-8 text-4xl font-bold tracking-tight text-[rgb(0,49,65)] md:text-5xl lg:text-6xl'>
          {title}
        </h1>

        {subtitle && (
          // Subtitle → Content: handled by children spacing
          <p className='max-w-2xl text-lg leading-relaxed text-[rgb(0,30,50)] md:text-xl'>
            {subtitle}
          </p>
        )}

        {/* Children get mt-6 md:mt-8 (24-32px) spacing from parent */}
        {children && <div className='mt-8 md:mt-8'>{children}</div>}
      </div>
    </header>
  );
}

export default PageHeader;

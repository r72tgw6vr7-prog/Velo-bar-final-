/**
 * Grid Atom - Content-Agnostic
 * =============================
 * Flexible grid layout component.
 * No styling bias, purely for layout.
 */

import React from 'react';
import { cn } from '@/utils/classname';

export interface GridCleanProps {
  /** Content to render */
  children: React.ReactNode;
  /** Number of columns (responsive) */
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  /** Gap between grid items */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
}

export const GridClean: React.FC<GridCleanProps> = ({
  children,
  cols = 1,
  gap = 'md',
  className,
}) => {
  const columns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  };

  const gaps = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return <div className={cn('grid', columns[cols], gaps[gap], className)}>{children}</div>;
};

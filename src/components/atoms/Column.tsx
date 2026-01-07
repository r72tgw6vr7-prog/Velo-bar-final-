import React from 'react';
import { cn } from '@/utils/classname.ts';

type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const gapClass: Record<GapSize, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export type ColumnProps = {
  children: React.ReactNode;
  className?: string;
  gap?: GapSize;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
};

export const Column: React.FC<ColumnProps> = ({
  children,
  className,
  gap = 'md',
  align = 'start',
  justify = 'start',
}) => {
  return (
    <div
      className={cn(
        'flex flex-col',
        `items-${align}`,
        `justify-${justify}`,
        gapClass[gap],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Column;

import React from 'react';
import { cn } from '@/utils/classname.ts';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'outline';
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'default', className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        variant === 'primary' && 'bg-accent-primary text-navy-dark',
        variant === 'outline' && 'text-color-text-secondary border border-white/20',
        variant === 'default' && 'text-color-text-secondary bg-white/10',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
);

Tag.displayName = 'Tag';

export default Tag;

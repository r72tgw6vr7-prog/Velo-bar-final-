import React, { ReactNode } from 'react';
import { cn } from '@/utils/classname.ts';

export interface EyebrowBadgeProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * EyebrowBadge
 * ------------
 * Generic pill-shaped badge used above section/hero headings.
 * Uses the unified `.badge-eyebrow` styles defined in `badge.css`.
 */
export const EyebrowBadge: React.FC<EyebrowBadgeProps> = ({ icon, children, className }) => (
  <span className={cn('badge-eyebrow inline-flex items-center', className)}>
    {icon && <span className='badge-eyebrow__icon shrink-0'>{icon}</span>}
    <span className='badge-eyebrow__text leading-none'>{children}</span>
  </span>
);

export default EyebrowBadge;

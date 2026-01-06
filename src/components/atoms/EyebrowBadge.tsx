import React, { ReactNode } from 'react';
import { cn } from '@/utils/classname';

export interface EyebrowBadgeProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * EyebrowBadge
 * ------------
 * Generic pill-shaped badge used above section/hero headings.
 * Re-uses the global `.badge-solid` utility styles so any design
 * tweaks are centralized in `badge.css`.
 */
export const EyebrowBadge: React.FC<EyebrowBadgeProps> = ({ icon, children, className }) => (
  <span className={cn('badge-solid inline-flex items-center justify-center', className)}>
    {icon && <span className='shrink-0'>{icon}</span>}
    <span className='leading-none'>{children}</span>
  </span>
);

export default EyebrowBadge;

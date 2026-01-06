/**
 * FeatureCard Component
 * ====================
 * Reusable feature card component following Velo.Bar brand design system
 * Used for "Warum Velo.Bar?" section and other feature displays
 */

import React from 'react';
import { cn } from '@/utils/classname';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className = '',
}) => {
  return (
    <div
      className={cn(
        // Brand color surface: solid white-cream (no gradient)
        'bg-surface-muted',

        // Brand border: 2px solid coral-orange
        'border-accent border-2',

        // Rounded corners and consistent padding
        'rounded-3xl', // 24px border radius using Tailwind class
        'p-6', // 24px padding on mobile
        'md:p-8', // 32px padding on desktop

        // Subtle shadow and hover effects
        'shadow-lg',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-xl',

        // Ensure proper content layout
        'flex h-full flex-col',

        className,
      )}
    >
      {/* Icon area with coral brand color */}
      <div className='border-accent bg-surface-muted mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2'>
        {React.cloneElement(icon as React.ReactElement, {
          size: 24,
          className: 'text-accent', // Coral icon color
        })}
      </div>

      {/* Card title: coral-orange brand color */}
      <h3 className='text-accent mb-4 text-xl font-bold md:text-2xl'>{title}</h3>

      {/* Body text: dark tea color (high contrast on white-cream) */}
      <p className='text-brand leading-relaxed'>{description}</p>
    </div>
  );
};

export default FeatureCard;

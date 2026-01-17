import React from 'react';
import { cn } from '@/utils/classname.ts';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge.tsx';

export interface HeroHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const HeroHeading: React.FC<HeroHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}) => {
  return (
    <header
      className={cn(
        // Match PageHeader spacing for vertical rhythm
        'w-full pt-12 pb-8 md:pt-16 md:pb-10 lg:pt-20 lg:pb-12',
        className,
      )}
    >
      <div className='mx-auto flex max-w-4xl px-4 text-center sm:px-6 lg:px-8'>
        <div className='flex w-full flex-col items-center gap-4'>
          {/* Eyebrow badge */}
          {eyebrow && (
            <EyebrowBadge>{eyebrow}</EyebrowBadge>
          )}

          {/* Main title */}
          <h1
            className={cn(
              'text-3xl font-bold text-accent-primary md:text-5xl lg:text-6xl',
              titleClassName,
            )}
          >
            {title}
          </h1>

          {/* Optional subtitle */}
          {subtitle && (
            <p
              className={cn(
                'max-w-2xl text-base font-bold text-white/90 md:text-lg',
                subtitleClassName,
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroHeading;

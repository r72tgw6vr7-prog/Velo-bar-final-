import React from 'react';
import { cn } from '@/utils/classname.ts';

export interface HeroHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
}

export const HeroHeading: React.FC<HeroHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  className,
  titleClassName,
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
            <div className='inline-flex items-center rounded-full bg-[rgba(255,248,236,0.95)] px-6 py-2 shadow-sm'>
              <span className='text-sm font-semibold tracking-wide text-[rgb(238,120,104)]'>
                {eyebrow}
              </span>
            </div>
          )}

          {/* Main title */}
          <h1
            className={cn(
              'text-3xl font-bold text-[rgb(238,120,104)] md:text-5xl lg:text-6xl',
              titleClassName,
            )}
          >
            {title}
          </h1>

          {/* Optional subtitle */}
          {subtitle && (
            <p className='max-w-2xl text-base font-bold text-[rgb(255,248,236)] md:text-lg'>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroHeading;

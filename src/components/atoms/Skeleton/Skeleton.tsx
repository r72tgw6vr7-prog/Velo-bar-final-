/**
 * Skeleton Component
 * ==================
 * Loading placeholder with smooth shimmer animation
 * Uses brand colors for consistent loading states
 */

import React from 'react';
import { cn } from '@/utils/classname';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'card';

export interface SkeletonProps {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Width (CSS value or Tailwind class) */
  width?: string;
  /** Height (CSS value or Tailwind class) */
  height?: string;
  /** Additional classes */
  className?: string;
  /** Number of text lines (for text variant) */
  lines?: number;
  /** Animation enabled */
  animate?: boolean;
}

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-lg',
  card: 'rounded-xl',
};

/**
 * Skeleton - Polished loading placeholder
 */
export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className = '',
  lines = 1,
  animate = true,
}: SkeletonProps) {
  const baseClasses = cn(
    'bg-gradient-to-r from-navy-light via-navy to-navy-light',
    'bg-[length:200%_100%]',
    animate && 'animate-pulse',
    VARIANT_CLASSES[variant],
  );

  // For text variant with multiple lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              // Last line is shorter for natural look
              i === lines - 1 ? 'w-3/4' : 'w-full',
            )}
            style={{ height: height || '16px' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, className)}
      style={{
        width: width || '100%',
        height: height || (variant === 'circular' ? width : '100%'),
      }}
    />
  );
}

/**
 * SkeletonCard - Pre-built card skeleton
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={cn('bg-navy-light/50 rounded-xl border border-white/10 p-8', className)}>
      <Skeleton variant='rectangular' height='160px' className='mb-8' />
      <Skeleton variant='text' width='60%' className='mb-0' />
      <Skeleton variant='text' lines={2} className='mb-8' />
      <Skeleton variant='rectangular' width='120px' height='40px' />
    </div>
  );
}

/**
 * SkeletonAvatar - Circular avatar placeholder
 */
export function SkeletonAvatar({ size = '48px' }: { size?: string }) {
  return <Skeleton variant='circular' width={size} height={size} />;
}

/**
 * SkeletonButton - Button placeholder
 */
export function SkeletonButton({ width = '120px' }: { width?: string }) {
  return <Skeleton variant='rectangular' width={width} height='44px' className='rounded-lg' />;
}

export default Skeleton;

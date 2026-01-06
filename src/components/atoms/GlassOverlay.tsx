/**
 * GlassOverlay Component
 * =====================
 * Provides a consistent glass/frosted overlay effect for sections with cosmic nebula background.
 * Matches the hero section's aesthetic with subtle gradients and blur effects.
 *
 * Usage:
 * <Section className="relative">
 *   <GlassOverlay />
 *   <div className="relative z-10">
 *     {content}
 *   </div>
 * </Section>
 */

import React from 'react';
import { cn } from '@/utils/classname';

export interface GlassOverlayProps {
  /** Additional CSS classes */
  className?: string;
  /** Intensity of the effect: 'subtle' | 'normal' | 'strong' */
  intensity?: 'subtle' | 'normal' | 'strong';
}

export function GlassOverlay({ className, intensity = 'normal' }: GlassOverlayProps) {
  const intensityClasses = {
    subtle: 'bg-navy-dark',
    normal: 'bg-navy-dark',
    strong: 'bg-navy-dark',
  };

  return (
    <div className={cn('pointer-events-none absolute inset-0 z-1', className)}>
      {/* Gradient overlay - darkens from top */}
      <div className={cn('absolute inset-0', 'bg-navy-dark', intensityClasses[intensity])} />

      {/* Glass blur effect - subtle frosted glass */}
      <div className='bg-navy-dark absolute inset-0' />

      {/* Silver chrome accent glow - matches hero aesthetic */}
      <div className='brand-glow-dual absolute inset-0' />
    </div>
  );
}

export default GlassOverlay;

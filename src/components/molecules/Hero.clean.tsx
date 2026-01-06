/**
 * @deprecated This component is no longer used for hero sections. Use HeroLocked from @/sections/HeroLocked instead.
 * See docs/HERO_AND_APP_WIRING.md for the canonical hero system.
 *
 * Hero Molecule - Content-Agnostic
 * =================================
 * Empty hero section that accepts any content via children.
 * Status: DEPRECATED - Available in design system but not used for active hero implementations.
 */

import React from 'react';
import { cn } from '@/utils/classname';
import { SectionClean } from '../atoms/Section.clean';
import { Container } from '../atoms/Container/Container';

export interface HeroCleanProps {
  /** Content to render inside the hero */
  children: React.ReactNode;
  /** Background image URL (optional) */
  backgroundImage?: string;
  /** Minimum height */
  minHeight?: 'sm' | 'md' | 'lg' | 'full';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Container max width */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Additional CSS classes */
  className?: string;
}

export const HeroClean: React.FC<HeroCleanProps> = ({
  children,
  backgroundImage,
  minHeight = 'lg',
  align = 'center',
  maxWidth = 'lg',
  className,
}) => {
  const heights = {
    sm: 'min-h-[50vh]',
    md: 'min-h-[75vh]',
    lg: 'min-h-[85vh]',
    full: 'min-h-screen',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const sizeMap: Record<
    NonNullable<HeroCleanProps['maxWidth']>,
    'sm' | 'md' | 'default' | 'wide'
  > = {
    sm: 'sm',
    md: 'md',
    lg: 'default',
    xl: 'wide',
    '2xl': 'wide',
    full: 'wide',
  };

  return (
    <SectionClean
      spacing='xl'
      className={cn(heights[minHeight], 'relative flex items-center', className)}
    >
      {backgroundImage && (
        <>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className='bg-color-background-darker absolute inset-0 opacity-60' />
        </>
      )}
      <Container size={sizeMap[maxWidth]} className={cn('relative z-10', alignments[align])}>
        <div className='space-y-8'>{children}</div>
      </Container>
    </SectionClean>
  );
};

/**
 * Section Atom - Content-Agnostic
 * ================================
 * Semantic section wrapper with spacing control.
 * No content hardcoded.
 */

import React from 'react';
import { Section } from './Section/Section.ts';

export interface SectionCleanProps {
  /** Content to render */
  children: React.ReactNode;
  /** Vertical spacing */
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Background variant */
  background?: 'transparent' | 'default' | 'elevated' | 'darker';
  /** Additional CSS classes */
  className?: string;
  /** Section ID for anchor links */
  id?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

export const SectionClean: React.FC<SectionCleanProps> = ({
  children,
  spacing = 'md',
  background = 'transparent',
  className,
  id,
  ariaLabel,
}) => {
  const spacingMap = {
    none: 'none',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  } as const;

  const backgroundMap = {
    transparent: 'transparent',
    default: 'default',
    elevated: 'glass',
    darker: 'darker',
  } as const;

  return (
    <Section
      id={id}
      ariaLabel={ariaLabel}
      spacing={spacingMap[spacing]}
      background={backgroundMap[background]}
      container='default'
      className={className}
    >
      {children}
    </Section>
  );
};

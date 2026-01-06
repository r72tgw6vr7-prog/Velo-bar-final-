/**
 * Heading Atom - Content-Agnostic
 * ================================
 * Semantic heading component with no hardcoded text.
 * Supports all HTML heading levels (h1-h6).
 */

import React from 'react';
import { cn } from '@/utils/classname';

export interface HeadingProps {
  /** Heading level (h1-h6) */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Content to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Visual size (independent from semantic level) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** ID for anchor links */
  id?: string;
  /** Color variant - use 'accent' for orange emphasis */
  variant?: 'default' | 'accent' | 'white' | 'muted';
}

export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  children,
  className,
  size,
  align = 'left',
  id,
  variant = 'default',
}) => {
  const Tag = level;

  // Default sizes based on semantic level if size not specified
  const defaultSizes = {
    h1: 'text-4xl md:text-5xl lg:text-6xl',
    h2: 'text-3xl md:text-4xl lg:text-5xl',
    h3: 'text-2xl md:text-3xl lg:text-4xl',
    h4: 'text-xl md:text-2xl lg:text-3xl',
    h5: 'text-lg md:text-xl lg:text-2xl',
    h6: 'text-base md:text-lg lg:text-xl',
  };

  // Custom size overrides
  const customSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const colorVariants = {
    default: 'text-color-text-primary',
    accent: 'text-accent',
    white: 'text-white',
    muted: 'text-color-text-secondary',
  };

  return (
    <Tag
      id={id}
      className={cn(
        'font-headline',
        colorVariants[variant],
        size ? customSizes[size] : defaultSizes[level],
        alignmentClasses[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
};

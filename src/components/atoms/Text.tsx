/**
 * Text Atom - Content-Agnostic
 * =============================
 * Generic text component for body copy and paragraphs.
 * No hardcoded content.
 */

import React from 'react';
import { cn } from '@/utils/classname';

export interface TextProps {
  /** Content to render */
  children: React.ReactNode;
  /** HTML element to render */
  as?: 'p' | 'span' | 'div' | 'label';
  /** Text size */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  /** Text weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text color variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'inverse';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Additional CSS classes */
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  as: Tag = 'p',
  size = 'base',
  weight = 'normal',
  variant = 'primary',
  align = 'left',
  className,
}) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const variants = {
    primary: 'text-[var(--color-text-primary)]',
    secondary: 'text-[var(--color-text-secondary)]',
    tertiary: 'text-[var(--color-text-tertiary)]',
    inverse: 'text-[var(--color-text-inverse)]',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  return (
    <Tag
      className={cn(
        'font-body',
        sizes[size],
        weights[weight],
        variants[variant],
        alignments[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
};

/**
 * Card Molecule - Content-Agnostic
 * =================================
 * Generic card component for any content.
 * No hardcoded text or styling bias.
 */

import React from 'react';
import { cn } from '@/utils/classname';

export interface CardCleanProps {
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether to show border */
  bordered?: boolean;
  /** Whether to show shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether to show hover effect */
  hoverable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export const CardClean: React.FC<CardCleanProps> = ({
  children,
  padding = 'md',
  bordered = true,
  shadow = 'sm',
  hoverable = false,
  onClick,
  className,
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
  };

  const shadows = {
    none: 'u-elevation-0',
    sm: 'u-elevation-1',
    md: 'u-elevation-2',
    lg: 'u-elevation-3',
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        'bg-color-background-elevated rounded-lg',
        bordered && 'border-color-border-subtle border',
        paddings[padding],
        shadows[shadow],
        hoverable && 'card',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
};

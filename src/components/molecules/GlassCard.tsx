/**
 * GlassCard Component
 * ===================
 * Glassmorphic card that floats on the cosmic background.
 * Replaces all standard cards with glass aesthetic.
 */

import React from 'react';
import { cn } from '@/utils/classname';
import '@/styles/glassmorphism.css';

export interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'light' | 'heavy';
  interactive?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  interactive = false,
  glow = false,
  padding = 'lg',
  className,
  onClick,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
    xl: 'p-16',
  };

  const variantClasses = {
    default: 'card card--brand',
    light: 'card card--brand',
    heavy: 'card card--featured',
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
        variantClasses[variant],
        paddingClasses[padding],
        interactive && 'glass-card-interactive',
        glow && 'cosmic-glow',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;

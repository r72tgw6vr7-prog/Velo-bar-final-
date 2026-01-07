/**
 * GlassButton Component
 * =====================
 * Button with glassmorphic effect for cosmic theme
 */

import React from 'react';
import { cn } from '@/utils/classname.ts';
import '@/styles/glassmorphism.css';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  glow?: boolean;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      fullWidth = false,
      glow = false,
      className,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm min-h-[36px]',
      md: 'px-8 py-2 text-base min-h-[44px]',
      lg: 'px-12 py-4 text-lg min-h-[52px]',
    };

    const variantClasses = {
      default: 'glass-button',
      primary: 'glass-button-primary',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg font-medium transition-all duration-200',
          'focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          glow && 'cosmic-glow',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;

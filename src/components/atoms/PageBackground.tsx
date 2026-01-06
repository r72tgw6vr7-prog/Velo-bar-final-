/**
 * PageBackground Component
 * =====================
 * A simple content wrapper for pages.
 * The animated gradient background is now rendered ONCE at root level (main.tsx).
 * This component just provides consistent layout and z-index for page content.
 */

import React from 'react';

import { cn } from '@/utils/classname';

interface PageBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullHeight?: boolean;
  withGlow?: boolean;
  backgroundOnly?: boolean;
}

export const PageBackground = ({
  children,
  className,
  fullHeight = true,
  withGlow = false,
  backgroundOnly: _backgroundOnly,
  ...props
}: PageBackgroundProps) => {
  return (
    <div
      {...props}
      className={cn(
        'relative w-full',
        fullHeight && 'min-h-screen',
        withGlow && 'bg-glow',
        className,
      )}
    >
      {children}
    </div>
  );
};

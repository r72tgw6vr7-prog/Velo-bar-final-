/**
 * Container Component
 * ================
 * A design-system-compliant container for page layout.
 *
 * Features:
 * - Consistent max-width based on design tokens
 * - Responsive horizontal padding
 * - Size variants (default, wide, narrow)
 * - Fluid option for full-width content
 * - Customizable element type
 * - Container query support
 */

import React from 'react';
import { cn } from '@/utils/classname.ts';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ContainerType } from '@/types/container.ts';

// Define the container variants for consistent sizing
const containerVariants = cva(
  // Base styles
  'relative w-full mx-auto',
  {
    variants: {
      size: {
        default: 'max-w-7xl', // 1280px
        wide: 'max-w-screen-2xl', // 1536px
        narrow: 'max-w-5xl', // 1024px
        md: 'max-w-6xl', // 1152px - for compatibility
        lg: 'max-w-7xl', // 1280px - same as default, for compatibility
        sm: 'max-w-4xl', // 896px - for compatibility
      },
      padding: {
        default: 'px-4 sm:px-6 lg:px-8', // Responsive padding
        none: 'px-0', // No padding
      },
    },
    defaultVariants: {
      size: 'default',
      padding: 'default',
    },
  },
);

export interface ContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'as'>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode;
  as?: React.ElementType; // Changed to React.ElementType for broader compatibility
  fluid?: boolean;
  containerType?: ContainerType;
  containerName?: string;
}

export function Container({
  children,
  className,
  size = 'default',
  padding,
  as: Component = 'div',
  fluid = false,
  containerType,
  containerName,
  ...props
}: ContainerProps) {
  // Create custom style object that properly handles container query properties
  const styleObject: React.CSSProperties & Record<string, string> = {};

  // Only add container query properties if specified
  if (containerType) {
    styleObject['container-type'] = containerType as unknown as string;
  }

  if (containerName) {
    styleObject['container-name'] = containerName as unknown as string;
  }

  return (
    <Component
      className={cn(
        containerVariants({
          size,
          padding: fluid ? 'none' : padding,
        }),
        className,
      )}
      style={styleObject}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;

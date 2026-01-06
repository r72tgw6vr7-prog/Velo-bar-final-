import React, { forwardRef, ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

interface VisuallyHiddenProps extends ComponentPropsWithoutRef<'span'> {
  /** The content to be visually hidden but accessible to screen readers */
  children: ReactNode;
  /** The HTML element to render (defaults to 'span') */
  as?: ElementType;
  /** Additional CSS classes */
  className?: string;
}

/**
 * VisuallyHidden component that hides content visually but keeps it accessible to screen readers
 *
 * @example
 * // Basic usage
 * <VisuallyHidden>This text is hidden but read by screen readers</VisuallyHidden>
 *
 * @example
 * // With custom element
 * <VisuallyHidden as="div">Hidden div content</VisuallyHidden>
 */
export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ as: Component = 'span', children, className = '', ...props }, ref) => {
    return (
      <Component ref={ref} className={`sr-only ${className}`} {...props}>
        {children}
      </Component>
    );
  },
);

VisuallyHidden.displayName = 'VisuallyHidden';

export default VisuallyHidden;

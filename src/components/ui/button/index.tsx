/**
 * Button Component (UI Layer)
 * ==========================
 *
 * Legacy-compatible button wrapper that maps old variant names to new design system.
 * Provides backward compatibility while using the atomic Button component internally.
 *
 * Variant Mapping:
 * - 'accent' → 'primary' (orange background)
 * - 'outlineAccent' → 'secondary' (outlined orange)
 * - 'primary', 'secondary', 'tertiary' → direct mapping
 *
 * Size Mapping:
 * - 'lg' → 56px height, 18px font, 16px/28px padding
 * - 'md' → 48px height, 16px font, 12px/22px padding
 * - undefined → default atom button sizing
 *
 * @example
 * ```tsx
 * <Button variant="accent" size="lg" onClick={handleClick}>
 *   Click Me (orange button)
 * </Button>
 * ```
 *
 * @component
 * @category UI
 */

import React from 'react';
import AtomButton from '../../atoms/Button/Button.ts';

/** Legacy variant names for backward compatibility */
export type LegacyVariant = 'accent' | 'outlineAccent' | 'primary' | 'secondary' | 'tertiary';

/** Legacy size names for backward compatibility */
export type LegacySize = 'lg' | 'md' | undefined;

/**
 * Button props extending atomic Button with legacy variants
 * @interface UIButtonProps
 */
export type UIButtonProps = Omit<
  React.ComponentProps<typeof AtomButton>,
  'variant' | 'style' | 'className'
> & {
  variant?: LegacyVariant;
  size?: LegacySize;

  /** Support Radix-style `asChild` prop used throughout the codebase */
  asChild?: boolean;

  className?: string;
  style?: React.CSSProperties;
};

export const Button = React.forwardRef<HTMLButtonElement, UIButtonProps>(
  ({ variant = 'primary', size, className = '', style, ...props }, ref) => {
    const mappedVariant: 'primary' | 'secondary' | 'tertiary' =
      variant === 'accent'
        ? 'primary'
        : variant === 'outlineAccent'
          ? 'secondary'
          : (variant as 'primary' | 'secondary' | 'tertiary');

    // Translate legacy size prop to padding/height/font-size tweaks
    // Using 8pt grid values: 16px, 24px, 32px, 48px, 64px
    const sizeStyles: React.CSSProperties =
      size === 'lg'
        ? { padding: '16px 32px', height: '64px', fontSize: '18px' } // 8pt grid: was 16px 28px, 56px
        : size === 'md'
          ? { padding: '16px 24px', height: '48px', fontSize: '16px' } // 8pt grid: was 12px 22px
          : {};

    const mergedStyle: React.CSSProperties = { ...sizeStyles, ...style };

    return (
      <AtomButton
        ref={ref}
        variant={mappedVariant}
        style={mergedStyle}
        className={className}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;

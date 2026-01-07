import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/classname.ts';
import { Slot } from '@radix-ui/react-slot';
import Spinner from '../Spinner.tsx';

type WithClassName = { className?: string; children?: React.ReactNode };

/**
 * Button Component
 * ================
 * Clean, minimal button design with rounded pill shape
 * Variants: default (outlined), primary (filled), ghost (text only)
 */

const buttonVariants = cva(
  // Base styles - clean rounded pill buttons
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden',
    'micro-transition text-center',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accessible focus-visible:outline-offset-2 focus-visible:shadow-[0_0_0_2px_#000000]',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        // Default: outlined on dark canvas
        default: [
          'bg-(--surface-card) border border-color-accent-primary text-color-text-on-light',
          'hover:bg-(--surface-card-subtle) hover:border-color-accent-primary-hover',
        ],
        // Outline: White outline (Dark mode secondary)
        outline: [
          'bg-(--surface-card) border border-color-accent-primary !text-color-text-on-light',
          'hover:bg-(--surface-card-subtle) hover:border-color-accent-primary-hover',
        ],
        // Outline Dark: Dark outline (Light mode secondary)
        'outline-dark': [
          'bg-[#fff8ec] border-2 border-[#003141] text-[#003141]',
          'hover:bg-[#003141] hover:text-[#fff8ec] hover:border-[#003141]',
        ],
        // Inverse: Cream filled (for colored backgrounds)
        inverse: [
          'bg-[#fff8ec] border border-[#fff8ec] text-[#003141]',
          'hover:bg-[#003141] hover:border-[#003141] hover:text-[#fff8ec]',
        ],
        // Primary: Dark teal filled (global primary CTA)
        primary: [
          'bg-[#003141] border border-[#003141] text-[#fff8ec]',
          'hover:bg-[#002635] hover:border-[#002635] hover:text-[#fff8ec]',
          'shadow-brand-sm hover:shadow-brand-md',
        ],
        coral: [
          'bg-[#ee7868] border border-[#ee7868] text-[#fff8ec]',
          'hover:bg-[#f08b7d] hover:border-[#f08b7d] hover:text-[#fff8ec]',
          'shadow-brand-sm hover:shadow-brand-md',
        ],
        // Secondary: White Outline (Universal secondary - best on dark)
        secondary: [
          'bg-(--surface-card) border border-color-accent-primary !text-color-text-on-light',
          'hover:bg-(--surface-card-subtle) hover:border-color-accent-primary-hover',
        ],
        // Ghost: No border, transparent (Contextual text color)
        ghost: ['bg-(--surface-card-subtle) text-color-text-on-light', 'hover:bg-(--surface-card)'],
        // Tertiary: Subtle text button
        tertiary: [
          'bg-(--surface-card-subtle) text-color-text-on-light',
          'hover:bg-(--surface-card) hover:text-color-text-on-light',
        ],
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        icon: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Support Radix-style `asChild` used throughout the codebase (typed here, stripped before DOM spread) */
  asChild?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end' | 'left' | 'right';
}

const getTokenDrivenButtonStyle = (
  size: ButtonProps['size'],
  variant: ButtonProps['variant'],
  fullWidth: boolean,
  style: React.CSSProperties | undefined,
): React.CSSProperties => {
  const resolvedSize = size ?? 'md';
  const resolvedVariant = variant ?? 'default';

  const height =
    resolvedSize === 'sm'
      ? 'var(--button-height-sm)'
      : resolvedSize === 'lg'
        ? 'var(--button-height-lg)'
        : 'var(--button-height-md)';

  const padding =
    resolvedSize === 'sm'
      ? 'var(--button-padding-sm)'
      : resolvedSize === 'lg'
        ? 'var(--button-padding-lg)'
        : 'var(--button-padding-md)';

  const borderRadius =
    resolvedVariant === 'primary' || resolvedVariant === 'inverse'
      ? 'var(--button-radius-primary)'
      : 'var(--button-radius-secondary)';

  const fontSize =
    resolvedSize === 'sm' ? '14px' : resolvedSize === 'lg' ? '18px' : 'var(--button-font-size)';

  const fontWeight = 'var(--button-font-weight)';
  const lineHeight = 'var(--button-line-height)';

  const base: React.CSSProperties = {
    height,
    padding,
    borderRadius,
    fontSize,
    fontWeight: fontWeight as unknown as React.CSSProperties['fontWeight'],
    lineHeight,
    width: fullWidth ? '100%' : undefined,
  };

  if (resolvedSize === 'icon') {
    return {
      ...base,
      height: 'var(--button-height-sm)',
      width: 'var(--button-height-sm)',
      padding: 0,
      ...style,
    };
  }

  return {
    ...base,
    ...style,
  };
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      icon,
      iconPosition = 'end',
      asChild: _asChild = false,
      style,
      ...props
    },
    ref,
  ) => {
    const isIconStart = iconPosition === 'start' || iconPosition === 'left';
    const isIconEnd = iconPosition === 'end' || iconPosition === 'right';
    const Comp = _asChild ? Slot : 'button';
    const buttonSpecificProps = !_asChild
      ? {
          disabled: Boolean(disabled || isLoading),
          type: (props.type ?? 'button') as React.ButtonHTMLAttributes<HTMLButtonElement>['type'],
        }
      : {};

    // If using asChild and the child is a single React element, clone it and merge props
    if (_asChild && React.isValidElement(children)) {
      const child = React.Children.only(children) as React.ReactElement;
      const mergedClassName = cn(
        buttonVariants({ variant, size }),
        className,
        // preserve child's className
        (child.props as WithClassName | undefined)?.className,
      );

      const mergedStyle = getTokenDrivenButtonStyle(size, variant, fullWidth, style);

      const childProps = {
        ...buttonSpecificProps,
        ...props,
        className: mergedClassName,
        style: mergedStyle,
        ref,
      } as Partial<typeof child.props> & React.Attributes;

      return React.cloneElement(
        child,
        childProps,
        <>
          {isLoading && <Spinner size={16} stroke={2} />}
          {icon && isIconStart && !isLoading && (
            <span className='button-icon inline-flex items-center'>{icon}</span>
          )}
          {child.props.children}
          {icon && isIconEnd && !isLoading && (
            <span className='button-icon inline-flex items-center'>{icon}</span>
          )}
        </>,
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={getTokenDrivenButtonStyle(size, variant, fullWidth, style)}
        {...(buttonSpecificProps as unknown as React.ComponentPropsWithoutRef<'button'>)}
        {...props}
      >
        {isLoading && <Spinner size={16} stroke={2} />}
        {icon && isIconStart && !isLoading && (
          <span className='button-icon inline-flex items-center'>{icon}</span>
        )}
        {children}
        {icon && isIconEnd && !isLoading && (
          <span className='button-icon inline-flex items-center'>{icon}</span>
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { buttonVariants };
export default Button;

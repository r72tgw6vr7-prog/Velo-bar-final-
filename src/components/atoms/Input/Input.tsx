/**
 * Input Component
 * ==============
 * A comprehensive design-system-compliant input component.
 *
 * Features:
 * - Full accessibility support
 * - Icon support (left or right)
 * - Validation states (error, success)
 * - Helper text
 * - Label support
 * - Consistent styling with design tokens
 * - Custom styles via className
 * - Required field indicator
 * - Dark/light theme support
 *
 * Usage:
 * <Input
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 *   icon={<MailIcon />}
 *   iconPosition="left"
 *   error="Please enter a valid email"
 * />
 */

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
// Comment out for now, but will use design tokens in a real implementation
// import { designTokens } from '../../../design-tokens.ts';

// =================================================
// Types
// =================================================

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined' | 'ghost';
export type IconPosition = 'left' | 'right';
export type ValidationState = 'default' | 'error' | 'success';
export type InputColorScheme = 'dark' | 'light';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Unique ID for the input element (required for accessibility) */
  id: string;

  /** Input label displayed above the input */
  label?: string;

  /** Error message shown below the input when in error state */
  error?: string;

  /** Helper text shown below the input */
  helper?: string;

  /** Icon to display within the input */
  icon?: React.ReactNode;

  /** Position of the icon within the input */
  iconPosition?: IconPosition;

  /** Whether the input should take up the full width of its container */
  fullWidth?: boolean;

  /** Input size variant */
  size?: InputSize;

  /** Input appearance variant */
  variant?: InputVariant;

  /** Current validation state */
  validationState?: ValidationState;

  /** Color scheme */
  colorScheme?: InputColorScheme;

  /** Whether the field is required */
  required?: boolean;

  /** Custom class name for the input wrapper */
  wrapperClassName?: string;

  /** Custom class name for the input element */
  inputClassName?: string;

  /** Custom class name for the label */
  labelClassName?: string;
}

// =================================================
// Main Component
// =================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      helper,
      icon,
      iconPosition = 'left',
      fullWidth = true,
      size = 'md',
      variant = 'default',
      validationState = error ? 'error' : 'default',
      colorScheme = 'dark',
      required = false,
      className = '',
      wrapperClassName = '',
      inputClassName = '',
      labelClassName = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // =================================================
    // CSS Class Composition
    // =================================================

    // Container/wrapper styles
    const containerClasses = [
      'flex flex-col',
      fullWidth ? 'w-full' : 'w-auto',
      wrapperClassName,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Size-based classes
    const sizeClasses = {
      sm: 'px-2 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-4 py-4 text-lg',
    };

    // Variant-specific classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'outlined':
          return 'bg-transparent border-2';
        case 'filled':
          return colorScheme === 'dark'
            ? 'bg-color-bg-dark border border-color-border-on-dark'
            : 'bg-color-bg-light border border-color-border-on-light';
        case 'ghost':
          return 'bg-transparent border-b';
        case 'default':
          return colorScheme === 'dark'
            ? 'bg-color-bg-dark border border-color-border-on-dark'
            : 'bg-color-bg-light border border-color-border-on-light';
        default:
          return colorScheme === 'dark'
            ? 'bg-color-bg-dark border border-color-border-on-dark'
            : 'bg-color-bg-light border border-color-border-on-light';
      }
    };

    // Validation state classes
    const getValidationClasses = () => {
      switch (validationState) {
        case 'error':
          return 'border-red-500 focus:ring-red-500';
        case 'success':
          return 'border-green-500 focus:ring-green-500';
        default:
          return isFocused ? 'border-accent-primary focus:ring-accent-primary' : '';
      }
    };

    // Input field classes
    const inputClasses = [
      // Base styles
      'w-full outline-none rounded-md transition duration-200 ease-out',

      // Size variant
      sizeClasses[size],

      // Icon padding adjustment
      icon && iconPosition === 'left' ? 'pl-10' : '',
      icon && iconPosition === 'right' ? 'pr-10' : '',

      // Appearance variant
      getVariantClasses(),

      // Validation state
      getValidationClasses(),

      // Focus styles
      'focus:outline-none focus:ring-2 focus:ring-opacity-50',

      // Color scheme (text & placeholder)
      colorScheme === 'dark'
        ? 'text-color-text-on-dark placeholder:text-color-text-on-dark-tertiary'
        : 'text-color-text-on-light placeholder:text-color-text-on-light-tertiary',

      // Disabled state
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-color-accent-primary/50',

      // Custom classes
      inputClassName,
    ]
      .filter(Boolean)
      .join(' ');

    // Label classes
    const labelClasses = [
      'mb-2 font-medium',
      colorScheme === 'dark'
        ? 'text-color-text-on-dark-secondary'
        : 'text-color-text-on-light-secondary',
      labelClassName,
    ]
      .filter(Boolean)
      .join(' ');

    // Helper/error text classes
    const helperClasses = [
      'mt-1 text-sm',
      validationState === 'error'
        ? 'text-color-error-red'
        : colorScheme === 'dark'
          ? 'text-color-text-on-dark-tertiary'
          : 'text-color-text-on-light-tertiary',
    ]
      .filter(Boolean)
      .join(' ');

    // Icon container classes
    const iconContainerClasses = [
      'absolute top-1/2 transform -translate-y-1/2 pointer-events-none',
      iconPosition === 'left' ? 'left-3' : 'right-3',
      colorScheme === 'dark'
        ? 'text-color-text-on-dark-tertiary'
        : 'text-color-text-on-light-tertiary',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && <span className='text-color-error-red ml-0'>*</span>}
          </label>
        )}

        {/* Input container with relative positioning for the icon */}
        <div className='relative'>
          {/* Icon (left) */}
          {icon && iconPosition === 'left' && <div className={iconContainerClasses}>{icon}</div>}

          {/* Input element */}
          <input
            ref={ref}
            id={id}
            className={inputClasses}
            aria-invalid={validationState === 'error' ? 'true' : 'false'}
            aria-required={required ? 'true' : 'false'}
            aria-describedby={error && validationState === 'error' ? `${id}-error` : undefined}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* Icon (right) */}
          {icon && iconPosition === 'right' && <div className={iconContainerClasses}>{icon}</div>}
        </div>

        {/* Error or helper text */}
        {(error || helper) && (
          <div
            className={helperClasses}
            id={error && validationState === 'error' ? `${id}-error` : undefined}
          >
            {error && validationState === 'error' ? error : helper}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;

/**
 * Select Component
 * =============
 * Standardized select dropdown with label and placeholder support
 */

import React from 'react';
import { cn } from '../../utils/classname.ts';

/**
 * Select component using design tokens for styling.
 *
 * Uses brand colors, spacing, typography, and border styling from design system.
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Label text displayed above the select */
  label?: string;
  /** HTML id for the select element */
  id?: string;
  /** Placeholder text displayed when no option is selected */
  placeholder?: string;
}

export interface SelectOption {
  /** Value for the select option */
  value: string;
  /** Label text for the select option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export function Select({ label, id, placeholder, className = '', children, ...rest }: SelectProps) {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={id} className={cn('mb-1 block', 'text-text-primary', 'font-body text-sm')}>
          {label}
          {rest.required && <span className='text-brand-primary ml-0'>*</span>}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'min-h-10 w-full',
          'px-4 py-2',
          'bg-deep-black',
          'border-color-text-tertiary border',
          'rounded-md',
          'text-brand-white text-base',
          'placeholder:text-color-text-tertiary',
          'font-body',
          'focus:border-brand-primary focus:outline-none',
          'focus:shadow-shadow-primary-glow',
          'hover:border-brand-primary-50',
          'transition duration-300 ease-out',
        )}
        {...rest}
      >
        {placeholder && (
          <option value='' disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
}

export default Select;

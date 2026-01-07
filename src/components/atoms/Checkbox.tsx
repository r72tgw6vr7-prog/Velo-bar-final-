/**
 * Checkbox Component
 * =================
 * Standardized checkbox with label and error support
 */

import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/classname.ts';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text for the checkbox */
  label: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display when there is no error */
  helper?: string;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Custom class names for the container */
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helper,
  id,
  className,
  required,
  ...rest
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className='flex items-start gap-0'>
        <div className='relative flex items-center'>
          <input
            type='checkbox'
            id={checkboxId}
            className={cn(
              'h-5 w-5',
              'rounded border',
              'bg-transparent',
              'text-accent-primary',
              'border-muted',
              'focus:ring-accent-primary/20',
              'focus:ring-offset-0',
              'checked:bg-accent-primary',
              'checked:border-accent-primary',
              'transition-colors duration-200',
              error ? 'border-red-500' : '',
            )}
            required={required}
            {...rest}
          />
        </div>

        <label
          htmlFor={checkboxId}
          className={cn(
            'font-body text-sm',
            'text-(--color-text-on-dark-secondary)',
            'leading-tight',
          )}
        >
          {label}
          {required && <span className='text-accent-primary ml-0'>*</span>}
        </label>
      </div>

      {error && <span className={cn('mt-1 text-xs', 'text-red-500', 'font-body')}>{error}</span>}

      {helper && !error && (
        <span className={cn('mt-1 text-xs', 'text-(--color-text-on-dark-secondary)', 'font-body')}>
          {helper}
        </span>
      )}
    </div>
  );
};

export default Checkbox;

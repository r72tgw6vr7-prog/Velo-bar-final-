/**
 * RadioGroup Component
 * ================
 * Standardized radio button group with labels and error support
 */

import React from 'react';
import { cn } from '@/utils/classname.ts';

export interface RadioOption {
  /** Value for the radio option */
  value: string;
  /** Label text for the radio option */
  label: string;
  /** Whether the radio option is disabled */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Group of radio options to display */
  options: RadioOption[];
  /** Currently selected value */
  value?: string;
  /** Function called when selection changes */
  onChange: (value: string) => void;
  /** Group label */
  label?: string;
  /** Name attribute for the radio inputs */
  name: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display when there is no error */
  helper?: string;
  /** Whether radio selection is required */
  required?: boolean;
  /** Layout direction for the radio buttons */
  direction?: 'horizontal' | 'vertical';
  /** Custom class name */
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  label,
  name,
  error,
  helper,
  required = false,
  direction = 'vertical',
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const groupId = `radio-group-${name}`;

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <label
          id={`${groupId}-label`}
          className={cn('mb-2 text-sm font-medium', 'text-color-text-primary', 'font-body')}
        >
          {label}
          {required && <span className='text-brand-primary ml-0'>*</span>}
        </label>
      )}

      <div
        role='radiogroup'
        aria-labelledby={label ? `${groupId}-label` : undefined}
        className={cn(
          'flex',
          direction === 'vertical' ? 'flex-col gap-4' : 'flex-wrap gap-x-6 gap-y-4', // 8pt grid: was gap-3, gap-y-3 (12px)
        )}
      >
        {options.map((option) => {
          const radioId = `${name}-${option.value}`;

          return (
            <div
              key={option.value}
              className={cn(
                'flex items-center',
                option.disabled ? 'cursor-not-allowed opacity-60' : '',
              )}
            >
              <input
                type='radio'
                id={radioId}
                name={name}
                value={option.value}
                checked={value === option.value}
                disabled={option.disabled}
                onChange={handleChange}
                className={cn(
                  'h-4 w-4',
                  'text-brand-primary',
                  'bg-transparent',
                  'border-color-text-secondary',
                  'focus:ring-brand-primary',
                  'focus:ring-offset-0',
                  'transition-colors',
                  error ? 'border-color-error' : '',
                )}
                required={required}
              />
              <label
                htmlFor={radioId}
                className={cn(
                  'ml-2 text-sm',
                  'text-color-text-secondary',
                  'font-body',
                  option.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {error && (
        <span className={cn('mt-1 text-xs', 'text-color-error', 'font-body')}>{error}</span>
      )}

      {helper && !error && (
        <span className={cn('mt-1 text-xs', 'text-color-text-tertiary', 'font-body')}>
          {helper}
        </span>
      )}
    </div>
  );
};

export default RadioGroup;

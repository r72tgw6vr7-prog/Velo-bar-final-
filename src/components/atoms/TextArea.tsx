/**
 * TextArea Component
 * ==============
 * Standardized textarea field with label and error support
 */

import React, { TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/classname.ts';

/**
 * TextArea component using design tokens for styling.
 *
 * Uses brand colors, spacing, typography, and border styling from design system.
 */
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea */
  error?: string;
  /** Helper text displayed below the textarea when there's no error */
  helper?: string;
  /** Whether the textarea should take up full width of parent container */
  fullWidth?: boolean;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * TextArea component for multiline text input.
 *
 * This component is designed to match the styling of other form elements
 * while providing more space for text entry. It includes support for labels,
 * error messages, and helper text, all styled using design tokens.
 */
export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helper,
  fullWidth = true,
  className = '',
  ...props
}) => {
  return (
    <div className={cn('flex flex-col', 'gap-2', fullWidth ? 'w-full' : 'w-auto', className)}>
      {label && (
        <label
          htmlFor={props.id || 'textarea'}
          className={cn('text-text-primary', 'text-sm', 'mb-1', 'font-body')}
        >
          {label}
          {props.required && <span className='text-brand-primary ml-0'>*</span>}
        </label>
      )}

      <div
        className={cn(
          'bg-deep-black',
          'border border-solid',
          'rounded-md',
          error
            ? 'border-color-error'
            : 'border-brand-primary-15 focus-within:border-brand-primary',
        )}
      >
        <textarea
          id={props.id || 'textarea'}
          className={cn(
            'w-full',
            'bg-transparent',
            'text-brand-white',
            'text-base',
            'px-4 py-2',
            'outline-none',
            'resize-none',
            'min-h-[120px]',
            'placeholder:text-text-tertiary',
            'font-body',
            'font-normal',
          )}
          {...props}
        />
      </div>

      {error && <span className={cn('text-error', 'text-xs', 'mt-1')}>{error}</span>}

      {helper && !error && (
        <span className={cn('text-text-tertiary', 'text-xs', 'mt-1')}>{helper}</span>
      )}
    </div>
  );
};

export default TextArea;

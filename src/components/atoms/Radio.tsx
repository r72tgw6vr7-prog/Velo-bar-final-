import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/classname.ts';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  label,
  helper,
  error,
  id,
  required,
  className,
  ...rest
}) => {
  const radioId = id || `radio-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={radioId} className='inline-flex cursor-pointer items-center gap-2'>
        <input
          id={radioId}
          type='radio'
          className={cn(
            'h-5 w-5 rounded-full border-2',
            'border-muted',
            'text-accent-primary',
            'focus:ring-accent-primary/20 focus:ring-2 focus:ring-offset-0',
            error ? 'border-red-500' : '',
          )}
          required={required}
          {...rest}
        />
        <span className='text-sm text-(--color-text-on-dark-secondary)'>
          {label}
          {required && <span className='text-accent-primary'>*</span>}
        </span>
      </label>
      {error ? (
        <span className='mt-1 text-xs text-red-500'>{error}</span>
      ) : helper ? (
        <span className='mt-1 text-xs text-(--color-text-on-dark-secondary)'>{helper}</span>
      ) : null}
    </div>
  );
};

export default Radio;

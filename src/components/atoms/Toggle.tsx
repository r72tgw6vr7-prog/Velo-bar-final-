import React from 'react';
import { cn } from '@/utils/classname';

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked = false, onCheckedChange, className, disabled, label, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick?.(e);
      if (disabled) return;
      onCheckedChange?.(!checked);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onCheckedChange?.(!checked);
      }
    };

    return (
      <button
        ref={ref}
        role='switch'
        aria-checked={checked ? 'true' : 'false'}
        aria-label={label}
        type='button'
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex h-6 w-11 items-center rounded-full transition-colors',
          checked ? 'bg-accent-primary' : 'bg-white/20',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            'ml-1 inline-block h-4 w-4 rounded-full bg-white transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    );
  },
);

Toggle.displayName = 'Toggle';

export default Toggle;

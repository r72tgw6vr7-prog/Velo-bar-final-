import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helper,
  icon,
  iconPosition = 'right',
  fullWidth = true,
  className = '',
  ...props
}) => {
  const containerStyles = `
    flex flex-col 
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;

  const inputContainerStyles = `
    relative flex items-center 
    bg-deep-black 
    border-2
    rounded-lg 
    overflow-hidden
    ${error ? 'border-red-500' : 'border-brand-primary focus-within:border-brand-primary'}
  `;

  const inputStyles = `
    w-full
    bg-transparent
    text-white
    text-sm md:text-base
    px-4 py-4 md:px-4 md:py-4
    outline-none
    placeholder:text-white/50
    ${icon ? (iconPosition === 'left' ? 'pl-10 md:pl-12' : 'pr-10 md:pr-12') : ''}
  `;

  const iconStyles = `
    absolute
    ${iconPosition === 'left' ? 'left-3' : 'right-3'}
    top-1/2
    transform
    -translate-y-1/2
    text-white/50
  `;

  return (
    <div className={containerStyles}>
      {label && (
        <label className='text-brand-primary mb-8 block text-sm font-semibold md:text-base'>
          {label}
        </label>
      )}

      <div className={inputContainerStyles}>
        {icon && iconPosition === 'left' && <div className={iconStyles}>{icon}</div>}

        <input className={inputStyles} {...props} />

        {icon && iconPosition === 'right' && <div className={iconStyles}>{icon}</div>}
      </div>

      {error && <span className='mt-0 text-sm text-red-500'>{error}</span>}

      {helper && !error && <span className='mt-0 text-sm text-[#C0BFBF80]'>{helper}</span>}
    </div>
  );
};

export default InputField;

import React from 'react';
import { cn } from '@/utils/classname';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
  fallbackIcon?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = 40,
  className,
  fallbackIcon,
  ...props
}) => {
  const dimension = { width: size, height: size } as const;
  const radius = 'rounded-full';

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center bg-white/10 text-white',
        radius,
        className,
      )}
      style={dimension}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || initials || 'avatar'}
          className={cn('h-full w-full object-cover', radius)}
          loading='lazy'
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
      ) : null}
      {!src && (initials || fallbackIcon) ? (
        <span className='text-sm font-medium select-none'>{initials || fallbackIcon}</span>
      ) : null}
    </div>
  );
};

export default Avatar;

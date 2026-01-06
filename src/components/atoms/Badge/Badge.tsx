import React from 'react';

interface BadgeProps {
  iconUrl: string;
  text: string;
  variant?: 'default' | 'gradient';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  iconUrl,
  text,
  variant = 'default',
  className = '',
}) => {
  const _gradientStyle =
    variant === 'gradient'
      ? {
          background:
            'linear-gradient(180deg, rgba(var(--brand-orange-rgb), 0), rgba(var(--brand-orange-rgb), 0.1), rgba(var(--brand-orange-rgb), 0))',
        }
      : {};

  return (
    <div className={`flex shrink-0 flex-col items-start ${className}`}>
      <img src={iconUrl} alt={text} className='mx-8 h-[70px] w-14 object-fill' loading='lazy' />
      <span className='mx-px text-[15px] text-white'>{text}</span>
    </div>
  );
};

export default Badge;

import React from 'react';

interface TrustBadgeProps {
  icon: string;
  text: string;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, text, className = '' }) => {
  return (
    <div
      className={`bg-page hover:border-accent-primary/40 hover:shadow-accent-glow-subtle flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition-all duration-300 ${className}`}
    >
      {icon && <img src={icon} alt='' className='h-5 w-5' aria-hidden='true' loading='lazy' />}
      <span className='text-sm font-medium whitespace-nowrap text-white'>{text}</span>
    </div>
  );
};

export default TrustBadge;

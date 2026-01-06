import React from 'react';
import { TRUST_BADGES } from '../../sections/TrustBadges';

interface TrustBadgesProps {
  className?: string;
  variant?: 'marquee' | 'bar';
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  className = '',
  variant = 'marquee',
}) => {
  if (variant === 'bar') {
    return (
      <section className={`w-full py-4 md:py-6 ${className}`}>
        <div className='mx-auto max-w-[1104px] px-8 md:px-8'>
          <div className='flex flex-wrap items-center justify-center gap-8 md:gap-8'>
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.id}
                className='flex h-16 min-w-48 flex-row items-center gap-8 px-0 md:h-[92px] md:min-w-60 md:px-8'
              >
                <div className='border-accent-primary bg-accent-primary flex h-12 w-12 items-center justify-center rounded-full border-2 p-0 md:h-16 md:w-16 md:p-0'>
                  {badge.svg}
                </div>
                <span className='font-inter text-left text-xs leading-tight font-semibold text-[rgb(0,30,50)] md:text-sm'>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full py-4 md:py-6 ${className}`}>
      <div className='mx-auto max-w-[1104px] px-8 md:px-8'>
        <div className='relative overflow-hidden'>
          <div
            className='hover:animation-pause flex w-fit animate-[scrollBadges_30s_linear_infinite] gap-8 transition duration-200 ease-out md:gap-8'
            style={{
              maskImage: 'none',
              WebkitMaskImage: 'none',
            }}
          >
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.id}
                className='flex h-16 min-w-48 shrink-0 flex-row items-center gap-0 px-0 md:h-[92px] md:min-w-60 md:gap-8 md:px-8'
              >
                <div className='border-brand-primary bg-brand-primary hover:bg-brand-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 p-0 transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3),0_0_25px_rgba(74,85,104,0.5)] md:h-16 md:w-16 md:p-0'>
                  {badge.svg}
                </div>
                <span className='font-inter min-w-0 flex-1 text-left text-xs leading-tight font-semibold text-[rgb(0,30,50)] md:text-sm'>
                  {badge.text}
                </span>
              </div>
            ))}

            {TRUST_BADGES.map((badge) => (
              <div
                key={`${badge.id}-duplicate`}
                className='flex h-16 min-w-48 shrink-0 flex-row items-center gap-0 px-0 md:h-[92px] md:min-w-60 md:gap-8 md:px-8'
              >
                <div className='border-brand-primary bg-brand-primary hover:bg-brand-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 p-0 transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3),0_0_25px_rgba(74,85,104,0.5)] md:h-16 md:w-16 md:p-0'>
                  {badge.svg}
                </div>
                <span className='font-inter min-w-0 flex-1 text-left text-xs leading-tight font-semibold text-[rgb(0,30,50)] md:text-sm'>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

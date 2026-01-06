import React from 'react';

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: StatItem[];
  className?: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats, className = '' }) => {
  return (
    <div className={`bg-navy w-full border-t border-b border-white/10 py-4 ${className}`}>
      <div className='container mx-auto'>
        <div className='grid grid-cols-5 items-center justify-items-center gap-8 md:gap-16'>
          {stats.map((stat, index) => (
            <div
              key={`stat-${index}`}
              className='flex flex-col items-center justify-center text-center'
            >
              <img src={stat.icon} alt='' className='mb-0 h-8 w-8' aria-hidden='true' />
              <img
                src={stat.icon}
                alt=''
                className='mb-0 h-8 w-8'
                aria-hidden='true'
                loading='lazy'
              />
              <p className='text-xl font-bold text-white md:text-2xl'>{stat.value}</p>
              <p className='text-sm text-white'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

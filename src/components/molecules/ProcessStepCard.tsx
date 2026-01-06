import React from 'react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

interface ProcessStepCardProps {
  number: number;
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  isActive?: boolean;
  isComplete?: boolean;
  isLast?: boolean;
  className?: string;
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  number,
  title,
  description,
  icon: IconComponent,
  isActive = false,
  isComplete = false,
  isLast = false,
  className = '',
}) => {
  return (
    <div className={`flex ${isLast ? '' : 'mb-8'} ${className}`}>
      {/* Step Number Circle */}
      <div
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isActive || isComplete ? 'bg-color-coral' : 'bg-deep-black border-color-coral border'} ${isComplete ? 'text-text-on-dark' : ''} `}
      >
        {isComplete ? (
          <svg className='text-text-on-dark h-6 w-6' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        ) : (
          <span className='text-text-on-dark text-lg font-bold md:text-xl'>{number}</span>
        )}
      </div>

      {/* Vertical Line Connector */}
      {!isLast && (
        <div className='from-color-coral to-deep-black absolute mt-8 ml-8 h-16 w-0.5 bg-linear-to-b' />
      )}

      {/* Content */}
      <div className='ml-8'>
        <div className='mb-0 flex items-center'>
          <IconComponent size={32} className='text-color-coral mr-0' />
          <h3
            className={`text-xl font-bold ${isActive ? 'text-color-coral' : 'text-text-on-dark'}`}
          >
            {title}
          </h3>
        </div>
        <p className='text-text-body max-w-md text-base'>{description}</p>
      </div>
    </div>
  );
};

export default ProcessStepCard;

import React from 'react';

interface PriceFeature {
  text: string;
  iconUrl: string;
}

interface PriceCardProps {
  iconUrl: string;
  title: string;
  description: string;
  features: PriceFeature[];
  ctaText: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
  className?: string;
}

export const PriceCard: React.FC<PriceCardProps> = ({
  iconUrl,
  title,
  description,
  features,
  ctaText,
  onCtaClick,
  highlighted = false,
  className = '',
}) => {
  const baseClasses = 'card flex flex-col items-center w-[400px]';
  const highlightedClasses = highlighted ? 'card--featured' : '';
  const shadowClasses = '';

  return (
    <div className={`${baseClasses} ${highlightedClasses} ${shadowClasses} ${className}`}>
      <img
        src={iconUrl}
        alt={title}
        className='mb-8 h-12 w-12 rounded-2xl object-fill'
        loading='lazy'
        decoding='async'
      />
      <h3 className='text-text-strong mb-8 text-center text-[31px] font-bold'>{title}</h3>
      <p className='text-text-body mb-8 text-center text-base'>{description}</p>
      <div className='mx-8 mb-8 flex flex-col items-start gap-0 self-stretch'>
        {features.map((feature, index) => (
          <div key={index} className='flex items-center'>
            <img
              src={feature.iconUrl}
              alt=''
              className='mr-0 h-4 w-4 object-fill'
              loading='lazy'
              decoding='async'
            />
            <div className='flex flex-col items-center'>
              <span className='text-text-body text-[15px]'>{feature.text}</span>
            </div>
          </div>
        ))}
      </div>
      <button className='btn-primary w-full' onClick={onCtaClick}>
        {ctaText}
      </button>
    </div>
  );
};

export default PriceCard;

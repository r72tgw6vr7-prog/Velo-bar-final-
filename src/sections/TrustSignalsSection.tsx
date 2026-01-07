import React from 'react';
import { Badge } from '@/components/atoms/Badge/Badge.tsx';
import { ReviewCard } from '@/components/molecules/ReviewCard.tsx';

interface Partner {
  logo: string;
  name: string;
  description?: string;
}

interface Review {
  rating: number;
  content: string;
  author: string;
  source: string;
}

interface TrustSignalsSectionProps {
  title: string;
  subtitle: string;
  partners: Partner[];
  reviews: Review[];
  badges: Array<{
    iconUrl: string;
    text: string;
  }>;
  className?: string;
}

export const TrustSignalsSection: React.FC<TrustSignalsSectionProps> = ({
  title,
  subtitle,
  partners,
  reviews,
  badges,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className='flex flex-col items-center self-stretch py-24'>
        <div className='flex w-[1334px] flex-col items-center pb-16'>
          {/* Partners Section */}
          <div className='mb-16 flex w-[1064px] flex-col items-center gap-0.5 px-72'>
            <div className='flex flex-col items-start'>
              <span className='text-accent-primary text-[35px]'>{title}</span>
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-[15px] text-(--color-text-on-dark-secondary)'>{subtitle}</span>
            </div>
          </div>

          {/* Partner Logos */}
          <div className='mb-32 flex items-start justify-between self-stretch'>
            {partners.map((partner, index) => (
              <div key={index} className='flex flex-col items-center'>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className='h-36 object-contain'
                  loading='lazy'
                  decoding='async'
                />
                {partner.description && (
                  <span className='text-accent-primary mt-0 text-[25px]'>
                    {partner.description}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Reviews Section */}
          <div className='mx-8 flex flex-col items-center gap-8 self-stretch px-80'>
            <div className='flex flex-col items-start'>
              <span className='text-accent-primary text-[35px]'>Was Kunden sagen</span>
            </div>

            {/* Reviews Grid */}
            <div className='flex items-start gap-8'>
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  rating={review.rating}
                  content={review.content}
                  author={review.author}
                  source={review.source}
                />
              ))}
            </div>

            {/* Pagination Dots */}
            <div className='flex items-start'>
              {[true, false, false].map((isActive, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded ${
                    isActive ? 'bg-accent-primary' : 'bg-navy-primary'
                  } ${index !== 2 ? 'mr-2' : ''}`}
                />
              ))}
            </div>

            {/* Trust Badges */}
            <div className='mt-16 flex flex-wrap justify-center gap-8'>
              {badges.map((badge, index) => (
                <Badge key={index} iconUrl={badge.iconUrl} text={badge.text} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalsSection;

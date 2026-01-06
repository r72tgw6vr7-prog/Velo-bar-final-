import React from 'react';
import { Star } from 'lucide-react';

interface TrustStatsBarProps {}

export const TrustStatsBar: React.FC<TrustStatsBarProps> = () => (
  <div className='grid grid-cols-2 gap-8 text-center md:grid-cols-4'>
    <div>
      <div className='text-accent-primary mb-0 text-3xl font-bold md:text-4xl'>47%</div>
      <div className='text-sm text-(--color-text-on-dark-secondary)'>Längere Standbesuche</div>
    </div>
    <div>
      <div className='text-accent-primary mb-0 text-3xl font-bold md:text-4xl'>3x</div>
      <div className='text-sm text-(--color-text-on-dark-secondary)'>Mehr Visitenkarten</div>
    </div>
    <div>
      <div className='text-accent-primary mb-0 text-3xl font-bold md:text-4xl'>200+</div>
      <div className='text-sm text-(--color-text-on-dark-secondary)'>Messe-Events</div>
    </div>
    <div>
      <div className='text-accent-primary mb-0 flex items-center justify-center gap-0 text-3xl font-bold md:text-4xl'>
        <Star size={24} className='fill-accent-primary' />
        4.9
      </div>
      <div className='text-sm text-(--color-text-on-dark-secondary)'>Google Bewertung</div>
    </div>
  </div>
);

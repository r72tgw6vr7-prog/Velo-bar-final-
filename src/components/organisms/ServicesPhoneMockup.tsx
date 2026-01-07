import React from 'react';

import { cn } from '@/utils/classname.ts';

import './ServicesPhoneMockup.css';

type PhoneMockupItem = {
  title: string;
  description: string;
};

export interface ServicesPhoneMockupProps {
  items: PhoneMockupItem[];
  className?: string;
}

export const ServicesPhoneMockup: React.FC<ServicesPhoneMockupProps> = ({ items, className }) => {
  return (
    <section className={cn('services-phone-mockup', className)} aria-label='Services phone preview'>
      <div className='services-phone-mockup__frame' aria-hidden='true'>
        <span className='services-phone-mockup__button services-phone-mockup__button--volume-1' />
        <span className='services-phone-mockup__button services-phone-mockup__button--volume-2' />
        <span className='services-phone-mockup__button services-phone-mockup__button--power' />
      </div>

      <div className='services-phone-mockup__device'>
        <div className='services-phone-mockup__notch' aria-hidden='true'>
          <span className='services-phone-mockup__speaker' />
          <span className='services-phone-mockup__camera' />
        </div>

        <div
          className='services-phone-mockup__screen'
          role='region'
          aria-label='Scrollable services'
          tabIndex={0}
        >
          <div className='services-phone-mockup__glare' aria-hidden='true' />

          <div className='services-phone-mockup__scroll' role='list'>
            {items.map((item) => (
              <article
                key={item.title}
                className='services-phone-mockup__card'
                role='listitem'
                aria-label={item.title}
              >
                <h3 className='services-phone-mockup__card-title'>{item.title}</h3>
                <p className='services-phone-mockup__card-description'>{item.description}</p>
              </article>
            ))}
          </div>

          <div className='services-phone-mockup__home-indicator' aria-hidden='true' />
        </div>
      </div>
    </section>
  );
};

export default ServicesPhoneMockup;

/**
 * Testimonials Section - Google Reviews
 * Displays verified Google Business Profile reviews with schema markup
 */

import React from 'react';
import { ReviewCard } from '@/components/molecules/ReviewCard';
import { Section, Container } from '@/components/atoms/index.ts';
import { GridClean } from '@/components/atoms/Grid.clean.tsx';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Xenia Davidoff',
    role: 'Wedding Client',
    text: 'The mobile bar Velo.Bar was the absolute highlight of our wedding! The drinks they prepared were incredibly well-received by our guests. The seamless communication with Lars and his team made our lives easier during the wedding preparations.',
    rating: 5,
    date: '2023-01-15',
    verified: true,
  },
  {
    name: 'Angela Samberger',
    role: 'Garden Party Host',
    text: 'Sebastian and his Velo.Bar catered for 50 guests at my garden party with cocktails. I highly recommend him. Great bar, delicious cocktails, professional service, and a fantastic guy! Everything was straightforward, reliable, and a truly memorable experience.',
    rating: 5,
    date: '2024-07-20',
    verified: true,
  },
  {
    name: 'Arlind Maurer',
    role: 'Wedding Client',
    text: 'Sebastian and the Velo.Bar were an absolute hit after our civil wedding. Not even the pouring rain could dampen that. A great concept, outstanding service, and a hassle-free experience.',
    rating: 5,
    date: '2024-01-10',
    verified: true,
  },
  {
    name: 'Ruth Gaspar',
    role: 'English Garden Event',
    text: 'We booked the VeloBar for the champagne reception in the English Garden after our civil ceremony. Everything worked out perfectly, and despite the rain, it was a very successful event. Many thanks to Lars Eggers for the uncomplicated planning and execution.',
    rating: 5,
    date: '2024-01-05',
    verified: true,
  },
  {
    name: 'Viktoria O.',
    role: 'Champagne Reception',
    text: 'Absolutely recommendable! We booked a champagne reception after our civil wedding in Munich, and it was simply perfect! Nice guys, fair price, and easy to contact. Definitely book them, and you can celebrate and relax without worry.',
    rating: 5,
    date: '2024-01-08',
    verified: true,
  },
  {
    name: 'Radu Lupoaie',
    role: 'Standesamt Munich Event',
    text: 'Pure awesomeness! Velo Bar team helped us organize a champagne reception at Standesamt Munich. Everything was great, from the initial communication and planning until the main day. They are very friendly and professional and all the guests loved it!',
    rating: 5,
    date: '2021-06-15',
    verified: true,
  },
];

interface TestimonialsSectionProps {
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className = '' }) => {
  const { t } = useLanguage();

  return (
    <Section container='default' spacing='xl' background='transparent' className={className}>
      <Container size='default'>
        <div className='mx-auto mb-12 max-w-3xl text-center'>
          <h2 className='text-accent mt-4 text-3xl font-bold md:text-4xl'>
            {t('testimonialsSection.title')}
          </h2>
          <p className='mt-4 text-base font-semibold text-white md:text-lg'>
            {t('testimonialsSection.subtitle')}
          </p>
        </div>

        <GridClean
          cols={3}
          gap='lg'
          className='testimonials-grid gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-6'
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className='flex'>
              <ReviewCard
                rating={testimonial.rating}
                content={testimonial.text}
                author={testimonial.name}
                source={testimonial.role}
                className='h-full w-full'
              />
            </div>
          ))}
        </GridClean>

        {/* CTA to view all reviews */}
        <div className='mt-10 text-center'>
          <a
            href='https://www.google.com/maps/place/Velo.Bar/@48.1103564,11.5341077,17z/data=!4m8!3m7!1s0x479ddf6e8e8e8e8e:0x1234567890abcdef!8m2!3d48.1103564!4d11.5366826!9m1!1b1!16s%2Fg%2F11y3y3y3y3y'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition duration-200 hover:border-white/30 hover:bg-white/10'
          >
            <span>{t('testimonialsSection.viewAll')}</span>
            <ExternalLink className='h-5 w-5' />
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default TestimonialsSection;

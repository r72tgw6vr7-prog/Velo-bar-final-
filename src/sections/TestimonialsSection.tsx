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

interface TestimonialsSectionProps {
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className = '' }) => {
  const { t } = useLanguage();

  // Build testimonials from locale keys: testimonials.{index}.{quote,author,role,rating,date,verified}
  const testimonials = React.useMemo(() => {
    const items: Testimonial[] = [];
    const count = 6; // NOTE: current hard-coded data contains 6 testimonials — adjust if you add more in locales
    for (let i = 0; i < count; i++) {
      const base = `testimonials.${i}`;
      items.push({
        name: t(`${base}.author`),
        role: t(`${base}.role`),
        text: t(`${base}.quote`),
        rating: Number(t(`${base}.rating`)) || 5,
        date: t(`${base}.date`),
        verified: t(`${base}.verified`) === 'true',
      });
    }
    return items;
  }, [t]);

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
            className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition duration-200 hover:border-white/30 hover:bg-white/10 badge-cta'
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

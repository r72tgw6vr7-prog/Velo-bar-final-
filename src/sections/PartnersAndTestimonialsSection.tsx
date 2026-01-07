import React from 'react';
import TestimonialsCarousel from '@/components/organisms/TestimonialsCarousel.tsx';
import './PartnersAndTestimonialsSection.css';
import { IMAGE_PATHS } from '../config/imagePaths.ts';
import { useTestimonials } from '@/lib/api/domainHooks.ts';

// PARTNER LOGOS - REFINEMENT #4: Only 4 real partners - FIXED WITH CORRECT PATHS
const partnerLogos = [
  {
    id: 'iamrobot',
    name: 'I AM ROBOT',
    src: IMAGE_PATHS.partners.iamrobot,
    alt: 'I AM ROBOT NFC Chip Implants Logo',
  },
  {
    id: 'nannybag',
    name: 'nannybag',
    src: IMAGE_PATHS.partners.nannybag,
    alt: 'nannybag Logo',
  },
  {
    id: 'bqla',
    name: 'BQLA',
    src: IMAGE_PATHS.partners.bqla,
    alt: 'BQLA Partner Logo',
  },
];

export interface PartnersAndTestimonialsSectionProps {
  titlePartners?: string;
  subtitlePartners?: string;
  titleTestimonials?: string;
}

export const PartnersAndTestimonialsSection: React.FC<PartnersAndTestimonialsSectionProps> = ({
  titlePartners = 'Unsere Partner & Presse',
  subtitlePartners = 'Vertrauensvolle Partnerschaften mit führenden Marken der Branche',
  titleTestimonials = 'Was Kunden sagen',
}) => {
  // REFINEMENT #4: Duplicate array × 3 for seamless loop
  const scrollItems = [...partnerLogos, ...partnerLogos, ...partnerLogos];
  const { data, isLoading, isError } = useTestimonials({ page: 1, pageSize: 12 });
  const carouselData = React.useMemo(() => {
    if (!data) return undefined;
    // Map API testimonials to carousel's expected shape
    return data.map((t) => ({
      id: Number(t.id as number | string),
      text: t.quote ?? '',
      author: t.author ?? '',
      source: 'Kundenstimme',
    }));
  }, [data]);

  return (
    <section className='relative z-10 w-full' aria-label='Partners and Testimonials'>
      <div className='mx-auto max-w-[1200px] px-8 py-16 sm:px-8 md:py-24 lg:px-16 lg:py-24'>
        {/* PARTNERS */}
        <div className='mb-8 text-center'>
          <h2 className='font-headline text-accent-primary text-[32px] leading-tight font-semibold lg:text-[48px]'>
            {titlePartners}
          </h2>
        </div>
        <p className='font-body mb-16 text-center text-[14px] text-white/70'>{subtitlePartners}</p>

        {/* Partner Logos Carousel */}
        <div className='partners-carousel-wrapper'>
          <div
            className='partners-carousel-container'
            role='region'
            aria-label='Partners and Press carousel'
          >
            <div className='partners-carousel-track' aria-hidden='true'>
              {scrollItems.map((logo, idx) => (
                <div key={`${logo.id}-${idx}`} className='partners-logo' title={logo.name}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.error('Failed to load logo:', logo.src);
                      target.src = IMAGE_PATHS.fallback.placeholder;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      {isLoading && (
        <div className='flex items-center justify-center py-16'>
          <div className='u-spinner' aria-label='Loading testimonials' />
        </div>
      )}
      {isError && (
        <p className='text-center text-red-400'>Bewertungen konnten nicht geladen werden.</p>
      )}
      {!isLoading && !isError && (
        <TestimonialsCarousel title={titleTestimonials} testimonialsList={carouselData} />
      )}
    </section>
  );
};

export default PartnersAndTestimonialsSection;

/**
 * TestimonialsCarousel Component
 * ==========================
 * Carousel display for customer testimonials with star ratings
 */

import React from 'react';
import { cn } from '../../utils/classname.ts';
import { Section } from '../atoms/index.ts';
import { Container } from '../atoms/index.ts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/atoms/index.ts';

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  source: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: 'Die Zusammenarbeit war von Anfang bis Ende hervorragend. Das Team hat unsere Website nicht nur optisch, sondern auch technisch auf ein neues Level gebracht – performant, zugänglich und leicht zu pflegen.',
    author: 'M.S.',
    source: 'Google Review',
  },
  {
    id: 2,
    text: 'Unsere Kund:innen heben besonders die saubere Codebasis, die klare Informationsarchitektur und die starke Performance hervor. Selbst komplexe Anforderungen wurden strukturiert gelöst und transparent kommuniziert.',
    author: 'Unternehmensbewertung',
    source: 'Projektfeedback',
  },
  {
    id: 3,
    text: 'Das Studio setzt auf individuelle digitale Lösungen und einen kollaborativen Ansatz. Von der ersten Idee bis zum Launch wurden wir eng begleitet, Entscheidungen wurden erklärt und messbare Ergebnisse standen im Fokus.',
    author: 'TripAdvisor Review',
    source: 'TripAdvisor Review',
  },
];

const Star = () => (
  <svg
    className={cn('h-5 w-5', 'fill-accent-primary text-accent-primary')}
    viewBox='0 0 20 20'
    aria-hidden='true'
  >
    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
  </svg>
);

export interface TestimonialsCarouselProps {
  className?: string;
  testimonialsList?: Testimonial[];
  title?: string;
}

export function TestimonialsCarousel({
  className = '',
  testimonialsList = testimonials,
  title = 'Was Kunden sagen',
}: TestimonialsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Update current index when carousel changes
  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on('select', handleSelect);
    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  // Simple autoplay: advance every 5s
  React.useEffect(() => {
    if (!api) return;

    // Skip autoplay if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(id);
  }, [api]);

  return (
    <Section
      spacing='2xl'
      className={cn('relative z-(--z-content)', className)}
      container='none'
      aria-label='Customer testimonials'
    >
      <Container size='md'>
        <h2
          className={cn(
            'font-headline text-3xl md:text-4xl lg:text-5xl',
            'text-accent-primary font-bold',
            'mb-12 text-center md:mb-16',
            'animate-fade-in',
          )}
        >
          {title}
        </h2>

        <div className={cn('relative')}>
          <Carousel setApi={setApi} className={cn('[--gap:1.5rem]', 'animate-fade-up')}>
            <CarouselContent>
              {testimonialsList.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.id}
                  className={cn(
                    'basis-full sm:basis-[85%] md:basis-[66%] lg:basis-[40%]',
                    'micro-transition',
                  )}
                >
                  <div
                    className={cn(
                      'bg-color-surface-dark',
                      'border-accent-primary-15 border',
                      'h-full rounded-xl p-6 md:p-8',
                      'shadow-shadow-primary-soft',
                      'micro-transition',
                      currentIndex === index ? 'border-accent-primary-30' : '',
                    )}
                  >
                    <div className={cn('mb-6 flex gap-0.5 md:mb-8')}>
                      {[1, 2, 3, 4, 5].map((k) => (
                        <Star key={`star-${testimonial.id}-${k}`} />
                      ))}
                    </div>

                    <p
                      className={cn(
                        'text-text-primary text-base leading-relaxed',
                        'font-body mb-8',
                        'italic',
                      )}
                    >
                      "{testimonial.text}"
                    </p>

                    <p className={cn('text-text-secondary text-sm', 'font-body font-medium')}>
                      — {testimonial.author}, {testimonial.source}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className={cn('mt-6 flex items-center justify-center gap-2 md:mt-8')}>
              {testimonialsList.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  className={cn(
                    'min-h-11 min-w-11',
                    'flex items-center justify-center',
                    'micro-transition',
                    'active:scale-90', // Mobile active state
                    'group',
                  )}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index ? 'true' : 'false'}
                >
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      'micro-transition',
                      currentIndex === index
                        ? 'bg-brand-primary w-8'
                        : 'bg-text-tertiary group-hover:bg-text-secondary',
                    )}
                  />
                </button>
              ))}
            </div>

            <CarouselPrevious className={cn('hidden md:flex')} aria-label='Previous testimonial' />
            <CarouselNext className={cn('hidden md:flex')} aria-label='Next testimonial' />
          </Carousel>
        </div>
      </Container>
    </Section>
  );
}

export default TestimonialsCarousel;

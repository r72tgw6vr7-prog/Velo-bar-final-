/**
 * ServiceCards Component
 * ==================
 * Feature-rich service cards for showcasing different service options
 */

import React from 'react';
import { Section } from '@/components/atoms';
import { cn } from '../../../utils/classname';

interface ServiceCard {
  id: string;
  backgroundImage: string;
  icon: 'crown' | 'diamond';
  struckTitle: string;
  mainTitle: string;
  bullets: string[];
  price: string;
  ctaText: string;
  ctaHref: string;
  ctaVariant: 'default' | 'secondary';
}

interface ServiceCardsProps {
  services?: ServiceCard[];
}

const DEFAULT_SERVICES: ServiceCard[] = [
  {
    id: 'web-apps',
    backgroundImage: '',
    icon: 'crown',
    struckTitle: 'Web Application Development',
    mainTitle: 'Web Applications',
    bullets: [
      'Responsive UI & UX',
      'React & TypeScript Stack',
      'API Integration & Auth',
      'Performance & SEO Focus',
    ],
    price: 'from €5.000',
    ctaText: 'Discover Services',
    ctaHref: '/services#fullstack',
    ctaVariant: 'default',
  },
  {
    id: 'design-systems',
    backgroundImage: '',
    icon: 'diamond',
    struckTitle: 'Design Systems & UI/UX',
    mainTitle: 'Design Systems',
    bullets: [
      'Component Libraries',
      'Design Tokens',
      'Accessibility (WCAG 2.1 AA)',
      'Documentation & Handoff',
    ],
    price: 'from €3.000',
    ctaText: 'Discover Services',
    ctaHref: '/services#design',
    ctaVariant: 'default',
  },
];

export const ServiceCards: React.FC<ServiceCardsProps> = ({ services = DEFAULT_SERVICES }) => {
  const getIcon = (iconType: 'crown' | 'diamond') => {
    if (iconType === 'crown') {
      return <img src='/icons/crown.svg' alt='Crown icon' width={40} height={40} loading='lazy' />;
    }
    return <img src='/Diamond.svg' alt='Diamond icon' width={40} height={40} loading='lazy' />;
  };

  return (
    <Section background='transparent' container='default' spacing='xl' className='bg-texture'>
      {/* Header */}
      <div className={cn('mb-16 space-y-6 text-center')}>
        <p className={cn('text-sm tracking-[0.3em] uppercase', 'text-tertiary font-medium')}>
          Unser Angebot
        </p>
        <h2 className={cn('font-headline text-3xl md:text-4xl', 'text-accent-primary')}>
          Alle Services Entdecken
        </h2>
        <p
          className={cn('text-secondary text-base', 'font-body mx-auto max-w-2xl leading-relaxed')}
        >
          Entdecken Sie unsere zwei Hauptbereiche der Kunstfertigkeit
        </p>
      </div>

      {/* Cards Grid */}
      <div className={cn('grid grid-cols-1 md:grid-cols-2', 'gap-6 md:gap-8')}>
        {services.map((service) => {
          return (
            <article
              key={service.id}
              className={cn(
                'card',
                'group relative overflow-hidden',
                'min-h-[320px] sm:min-h-[360px] md:min-h-[500px]',
                'flex h-full flex-col',
              )}
              aria-label={`${service.mainTitle} service card`}
            >
              {/* Background Image with Gradient Overlay */}
              <div className={cn('bg-color-bg-page absolute inset-0')}>
                {/* Dark Gradient Overlay */}
                <div
                  className={cn('absolute inset-0')}
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%)',
                  }}
                />
              </div>

              {/* Positioned icon */}
              <div
                className={cn(
                  'absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8',
                  'z-(--z-content)',
                )}
              >
                {getIcon(service.icon)}
              </div>

              {/* Content */}
              <div
                className={cn(
                  'relative flex h-full flex-col items-center justify-end',
                  'p-6 sm:p-8 md:p-10',
                )}
              >
                {/* Text Content */}
                <div className={cn('text-center')}>
                  {/* Small label (no strike-through) */}
                  <div className={cn('mb-1 flex items-center justify-center')}>
                    <span className={cn('font-headline text-lg', 'text-color-coral opacity-90')}>
                      {service.struckTitle}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3
                    className={cn(
                      'font-headline text-2xl font-bold md:text-4xl',
                      'mb-6 leading-tight text-text-strong',
                    )}
                  >
                    {service.mainTitle}
                  </h3>

                  {/* Bullet Points */}
                  <ul className={cn('mb-8 space-y-2')}>
                    {service.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className={cn(
                          'font-body text-sm text-text-body',
                          'flex items-center justify-center gap-2',
                          'before:text-color-coral before:text-lg before:content-["•"]',
                        )}
                      >
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  <div className={cn('flex flex-col items-center gap-4')}>
                    <span
                      className={cn(
                        'font-headline block text-center text-2xl font-bold',
                        'text-text-strong',
                      )}
                    >
                      {service.price}
                    </span>

                    <a 
                      href={service.ctaHref} 
                      className='btn-primary w-full justify-center'
                    >
                      {service.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};

export default ServiceCards;

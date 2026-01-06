/**
 * ServicesPageInteractive Component
 * ===========================
 * Interactive service selection with categorized service packages
 */
/* eslint-disable no-console */

import React, { useMemo, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Sparkles, Zap, Shield, Heart, Euro, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/classname';
import { Button, Section } from '../atoms';
import { servicesContent } from '../../content/services';

const categories = servicesContent.categories;

type CategoryId = string;

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  fullstack: Sparkles,
  design: Zap,
  infrastructure: Shield,
  consulting: Heart,
};

// Standard animation variants (consistent across pages)
const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
} as const;

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
} as const;

interface ServicesPageInteractiveProps {
  className?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

const formatPrice = (priceFrom: number, priceUnit: string) => {
  if (priceFrom <= 0) return priceUnit;
  const unitWithoutEuro = priceUnit.replace(/€/g, '').trim();
  const suffix = unitWithoutEuro.length > 0 ? ` ${unitWithoutEuro}` : '';
  return `from ${priceFrom.toLocaleString('de-DE')} €${suffix}`;
};

export const ServicesPageInteractive: React.FC<ServicesPageInteractiveProps> = ({
  className = '',
  heroTitle,
  heroSubtitle,
}) => {
  const defaultCategoryId = (servicesContent.categories[0]?.id ?? 'corporate-events') as CategoryId;
  const [activeCategory, setActiveCategory] = useState<CategoryId>(defaultCategoryId);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock booking function for now
  const handleServiceBooking = useCallback((serviceId: string) => {
    // eslint-disable-next-line no-console
    console.log('Booking service:', serviceId);
  }, []);

  // Intersection Observer to trigger animations when in view
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.1, once: true });

  const currentServices = useMemo(
    () => servicesContent.services.filter((service) => service.categoryId === activeCategory),
    [activeCategory],
  );
  const activeCategoryMeta = useMemo(
    () => categories.find((category) => category.id === activeCategory),
    [activeCategory],
  );

  const handleCategoryChange = useCallback(
    (categoryId: CategoryId) => {
      if (categoryId === activeCategory || isAnimating) return;
      setIsAnimating(true);
      setActiveCategory(categoryId);
      window.setTimeout(() => setIsAnimating(false), 400);
    },
    [activeCategory, isAnimating],
  );

  return (
    <Section className={cn('relative z-(--z-content)', className)} spacing='lg' container='default'>
      <div className={cn('flex flex-col gap-16')}>
        <div className={cn('space-y-6 text-center')}>
          <h1
            className={cn(
              'font-headline',
              'text-4xl md:text-5xl lg:text-6xl',
              'text-accent-primary',
            )}
          >
            {heroTitle ?? 'Professional Web Development Services'}
          </h1>
          <p
            className={cn(
              'text-base md:text-lg',
              'text-text-secondary',
              'mx-auto max-w-2xl',
              'font-body leading-relaxed',
            )}
          >
            {heroSubtitle ??
              'Enterprise-grade solutions with modern tech stacks, scalable architectures, and measurable business outcomes. Select from our specialized service offerings.'}
          </p>
        </div>

        <div
          className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4')}
          role='tablist'
          aria-label='Service-Kategorien'
        >
          {categories.map((category) => {
            const IconComponent = CATEGORY_ICON_MAP[category.id] ?? Sparkles;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                id={`tab-${category.id}`}
                role='tab'
                aria-selected={isActive ? 'true' : 'false'}
                aria-controls={`panel-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  'flex h-full flex-col',
                  'rounded-xl border-2',
                  'px-6 py-8 md:px-8 md:py-10',
                  'text-left',
                  'transition-transform duration-300',
                  'focus-visible:ring-brand-primary focus-visible:ring-2',
                  'focus-visible:ring-offset-surface-dark focus-visible:ring-offset-4',
                  isActive
                    ? ['border-brand-primary', 'shadow-shadow-brand-glow', 'scale-[1.02]']
                    : [
                        'border-text-primary-10',
                        'hover:border-brand-primary-80',
                        'hover:scale-[1.02]',
                      ],
                )}
                onClick={() => handleCategoryChange(category.id as CategoryId)}
                aria-label={`Select ${category.title} category`}
              >
                <div className={cn('mb-8 flex items-center justify-between')}>
                  <div
                    className={cn(
                      'h-12 w-12 rounded-full md:h-14 md:w-14',
                      'bg-accent-primary',
                      'flex items-center justify-center',
                    )}
                  >
                    <IconComponent size={20} className={cn('text-black')} />
                  </div>
                  <span
                    className={cn('text-xs font-medium tracking-[0.25em] uppercase', 'text-white')}
                  >
                    ab {category.priceFromLabel ?? 'Custom'}
                  </span>
                </div>
                <div className={cn('flex-1 space-y-4 md:space-y-6')}>
                  <h3 className={cn('font-headline', 'text-xl md:text-2xl', 'text-white')}>
                    {category.title}
                  </h3>
                  <p
                    className={cn(
                      'text-sm md:text-base',
                      'text-white/80',
                      'font-body leading-relaxed',
                    )}
                  >
                    {category.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeCategory}
            ref={containerRef}
            className={cn('space-y-12 md:space-y-16')}
            role='tabpanel'
            id={`panel-${activeCategory}`}
            aria-labelledby={`tab-${activeCategory}`}
            aria-live='polite'
            aria-label={`Showing ${activeCategoryMeta?.title} services`}
            variants={containerVariants}
            initial='initial'
            animate={inView ? 'animate' : 'initial'}
            exit='exit'
          >
            <div className={cn('space-y-6 text-center')}>
              <p className={cn('text-sm tracking-[0.25em] uppercase', 'text-text-secondary')}>
                {activeCategoryMeta?.title}
              </p>
              <h2 className={cn('font-headline', 'text-2xl md:text-3xl', 'text-accent-primary')}>
                Wählen Sie das passende Paket
              </h2>
              <p
                className={cn(
                  'text-base',
                  'text-text-secondary',
                  'mx-auto max-w-2xl',
                  'font-body leading-relaxed',
                )}
              >
                {activeCategoryMeta?.subtitle}
              </p>
            </div>

            <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8')}>
              {currentServices.map((service, index) => {
                const isHighlighted = index === 1;

                return (
                  <div key={service.id} className={cn('flex h-full flex-col')}>
                    <motion.div
                      variants={fadeInUpVariants}
                      className={cn(
                        'flex h-full flex-col',
                        'rounded-xl border-2',
                        'bg-surface-dark',
                        'transition-all duration-300',
                        isHighlighted
                          ? ['border-brand-primary', 'shadow-shadow-primary-soft', 'scale-[1.01]']
                          : ['border-text-primary-10', 'hover:border-brand-primary-70'],
                      )}
                    >
                      <div className={cn('flex h-full flex-col gap-6 p-6 md:gap-8 md:p-8')}>
                        <div className={cn('flex items-center justify-between')}>
                          <span
                            className={cn(
                              'text-xs font-medium tracking-[0.2em] uppercase md:text-sm',
                              'text-accent-primary/80',
                            )}
                          >
                            {index === 1 ? 'Beliebt' : 'Paket'}
                          </span>
                          <span
                            className={cn(
                              'text-xs font-medium tracking-[0.2em] uppercase md:text-sm',
                              'text-text-tertiary',
                            )}
                          >
                            {service.duration ?? 'Flexibel'}
                          </span>
                        </div>

                        <h3
                          className={cn(
                            'font-headline',
                            'text-xl md:text-2xl',
                            'text-text-primary',
                          )}
                        >
                          {service.title}
                        </h3>

                        <p
                          className={cn(
                            'text-base leading-7',
                            'text-text-tertiary flex-1',
                            'font-body',
                          )}
                        >
                          {service.description}
                        </p>

                        <div
                          className={cn(
                            'flex items-center gap-4',
                            'text-accent-primary text-lg font-semibold',
                          )}
                        >
                          <Euro size={18} />
                          <span>{formatPrice(service.priceFrom, service.priceUnit)}</span>
                        </div>

                        <ul
                          className={cn(
                            'space-y-4 md:space-y-6', // 8pt grid: was md:space-y-5 (20px) → md:space-y-6 (24px)
                            'text-text-secondary text-sm',
                            'font-body',
                          )}
                        >
                          {service.features?.map((feature, featureIndex) => (
                            <li key={featureIndex} className={cn('flex items-center gap-4')}>
                              <ChevronRight
                                size={16}
                                className={cn('text-accent-primary shrink-0')}
                              />
                              <span>{feature}</span>
                            </li>
                          )) || []}
                        </ul>

                        <Button
                          onClick={() => handleServiceBooking(service.id)}
                          variant={index === 1 ? 'default' : 'outline'}
                          className={cn(
                            'w-full items-center justify-center',
                            'text-base font-medium',
                            'transition-all duration-200',
                          )}
                          aria-label={`${service.cta} für ${service.title}`}
                        >
                          {service.cta}
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default ServicesPageInteractive;

/**
 * ServicePageLayout - Reusable Layout for Service Category Pages
 * ==============================================================
 *
 * A comprehensive template for service pages featuring:
 * - Hero section with title, subtitle, and optional CTA
 * - "Suitable For" section listing target audiences
 * - "Process Steps" section explaining the service workflow
 * - Package pricing cards with highlighting support
 * - FAQ accordion section
 * - Customer testimonials with ratings
 * - Bottom CTA section
 * - Custom content areas via children prop
 *
 * @example
 * ```tsx
 * <ServicePageLayout
 *   heroTitle="Hochzeiten"
 *   heroSubtitle="Unvergessliche Cocktails für Ihren großen Tag"
 *   packages={servicePackages.hochzeiten}
 *   faqs={serviceFAQs.hochzeiten}
 *   testimonials={serviceTestimonials.hochzeiten}
 * />
 * ```
 *
 * @component
 * @category Templates
 */

import React from 'react';
import { cn } from '@/utils/classname.ts';
import { Button, Section, Container } from '@/components/atoms/index.ts';
import { ResponsiveImageWithMetadata as ResponsiveImage } from '@/components/atoms/ResponsiveImage/ResponsiveImageWithMetadata.tsx';
import { Link } from 'react-router-dom';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Check from 'lucide-react/dist/esm/icons/check';
import Footer from '@/components/pages/Footer.tsx';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

/**
 * Service package data structure
 *
 * @interface ServicePackage
 * @property {string} name - Package name (e.g., "Premium-Paket")
 * @property {string} price - Display price (e.g., "€2.500")
 * @property {string} [priceDetail] - Additional pricing info (e.g., "für bis zu 150 Gäste")
 * @property {string[]} features - List of included features
 * @property {boolean} [highlighted] - Whether to highlight this package (typically for most popular)
 */
export interface ServicePackage {
  name: string;
  price: string;
  priceDetail?: string;
  features: string[];
  highlighted?: boolean;
}

/**
 * FAQ (Frequently Asked Question) data structure
 *
 * @interface FAQ
 * @property {string} question - The question text
 * @property {string} answer - The detailed answer
 */
export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Customer testimonial data structure
 *
 * @interface Testimonial
 * @property {string} quote - Customer's testimonial quote
 * @property {string} author - Customer's name
 * @property {string} company - Customer's company or event type
 * @property {number} [rating] - Star rating (1-5), renders as stars if provided
 */
export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  rating?: number;
}

/**
 * Props for ServicePageLayout component
 *
 * @interface ServicePageLayoutProps
 */
export interface ServicePageLayoutProps {
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroCtaText?: string; // Top CTA button text
  heroCtaLink?: string; // Top CTA button link

  // "Für wen geeignet?" section
  suitableFor?: {
    title?: string;
    items: string[];
  };

  // "Ablauf & Logistik" section
  processSteps?: {
    title?: string;
    steps: Array<{
      step: string;
      description: string;
    }>;
  };

  // Service packages
  packages: ServicePackage[];
  packagesTitle?: string;

  // FAQ section
  faqs: FAQ[];
  faqTitle?: string;

  // Testimonials
  testimonials: Testimonial[];
  testimonialsTitle?: string;

  // Bottom CTA
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;

  // Optional custom content sections
  children?: React.ReactNode;
}

export const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({
  heroTitle,
  heroSubtitle,
  heroImage: _heroImage,
  heroImageAlt: _heroImageAlt,
  heroCtaText,
  heroCtaLink,
  suitableFor,
  processSteps,
  packages,
  packagesTitle,
  faqs,
  faqTitle,
  testimonials,
  testimonialsTitle,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText,
  ctaButtonLink,
  children,
}) => {
  const { t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const resolvedHeroCtaText = heroCtaText ?? t('servicePageLayout.hero.ctaText');
  const resolvedHeroCtaLink = heroCtaLink ?? '/anfrage';
  const resolvedPackagesTitle = packagesTitle ?? t('servicePageLayout.packages.title');
  const resolvedFaqTitle = faqTitle ?? t('servicePageLayout.faq.title');
  const resolvedTestimonialsTitle = testimonialsTitle ?? t('servicePageLayout.testimonials.title');
  const resolvedCtaTitle = ctaTitle ?? t('servicePageLayout.cta.title');
  const resolvedCtaSubtitle = ctaSubtitle ?? t('servicePageLayout.cta.subtitle');
  const resolvedCtaButtonText = ctaButtonText ?? t('servicePageLayout.cta.button');
  const resolvedCtaButtonLink = ctaButtonLink ?? '/anfrage';

  return (
    <>
      <main id='main-content' className='service-page' role='main'>
        {/* Hero Section - Clean minimal design */}
        <header className='w-full py-8 md:py-16'>
          <div className='mx-auto flex max-w-4xl flex-col items-center px-8 text-center sm:px-8 lg:px-8'>
            <span className='mb-0 text-sm font-semibold text-[rgb(238,120,104)]'>
              {t('servicePageLayout.hero.eyebrow')}
            </span>
            <h1 className='mb-8 text-4xl font-bold tracking-tight text-[#ee7868] md:text-5xl lg:text-6xl'>
              {heroTitle}
            </h1>
            <p className='mb-8 max-w-2xl text-lg leading-relaxed text-[#003141] md:text-xl'>
              {heroSubtitle}
            </p>
            <Button variant='primary' size='lg' asChild>
              <Link to={resolvedHeroCtaLink}>
                {resolvedHeroCtaText}
                <ArrowRight className='ml-0' size={20} />
              </Link>
            </Button>
          </div>

          {_heroImage && (
            <div className='mx-auto mt-16 max-w-6xl px-8 sm:px-8 lg:px-8'>
              <div className='overflow-hidden rounded-2xl border border-white/10 bg-black/20'>
                <ResponsiveImage
                  src={_heroImage}
                  alt={_heroImageAlt || heroTitle}
                  sizes='(max-width: 768px) 100vw, 1024px'
                  aspectRatio='16/9'
                  className='h-full w-full'
                  priority
                  fetchPriority='high'
                />
              </div>
            </div>
          )}
        </header>

        {/* "Für wen geeignet?" Section */}
        {suitableFor && suitableFor.items.length > 0 && (
          <Section
            container='none'
            spacing='lg'
            background='transparent'
            className='suitable-for-section'
          >
            <Container size='default'>
              <h2
                className={cn(
                  'mb-12 text-center text-3xl font-bold md:text-4xl',
                  'text-brand-primary',
                  'font-headline',
                )}
              >
                {suitableFor.title || t('servicePageLayout.suitableFor.title')}
              </h2>
              <div className='grid gap-8 md:grid-cols-2'>
                {suitableFor.items.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      'card flex items-center gap-4 rounded-lg p-4', // 8pt grid: was gap-3 (12px)
                      'border-accent-primary/15 border',
                      'bg-navy',
                    )}
                  >
                    <Check className='text-brand-primary shrink-0' size={24} />
                    <span className='text-text-primary font-medium'>{item}</span>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* Custom Content (if provided) */}
        {children && (
          <Section container='none' spacing='lg' background='transparent'>
            <Container size='default'>{children}</Container>
          </Section>
        )}

        {/* "Ablauf & Logistik" Section */}
        {processSteps && processSteps.steps.length > 0 && (
          <Section
            container='none'
            spacing='lg'
            background='transparent'
            className='process-section bg-black/30'
          >
            <Container size='default'>
              <h2
                className={cn(
                  'mb-12 text-center text-3xl font-bold md:text-4xl',
                  'text-brand-primary',
                  'font-headline',
                )}
              >
                {processSteps.title || t('servicePageLayout.process.title')}
              </h2>
              <div className='space-y-8'>
                {processSteps.steps.map((step, index) => (
                  <div
                    key={index}
                    className={cn(
                      'card flex items-start gap-6 rounded-xl p-6',
                      'border-accent-primary/15 border',
                      'bg-navy',
                    )}
                  >
                    <div
                      className={cn(
                        'h-12 w-12 shrink-0 rounded-full',
                        'bg-brand-primary text-black',
                        'flex items-center justify-center',
                        'text-xl font-bold',
                      )}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className='text-text-primary mb-0 text-xl font-bold'>{step.step}</h3>
                      <p className='text-text-secondary'>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* Packages Section */}
        <Section
          container='none'
          spacing='xl'
          background='transparent'
          className='packages-section bg-black/30'
        >
          <Container size='default'>
            <h2
              className={cn(
                'mb-16 text-center text-4xl font-bold md:text-5xl',
                'text-brand-primary',
                'font-headline',
              )}
            >
              {resolvedPackagesTitle}
            </h2>

            <div
              className={cn(
                'grid gap-8',
                packages.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3',
              )}
            >
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={cn(
                    'package-card card rounded-2xl p-8',
                    'border-2',
                    'transition-all duration-300 hover:scale-105',
                    pkg.highlighted
                      ? 'card--featured border-accent-primary bg-accent-primary/10'
                      : 'border-accent-primary/15 bg-black/50',
                  )}
                >
                  {pkg.highlighted && (
                    <div className={cn('mb-4 text-xs font-bold uppercase', 'text-text-accent')}>
                      {t('servicePageLayout.packages.popularBadge')}
                    </div>
                  )}

                  <h3 className={cn('mb-2 text-2xl font-bold', 'text-text-primary')}>{pkg.name}</h3>

                  <div className='mb-8'>
                    <span className={cn('text-4xl font-bold', 'text-text-accent')}>
                      {pkg.price}
                    </span>
                    {pkg.priceDetail && (
                      <span className='text-text-secondary ml-0'>{pkg.priceDetail}</span>
                    )}
                  </div>

                  <ul className='mb-8 space-y-0'>
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='text-text-secondary flex items-start gap-0'>
                        <Check className='text-text-accent mt-0.5 shrink-0' size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={pkg.highlighted ? 'primary' : 'secondary'}
                    size='lg'
                    className='w-full'
                    asChild
                  >
                    <Link to='/anfrage'>
                      {t('servicePageLayout.packages.cta')}
                      <ArrowRight className='ml-0' size={20} />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <Section
            container='none'
            spacing='xl'
            background='transparent'
            className='testimonials-section'
          >
            <Container size='default'>
              <h2
                className={cn(
                  'mb-16 text-center text-4xl font-bold md:text-5xl',
                  'text-brand-primary',
                  'font-headline',
                )}
              >
                {resolvedTestimonialsTitle}
              </h2>

              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={cn(
                      'testimonial-card card rounded-xl p-8',
                      'border-accent-primary/15 border',
                      'bg-navy',
                    )}
                  >
                    {testimonial.rating && (
                      <div className='mb-8 flex gap-0'>
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className='text-brand-primary text-xl'>
                            ★
                          </span>
                        ))}
                      </div>
                    )}

                    <blockquote className='text-text-secondary mb-8 italic'>
                      "{testimonial.quote}"
                    </blockquote>

                    <div>
                      <div className='text-text-primary font-bold'>{testimonial.author}</div>
                      <div className='text-text-secondary text-sm'>{testimonial.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <Section
            container='none'
            spacing='xl'
            background='transparent'
            className='faq-section bg-black/30'
          >
            <Container size='default'>
              <h2
                className={cn(
                  'mb-16 text-center text-4xl font-bold md:text-5xl',
                  'text-brand-primary',
                  'font-headline',
                )}
              >
                {resolvedFaqTitle}
              </h2>

              <div className='space-y-8'>
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={cn(
                      'faq-item overflow-hidden rounded-xl',
                      'border-accent-primary/15 border',
                      'bg-navy',
                    )}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className={cn(
                        'w-full p-6 text-left',
                        'flex items-center justify-between',
                        'hover:bg-brand-primary-5 transition-colors',
                      )}
                      aria-controls={`faq-panel-${index}`}
                    >
                      <span
                        id={`faq-heading-${index}`}
                        className='text-text-primary pr-8 font-bold'
                      >
                        {faq.question}
                      </span>
                      <span
                        className={cn(
                          'text-brand-primary shrink-0 text-2xl transition-transform',
                          openFaqIndex === index && 'rotate-45',
                        )}
                      >
                        +
                      </span>
                    </button>

                    {openFaqIndex === index && (
                      <div
                        id={`faq-panel-${index}`}
                        role='region'
                        aria-labelledby={`faq-heading-${index}`}
                        className='text-text-secondary px-8 pb-8'
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* Bottom CTA Section */}
        <Section
          container='none'
          spacing='xl'
          background='transparent'
          className={cn('cta-section', 'from-brand-primary-10 bg-linear-to-br to-black')}
        >
          <Container size='default'>
            <h2
              className={cn(
                'mb-6 text-4xl font-bold md:text-5xl',
                'text-[#ee7868]',
                'font-headline',
              )}
            >
              {resolvedCtaTitle}
            </h2>
            <p className='mb-8 text-xl text-[#003141]'>{resolvedCtaSubtitle}</p>
            <Button
              variant='primary'
              size='lg'
              className='bg-[#ee7868] text-white transition-colors duration-200 hover:bg-[#ee7868]/90'
              asChild
            >
              <Link to={resolvedCtaButtonLink}>
                {resolvedCtaButtonText}
                <ArrowRight className='ml-0' size={20} />
              </Link>
            </Button>
          </Container>
        </Section>

        {/* Sticky Bottom CTA Bar */}
        <div
          className={cn(
            'sticky-cta-bar fixed right-0 bottom-0 left-0 z-50',
            'bg-navy border-accent-primary/15 border-t',
            'u-elevation-3 px-6 py-4',
          )}
        >
          <div className='mx-auto flex max-w-7xl items-center justify-between gap-8'>
            <div className='hidden md:block'>
              <span className='text-text-primary font-semibold'>{resolvedCtaTitle}</span>
            </div>
            <Button variant='primary' size='lg' className='ml-auto' asChild>
              <Link to={resolvedCtaButtonLink}>
                {resolvedCtaButtonText}
                <ArrowRight className='ml-0' size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServicePageLayout;

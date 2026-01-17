/**
 * SuccessStories - Social Proof Component
 * ========================================
 * Displays client logos, testimonials, and metrics to build trust.
 * Used on ContactPage, landing pages, and high-intent conversion pages.
 *
 * Features:
 * - Client logo carousel/grid
 * - Key metrics (events, guests, rating)
 * - Optional testimonial quotes
 * - Responsive layout
 */

import React from 'react';
import Pagination from '@/components/ui/Pagination/Pagination.tsx';
import Star from 'lucide-react/dist/esm/icons/star';
import Users from 'lucide-react/dist/esm/icons/users';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Award from 'lucide-react/dist/esm/icons/award';
import Quote from 'lucide-react/dist/esm/icons/quote';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

// Client logos - using placeholder paths, replace with actual client logos
const clientLogos = [
  { name: 'BMW', logo: '/assets/images/clients/bmw-logo.svg', alt: 'BMW Logo' },
  { name: 'Siemens', logo: '/assets/images/clients/siemens-logo.svg', alt: 'Siemens Logo' },
  { name: 'Munich Re', logo: '/assets/images/clients/munich-re-logo.svg', alt: 'Munich Re Logo' },
  { name: 'Allianz', logo: '/assets/images/clients/allianz-logo.svg', alt: 'Allianz Logo' },
  { name: 'SAP', logo: '/assets/images/clients/sap-logo.svg', alt: 'SAP Logo' },
  { name: 'Infineon', logo: '/assets/images/clients/infineon-logo.svg', alt: 'Infineon Logo' },
];

const metrics = [
  {
    icon: Calendar,
    value: '500+',
    labelKey: 'successStories.metrics.events.label',
    descriptionKey: 'successStories.metrics.events.description',
  },
  {
    icon: Users,
    value: '50.000+',
    labelKey: 'successStories.metrics.guests.label',
    descriptionKey: 'successStories.metrics.guests.description',
  },
  {
    icon: Star,
    value: '5/5',
    labelKey: 'successStories.metrics.rating.label',
    descriptionKey: 'successStories.metrics.rating.description',
  },
  {
    icon: Award,
    value: '100%',
    labelKey: 'successStories.metrics.recommendation.label',
    descriptionKey: 'successStories.metrics.recommendation.description',
  },
];

const testimonials = [
  {
    quote:
      'Die Velo.Bar war der Publikumsmagnet auf unserem Messestand. Die Verweildauer hat sich verdreifacht – und wir hatten die besten Leads der ganzen Messe.',
    author: 'Marketing Director',
    company: 'Tech-Unternehmen, Messe München',
    eventType: 'Messe',
  },
  {
    quote:
      'Professionell, flexibel und kreativ. Das Team hat unseren Signature Drink in unseren Markenfarben kreiert – ein echter Gesprächsstarter.',
    author: 'Head of Events',
    company: 'DAX-Konzern, Sommerfest',
    eventType: 'Firmenfeier',
  },
  {
    quote:
      'Von der ersten Anfrage bis zum Abbau: Reibungslos. Das selbstversorgende System war perfekt für unseren Rooftop-Event ohne Wasseranschluss.',
    author: 'Event Manager',
    company: 'Startup, Product Launch',
    eventType: 'Launch Event',
  },
];

interface SuccessStoriesProps {
  /** Display variant */
  variant?: 'full' | 'compact' | 'metrics-only' | 'logos-only';
  /** Show testimonials */
  showTestimonials?: boolean;
  /** Optional: number of testimonials per page. If provided, pagination UI will be shown. */
  testimonialsPageSize?: number;
  /** Custom className */
  className?: string;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({
  variant = 'full',
  showTestimonials = true,
  className = '',
  title,
  subtitle,
  testimonialsPageSize,
}) => {
  const { t } = useLanguage();
  const [tPage, setTPage] = React.useState(1);
  const resolvedTitle = title ?? t('successStories.title');
  const resolvedSubtitle = subtitle ?? t('successStories.subtitle');
  const tPageSize = testimonialsPageSize ?? testimonials.length;
  const start = (tPage - 1) * tPageSize;
  const end = start + tPageSize;
  const displayedTestimonials = testimonialsPageSize
    ? testimonials.slice(start, end)
    : testimonials;
  // Metrics-only variant
  if (variant === 'metrics-only') {
    return (
      <div className={`py-8 ${className}`}>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {metrics.map((metric, index) => (
            <div key={index} className='text-center'>
              <div className='badge-metric-circle h-12 w-12 inline-flex items-center justify-center mb-0'>
                <metric.icon className='text-accent-primary h-6 w-6' />
              </div>
              <div className='text-on-light font-bold'>{metric.value}</div>
              <div className='text-sm text-black/70'>{t(metric.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Logos-only variant
  if (variant === 'logos-only') {
    return (
      <div className={`py-8 ${className}`}>
        <p className='mb-8 text-center text-sm text-black/60'>{t('clientLogos.title')}</p>
        <div className='flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition transition-all duration-200 ease-out hover:grayscale-0'>
          {clientLogos.map((client, index) => (
            <div key={index} className='flex h-8 items-center md:h-10'>
              {/* Fallback to text if logo doesn't exist */}
              <span className='text-lg font-semibold text-black/50'>{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Compact variant - for sidebars
  if (variant === 'compact') {
    return (
      <div className={`bg-surface-tinted rounded-xl p-6 ${className}`}>
        <h3 className='text-on-light mb-8 text-lg font-bold'>{t('whyVeloBarSection.title')}</h3>
        <div className='space-y-8'>
          {metrics.slice(0, 3).map((metric, index) => (
            <div key={index} className='flex items-center gap-0'>
              <div className='bg-accent-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg'>
                <metric.icon className='text-accent-primary h-5 w-5' />
              </div>
              <div>
                <div className='text-on-light font-bold'>{metric.value}</div>
                <div className='text-sm text-black/70'>{t(metric.labelKey)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini testimonial */}
        <div className='mt-8 border-t border-black/10 pt-8'>
          <div className='mb-0 flex items-center gap-0'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className='fill-accent-primary text-accent-primary h-4 w-4' />
            ))}
          </div>
          <p className='text-sm text-black/70 italic'>
            "{testimonials[0].quote.substring(0, 100)}..."
          </p>
          <p className='mt-0 text-xs text-black/60'>
            — {testimonials[0].author}, {testimonials[0].company}
          </p>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <section className={`py-16 ${className}`}>
      <div className='mx-auto max-w-6xl px-8 sm:px-8 lg:px-8'>
        {/* Header */}
        <div className='mb-16 text-center'>
          <h2 className='text-on-light mb-8 text-3xl font-bold md:text-4xl'>{resolvedTitle}</h2>
          <p className='mx-auto max-w-2xl text-lg text-black/70'>{resolvedSubtitle}</p>
        </div>

        {/* Client Logos */}
        <div className='mb-16'>
          <p className='mb-8 text-center text-sm font-medium tracking-wide text-black/60 uppercase'>
            {t('successStories.featuredAt')}
          </p>
          <div className='flex flex-wrap items-center justify-center gap-8'>
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className='flex h-10 items-center opacity-50 grayscale transition transition-opacity duration-200 ease-out hover:opacity-100 hover:grayscale-0 md:h-12'
              >
                {/* Using text as fallback - replace with actual <img> when logos are available */}
                <span className='text-xl font-bold text-black/50 transition transition-colors duration-200 ease-out hover:text-black/70'>
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className='from-navy to-navy-light mb-16 rounded-2xl bg-linear-to-br p-8 md:p-16'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            {metrics.map((metric, index) => (
              <div key={index} className='text-center'>
                <div className='mb-8 inline-flex h-14 h-full w-14 flex-col items-center justify-center rounded-full bg-white/10'>
                  <metric.icon className='text-accent-primary h-7 w-7' />
                </div>
                <div className='mb-0 text-3xl font-bold text-white md:text-4xl'>{metric.value}</div>
                <div className='text-sm font-medium text-white/80'>{t(metric.labelKey)}</div>
                <div className='text-xs text-white/80'>{t(metric.descriptionKey)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {showTestimonials && (
          <div>
            <div className='grid gap-8 md:grid-cols-3'>
              {displayedTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className='bg-navy-light flex h-full flex-col rounded-xl border border-white/10 p-8 shadow-sm transition transition-shadow duration-200 ease-out hover:shadow-md'
                >
                  <div className='mb-8 flex items-center gap-0'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className='fill-accent-primary text-accent-primary h-4 w-4'
                      />
                    ))}
                  </div>
                  <Quote className='mb-0 h-8 w-8 text-black/20' />
                  <p className='mb-8 leading-relaxed text-black/80'>"{testimonial.quote}"</p>
                  <div className='flex h-full flex-col border-t border-black/10 pt-8'>
                    <p className='text-on-light font-medium'>{testimonial.author}</p>
                    <p className='text-sm text-black/60'>{testimonial.company}</p>
                    <span className='bg-accent-primary/10 text-accent-primary mt-0 flex inline-block h-full flex-col rounded px-0 py-0 text-xs font-medium'>
                      {testimonial.eventType}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination for testimonials when pageSize provided */}
            {testimonialsPageSize && testimonials.length > testimonialsPageSize && (
              <div className='mt-8 flex items-center justify-center'>
                <Pagination
                  page={tPage}
                  onPageChange={(p) => setTPage(p)}
                  pageSize={tPageSize}
                  hasNext={end < testimonials.length}
                  isLoading={false}
                  ariaLabelPrefix='Testimonials'
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStories;

/**
 * FAQSection Component
 * ====================
 * Clean, minimal FAQ section with 3-column grid layout
 * Can be used standalone or with separate PageHeader
 */

import React from 'react';
import { cn } from '@/utils/classname.ts';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  emailLink?: string;
  items: FAQ[];
  className?: string;
  showHeader?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Häufig gestellte Fragen',
  subtitle,
  emailLink = 'mailto:hallo@velo-bar.com',
  items,
  className = '',
  showHeader = false,
}) => {
  return (
    <section
      className={cn('w-full py-16 md:py-24', className)}
      aria-labelledby={showHeader ? 'faq-heading' : undefined}
    >
      <div className='mx-auto max-w-7xl px-8 sm:px-8 lg:px-8'>
        {/* Header - only show if showHeader is true */}
        {showHeader && (
          <div className='mb-16 text-center md:mb-16'>
            <h2
              id='faq-heading'
              className='section-title mb-8 text-3xl font-bold md:text-4xl lg:text-5xl'
            >
              {title}
            </h2>
            {subtitle ? (
              <p className='section-description mx-auto max-w-2xl text-base md:text-lg'>
                {subtitle}
              </p>
            ) : (
              <p className='section-description mx-auto max-w-2xl text-base md:text-lg'>
                Haben Sie eine andere Frage? Kontaktieren Sie uns per{' '}
                <a
                  href={emailLink}
                  className='text-accent-primary hover:text-accent-primary-hover underline underline-offset-2 transition-colors duration-200 ease-out'
                >
                  E-Mail
                </a>{' '}
                und wir melden uns so schnell wie möglich.
              </p>
            )}
          </div>
        )}

        {/* FAQ Grid */}
        <div
          className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3'
          role='list'
          aria-label='FAQ items'
        >
          {items.map((item) => (
            <article key={item.id} className='flex flex-col' role='listitem'>
              <h3 className='mb-0 text-base font-semibold text-[rgb(0,49,65)]'>{item.question}</h3>
              <p className='text-sm leading-relaxed text-[rgb(0,30,50)]'>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

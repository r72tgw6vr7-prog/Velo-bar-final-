/**
 * FAQPage - Frequently Asked Questions Page
 * ==========================================
 * Standalone FAQ page with clean header and grid layout
 * Optimized for voice search and SEO rich snippets
 */

import React, { useMemo } from 'react';
import { FAQSection } from '@/sections/FAQSection.tsx';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { getFAQSchema } from '@/seo/schema.ts';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { HeroHeading } from '@/components/ui/HeroHeading.tsx';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

const FAQPage: React.FC = () => {
  const { language, t } = useLanguage();

  const faqItems = useMemo(
    () => [
      {
        id: 'faq-1',
        question: t('pages.faq.items.0.question'),
        answer: t('pages.faq.items.0.answer'),
      },
      {
        id: 'faq-2',
        question: t('pages.faq.items.1.question'),
        answer: t('pages.faq.items.1.answer'),
      },
      {
        id: 'faq-3',
        question: t('pages.faq.items.2.question'),
        answer: t('pages.faq.items.2.answer'),
      },
      {
        id: 'faq-4',
        question: t('pages.faq.items.3.question'),
        answer: t('pages.faq.items.3.answer'),
      },
      {
        id: 'faq-5',
        question: t('pages.faq.items.4.question'),
        answer: t('pages.faq.items.4.answer'),
      },
      {
        id: 'faq-6',
        question: t('pages.faq.items.5.question'),
        answer: t('pages.faq.items.5.answer'),
      },
      {
        id: 'faq-7',
        question: t('pages.faq.items.6.question'),
        answer: t('pages.faq.items.6.answer'),
      },
      {
        id: 'faq-8',
        question: t('pages.faq.items.7.question'),
        answer: t('pages.faq.items.7.answer'),
      },
      {
        id: 'faq-9',
        question: t('pages.faq.items.8.question'),
        answer: t('pages.faq.items.8.answer'),
      },
      {
        id: 'faq-10',
        question: t('pages.faq.items.9.question'),
        answer: t('pages.faq.items.9.answer'),
      },
    ],
    [language, t],
  );

  const faqSnippets = useMemo(
    () => [
      {
        category: 'booking',
        title: t('pages.faq.snippets.booking.title'),
        items: [
          {
            question: t('pages.faq.snippets.booking.items.0.question'),
            answer: t('pages.faq.snippets.booking.items.0.answer'),
          },
          {
            question: t('pages.faq.snippets.booking.items.1.question'),
            answer: t('pages.faq.snippets.booking.items.1.answer'),
          },
          {
            question: t('pages.faq.snippets.booking.items.2.question'),
            answer: t('pages.faq.snippets.booking.items.2.answer'),
          },
        ],
      },
      {
        category: 'logistics',
        title: t('pages.faq.snippets.logistics.title'),
        items: [
          {
            question: t('pages.faq.snippets.logistics.items.0.question'),
            answer: t('pages.faq.snippets.logistics.items.0.answer'),
          },
          {
            question: t('pages.faq.snippets.logistics.items.1.question'),
            answer: t('pages.faq.snippets.logistics.items.1.answer'),
          },
          {
            question: t('pages.faq.snippets.logistics.items.2.question'),
            answer: t('pages.faq.snippets.logistics.items.2.answer'),
          },
        ],
      },
      {
        category: 'services',
        title: t('pages.faq.snippets.services.title'),
        items: [
          {
            question: t('pages.faq.snippets.services.items.0.question'),
            answer: t('pages.faq.snippets.services.items.0.answer'),
          },
          {
            question: t('pages.faq.snippets.services.items.1.question'),
            answer: t('pages.faq.snippets.services.items.1.answer'),
          },
          {
            question: t('pages.faq.snippets.services.items.2.question'),
            answer: t('pages.faq.snippets.services.items.2.answer'),
          },
        ],
      },
      {
        category: 'sustainability',
        title: t('pages.faq.snippets.sustainability.title'),
        items: [
          {
            question: t('pages.faq.snippets.sustainability.items.0.question'),
            answer: t('pages.faq.snippets.sustainability.items.0.answer'),
          },
          {
            question: t('pages.faq.snippets.sustainability.items.1.question'),
            answer: t('pages.faq.snippets.sustainability.items.1.answer'),
          },
        ],
      },
      {
        category: 'events',
        title: t('pages.faq.snippets.events.title'),
        items: [
          {
            question: t('pages.faq.snippets.events.items.0.question'),
            answer: t('pages.faq.snippets.events.items.0.answer'),
          },
          {
            question: t('pages.faq.snippets.events.items.1.question'),
            answer: t('pages.faq.snippets.events.items.1.answer'),
          },
        ],
      },
    ],
    [language, t],
  );

  // Generate FAQ schema for rich snippets
  const faqSchema = getFAQSchema(faqItems);

  return (
    <SiteBackground>
      <PageTemplate
        title={t('pages.faq.seo.title')}
        description={t('pages.faq.seo.description')}
        canonicalPath='/faq'
        withContainer={false}
        background='transparent'
        structuredData={faqSchema}
      >
        <HeroHeading
          eyebrow={t('pages.faq.hero.eyebrow')}
          title={t('pages.faq.hero.title')}
          subtitle={t('pages.faq.hero.subtitle')}
        />

        {/* Voice Search Optimized FAQ Snippets */}
        <Section container='narrow' spacing='md' background='light'>
          <div className='mb-16 text-center'>
            <h2 className='vb-heading-1 mb-8 text-center text-accent-primary'>
              {t('pages.faq.snippetSection.title')}
            </h2>
            <p className='vb-lead text-center'>{t('pages.faq.snippetSection.subtitle')}</p>
          </div>

          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {faqSnippets.map((category) => (
              <div key={category.category} className='space-y-8'>
                <h3 className='text-on-light border-b border-black/10 pb-8 text-lg font-semibold'>
                  {category.title}
                </h3>
                <div className='space-y-8'>
                  {category.items.map((faq, index) => (
                    <article
                      key={index}
                      className='snippet-block flex h-full flex-col rounded-r-lg bg-(--color-bg-surface) p-8'
                    >
                      <h4 className='mb-8 text-base font-semibold text-accent-primary'>
                        {faq.question}
                      </h4>
                      <p className='text-sm leading-relaxed text-(--color-text-on-light-secondary)'>
                        {faq.answer}
                      </p>
                    </article>
                  ))}
                </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Traditional FAQ Grid */}
      <FAQSection items={faqItems} className='pt-0' />
    </PageTemplate>
  </SiteBackground>
  );
};

export default FAQPage;

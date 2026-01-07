import React from 'react';
import { Container } from '@/components/atoms/Container/index.ts';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { Button } from '@/components/atoms/Button/index.ts';
import { cn } from '@/utils/classname.ts';

export type ServicePageTemplateProps = {
  heroTitle: React.ReactNode;
  heroSubtitle?: React.ReactNode;
  heroEyebrow?: React.ReactNode;
  heroCtaText?: string;
  heroCtaHref?: string;
  heroAside?: React.ReactNode;
  sections?: Array<{
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    content: React.ReactNode;
  }>;
  stats?: React.ReactNode;
  ctaTitle?: React.ReactNode;
  ctaSubtitle?: React.ReactNode;
  ctaButtonText?: string;
  ctaButtonHref?: string;
  className?: string;
};

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  heroTitle,
  heroSubtitle,
  heroEyebrow,
  heroCtaText = 'Jetzt anfragen',
  heroCtaHref = '/anfrage',
  heroAside,
  sections = [],
  stats,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText = 'Jetzt anfragen',
  ctaButtonHref = '/anfrage',
  className,
}) => {
  return (
    <div className={cn('min-h-screen bg-(--color-bg-page) text-(--color-text-on-dark)', className)}>
      <Section className='pt-12 pb-8 sm:pt-16'>
        <Container className='grid items-center gap-8 lg:grid-cols-[2fr_1fr]'>
          <div className='space-y-4'>
            {heroEyebrow && (
              <p className='text-xs tracking-[0.3em] text-(--color-text-on-dark-secondary) uppercase'>
                {heroEyebrow}
              </p>
            )}
            <h1 className='text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl'>
              {heroTitle}
            </h1>
            {heroSubtitle && (
              <p className='text-lg text-(--color-text-on-dark-secondary)'>{heroSubtitle}</p>
            )}
            <div className='flex flex-wrap gap-3 pt-2'>
              <Button asChild variant='primary'>
                <a href={heroCtaHref}>{heroCtaText}</a>
              </Button>
              <Button asChild variant='ghost'>
                <a href='#details'>Details anzeigen</a>
              </Button>
            </div>
          </div>

          {heroAside && <div className='lg:justify-self-end'>{heroAside}</div>}
        </Container>
      </Section>

      {stats && (
        <Section className='py-10' id='stats'>
          <Container>{stats}</Container>
        </Section>
      )}

      {sections.length > 0 && (
        <Section className='py-12 sm:py-16' id='details'>
          <Container className='space-y-12'>
            {sections.map((section, idx) => (
              <div key={idx} className='space-y-3'>
                {section.title && (
                  <h2 className='text-2xl font-semibold sm:text-3xl'>{section.title}</h2>
                )}
                {section.subtitle && (
                  <p className='text-(--color-text-on-dark-secondary)'>{section.subtitle}</p>
                )}
                <div className='prose prose-invert max-w-none'>{section.content}</div>
              </div>
            ))}
          </Container>
        </Section>
      )}

      {(ctaTitle || ctaSubtitle) && (
        <Section className='py-12 sm:py-16'>
          <Container className='space-y-4 rounded-2xl border border-(--color-border-on-dark)/60 bg-(--color-bg-surface) p-8 text-center sm:p-12'>
            {ctaTitle && <h2 className='text-2xl font-semibold sm:text-3xl'>{ctaTitle}</h2>}
            {ctaSubtitle && (
              <p className='mx-auto max-w-2xl text-(--color-text-on-dark-secondary)'>
                {ctaSubtitle}
              </p>
            )}
            <div className='flex justify-center'>
              <Button asChild variant='primary' size='lg'>
                <a href={ctaButtonHref}>{ctaButtonText}</a>
              </Button>
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
};

export default ServicePageTemplate;

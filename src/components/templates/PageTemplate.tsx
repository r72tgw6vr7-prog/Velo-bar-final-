import React from 'react';
import { Container } from '@/components/atoms/Container/index.ts';
import { Section } from '@/components/atoms/Section/Section.tsx';
import { cn } from '@/utils/classname.ts';

export type PageTemplateProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: React.ReactNode;
  hero?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  padded?: boolean;
  background?: 'default' | 'light' | 'dark';
  className?: string;
};

const backgroundMap: Record<NonNullable<PageTemplateProps['background']>, string> = {
  default: 'text-[rgb(0,49,65)]' /* deep teal on light gradient bg */,
  light: 'bg-(--color-bg-light) text-(--color-text-on-light)',
  dark: 'bg-(--color-bg-dark) text-(--color-text-on-dark)',
};

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  subtitle,
  eyebrow,
  hero,
  footer,
  children,
  padded = true,
  background = 'default',
  className,
}) => {
  return (
    <div className={cn('min-h-screen', backgroundMap[background], className)}>
      {hero && <div className='relative isolate'>{hero}</div>}

      <Section className={padded ? 'py-12 sm:py-16' : 'py-0'}>
        <Container className='space-y-8'>
          {(eyebrow || title || subtitle) && (
            <header className='space-y-2'>
              {eyebrow && (
                <p className='text-xs tracking-[0.3em] text-[rgb(238,120,104)] uppercase'>
                  {eyebrow}
                </p>
              )}
              {title && (
                <h1 className='text-3xl leading-tight font-bold text-[rgb(0,49,65)] sm:text-4xl'>
                  {title}
                </h1>
              )}
              {subtitle && <p className='text-[rgb(0,30,50)]'>{subtitle}</p>}
            </header>
          )}

          <div className='space-y-8'>{children}</div>
        </Container>
      </Section>

      {footer && (
        <footer className='border-t border-(--color-border-on-dark)/40 bg-(--color-bg-surface) text-(--color-text-on-dark)'>
          <Container className='py-8 sm:py-12'>{footer}</Container>
        </footer>
      )}
    </div>
  );
};

export default PageTemplate;

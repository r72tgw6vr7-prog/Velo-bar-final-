/**
 * DatenschutzPage - Privacy Policy
 */

import React from 'react';
import { PageHeader } from '@/components/atoms/PageHeader.tsx';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

interface DatenschutzPageProps {
  language?: 'DE' | 'EN';
}

export function DatenschutzPage({ language: _language = 'DE' }: DatenschutzPageProps) {
  const { t } = useLanguage();
  const title = t('pages.datenschutz.title');
  const subtitle = undefined;

  return (
    <SiteBackground>
      <PageTemplate
        title={title}
        description={subtitle}
        withContainer={false}
        background='transparent'
      >
        <PageHeader eyebrow={t('pages.legal.eyebrow')} title={title} subtitle={subtitle} />

        <div className='mx-auto max-w-4xl px-8 py-16 sm:px-8 lg:px-8'>
          {/* Introduction */}
          <section className='mb-16'>
            <p className='mb-8 leading-relaxed text-white/70'>
              {t('pages.datenschutz.intro.p1')}
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>{t('pages.datenschutz.intro.list1.0')}</li>
              <li>{t('pages.datenschutz.intro.list1.1')}</li>
              <li>{t('pages.datenschutz.intro.list1.2')}</li>
            </ul>
            <p className='mb-8 leading-relaxed text-white/70'>
              {t('pages.datenschutz.intro.p2')}
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>{t('pages.datenschutz.intro.list2.0')}</li>
              <li>{t('pages.datenschutz.intro.list2.1')}</li>
              <li>{t('pages.datenschutz.intro.list2.2')}</li>
              <li>{t('pages.datenschutz.intro.list2.3')}</li>
              <li>{t('pages.datenschutz.intro.list2.4')}</li>
              <li>{t('pages.datenschutz.intro.list2.5')}</li>
            </ul>
            <p className='mb-8 leading-relaxed text-white/70'>
              {t('pages.datenschutz.intro.p3')}
            </p>
          </section>

          {/* Definitions */}
          <section className='mb-16'>
            <h2 className='text-on-light mb-8 text-2xl font-bold'>{t('pages.datenschutz.cookies.heading')}</h2>
            <p className='mb-8 leading-relaxed text-white/70'>
              {t('pages.datenschutz.cookies.p1')}
            </p>
            <p className='mb-8 leading-relaxed text-white/70'>
              {t('pages.datenschutz.cookies.p2Prefix')}{' '}
              <a
                href='https://support.squarespace.com/hc/articles/360001264507'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                {t('pages.datenschutz.cookies.linkText')}
              </a>
              {t('pages.datenschutz.cookies.p2Suffix')}
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>
                <a
                  href='https://support.squarespace.com/hc/articles/360001264507'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  {t('pages.datenschutz.cookies.li1.linkText')}
                </a>
                {t('pages.datenschutz.cookies.li1.suffix')}
              </li>
              <li>
                <a
                  href='https://support.squarespace.com/hc/articles/360001264507'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  {t('pages.datenschutz.cookies.li2.linkText')}
                </a>{' '}
                {t('pages.datenschutz.cookies.li2.suffix')}
              </li>
            </ul>
          </section>

          {/* Sections */}
          <section className='mb-16'>
            <h2 className='text-on-light mb-8 text-2xl font-bold'>{t('pages.datenschutz.hosting.heading')}</h2>
            <p className='mb-8 leading-relaxed text-white/70'>
              {t('pages.datenschutz.hosting.p1')}
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>{t('pages.datenschutz.hosting.list.0')}</li>
              <li>{t('pages.datenschutz.hosting.list.1')}</li>
              <li>{t('pages.datenschutz.hosting.list.2')}</li>
            </ul>
            <p className='mb-8 leading-relaxed text-white/70'>
              {t('pages.datenschutz.hosting.p2')}
            </p>

            <h2 className='text-on-light mb-8 text-2xl font-bold'>{t('pages.datenschutz.fonts.heading')}</h2>
            <p className='mb-8 leading-relaxed text-white/70'>
              {t('pages.datenschutz.fonts.p1')}
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>{t('pages.datenschutz.fonts.list.0')}</li>
              <li>{t('pages.datenschutz.fonts.list.1')}</li>
            </ul>
          </section>

          <p className='rounded-lg bg-(--color-bg-surface-tinted) p-8 text-sm text-black/50'>
            {t('pages.datenschutz.closing')}
          </p>
        </div>
      </PageTemplate>
    </SiteBackground>
  );
}

export default DatenschutzPage;

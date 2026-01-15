/**
 * ImpressumPage - Legal Notice
 */

import React, { useMemo } from 'react';
import { PageHeader } from '@/components/atoms/PageHeader.tsx';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

interface ImpressumPageProps {
  language?: 'DE' | 'EN';
}

type ImpressumSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
};
export const ImpressumPage: React.FC<ImpressumPageProps> = ({ language: _language = 'DE' }) => {
  const { t } = useLanguage();
  const title = t('pages.impressum.title');
  const subtitle = undefined;

  const impressumSections: readonly ImpressumSection[] = useMemo(
    () => [
      {
        id: 'tmg',
        title: t('pages.impressum.sections.tmg.title'),
        paragraphs: [
          t('pages.impressum.sections.tmg.paragraphs.0'),
          t('pages.impressum.sections.tmg.paragraphs.1'),
          t('pages.impressum.sections.tmg.paragraphs.2'),
          t('pages.impressum.sections.tmg.paragraphs.3'),
        ],
      },
      {
        id: 'represented-by',
        title: t('pages.impressum.sections.representedBy.title'),
        paragraphs: [
          t('pages.impressum.sections.representedBy.paragraphs.0'),
          t('pages.impressum.sections.representedBy.paragraphs.1'),
        ],
      },
      {
        id: 'contact',
        title: t('pages.impressum.sections.contact.title'),
        paragraphs: [
          t('pages.impressum.sections.contact.paragraphs.0'),
          t('pages.impressum.sections.contact.paragraphs.1'),
        ],
      },
      {
        id: 'eu-dispute',
        title: t('pages.impressum.sections.euDispute.title'),
        paragraphs: [
          t('pages.impressum.sections.euDispute.paragraphs.0'),
          t('pages.impressum.sections.euDispute.paragraphs.1'),
          t('pages.impressum.sections.euDispute.paragraphs.2'),
        ],
      },
      {
        id: 'consumer-dispute',
        title: t('pages.impressum.sections.consumerDispute.title'),
        paragraphs: [t('pages.impressum.sections.consumerDispute.paragraphs.0')],
      },
      {
        id: 'liability-content',
        title: t('pages.impressum.sections.liabilityContent.title'),
        paragraphs: [t('pages.impressum.sections.liabilityContent.paragraphs.0')],
      },
      {
        id: 'liability-links',
        title: t('pages.impressum.sections.liabilityLinks.title'),
        paragraphs: [t('pages.impressum.sections.liabilityLinks.paragraphs.0')],
      },
      {
        id: 'copyright',
        title: t('pages.impressum.sections.copyright.title'),
        paragraphs: [t('pages.impressum.sections.copyright.paragraphs.0')],
      },
      {
        id: 'cancellation-fees',
        title: t('pages.impressum.sections.cancellationFees.title'),
        paragraphs: [t('pages.impressum.sections.cancellationFees.paragraphs.0')],
        listItems: [
          t('pages.impressum.sections.cancellationFees.listItems.0'),
          t('pages.impressum.sections.cancellationFees.listItems.1'),
          t('pages.impressum.sections.cancellationFees.listItems.2'),
        ],
      },
    ],
    [t],
  );

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
          {impressumSections.map((section) => (
            <section key={section.id} className='mb-16'>
              <h2 className='text-on-light mb-8 text-2xl font-bold'>{section.title}</h2>

              {section.paragraphs?.map((paragraph, index) => {
                const isUrl = paragraph.startsWith('http://') || paragraph.startsWith('https://');
                return (
                  <p key={index} className='mb-8 leading-relaxed text-white/70'>
                    {isUrl ? (
                      <a
                        href={paragraph}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='underline'
                      >
                        {paragraph}
                      </a>
                    ) : (
                      paragraph
                    )}
                  </p>
                );
              })}

              {section.listItems && (
                <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
                  {section.listItems.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </PageTemplate>
    </SiteBackground>
  );
};

export default ImpressumPage;

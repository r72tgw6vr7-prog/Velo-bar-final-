/**
 * AGBPage - Terms and Conditions
 */

import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate';
import { agbContent } from '@/content/agb';
import { HeroHeading } from '@/components/ui/HeroHeading';

export const AGBPage: React.FC = () => {
  return (
    <PageTemplate
      title={agbContent.seoTitle}
      description={agbContent.seoDescription}
      withContainer={false}
      background='transparent'
    >
      <div className='bg-navy'>
        <HeroHeading
          eyebrow={agbContent.hero.eyebrow}
          title={agbContent.hero.title}
          subtitle={agbContent.hero.subtitle}
        />

        <div className='mx-auto max-w-4xl px-8 py-16 sm:px-8 lg:px-8'>
          {agbContent.sections.map((section) => (
            <section key={section.id} className='mb-16'>
              <h2 className='text-on-light mb-8 text-2xl font-bold'>{section.title}</h2>
              {section.body?.map((paragraph, index) => (
                <p key={index} className='mb-8 leading-relaxed text-white/70'>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default AGBPage;

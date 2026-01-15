import React from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <SiteBackground>
      <PageTemplate
        title={t('notFound.seoTitle')}
        description={t('notFound.seoDescription')}
        withContainer={true}
        containerSize='narrow'
        background='darker'
        spacing='lg'
      >
        <div className='flex flex-col items-center justify-center text-center'>
          <h1 className='mb-8 text-4xl font-(--font-heading) text-(--color-coral) md:text-5xl lg:text-6xl'>
            {t('notFound.eyebrow')}
          </h1>
          <h2 className='mb-8 text-xl font-(--font-heading) text-(--brand-white) md:text-2xl'>
            {t('notFound.title')}
          </h2>
          <p className='mx-auto mb-8 max-w-md text-base text-(--chrome-silver) md:text-lg'>
            {t('notFound.body')}
          </p>
          <Link
            to='/'
            className='inline-block rounded bg-(--brand-grey) px-8 py-8 text-base font-medium text-black transition-all duration-300 hover:bg-(--brand-grey)/80 md:text-lg'
          >
            {t('notFound.cta')}
          </Link>
        </div>
      </PageTemplate>
    </SiteBackground>
  );
};

export default NotFoundPage;

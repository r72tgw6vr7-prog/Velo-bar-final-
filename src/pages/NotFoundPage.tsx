import React from 'react';
import { Link } from 'react-router-dom';
import { PageTemplate } from '@/templates/PageTemplate';
import { notFoundContent } from '@/content/notFound.ts';

export const NotFoundPage: React.FC = () => {
  return (
    <PageTemplate
      title={notFoundContent.seoTitle}
      description={notFoundContent.seoDescription}
      withContainer={true}
      containerSize='narrow'
      background='darker'
      spacing='lg'
    >
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className='mb-8 text-4xl font-(--font-heading) text-(--color-coral) md:text-5xl lg:text-6xl'>
          {notFoundContent.hero.eyebrow}
        </h1>
        <h2 className='mb-8 text-xl font-(--font-heading) text-(--brand-white) md:text-2xl'>
          {notFoundContent.hero.title}
        </h2>
        <p className='mx-auto mb-8 max-w-md text-base text-(--chrome-silver) md:text-lg'>
          {notFoundContent.sections[0]?.body?.[0]}
        </p>
        <Link
          to='/'
          className='inline-block rounded bg-(--brand-grey) px-8 py-8 text-base font-medium text-black transition-all duration-300 hover:bg-(--brand-grey)/80 md:text-lg'
        >
          {notFoundContent.ctaLabel}
        </Link>
      </div>
    </PageTemplate>
  );
};

export default NotFoundPage;

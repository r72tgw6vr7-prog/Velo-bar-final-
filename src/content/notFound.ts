import type { NotFoundPageContent } from './types';

export const notFoundContent: NotFoundPageContent = {
  slug: 'not-found',
  seoTitle: '404 - Page Not Found',
  seoDescription: 'The page you are looking for could not be found.',
  hero: {
    eyebrow: '404',
    title: 'Page Not Found',
    subtitle: 'The page you requested does not exist or has been moved.',
  },
  sections: [
    {
      id: 'default',
      title: 'Not Found',
      body: [
        "The page you're looking for doesn't exist. Please check the URL or return to the home page.",
      ],
    },
  ],
  ctaLabel: 'Return to Home',
};

import { Helmet } from 'react-helmet-async';

interface MetaProps {
  title: string;
  description: string;
  canonicalPath: string; // starts with '/'
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string[];
  author?: string;
  robots?: string;
  hreflang?: { [lang: string]: string };
  alternateLocale?: string[];
  /** JSON-LD structured data object(s) for SEO rich results */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://www.velo-bar.com';
const DEFAULT_OG_IMAGE = '/assets/backgrounds/cosmic-unified.jpg';

export default function Meta({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords,
  author,
  robots = 'index,follow',
  hreflang,
  alternateLocale,
  structuredData,
}: MetaProps) {
  const path = canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const url = `${BASE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='robots' content={robots} />
      {keywords && <meta name='keywords' content={keywords.join(', ')} />}
      {author && <meta name='author' content={author} />}

      {/* Canonical */}
      <link rel='canonical' href={url} />

      {/* Homepage specific preload for hero LCP */}
      {canonicalPath === '/' && (
        <link
          rel='preload'
          as='image'
          href='/Velo%20Gallery/mobile-bar-hero.jpg'
          fetchPriority='high'
        />
      )}

      {/* Hreflang alternate links */}
      {hreflang &&
        Object.entries(hreflang).map(([lang, href]) => (
          <link key={lang} rel='alternate' hrefLang={lang} href={href} />
        ))}

      {/* Open Graph */}
      <meta property='og:type' content={ogType} />
      <meta property='og:url' content={url} />
      <meta property='og:site_name' content='Velo.Bar – Mobile Cocktailbar & Event Catering' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={fullImageUrl} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:locale' content='de_DE' />

      {/* Preconnect to common font hosts to speed up font delivery */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

      {/* Alternate locales */}
      {alternateLocale &&
        alternateLocale.map((locale) => (
          <meta key={locale} property='og:locale:alternate' content={locale} />
        ))}

      {/* Twitter */}
      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:url' content={url} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullImageUrl} />
      <meta name='twitter:site' content='@velobar' />

      {/* Additional structured markup */}
      <meta name='application-name' content='Velo.Bar – Mobile Cocktailbar & Event Catering' />
      <meta name='theme-color' content='var(--color-accent-primary)' />

      {/* JSON-LD Structured Data for SEO rich results */}
      {structuredData && (
        <script type='application/ld+json'>{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

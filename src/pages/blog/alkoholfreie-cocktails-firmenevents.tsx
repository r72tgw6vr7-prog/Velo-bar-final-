import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { Link } from 'react-router-dom';
import { SITE_URL } from '@/lib/site.ts';
import { SuccessStories } from '@/components/organisms/SuccessStories/SuccessStories.tsx';
import { Section } from '@/components/atoms/index.ts';
import { EyebrowBadge } from '@/components/atoms/EyebrowBadge.tsx';

const AlkoholfreieCocktailsPage: React.FC = () => {
  // JSON-LD Schema for BlogPosting
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Alkoholfreie Cocktails für Firmenevents: Der Mocktail-Trend 2025',
    description:
      '45% mehr Nachfrage: Warum alkoholfreie Cocktails bei B2B-Events immer wichtiger werden und wie Sie sie professionell anbieten.',
    image: `${SITE_URL}/assets/backgrounds/cosmic-unified.webp`,
    author: {
      '@type': 'Organization',
      name: 'Velo.Bar',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Velo.Bar',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logo.png`,
      },
    },
    datePublished: '2025-02-15',
    dateModified: '2025-12-08',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/alkoholfreie-cocktails-firmenevents`,
    },
    keywords: [
      'alkoholfreie Cocktails Firmenfeier',
      'Mocktails Event',
      'alkoholfreie Bar Service',
      'Weihnachtsfeier ohne Alkohol',
      'non-alcoholic spirit',
    ],
  };

  return (
    <SiteBackground>
      <PageTemplate
        title='Alkoholfreie Cocktails für Firmenevents: Der Mocktail-Trend 2025 | Velo.Bar'
        description='45% mehr Nachfrage: Warum alkoholfreie Cocktails bei B2B-Events immer wichtiger werden. Trend-Rezepte, Non-Alcoholic Spirits und Planungstipps.'
        canonicalPath='/blog/alkoholfreie-cocktails-firmenevents'
        structuredData={schemaData}
        withContainer={false}
        background='transparent'
      >
        {/* Hero Section */}
        <Section
          container='narrow'
          spacing='xl'
          className='from-navy via-navy-light to-accent-primary relative overflow-hidden bg-linear-to-br text-white'
        >
        <div className='absolute inset-0 z-0 opacity-20'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--orange-rgb),0.4),transparent_50%)]' />
        </div>
        <div className='relative z-10 text-center'>
          <EyebrowBadge className='mb-8'>            Blog · Trends 2025
          </span>
          <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
            Alkoholfreie Cocktails <br className='hidden sm:block' />
            <span className='text-accent-primary'>für Firmenevents</span>
          </h1>
          <p className='mx-auto max-w-2xl text-xl text-white/90'>
            Der Mocktail-Trend 2025: Warum 40% Ihrer Gäste alkoholfreie Optionen erwarten.
          </p>
        </div>
      </Section>

      <Section container='constrained' spacing='xl'>
        {/* Key Statistics Box */}
        <div className='bg-accent-primary/5 border-accent-primary/20 mb-16 rounded-2xl border p-8 shadow-sm'>
          <div className='mb-8 flex items-center gap-0'>
            <span className='text-2xl'>📊</span>
            <h2 className='text-navy text-xl font-bold'>Der alkoholfreie Trend in Zahlen</h2>
          </div>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div className='text-center'>
              <div className='text-accent-primary text-3xl font-bold'>+45%</div>
              <div className='text-navy/70 text-sm'>Mocktail-Nachfrage pro Jahr</div>
            </div>
            <div className='text-center'>
              <div className='text-accent-primary text-3xl font-bold'>40%</div>
              <div className='text-navy/70 text-sm'>erwarten alkoholfreie Optionen</div>
            </div>
            <div className='text-center'>
              <div className='text-accent-primary text-3xl font-bold'>22%</div>
              <div className='text-navy/70 text-sm'>der Deutschen trinken keinen Alkohol</div>
            </div>
            <div className='text-center'>
              <div className='text-accent-primary text-3xl font-bold'>€1.5Mrd</div>
              <div className='text-navy/70 text-sm'>NoLo-Markt Deutschland</div>
            </div>
          </div>
        </div>

        {/* Section 1: Why it matters */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Warum Mocktails bei Firmenevents unverzichtbar sind
          </h2>
          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>
              Die Zeiten, in denen „alkoholfrei" gleichbedeutend war mit „langweilig", sind vorbei.
              Moderne <strong>Non-Alcoholic Spirits</strong> wie Seedlip, Lyre's oder Siegfried
              Wonderleaf bieten komplexe Aromen und echte Cocktail-Erlebnisse.
            </p>
            <p>
              Für <strong>B2B-Events</strong> ist das besonders relevant:
            </p>
          </div>

          <div className='mb-8 space-y-8'>
            <div className='flex items-start gap-8 rounded-lg bg-gray-50 p-8'>
              <span className='text-2xl'>🚗</span>
              <div>
                <h4 className='font-bold text-gray-900'>Autofahrer & Pendler</h4>
                <p className='text-sm text-gray-600'>
                  Besonders bei After-Work-Events oder Messen: Viele Gäste fahren danach noch.
                  Premium-Mocktails zeigen Wertschätzung.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-gray-50 p-8'>
              <span className='text-2xl'>🌍</span>
              <div>
                <h4 className='font-bold text-gray-900'>Internationale Teams</h4>
                <p className='text-sm text-gray-600'>
                  In diversen Teams gibt es kulturelle, religiöse oder gesundheitliche Gründe für
                  Abstinenz. Inklusive Events performen besser.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-gray-50 p-8'>
              <span className='text-2xl'>💼</span>
              <div>
                <h4 className='font-bold text-gray-900'>Professionelles Image</h4>
                <p className='text-sm text-gray-600'>
                  Alkoholfreie Alternativen signalisieren ein modernes, verantwortungsvolles
                  Unternehmensimage – besonders wichtig für ESG-bewusste Firmen.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-8 rounded-lg bg-gray-50 p-8'>
              <span className='text-2xl'>🏃</span>
              <div>
                <h4 className='font-bold text-gray-900'>Wellness-Trend</h4>
                <p className='text-sm text-gray-600'>
                  „Sober Curious" und „Mindful Drinking" sind keine Nischen mehr – besonders bei
                  jüngeren Führungskräften (Gen Z, Millennials).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Popular Mocktails */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Die 5 beliebtesten Mocktails für Firmenevents
          </h2>

          <div className='space-y-8'>
            <div className='rounded-xl border border-gray-200 p-8 transition-colors duration-200 ease-out hover:border-orange-300'>
              <div className='mb-0 flex items-start justify-between'>
                <h3 className='text-xl font-bold text-gray-900'>1. Virgin Aperol Spritz</h3>
                <span className='rounded-full bg-orange-100 px-0 py-0 text-xs text-orange-700'>
                  Bestseller
                </span>
              </div>
              <p className='mb-0 text-gray-600'>
                Bitter-süß mit Rhabarber-Tonic und Orange. Der Klassiker ohne Alkohol – perfekt für
                Sommerevents und After-Work.
              </p>
              <div className='flex gap-0 text-sm text-gray-500'>
                <span className='rounded bg-gray-100 px-0 py-0'>Erfrischend</span>
                <span className='rounded bg-gray-100 px-0 py-0'>Niedrig-Kalorien</span>
              </div>
            </div>

            <div className='rounded-xl border border-gray-200 p-8 transition-colors duration-200 ease-out hover:border-purple-300'>
              <div className='mb-0 flex items-start justify-between'>
                <h3 className='text-xl font-bold text-gray-900'>2. Seedlip Garden Tonic</h3>
                <span className='rounded-full bg-green-100 px-0 py-0 text-xs text-green-700'>
                  Vegan
                </span>
              </div>
              <p className='mb-0 text-gray-600'>
                Kräuterig-frisch mit Seedlip Garden 108, Premium-Tonic und Erbsenranken. Komplex wie
                ein echter Gin & Tonic.
              </p>
              <div className='flex gap-0 text-sm text-gray-500'>
                <span className='rounded bg-gray-100 px-0 py-0'>Premium</span>
                <span className='rounded bg-gray-100 px-0 py-0'>Kräuterig</span>
              </div>
            </div>

            <div className='rounded-xl border border-gray-200 p-8 transition-colors duration-200 ease-out hover:border-purple-300'>
              <div className='mb-0 flex items-start justify-between'>
                <h3 className='text-xl font-bold text-gray-900'>3. Spicy Ginger Mule</h3>
                <span className='rounded-full bg-orange-100 px-0 py-0 text-xs text-orange-700'>
                  Würzig
                </span>
              </div>
              <p className='mb-0 text-gray-600'>
                Ingwer, Limette und hausgemachter Sirup – die alkoholfreie Moscow Mule-Alternative
                mit echtem Kick.
              </p>
              <div className='flex gap-0 text-sm text-gray-500'>
                <span className='rounded bg-gray-100 px-0 py-0'>Belebend</span>
                <span className='rounded bg-gray-100 px-0 py-0'>Winterfavorit</span>
              </div>
            </div>

            <div className='rounded-xl border border-gray-200 p-8 transition-colors duration-200 ease-out hover:border-orange-300'>
              <div className='mb-0 flex items-start justify-between'>
                <h3 className='text-xl font-bold text-gray-900'>4. Berry Bramble</h3>
                <span className='rounded-full bg-red-100 px-0 py-0 text-xs text-red-700'>
                  Fruchtig
                </span>
              </div>
              <p className='mb-0 text-gray-600'>
                Brombeeren, Zitrus und Lyre's Dry London – süß-sauer mit Instagram-würdiger Optik.
              </p>
              <div className='flex gap-0 text-sm text-gray-500'>
                <span className='rounded bg-gray-100 px-0 py-0'>Fotogen</span>
                <span className='rounded bg-gray-100 px-0 py-0'>Sommerlich</span>
              </div>
            </div>

            <div className='rounded-xl border border-gray-200 p-8 transition-colors duration-200 ease-out hover:border-orange-300'>
              <div className='mb-0 flex items-start justify-between'>
                <h3 className='text-xl font-bold text-gray-900'>5. Espresso Fizz</h3>
                <span className='rounded-full bg-orange-100 px-0 py-0 text-xs text-orange-700'>
                  Energizer
                </span>
              </div>
              <p className='mb-0 text-gray-600'>
                Kalter Espresso, Vanille und Soda – der perfekte Pick-Me-Up für lange Messetage.
              </p>
              <div className='flex gap-0 text-sm text-gray-500'>
                <span className='rounded bg-gray-100 px-0 py-0'>Koffeinhaltig</span>
                <span className='rounded bg-gray-100 px-0 py-0'>Nachmittags</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Planning Tips */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Planungstipps: Alkoholfrei richtig umsetzen
          </h2>

          <div className='prose prose-lg mb-8 text-gray-600'>
            <p>
              Der Schlüssel zum Erfolg:{' '}
              <strong>Mocktails nicht als „Alternative" positionieren</strong>, sondern als
              gleichwertige Wahl.
            </p>
          </div>

          <div className='from-navy to-navy-light mb-8 rounded-2xl bg-linear-to-br p-8 text-white'>
            <h3 className='mb-8 text-xl font-bold'>Die 50/50-Regel</h3>
            <div className='grid gap-8 md:grid-cols-2'>
              <div>
                <h4 className='text-accent-primary-light mb-0 font-semibold'>
                  ✓ So machen Sie es richtig:
                </h4>
                <ul className='space-y-0 text-sm'>
                  <li>• Gleiche Anzahl alkoholfreier & alkoholischer Optionen</li>
                  <li>• Mocktails prominent auf der Karte platzieren</li>
                  <li>• Premium-Zutaten für beide verwenden</li>
                  <li>• Barkeeper schulen, aktiv anzubieten</li>
                </ul>
              </div>
              <div>
                <h4 className='text-accent-primary-light mb-0 font-semibold'>✗ Vermeiden Sie:</h4>
                <ul className='space-y-0 text-sm text-gray-300'>
                  <li>• „Auch alkoholfrei möglich?" am Ende der Karte</li>
                  <li>• Nur Wasser/Saft als Alternative</li>
                  <li>• Mocktails in kleineren Gläsern servieren</li>
                  <li>• Preisunterschiede deutlich machen</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='bg-accent-primary/5 border-accent-primary rounded-r-lg border-l-4 p-8'>
            <div className='flex items-start gap-0'>
              <span className='text-accent-primary text-xl'>💡</span>
              <div>
                <h4 className='text-navy-dark mb-0 font-bold'>Pro-Tipp: Signature Mocktail</h4>
                <p className='text-navy/80 text-sm'>
                  Entwickeln Sie EINEN alkoholfreien Signature-Drink in Ihrer Markenfarbe. Das zeigt
                  Durchdachtheit und gibt Nicht-Trinkern ein „Special"-Gefühl.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Weihnachtsfeier Special Section */}
        <section className='mb-16'>
          <h2 className='mb-8 text-3xl font-bold text-gray-900'>
            Special: Alkoholfreie Weihnachtsfeier
          </h2>

          <div className='rounded-xl border border-red-100 bg-linear-to-br from-red-50 to-green-50 p-8'>
            <div className='mb-8 flex items-center gap-0'>
              <span className='text-3xl'>🎄</span>
              <h3 className='text-xl font-bold text-gray-900'>Winterliche Mocktails</h3>
            </div>

            <div className='grid gap-8 md:grid-cols-3'>
              <div className='bg-navy-light flex h-full flex-col rounded-lg p-8 shadow-sm'>
                <h4 className='mb-0 font-bold text-gray-900'>Hot Apple Cider</h4>
                <p className='text-sm text-gray-600'>
                  Heißer Apfelsaft mit Zimt, Nelken und Orangenscheiben.
                </p>
              </div>
              <div className='bg-navy-light flex h-full flex-col rounded-lg p-8 shadow-sm'>
                <h4 className='mb-0 font-bold text-gray-900'>Virgin Glühwein</h4>
                <p className='text-sm text-gray-600'>
                  Traubensaft mit Wintergewürzen und Orangenlikör-Ersatz.
                </p>
              </div>
              <div className='bg-navy-light flex h-full flex-col rounded-lg p-8 shadow-sm'>
                <h4 className='mb-0 font-bold text-gray-900'>Cranberry Fizz</h4>
                <p className='text-sm text-gray-600'>
                  Cranberrysaft, Rosmarin und Prosecco-Alternative.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className='mb-16'>
          <h2 className='mb-8 text-2xl font-bold text-gray-900'>Weiterführende Artikel</h2>
          <div className='grid gap-8 md:grid-cols-2'>
            <Link
              to='/weihnachtsfeiern'
              className='block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:border-orange-300 hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>🎄 Weihnachtsfeiern planen</h3>
              <p className='text-sm text-gray-600'>
                Mobile Cocktailbar für Ihre Firmen-Weihnachtsfeier.
              </p>
            </Link>
            <Link
              to='/blog/nachhaltige-firmenfeier'
              className='block flex h-full flex-col rounded-xl border border-gray-200 bg-gray-50 p-8 transition duration-200 ease-out hover:border-orange-300 hover:shadow-md'
            >
              <h3 className='mb-0 font-bold text-gray-900'>🌱 Nachhaltige Firmenfeiern</h3>
              <p className='text-sm text-gray-600'>Zero-Waste Events mit Velo.Bar organisieren.</p>
            </Link>
          </div>
        </section>

        {/* Success Stories */}
        <SuccessStories variant='compact' className='mb-16' />

        {/* CTA Section */}
        <section className='from-navy to-accent-primary rounded-2xl bg-linear-to-br p-8 text-center text-white md:p-16'>
          <h2 className='mb-8 text-3xl font-bold'>Mocktails für Ihr nächstes Event?</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg opacity-90'>
            Wir entwickeln individuelle alkoholfreie Cocktailkarten für Firmenevents – mit Premium
            Non-Alcoholic Spirits und kreativen Eigenkreationen.
          </p>
          <div className='flex flex-col justify-center gap-8 sm:flex-row'>
            <Link to='/anfrage?source=alkoholfrei-blog'>
              <Button
                size='lg'
                className='text-accent-primary border-none bg-white transition duration-200 ease-out hover:bg-gray-100'
              >
                Mocktail-Konzept anfragen
              </Button>
            </Link>
            <Link to='/menu'>
              <Button
                size='lg'
                variant='outline'
                className='border-white text-white transition duration-200 ease-out hover:bg-white/10'
              >
                Drinks-Menu ansehen
              </Button>
            </Link>
          </div>
        </section>
      </Section>
      </PageTemplate>
    </SiteBackground>
  );
};

export default AlkoholfreieCocktailsPage;

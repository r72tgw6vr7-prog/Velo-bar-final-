import React from 'react';
import { PageTemplate } from '@/templates/PageTemplate.tsx';
import { SiteBackground } from '@/components/layout/SiteBackground';
import { Button } from '@/components/atoms/Button/Button.tsx';
import { Link } from 'react-router-dom';
import { SuccessStories } from '@/components/organisms/SuccessStories/SuccessStories.tsx';
import { SITE_URL } from '@/lib/site.ts';
import { useLanguage } from '@/contexts/LanguageContext.tsx';

const CorporateEventCateringGuidePage: React.FC = () => {
  const { t } = useLanguage();

  // JSON-LD Schema for this specific Article/Guide
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('pages.resources.corporateEventCateringGuide.schema.headline'),
    description: t('pages.resources.corporateEventCateringGuide.schema.description'),
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
    datePublished: '2025-01-15',
    dateModified: '2025-12-08',
  };

  return (
    <SiteBackground>
      <PageTemplate
        title={t('pages.resources.corporateEventCateringGuide.seo.title')}
        description={t('pages.resources.corporateEventCateringGuide.seo.description')}
        canonicalPath='/resources/corporate-event-catering-guide'
        structuredData={schemaData}
        withContainer={false}
      >
        <main className='w-full'>
          {/* Custom Hero for the Guide */}
        <div className='bg-navy-primary relative overflow-hidden py-24 text-white lg:py-32'>
          <div className='relative z-10 mx-auto max-w-4xl px-8 text-center sm:px-8 lg:px-8'>
            <EyebrowBadge className='mb-8'>{t('pages.resources.corporateEventCateringGuide.hero.badge')}</EyebrowBadge>
            <h1 className='mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl'>
              {t('pages.resources.corporateEventCateringGuide.hero.titleLine1')} <br />
              {t('pages.resources.corporateEventCateringGuide.hero.titleLine2')}
            </h1>
            <p className='mx-auto mb-8 max-w-2xl text-xl text-gray-300'>
              {t('pages.resources.corporateEventCateringGuide.hero.subtitle')}
            </p>
          </div>
        </div>

        <div className='mx-auto max-w-3xl px-8 py-16 sm:px-8 lg:px-8'>
          {/* Introduction */}
          <section className='prose prose-lg prose-indigo mx-auto mb-16'>
            <p className='lead text-xl font-medium text-gray-600'>
              Sie investieren sechs- bis siebenstellige Budgets in Messeauftritte. Die Botschaft
              stimmt, das Standdesign ist durchdacht – und trotzdem bleiben Besucher oft nur kurz.
            </p>
            <p>
              Genau hier entscheidet sich, ob Ihr Event als starker Touchpoint in Erinnerung bleibt.{' '}
              <strong>Getränke & Bar-Service</strong> sind kein „Nice-to-have", sondern einer der
              stärksten Hebel für Verweildauer (Dwell Time) und Lead-Qualität.
            </p>
            <div className='not-prose my-8 rounded-r-lg border-l-4 border-indigo-600 bg-indigo-50 p-8'>
              <h3 className='mb-0 text-lg font-bold text-indigo-900'>
                {t('pages.resources.corporateEventCateringGuide.guideBox.title')}
              </h3>
              <ul className='list-disc space-y-0 pl-8 text-indigo-800'>
                <li>
                  Wie mobile Bars die <strong>Verweildauer am Messestand</strong> erhöhen
                </li>
                <li>
                  <strong>Logistik-Checkliste:</strong> Strom, Wasser und Platzbedarf
                </li>
                <li>
                  <strong>Menü-Engineering</strong> für Brand Activation
                </li>
                <li>
                  <strong>Budget & ROI</strong> im Vergleich zu klassischem Catering
                </li>
              </ul>
            </div>
          </section>

          {/* Section 1: Dwell Time */}
          <section className='mb-24'>
            <h2 className='mb-8 text-3xl font-bold text-gray-900'>
              {t('pages.resources.corporateEventCateringGuide.sections.dwellTime.title')}
            </h2>
            <div className='prose prose-lg mb-8 text-gray-600'>
              <p>
                An einem typischen Messetag auf der <strong>Messe München</strong> kämpfen Sie um
                Sekundenbruchteile. Ohne Hospitality verlassen Besucher Ihren Stand oft nach unter
                60 Sekunden. Mit einem attraktiven Bar-Service steigt diese Zeit auf 5–10 Minuten –
                genug für echte Sales-Gespräche.
              </p>
            </div>

            {/* Pro Tip Box */}
            <div className='rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-sm'>
              <div className='flex items-start gap-8'>
                <div className='bg-accent-primary/10 text-accent-primary mt-4 rounded-lg p-4'>
                  💡
                </div>
                <div>
                  <h4 className='mb-0 text-lg font-bold text-gray-900'>
                    {t('pages.resources.corporateEventCateringGuide.proTip.title')}
                  </h4>
                  <p className='text-gray-600'>
                    Entwickeln Sie ein <strong>„Signature-Getränk"</strong> in Ihrer
                    Corporate-Farbe. Nutzen Sie das Servieren als Moment für Ihren Elevator Pitch.
                    Briefen Sie das Bar-Team für „warme Übergaben" an Ihre Sales-Kollegen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Logistics */}
          <section className='mb-24'>
            <h2 className='mb-8 text-3xl font-bold text-gray-900'>
              {t('pages.resources.corporateEventCateringGuide.sections.logistics.title')}
            </h2>
            <div className='prose prose-lg mb-8 text-gray-600'>
              <p>
                „Wo soll das alles hin?" ist die häufigste Frage. Professionelle Systeme wie die
                Velo.Bar sind autark:
              </p>
              <ul className='not-prose mt-8 grid gap-8 sm:grid-cols-2'>
                <li className='flex items-center gap-0 text-gray-700'>
                  <span className='font-bold text-green-500'>✓</span> Kein Festwasser nötig
                </li>
                <li className='flex items-center gap-0 text-gray-700'>
                  <span className='font-bold text-green-500'>✓</span> Akku-Betrieb möglich
                </li>
                <li className='flex items-center gap-0 text-gray-700'>
                  <span className='font-bold text-green-500'>✓</span> Ab 4–6 m² Stellfläche
                </li>
                <li className='flex items-center gap-0 text-gray-700'>
                  <span className='font-bold text-green-500'>✓</span> Aufbau in 1–2 Stunden
                </li>
              </ul>
            </div>

            <div className='my-8'>
              <img
                src='/assets/images/photos/bar-team-interaction.webp'
                alt='Logistik Setup Mobile Bar'
                className='h-auto w-full rounded-xl object-cover shadow-lg'
              />
              <p className='mt-0 text-center text-sm text-gray-500'>
                Kompaktes Setup auch auf kleinen Standflächen möglich.
              </p>
            </div>

            {/* Internal Link Block */}
            <div className='rounded-xl bg-indigo-600 p-8 text-center text-white'>
              <h3 className='mb-8 text-2xl font-bold'>
                {t('pages.resources.corporateEventCateringGuide.ctaMesse.title')}
              </h3>
              <p className='mb-8 opacity-90'>
                {t('pages.resources.corporateEventCateringGuide.ctaMesse.description')}
              </p>
              <Link to='/messe-catering'>
                <Button
                  variant='primary'
                  className='border-none bg-white text-indigo-600 transition duration-200 ease-out hover:bg-gray-100'
                >
                  {t('pages.resources.corporateEventCateringGuide.ctaMesse.button')}
                </Button>
              </Link>
            </div>
          </section>

          {/* Section 3: Menu Engineering */}
          <section className='mb-24'>
            <h2 className='mb-8 text-3xl font-bold text-gray-900'>
              {t('pages.resources.corporateEventCateringGuide.sections.menuEngineering.title')}
            </h2>
            <div className='prose prose-lg text-gray-600'>
              <p>
                Getränke sind Storytelling. Für ein <strong>Tech-Unternehmen</strong> könnte das ein
                klarer, minimalistischer „Gin Basil Highball" sein (Innovation). Für eine{' '}
                <strong>Green-Tech Brand</strong> nutzen wir regionale Bio-Spirits und Zero-Waste
                Garnituren.
              </p>
              <p>
                Definieren Sie maximal 3–5 Drinks. Zu viel Auswahl verlangsamt den Service.
                Kuratierte Menüs halten die Frequenz hoch.
              </p>
            </div>
          </section>

          {/* Section 4: ROI */}
          <section className='mb-16'>
            <h2 className='mb-8 text-3xl font-bold text-gray-900'>
              {t('pages.resources.corporateEventCateringGuide.sections.roi.title')}
            </h2>
            <div className='prose prose-lg mb-8 text-gray-600'>
              <p>
                Stellen Sie nicht die Frage „Was kostet die Bar?", sondern{' '}
                <strong>„Was bringt sie?"</strong>. Wenn Sie durch eine Bar 20 zusätzliche
                qualifizierte Gespräche führen und daraus 2 Kunden gewinnen, hat sich das Invest von
                1.500€ – 2.500€ vielfach amortisiert.
              </p>
            </div>

            {/* Comparison Table */}
            <div className='overflow-hidden rounded-xl border border-gray-200 shadow-sm'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-8 py-0 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'
                    >
                      {t('pages.resources.corporateEventCateringGuide.table.classicCatering')}
                    </th>
                    <th
                      scope='col'
                      className='px-8 py-0 text-left text-xs font-bold font-medium tracking-wider text-indigo-600 uppercase'
                    >
                      {t('pages.resources.corporateEventCateringGuide.table.mobilePremiumBar')}
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  <tr>
                    <td className='px-8 py-8 text-sm text-gray-600'>
                      Oft versteckte Zusatzkosten (Personal, Equipment)
                    </td>
                    <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                      Transparente Paketpreise (All-Inclusive)
                    </td>
                  </tr>
                  <tr>
                    <td className='px-8 py-8 text-sm text-gray-600'>
                      Standard-Auswahl (Bier, Softdrinks)
                    </td>
                    <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                      Brand-Storytelling & Signature Drinks
                    </td>
                  </tr>
                  <tr>
                    <td className='px-8 py-8 text-sm text-gray-600'>Reine Versorgung</td>
                    <td className='px-8 py-8 text-sm font-medium text-gray-900'>
                      Aktive Lead-Generierung & Experience
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Social Proof - Metrics */}
          <SuccessStories variant='metrics-only' className='mb-16' />

          {/* Conclusion CTA */}
          <section className='rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center md:p-16'>
            <h2 className='mb-8 text-3xl font-bold text-gray-900'>
              {t('pages.resources.corporateEventCateringGuide.sections.conclusion.title')}
            </h2>
            <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-600'>
              {t('pages.resources.corporateEventCateringGuide.sections.conclusion.description')}
            </p>
            <div className='flex flex-col justify-center gap-8 sm:flex-row'>
              <Link to='/anfrage?eventType=messe&source=corporate-guide'>
                <Button size='lg' variant='primary'>
                  {t('pages.resources.corporateEventCateringGuide.sections.conclusion.primaryButton')}
                </Button>
              </Link>
              <Link to='/firmenfeiern'>
                <Button size='lg' variant='outline'>
                  {t('pages.resources.corporateEventCateringGuide.sections.conclusion.secondaryButton')}
                </Button>
              </Link>
            </div>
          </section>
        </div>
        </main>
      </PageTemplate>
    </SiteBackground>
  );
};

export default CorporateEventCateringGuidePage;

/**
 * DatenschutzPage - Privacy Policy
 */

import React from 'react';
import { PageHeader } from '@/components/atoms/PageHeader.tsx';
import { PageTemplate } from '@/templates/PageTemplate.tsx';

interface DatenschutzPageProps {
  language?: 'DE' | 'EN';
}

export function DatenschutzPage({ language = 'DE' }: DatenschutzPageProps) {
  const title = language === 'EN' ? 'Privacy Policy' : 'DAtenschutzrichtlinien';
  const subtitle = undefined;

  return (
    <PageTemplate
      title={title}
      description={subtitle}
      withContainer={false}
      background='transparent'
    >
      <div className='bg-navy'>
        <PageHeader eyebrow='Rechtliches' title={title} subtitle={subtitle} />

        <div className='mx-auto max-w-4xl px-8 py-16 sm:px-8 lg:px-8'>
          {/* Introduction */}
          <section className='mb-16'>
            <p className='mb-8 leading-relaxed text-white/70'>
              Diese Website sammelt personenbezogene Daten, die als Grundlage für unsere
              Website-Analytics dienen. Dazu gehören:
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>Informationen über Ihren Browser, Ihr Netzwerk und Ihr Gerät</li>
              <li>Webseiten, die Sie vor dem Besuch dieser Website aufgerufen haben</li>
              <li>Ihre IP-Adresse</li>
            </ul>
            <p className='mb-8 leading-relaxed text-white/70'>
              Diese Informationen können auch Details über Ihre Nutzung dieser Website enthalten,
              einschließlich:
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>Klicks</li>
              <li>Interne Links</li>
              <li>Besuchte Seiten</li>
              <li>Scrollen</li>
              <li>Suchvorgänge</li>
              <li>Zeitstempel</li>
            </ul>
            <p className='mb-8 leading-relaxed text-white/70'>
              Wir teilen diese Informationen mit Squarespace, unserem Anbieter für
              Website-Analytics, um mehr über den Traffic und die Aktivität auf dieser Website zu
              erfahren.
            </p>
          </section>

          {/* Definitions */}
          <section className='mb-16'>
            <h2 className='text-on-light mb-8 text-2xl font-bold'>Cookies</h2>
            <p className='mb-8 leading-relaxed text-white/70'>
              Diese Website verwendet Cookies und ähnliche Technologien, wobei es sich um kleine
              Dateien oder kurze Texte handelt, die auf ein Gerät heruntergeladen werden, wenn ein
              Besucher auf eine Website oder App zugreift.
            </p>
            <p className='mb-8 leading-relaxed text-white/70'>
              Informationen zum Anzeigen der auf deinem Gerät platzierten Cookies findest du unter{' '}
              <a
                href='https://support.squarespace.com/hc/articles/360001264507'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                Über die von Squarespace verwendeten Cookies
              </a>
              .
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>
                <a
                  href='https://support.squarespace.com/hc/articles/360001264507'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  Diese funktionellen und erforderlichen Cookies werden immer verwendet
                </a>
                , da sie es Squarespace, unserer Hosting-Plattform, ermöglichen, diese Website
                sicher für Sie bereitzustellen.
              </li>
              <li>
                <a
                  href='https://support.squarespace.com/hc/articles/360001264507'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  Diese Analytics- und Performance-Cookies
                </a>{' '}
                werden nur dann wie im Folgenden beschrieben auf dieser Website verwendet, wenn Sie
                unser Cookie-Banner bestätigen. Wir verwenden Analytics-Cookies, um Einblick in den
                Website-Traffic, die Website-Aktivität und weitere Daten zu erhalten.
              </li>
            </ul>
          </section>

          {/* Sections */}
          <section className='mb-16'>
            <h2 className='text-on-light mb-8 text-2xl font-bold'>Hosting</h2>
            <p className='mb-8 leading-relaxed text-white/70'>
              Diese Website wird von Squarespace gehostet. Squarespace sammelt personenbezogene
              Daten, wenn Sie diese Website besuchen. Dazu gehören:
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>Informationen über Ihren Browser, Ihr Netzwerk und Ihr Gerät</li>
              <li>Webseiten, die Sie vor dem Besuch dieser Website aufgerufen haben</li>
              <li>Ihre IP-Adresse</li>
            </ul>
            <p className='mb-8 leading-relaxed text-white/70'>
              Squarespace benötigt die Daten für den Betrieb dieser Website sowie zum Schutz und zur
              Verbesserung seiner Plattform und Services. Squarespace analysiert die Daten in
              entpersonalisierter Form.
            </p>

            <h2 className='text-on-light mb-8 text-2xl font-bold'>Schriftarten</h2>
            <p className='mb-8 leading-relaxed text-white/70'>
              Diese Website verwendet Schriftartendateien von Google Fonts und Adobe Fonts. Um Ihnen
              diese Website korrekt anzuzeigen, können Server, auf denen die Schriftartendateien
              gespeichert sind, personenbezogene Daten über Sie erhalten. Dazu gehören:
            </p>
            <ul className='mb-8 list-disc space-y-0 pl-8 text-white/70'>
              <li>Informationen über Ihren Browser, Ihr Netzwerk oder Ihr Gerät</li>
              <li>Ihre IP-Adresse</li>
            </ul>
          </section>

          <p className='rounded-lg bg-(--color-bg-surface-tinted) p-8 text-sm text-black/50'>
            #Velo.Bar
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}

export default DatenschutzPage;

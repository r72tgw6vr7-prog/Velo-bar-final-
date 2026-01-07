/**
 * ImpressumPage - Legal Notice
 */

import React from 'react';
import { PageHeader } from '@/components/atoms/PageHeader.tsx';
import { PageTemplate } from '@/templates/PageTemplate.tsx';

interface ImpressumPageProps {
  language?: 'DE' | 'EN';
}

type ImpressumSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  listItems?: readonly string[];
};

const impressumSections: readonly ImpressumSection[] = [
  {
    id: 'tmg',
    title: 'Angaben gemäß § 5 TMG',
    paragraphs: [
      'Velo.Bar',
      'Sebastian Reichstaller & Lars Eggers GbR, SelectONEdrink GbR',
      'Matthias-Mayer-Straße 5',
      '81379 München',
    ],
  },
  {
    id: 'represented-by',
    title: 'Vertreten durch:',
    paragraphs: ['Sebastian Reichstaller', 'Lars Eggers'],
  },
  {
    id: 'contact',
    title: 'Kontakt',
    paragraphs: ['Telefon: +49 160 94623196', 'E-Mail: hallo@velo-bar.com'],
  },
  {
    id: 'eu-dispute',
    title: 'EU-Streitschlichtung',
    paragraphs: [
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
      'https://ec.europa.eu/consumers/odr.',
      'Unsere E-Mail-Adresse finden Sie oben im Impressum.',
    ],
  },
  {
    id: 'consumer-dispute',
    title: 'Verbraucherstreitbeilegung/Universalschlichtungsstelle',
    paragraphs: [
      'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
  {
    id: 'liability-content',
    title: 'Haftung für Inhalte',
    paragraphs: [
      'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nichtverpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    ],
  },
  {
    id: 'liability-links',
    title: 'Haftung für Links',
    paragraphs: [
      'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    ],
  },
  {
    id: 'copyright',
    title: 'Urheberrecht',
    paragraphs: [
      'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.',
    ],
  },
  {
    id: 'cancellation-fees',
    title: 'Stornogebühren:Storno:',
    paragraphs: [
      'Der Kunde hat jederzeit das Recht, vom Vertrag zurückzutreten. Soweit keine weiteren schriftlichen Vereinbarungen zwischen dem Kunden und der Lars Eggers & Sebastian Reichstaller GbR getroffen wurden, hat die Lars Eggers & Sebastian Reistaller GbR Anspruch auf eine angemessene Entschädigung wie folgt:',
    ],
    listItems: [
      '1) Bei einer Stornierung bis zehn volle Werktage vor dem ersten Veranstaltungstag werden 20% der letzgültigen Angebotssumme in Rechnung gestellt.',
      '2) Bei einer Stornierung zwischen zehn und drei vollen Werktage vor dem ersten Veranstaltungstag werden 90% der letzgültigen Angebotssumme in Rechnung gestellt.',
      '3) Bei einer Stornierung unter drei vollen Werktage vor dem ersten Veranstaltungstag werden 100 % der letztgültigen Angebotessumme in Rechnung gestellt.',
    ],
  },
] as const;

export const ImpressumPage: React.FC<ImpressumPageProps> = ({ language = 'DE' }) => {
  const title = language === 'EN' ? 'Legal Notice' : 'Impressum';
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
      </div>
    </PageTemplate>
  );
};

export default ImpressumPage;

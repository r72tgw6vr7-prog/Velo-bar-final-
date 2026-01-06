import type { AboutPageContent } from './types';

export const aboutContent: AboutPageContent = {
  slug: 'about',
  seoTitle: 'Über Velo.Bar | Mobile Cocktailbar München',
  seoDescription:
    'Vom Crowdfunding-Erfolg zu 500+ Events. Mobile Cocktailbar für Firmenfeiern in München & Coburg. Nachhaltig, Premium-Gin-Spezialisierung.',
  hero: {
    eyebrow: 'Über uns',
    title: 'Vom Crowdfunding zu 500+ Events',
    subtitle: 'Wie eine Idee zur gefragtesten mobilen Cocktailbar Bayerns wurde.',
  },
  sections: [
    {
      id: 'origin',
      title: 'Unsere Geschichte',
      body: [
        'Was 2019 als Crowdfunding-Projekt begann, ist heute eine der gefragtesten mobilen Cocktailbars in Bayern. Über 200 Unterstützer glaubten an unsere Vision: Premium-Cocktails, nachhaltig und mobil – überall.',
        'Mit unserer einzigartigen Fahrrad-Bar haben wir das Konzept der mobilen Cocktailbar neu definiert: Kompakt genug für jeden Aufzug, nachhaltig durch CO₂-neutralen Transport, und autark ohne Strom oder Wasser.',
      ],
    },
    {
      id: 'numbers',
      title: 'Velobar in Zahlen',
      body: [
        '500+ erfolgreich durchgeführte Events für Unternehmen wie BMW, Siemens und innovative Startups.',
        '2 Standorte in München und Coburg für optimale Abdeckung in Bayern und darüber hinaus.',
        '40+ Premium-Gin-Sorten in unserem Sortiment – wir sind Spezialisten für anspruchsvolle Gaumen.',
        '4.9/5 Sterne bei Google mit über 87 Bewertungen von zufriedenen Geschäftskunden.',
      ],
    },
    {
      id: 'usp',
      title: 'Was uns unterscheidet',
      body: [
        'Unsere nachhaltige Fahrrad-Bar ist einzigartig in München. Sie ist platzsparend, CO₂-neutral und ein echter Hingucker für deine Gäste.',
        'Wir sind vollständig autark: Kein Strom, kein Wasser, keine zusätzliche Infrastruktur erforderlich. Perfekt für Rooftops, Innenhöfe und historische Locations.',
        'Unser Fokus auf Premium-Gin mit über 40 Sorten macht uns zu den Spezialisten für gehobene Firmenevents und anspruchsvolle Geschäftskunden.',
      ],
    },
    {
      id: 'locations',
      title: 'München & Coburg – Dual-Location Vorteil',
      body: [
        'Von unserem Standort München aus bedienen wir Firmenfeiern, Messen und Events im gesamten Großraum München.',
        'Unser Standort Coburg ermöglicht professionellen Service in Oberfranken, Thüringen und Sachsen.',
        'Auf Anfrage sind wir auch deutschlandweit für größere Firmenevents verfügbar.',
      ],
    },
    {
      id: 'mission',
      title: 'Unsere Mission',
      body: [
        'Wir glauben, dass großartige Drinks und erstklassiger Service den Unterschied machen. Deshalb setzen wir auf Qualität, Nachhaltigkeit und persönlichen Kontakt.',
        'Jedes Event ist einzigartig – und genau so behandeln wir es auch. Ob 50 oder 500 Gäste: Du erhältst denselben Premium-Service.',
      ],
    },
  ],
};

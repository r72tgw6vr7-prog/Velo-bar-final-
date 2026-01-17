import type { AboutPageContent } from './types.ts';

const aboutContentDE: AboutPageContent = {
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
        '5/5 Sterne bei Google mit über 87 Bewertungen von zufriedenen Geschäftskunden.',
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

export const aboutContentEN: AboutPageContent = {
  slug: 'about',
  seoTitle: 'About Velo.Bar | Mobile Cocktail Bar Munich',
  seoDescription:
    'From a crowdfunding success to 500+ events. Mobile cocktail bar for corporate events in Munich & Coburg. Sustainable, premium gin expertise.',
  hero: {
    eyebrow: 'About us',
    title: 'From crowdfunding to 500+ events',
    subtitle: 'How an idea became Bavaria’s most requested mobile cocktail bar.',
  },
  sections: [
    {
      id: 'origin',
      title: 'Our story',
      body: [
        'What started as a crowdfunding project in 2019 is now one of Bavaria’s most requested mobile cocktail bars. More than 200 supporters believed in our vision: premium cocktails, sustainable and mobile — anywhere.',
        'With our unique bicycle bar, we redefined the concept of a mobile cocktail bar: compact enough for any elevator, carbon-neutral transport, and fully self-sufficient without power or water.',
      ],
    },
    {
      id: 'numbers',
      title: 'Velo.Bar in numbers',
      body: [
        '500+ successfully delivered events for companies like BMW, Siemens and innovative startups.',
        '2 locations in Munich and Coburg for optimal coverage in Bavaria and beyond.',
        '40+ premium gin varieties in our portfolio — we’re specialists for discerning palates.',
        '5/5 stars on Google with 87+ reviews from satisfied business clients.',
      ],
    },
    {
      id: 'usp',
      title: 'What sets us apart',
      body: [
        'Our sustainable bicycle bar is unique in Munich. It’s space-saving, carbon-neutral and a real eye-catcher for your guests.',
        'We’re fully self-sufficient: no power, no water, no additional infrastructure required. Perfect for rooftops, courtyards and historic venues.',
        'Our focus on premium gin with 40+ varieties makes us specialists for high-end corporate events and discerning business audiences.',
      ],
    },
    {
      id: 'locations',
      title: 'Munich & Coburg — dual-location advantage',
      body: [
        'From our Munich location we serve corporate parties, trade shows and events across Greater Munich.',
        'Our Coburg location enables professional service in Upper Franconia, Thuringia and Saxony.',
        'On request, we can also support larger corporate events nationwide.',
      ],
    },
    {
      id: 'mission',
      title: 'Our mission',
      body: [
        'We believe great drinks and outstanding service make all the difference. That’s why we focus on quality, sustainability and personal contact.',
        'Every event is unique — and that’s exactly how we treat it. Whether 50 or 500 guests: you get the same premium service.',
      ],
    },
  ],
};

export const aboutContent = aboutContentDE;

export default aboutContentDE;

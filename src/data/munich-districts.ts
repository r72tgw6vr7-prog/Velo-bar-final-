/**
 * Munich Districts Data for Programmatic SEO
 * ==========================================
 * Comprehensive data structure for generating location-specific landing pages
 * Each district includes SEO-relevant information for local targeting
 */

export interface MunichDistrict {
  id: string;
  name: string;
  slug: string;
  population: string;
  description: string;
  characteristics: string[];
  nearbyDistricts: string[];
  businessFocus: string[];
  transport: {
    subway: string[];
    bus: string[];
    parking: string;
  };
  venues: {
    hotels: string[];
    offices: string[];
    eventSpaces: string[];
  };
  seo: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    localIntent: string[];
    searchVolume: 'high' | 'medium' | 'low';
  };
}

export const munichDistricts: MunichDistrict[] = [
  {
    id: 'schwabing',
    name: 'Schwabing',
    slug: 'schwabing',
    population: '78.000',
    description: 'Elegantes Künstlerviertel mit bohemischer Atmosphäre und hochwertigen Locations',
    characteristics: [
      'Kunst- und Kulturszene',
      'Gourmet-Restaurants',
      'Luxus-Boutiquen',
      'Englischer Garten in der Nähe',
      'Historische Altbauten',
    ],
    nearbyDistricts: ['maxvorstadt', 'milbertshofen', 'schwabing-west'],
    businessFocus: ['Kreativagenturen', 'Consulting', 'Gastronomie', 'Luxus-Segment'],
    transport: {
      subway: ['U2', 'U3', 'U6'],
      bus: ['53', '54', '142', '144'],
      parking: 'Parkhäuser an der Leopoldstraße',
    },
    venues: {
      hotels: ['Hilton Munich Park', 'Mövenpick Hotel München', 'Sheraton München Westpark'],
      offices: ['Siemens-Niederlassung', 'Versicherungskammer Bayern', 'Microsoft Deutschland'],
      eventSpaces: ['Kunstverein München', 'Gasteig', 'Café Luitpold'],
    },
    seo: {
      primaryKeyword: 'Firmenfeier Schwabing',
      secondaryKeywords: [
        'Corporate Event Schwabing',
        'Business Event München Schwabing',
        'Team Event Schwabing',
      ],
      localIntent: [
        'Firmenfeier in Schwabing buchen',
        'Cocktailbar Schwabing',
        'Mobile Bar München Schwabing',
      ],
      searchVolume: 'high',
    },
  },
  {
    id: 'maxvorstadt',
    name: 'Maxvorstadt',
    slug: 'maxvorstadt',
    population: '52.000',
    description: 'Bildungs- und Kulturzentrum mit Museen und universitärem Flair',
    characteristics: [
      'Kunstareal München',
      'Ludwig-Maximilians-Universität',
      'Technische Universität',
      'Pinakotheken',
      'Studentisches Ambiente',
    ],
    nearbyDistricts: ['schwabing', 'altstadt-lehel', 'ludwigsvorstadt'],
    businessFocus: ['Bildungseinrichtungen', 'Forschung', 'Kulturinstitutionen', 'Startups'],
    transport: {
      subway: ['U2', 'U3', 'U4', 'U5', 'U6'],
      bus: ['53', '58', '100', '153'],
      parking: 'Parkhäuser am Königsplatz',
    },
    venues: {
      hotels: ['Marriott München', 'Louis Hotel', 'Cortiina Hotel'],
      offices: ['LMU Verwaltung', 'TUM Campus', 'Start-up Zentrum'],
      eventSpaces: ['Pinakothek der Moderne', 'Kunstbau', 'University Club'],
    },
    seo: {
      primaryKeyword: 'Firmenfeier Maxvorstadt',
      secondaryKeywords: [
        'Corporate Event Maxvorstadt',
        'Business Event München Maxvorstadt',
        'Team Event Maxvorstadt',
      ],
      localIntent: [
        'Firmenfeier in Maxvorstadt buchen',
        'Cocktailbar Maxvorstadt',
        'Mobile Bar München Maxvorstadt',
      ],
      searchVolume: 'medium',
    },
  },
  {
    id: 'haidhausen',
    name: 'Haidhausen',
    slug: 'haidhausen',
    population: '65.000',
    description: 'Charmantes Villenviertel mit französischem Flair und exklusiven Locations',
    characteristics: [
      'Französisches Viertel',
      'Historische Villen',
      'Gasteig Kulturzentrum',
      'Isarnähe',
      'Gourmet-Restaurants',
    ],
    nearbyDistricts: ['berg-am-laim', 'ramersdorf-perlach', 'au-haidhausen'],
    businessFocus: ['Rechtsanwaltskanzleien', 'Kanzleien', 'Gastronomie', 'Kultur'],
    transport: {
      subway: ['U4', 'U5'],
      bus: ['16', '17', '18', '155'],
      parking: 'Parkhaus Gasteig',
    },
    venues: {
      hotels: [
        'Courtyard by Marriott München',
        'Hilton Garden Inn',
        'ArabellaSheraton Grand Hotel',
      ],
      offices: ['Kanzleiviertel', 'Gasteig Verwaltung', 'Bayerische Landesbank'],
      eventSpaces: ['Gasteig Carl-Orff-Saal', 'Philharmonie', 'Kulturzentrum Gasteig'],
    },
    seo: {
      primaryKeyword: 'Firmenfeier Haidhausen',
      secondaryKeywords: [
        'Corporate Event Haidhausen',
        'Business Event München Haidhausen',
        'Team Event Haidhausen',
      ],
      localIntent: [
        'Firmenfeier in Haidhausen buchen',
        'Cocktailbar Haidhausen',
        'Mobile Bar München Haidhausen',
      ],
      searchVolume: 'medium',
    },
  },
  {
    id: 'sendling',
    name: 'Sendling',
    slug: 'sendling',
    population: '42.000',
    description: 'Traditionelles Arbeiter-Viertel mit authentischem Charme und moderner Aufwertung',
    characteristics: [
      'Historisches Sendlinger Tor',
      'Traditionelle Wirtshäuser',
      'Kleine Gassen',
      'Stark aufgewertet',
      'Nähe zur Altstadt',
    ],
    nearbyDistricts: ['altstadt-lehel', 'ludwigsvorstadt-isarvorstadt', 'sendling-westpark'],
    businessFocus: ['Handwerk', 'Kreativ-Szene', 'Gastronomie', 'Startups'],
    transport: {
      subway: ['U2', 'U6'],
      bus: ['16', '17', '18', '62', '63'],
      parking: 'Parkhäuser am Sendlinger Tor',
    },
    venues: {
      hotels: [
        'Holiday Inn München City Centre',
        'Motel One München-Sendlinger Tor',
        'Platzl Hotel',
      ],
      offices: ['Creative Hubs', 'Design Agenturen', 'Tech Startups'],
      eventSpaces: ['Alte Utting', 'Kulturhaus Sendling', 'Tollhaus'],
    },
    seo: {
      primaryKeyword: 'Firmenfeier Sendling',
      secondaryKeywords: [
        'Corporate Event Sendling',
        'Business Event München Sendling',
        'Team Event Sendling',
      ],
      localIntent: [
        'Firmenfeier in Sendling buchen',
        'Cocktailbar Sendling',
        'Mobile Bar München Sendling',
      ],
      searchVolume: 'medium',
    },
  },
  {
    id: 'garching',
    name: 'Garching',
    slug: 'garching',
    population: '18.000',
    description:
      'High-Tech Wissenschaftsstandort mit Forschungseinrichtungen und innovativen Unternehmen',
    characteristics: [
      'Forschungscampus',
      'Technologie-Cluster',
      'Moderne Architektur',
      'Wissenschafts-Fokus',
      'U-Bahn-Anbindung',
    ],
    nearbyDistricts: ['unterföhring', 'ismaning', 'münchen-mitte'],
    businessFocus: ['Forschung & Entwicklung', 'Technologie', 'Wissenschaft', 'Innovation'],
    transport: {
      subway: ['U6'],
      bus: ['290', '291', '292', '293'],
      parking: 'Ausreichend Parkplätze vorhanden',
    },
    venues: {
      hotels: [
        'NH München Unterföhring',
        'Novotel München Airport',
        'Mövenpick Hotel München Airport',
      ],
      offices: ['Max-Planck-Institute', 'LMU Campus Garching', 'TUM Campus Garching'],
      eventSpaces: ['Forschungszentrum', 'Technologie-Zentrum', 'Science-Cafe'],
    },
    seo: {
      primaryKeyword: 'Firmenfeier Garching',
      secondaryKeywords: [
        'Corporate Event Garching',
        'Business Event München Garching',
        'Team Event Garching',
      ],
      localIntent: [
        'Firmenfeier in Garching buchen',
        'Cocktailbar Garching',
        'Mobile Bar München Garching',
      ],
      searchVolume: 'low',
    },
  },
  {
    id: 'neuhausen-nymphenburg',
    name: 'Neuhausen-Nymphenburg',
    slug: 'neuhausen-nymphenburg',
    population: '96.000',
    description: 'Grünes Wohnviertel mit Schloss Nymphenburg und familienfreundlicher Atmosphäre',
    characteristics: [
      'Schloss Nymphenburg',
      'Botanischer Garten',
      'Grüne Oasen',
      'Familienfreundlich',
      'Gute Anbindung',
    ],
    nearbyDistricts: ['moosach', 'milbertshofen-am-hart', 'schwabing-west'],
    businessFocus: ['Gesundheitswesen', 'Bildung', 'Dienstleistungen', 'Kleinunternehmen'],
    transport: {
      subway: ['U1', 'U2', 'U7'],
      bus: ['51', '53', '57', '143', '151'],
      parking: 'Parkhäuser am Rotkreuzplatz',
    },
    venues: {
      hotels: ['Laimer Hof', 'Hotel Blauer Bock', 'Hilton Munich Park'],
      offices: ['Kliniken', 'Schulverwaltung', 'Dienstleistungszentren'],
      eventSpaces: ['Schloss Nymphenburg', 'Botanischer Garten', 'Neuhauser Festhalle'],
    },
    seo: {
      primaryKeyword: 'Firmenfeier Neuhausen-Nymphenburg',
      secondaryKeywords: [
        'Corporate Event Neuhausen-Nymphenburg',
        'Business Event München Neuhausen-Nymphenburg',
        'Team Event Neuhausen-Nymphenburg',
      ],
      localIntent: [
        'Firmenfeier in Neuhausen-Nymphenburg buchen',
        'Cocktailbar Neuhausen-Nymphenburg',
        'Mobile Bar München Neuhausen-Nymphenburg',
      ],
      searchVolume: 'medium',
    },
  },
  {
    id: 'berg-am-laim',
    name: 'Berg am Laim',
    slug: 'berg-am-laim',
    population: '78.000',
    description: 'Wachsendes Gewerbegebiet mit moderner Infrastruktur und guter Erreichbarkeit',
    characteristics: [
      'Gewerbegebiete',
      'Moderne Bürokomplexe',
      'Gute Verkehrsanbindung',
      'Wohn- und Mischgebiet',
      'Einkaufszentren',
    ],
    nearbyDistricts: ['trudering-riem', 'ramersdorf-perlach', 'haidhausen'],
    businessFocus: ['Logistik', 'Gewerbe', 'Handel', 'Dienstleistungen'],
    transport: {
      subway: ['U2', 'U5'],
      bus: ['16', '17', '18', '40', '41', '145'],
      parking: 'Große Parkplätze an der Messe',
    },
    venues: {
      hotels: [
        'Novotel München Messe',
        'Mövenpick Hotel München Messe',
        'Holiday Inn Munich Messe',
      ],
      offices: ['Messe München', 'Gewerbehöfe', 'Logistik-Zentren'],
      eventSpaces: ['Messe München', 'MOC Event Center', 'Event Arena Berg am Laim'],
    },
    seo: {
      primaryKeyword: 'Firmenfeier Berg am Laim',
      secondaryKeywords: [
        'Corporate Event Berg am Laim',
        'Business Event München Berg am Laim',
        'Team Event Berg am Laim',
      ],
      localIntent: [
        'Firmenfeier in Berg am Laim buchen',
        'Cocktailbar Berg am Laim',
        'Mobile Bar München Berg am Laim',
      ],
      searchVolume: 'medium',
    },
  },
  {
    id: 'trudering-riem',
    name: 'Trudering-Riem',
    slug: 'trudering-riem',
    population: '68.000',
    description: 'Modernes Stadtteil mit Messe München und exzellenter Infrastruktur',
    characteristics: [
      'Messe München',
      'Flughafen-Nähe',
      'Moderne Architektur',
      'Gewerbegebiete',
      'Neue Wohngebiete',
    ],
    nearbyDistricts: ['berg-am-laim', 'ramersdorf-perlach', 'obing'],
    businessFocus: ['Messewesen', 'Logistik', 'Aviation', 'Gewerbe'],
    transport: {
      subway: ['U2'],
      bus: ['16', '17', '18', '38', '39', '190', '191'],
      parking: 'Messe Parkhäuser',
    },
    venues: {
      hotels: ['Mövenpick Hotel München Messe', 'Novotel München Messe', 'NH München Messe'],
      offices: ['Messe München', 'Messe Unternehmen', 'Logistik-Firmen'],
      eventSpaces: ['Messe München', 'MOC Event Center', 'Riem Arcaden'],
    },
    seo: {
      primaryKeyword: 'Firmenfeier Trudering-Riem',
      secondaryKeywords: [
        'Corporate Event Trudering-Riem',
        'Business Event München Trudering-Riem',
        'Team Event Trudering-Riem',
      ],
      localIntent: [
        'Firmenfeier in Trudering-Riem buchen',
        'Cocktailbar Trudering-Riem',
        'Mobile Bar München Trudering-Riem',
      ],
      searchVolume: 'high',
    },
  },
];

// Helper functions for programmatic SEO
export const getDistrictBySlug = (slug: string): MunichDistrict | undefined => {
  return munichDistricts.find((district) => district.slug === slug);
};

export const getDistrictsBySearchVolume = (volume: 'high' | 'medium' | 'low'): MunichDistrict[] => {
  return munichDistricts.filter((district) => district.seo.searchVolume === volume);
};

export const getDistrictsByBusinessFocus = (focus: string): MunichDistrict[] => {
  return munichDistricts.filter((district) =>
    district.businessFocus.some((businessFocus) =>
      businessFocus.toLowerCase().includes(focus.toLowerCase()),
    ),
  );
};

export const generateDistrictKeywords = (district: MunichDistrict): string[] => {
  return [
    district.seo.primaryKeyword,
    ...district.seo.secondaryKeywords,
    ...district.seo.localIntent,
    `Mobile Bar ${district.name}`,
    `Cocktailbar ${district.name}`,
    `Event-Catering ${district.name}`,
    `Firmenevent ${district.name}`,
    `Business Event ${district.name}`,
  ];
};

export const generateDistrictSchema = (district: MunichDistrict) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Velo.Bar - Mobile Cocktailbar ${district.name}`,
    description: `Professionelle mobile Cocktailbar für Firmenfeiern und Business Events in ${district.name}, München`,
    url: `https://www.velo-bar.com/firmenfeieren/${district.slug}`,
    telephone: '+49 160 94623196',
    email: 'info@velo-bar.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'München',
      addressRegion: 'Bayern',
      postalCode: '80331',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        addressLocality: 'München',
        addressRegion: 'Bayern',
      },
      geoRadius: '5000',
    },
    areaServed: {
      '@type': 'Place',
      name: `${district.name}, München`,
    },
    serviceType: 'Mobile Cocktailbar Service',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Firmenfeier Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile Cocktailbar für Firmenfeiern',
          },
        },
      ],
    },
  };
};

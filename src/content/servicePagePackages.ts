import type { ServicePackageContent } from './types.ts';
import { servicesContent } from './services.ts';

export type ServicePageId =
  | 'firmenfeiern'
  | 'hochzeiten'
  | 'messe-catering'
  | 'team-events-workshops';

export interface LayoutServicePackage {
  name: string;
  price: string;
  priceDetail?: string;
  features: string[];
  highlighted?: boolean;
}

interface ServicePagePackageRef {
  serviceId: ServicePackageContent['id'];
  name: string;
  priceDetail?: string;
  highlighted?: boolean;
  pricePrefix?: string;
}

const SERVICE_PAGE_PACKAGES: Record<ServicePageId, ServicePagePackageRef[]> = {
  firmenfeiern: [
    {
      serviceId: 'firmenfeier-basic',
      name: 'Basis-Paket',
      priceDetail: 'für bis zu 100 Gäste',
    },
    {
      serviceId: 'firmenfeier-premium',
      name: 'Premium-Paket',
      priceDetail: 'für bis zu 150 Gäste',
      highlighted: true,
    },
    {
      serviceId: 'firmenfeier-vip',
      name: 'VIP-Paket',
      priceDetail: 'vollständig maßgeschneidert',
      pricePrefix: 'Ab ',
    },
  ],
  hochzeiten: [
    {
      serviceId: 'hochzeit-basic',
      name: 'Cocktail-Empfang',
      priceDetail: 'für 50-80 Gäste',
    },
    {
      serviceId: 'hochzeit-premium',
      name: 'Ganztags-Service',
      priceDetail: 'für 80-120 Gäste',
      highlighted: true,
    },
    {
      serviceId: 'hochzeit-custom',
      name: 'Luxury Wedding',
      priceDetail: 'vollständig maßgeschneidert',
      pricePrefix: 'Ab ',
    },
  ],
  'messe-catering': [
    {
      serviceId: 'messe-basic',
      name: 'Messe Basic',
      priceDetail: 'pro Messetag',
    },
    {
      serviceId: 'messe-premium',
      name: 'Messe Premium',
      priceDetail: 'pro Messetag',
      highlighted: true,
    },
    {
      serviceId: 'messe-enterprise',
      name: 'Enterprise Messe',
      priceDetail: 'Mehrtages-Events',
      pricePrefix: 'Ab ',
    },
  ],
  'team-events-workshops': [
    {
      serviceId: 'workshop-basic',
      name: 'Cocktail-Schnupperkurs',
      priceDetail: 'pro Person (min. 10 Personen)',
    },
    {
      serviceId: 'workshop-premium',
      name: 'Team-Building Cocktail-Kurs',
      priceDetail: 'pro Person (min. 12 Personen)',
      highlighted: true,
    },
    {
      serviceId: 'workshop-custom',
      name: 'VIP Barkeeper-Masterclass',
      priceDetail: 'pro Person (min. 8 Personen)',
    },
  ],
};

const FORMAT_LOCALE = 'de-DE';

function formatPrice(priceFrom: number, prefix?: string): string {
  const formatted = priceFrom.toLocaleString(FORMAT_LOCALE);
  return `${prefix ?? ''}€${formatted}`;
}

function getServiceById(id: ServicePackageContent['id']): ServicePackageContent {
  const service = servicesContent.services.find((svc) => svc.id === id);
  if (!service) {
    throw new Error(`Service with id "${id}" not found in servicesContent`);
  }
  return service;
}

export function getServicePagePackages(pageId: ServicePageId): LayoutServicePackage[] {
  const config = SERVICE_PAGE_PACKAGES[pageId];
  return config.map((ref) => {
    const base = getServiceById(ref.serviceId);
    return {
      name: ref.name,
      price: formatPrice(base.priceFrom, ref.pricePrefix),
      priceDetail: ref.priceDetail,
      features: [...base.features],
      highlighted: ref.highlighted,
    };
  });
}

import React from 'react';
import Star from 'lucide-react/dist/esm/icons/star';
import Users from 'lucide-react/dist/esm/icons/users';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Shield from 'lucide-react/dist/esm/icons/shield';

export interface TrustBadgeItem {
  svg: React.ReactNode;
  text: string;
  altText: string;
  id: string;
}

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    svg: <Star className='text-accent-primary fill-accent-primary h-6 w-6 md:h-8 md:w-8' />,
    text: '4.9/5 Google Bewertungen',
    altText: 'Ausgezeichnet mit 4.9 von 5 Sternen bei Google',
    id: 'rating-badge',
  },
  {
    svg: <Users className='text-accent-primary h-6 w-6 md:h-8 md:w-8' />,
    text: '500+ Events durchgeführt',
    altText: 'Über 500 erfolgreiche Events für Firmenfeiern und private Feiern',
    id: 'events-badge',
  },
  {
    svg: <Calendar className='text-accent-primary h-6 w-6 md:h-8 md:w-8' />,
    text: 'Seit 2020',
    altText: 'Erfahrene mobile Cocktailbar seit 2020',
    id: 'experience-badge',
  },
  {
    svg: <Shield className='text-accent-primary h-6 w-6 md:h-8 md:w-8' />,
    text: 'HACCP-zertifiziert',
    altText: 'Vollständig versichert und HACCP-konform',
    id: 'certification-badge',
  },
];

export default TRUST_BADGES;

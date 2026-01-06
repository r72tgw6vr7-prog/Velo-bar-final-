import React from 'react';
import { Shield, Award, Clock, Star } from 'lucide-react';

interface TrustSignalBadge {
  icon: React.ElementType;
  number: string;
  label: string;
}

export function StickyTrustSignalsBar() {
  const trustSignals: TrustSignalBadge[] = [
    {
      icon: Shield,
      number: '100%',
      label: 'EU-zertifiziert',
    },
    {
      icon: Clock,
      number: '5+',
      label: 'Min. Beratung',
    },
    {
      icon: Award,
      number: '100%',
      label: 'Hygiene',
    },
    {
      icon: Star,
      number: '27',
      label: 'Jahre Erfahrung',
    },
  ];

  return (
    <div className='bg-navy border-accent-primary/10 z-sticky sticky top-0 right-0 left-0 h-16 max-h-16 min-h-16 border-b px-4 py-0 md:px-8'>
      <div className='mx-auto h-full max-w-[1200px] overflow-x-auto md:overflow-visible'>
        <div className='flex h-full min-w-max flex-row flex-nowrap items-center justify-start gap-4 md:min-w-0 md:justify-center md:gap-8'>
          {trustSignals.map((signal, index) => {
            const IconComponent = signal.icon;
            return (
              <div
                key={index}
                className='bg-accent-primary/5 border-accent-primary/10 flex shrink items-center gap-0 rounded-sm border px-0 py-0 transition-all duration-200'
              >
                <IconComponent className='text-accent-primary h-[18px] w-[18px]' />
                <div>
                  <span className='text-accent-primary text-lg leading-none font-semibold'>
                    {signal.number}
                  </span>
                  <span className='text-[11px] leading-none whitespace-nowrap text-white/90'>
                    {signal.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StickyTrustSignalsBar;

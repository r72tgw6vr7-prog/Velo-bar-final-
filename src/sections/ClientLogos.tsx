/**
 * ClientLogos - Animated marquee of partner logos
 */

import React from 'react';

const clientLogos = [
  { id: 1, src: '/images/clients/client-01.svg', alt: 'Partner 1' },
  { id: 2, src: '/images/clients/client-02.svg', alt: 'Partner 2' },
  { id: 3, src: '/images/clients/client-03.svg', alt: 'Partner 3' },
  { id: 4, src: '/images/clients/client-04.svg', alt: 'Partner 4' },
  { id: 5, src: '/images/clients/client-05.svg', alt: 'Partner 5' },
  { id: 6, src: '/images/clients/client-06.svg', alt: 'Partner 6' },
  { id: 7, src: '/images/clients/client-07.svg', alt: 'Partner 7' },
  { id: 8, src: '/images/clients/client-08.svg', alt: 'Partner 8' },
  { id: 9, src: '/images/clients/client-09.svg', alt: 'Partner 9' },
  { id: 10, src: '/images/clients/client-10.svg', alt: 'Partner 10' },
  { id: 11, src: '/images/clients/client-11.svg', alt: 'Partner 11' },
  { id: 12, src: '/images/clients/client-12.svg', alt: 'Partner 12' },
];

interface ClientLogosProps {
  className?: string;
  variant?: 'marquee';
  title?: string;
  subtitle?: string;
  prominent?: boolean;
}

export const ClientLogos: React.FC<ClientLogosProps> = ({
  className = '',
  variant: _variant = 'marquee',
  title = 'Vertrauen von führenden Unternehmen',
  subtitle = 'Diese Unternehmen haben uns bereits für ihre Events gebucht',
  prominent = false,
}) => {
  const logos = clientLogos;
  const sectionClass = prominent ? 'bg-transparent' : 'bg-surface';

  return (
    <section className={`${sectionClass} py-16 ${className}`}>
      <div className='container mx-auto px-8'>
        <div className='mb-10 text-center'>
          <h2 className='text-accent text-3xl font-bold md:text-4xl'>{title}</h2>
          <p className='mt-4 text-base font-semibold text-white md:text-lg'>{subtitle}</p>
        </div>

        <div className='overflow-hidden'>
          <div className='client-logos-track flex min-w-max animate-[client-marquee_25s_linear_infinite] gap-20 transition-[animation-play-state] duration-300'>
            {logos.map((logo) => (
              <div key={logo.id} className='flex h-28 w-64 items-center justify-center px-10'>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className='h-20 w-auto opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0'
                  loading='lazy'
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes client-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        @media (hover: hover) and (pointer: fine) {
          .client-logos-track:hover {
            animation-play-state: paused;
          }
        }

        @media (max-width: 768px) {
          .client-logos-track {
            animation-duration: 250s;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;

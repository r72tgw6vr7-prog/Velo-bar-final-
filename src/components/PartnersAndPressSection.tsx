// ============================================
// COMPONENT: PartnersAndPressSection
// ============================================
// PURPOSE: Display trusted partner and press logos with accent heading

import React from 'react';
import { PARTNERS } from '../data/partners';
import '../styles/partners.css';

// TypeScript interfaces
interface PartnerLogo {
  id: string;
  name: string;
  image: string;
  alt: string;
}

// Build a clean list from PARTNERS data (single duplication for seamless loop)
const partnerLogos: PartnerLogo[] = PARTNERS.map((p, idx) => ({
  id: `${p.title}-${idx}`,
  name: p.title,
  image: p.src,
  alt: p.alt,
}));
const loopedPartnerLogos: PartnerLogo[] = [...partnerLogos, ...partnerLogos];

const PartnersAndPressSection: React.FC = () => {
  return (
    <section
      className='bg-color-bg-surface-tinted w-full py-16 md:py-16 lg:py-24'
      aria-label='Partner and press logos'
    >
      <div className='mx-auto max-w-[1104px] px-8 md:px-8'>
        {/* Heading */}
        <div className='mb-8 text-center'>
          <h2 className='font-body text-accent-primary mb-0 text-sm leading-snug font-normal tracking-widest uppercase'>
            Unsere Partner & Presse
          </h2>
          <p className='font-body text-xs leading-relaxed font-light text-white/70'>
            Vertrauensvolle Partnerschaften mit führenden Marken der Branche
          </p>
        </div>

        {/* Partner Logos Row (flex gap + overflow hidden) */}
        <div
          className='partners-carousel-wrapper partners-fade mx-auto max-w-[1100px] overflow-hidden px-8 md:px-8'
          role='region'
          aria-label='Partners and Press carousel'
        >
          <div className='partners-carousel-track flex items-center will-change-transform'>
            {loopedPartnerLogos.map((partner) => (
              <div
                key={partner.id}
                className='flex h-10 max-w-40 shrink-0 items-center justify-center md:h-12'
              >
                <img
                  src={partner.image}
                  alt={partner.alt}
                  title={partner.name}
                  loading='lazy'
                  decoding='async'
                  className='partners-logo-img opacity-85 transition duration-200 ease-out hover:opacity-100'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersAndPressSection;

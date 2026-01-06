import React from 'react';
import { ServiceCard } from '@/components/molecules/ServiceCard';

interface ServiceFeature {
  text: string;
  iconUrl: string;
}

interface ServicePackage {
  iconUrl: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  features: ServiceFeature[];
  highlighted?: boolean;
  popular?: boolean;
}

interface ServicesQuickLink {
  iconUrl: string;
  title: string;
  description: string;
  onClick?: () => void;
}

interface ServicesSectionProps {
  quickLinks?: ServicesQuickLink[];
  title?: string;
  subtitle?: string;
  packages?: ServicePackage[];
  onBookClick?: (packageTitle: string) => void;
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  quickLinks,
  title,
  subtitle,
  packages,
  onBookClick,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Quick Links */}
      {quickLinks && quickLinks.length > 0 && (
        <div className='flex items-start justify-center py-16'>
          <div className='flex max-w-7xl gap-8'>
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={link.onClick}
                className='flex w-[279px] flex-col items-center rounded-[14px] border border-solid border-[#C0BFBF33] py-8'
              >
                <img
                  src={link.iconUrl}
                  alt={link.title}
                  className='mb-8 h-14 w-14 rounded-[14px] object-fill'
                />
                <span className='mb-8 text-center text-[31px] font-bold text-[#d1d5db]'>
                  {link.title}
                </span>
                <span className='text-center text-sm text-white'>{link.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Packages Section */}
      {packages && packages.length > 0 && (
        <div className='flex flex-col items-center px-64 py-16'>
          {(title || subtitle) && (
            <div className='mx-auto mb-16 inline-block rounded-2xl bg-[rgba(255,248,236,0.85)] px-4 py-3 text-center backdrop-blur-sm md:px-6 md:py-4'>
              {title && <h2 className='vb-heading-1 text-[rgb(238,120,104)]'>{title}</h2>}
              {subtitle && <p className='vb-lead mt-2'>{subtitle}</p>}
            </div>
          )}

          {/* Service Packages */}
          <div className='flex flex-wrap items-stretch justify-center gap-8'>
            {packages.map((pkg, index) => (
              <ServiceCard
                key={index}
                iconUrl={pkg.iconUrl}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                duration={pkg.duration}
                features={pkg.features}
                highlighted={pkg.highlighted}
                popular={pkg.popular}
                onCtaClick={() => onBookClick?.(pkg.title)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;

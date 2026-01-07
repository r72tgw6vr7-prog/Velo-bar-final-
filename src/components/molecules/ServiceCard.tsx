/**
 * ServiceCard Component
 * =================
 * Card component for displaying service information with image and call-to-action
 */

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card/Card.tsx';
import { cn } from '@/utils/classname.ts';
import { designTokens } from '@/design-tokens.ts';

const msToSec = (ms: string) => parseFloat(ms) / 1000;
const DUR_NORMAL = msToSec(designTokens.animations.duration.normal);
const DUR_FAST = msToSec(designTokens.animations.duration.fast);
const DUR_SLOW = msToSec(designTokens.animations.duration.slow);
const EASE_SMOOTH: [number, number, number, number] = [0.4, 0.1, 0.1, 1];

export interface ServiceFeature {
  text: string;
  iconUrl?: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl?: string; // Primary image for the service (made optional)
  imageAlt?: string;
  ctaUrl?: string; // URL for the Learn More link
  ctaText?: string; // Text for the CTA, defaults to "Learn More"
  onCtaClick?: () => void;
  className?: string;
  animationDelay?: number;

  // Additional props preserved for backward compatibility
  subtitle?: string;
  price?: string;
  duration?: string;
  features?: ServiceFeature[];
  highlighted?: boolean;
  popular?: boolean;
  category?: string;
  level?: string;
  iconComponent?: React.ComponentType<{ size?: number; className?: string }>;
  iconUrl?: string; // Icon URL for the service
  ctaButtonVariant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  accentColor?: 'accent' | 'chrome';
  isVisible?: boolean;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageUrl,
  imageAlt = '',
  ctaUrl = '#',
  ctaText = 'Learn More',
  onCtaClick,
  className = '',
  animationDelay = 0,

  // We keep these props but don't use them in the new design unless specified
  onMouseEnter,
  onMouseLeave,
}) => {
  // Handle click event for the CTA
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  // Animation variants for smooth entry using design tokens
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DUR_NORMAL,
        delay: animationDelay,
        ease: EASE_SMOOTH,
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: DUR_FAST,
        ease: EASE_SMOOTH,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      variants={cardVariants}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card variant='default' padding='md' hover={false}>
        <Card.Body>
          {/* Service Image */}
          <div className={cn('relative mb-8 aspect-4/3 w-full overflow-hidden', 'rounded-sm')}>
            <motion.img
              src={imageUrl}
              alt={imageAlt || title}
              className={cn('h-full w-full object-cover', 'transition-transform duration-500')}
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: DUR_SLOW,
                ease: EASE_SMOOTH,
              }}
            />
          </div>

          {/* Card Content */}
          <div>
            {/* Title */}
            <h3 className={cn('text-brand-white', 'text-xl md:text-2xl', 'font-headline', 'mb-4')}>
              {title}
            </h3>

            {/* Description */}
            <p
              className={cn(
                'text-color-text-secondary',
                'text-base',
                'mb-8',
                'line-clamp-4',
                'font-body',
              )}
            >
              {description}
            </p>
          </div>
        </Card.Body>

        <Card.Footer>
          {/* CTA Link */}
          <motion.a
            href={ctaUrl}
            onClick={handleCtaClick}
            className={cn(
              'inline-block',
              'text-brand-white',
              'border-brand-primary-20 border-b',
              'hover:text-brand-primary',
              'hover:border-brand-primary',
              'transition-colors duration-300',
              'font-body',
            )}
            whileHover={{ x: 5 }}
            transition={{
              duration: DUR_FAST,
              ease: EASE_SMOOTH,
            }}
            aria-label={`Learn more about ${title}`}
          >
            {ctaText}
          </motion.a>
        </Card.Footer>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;

// Example usage for VeloBar services:
//
// <ServiceCard
//   imageUrl="/test-assets/test-image.jpg"
//   title="Firmenfeiern"
//   description="Professioneller Barservice für Ihre Firmenevents - von kleinen Team-Events bis zu großen Firmenfeiern."
//   ctaUrl="/firmenfeiern"
// />
//
// <ServiceCard
//   imageUrl="/test-assets/test-image.jpg"
//   title="Messe & Promotions"
//   description="Mobile Bars für Messestände und Promotion-Events - wir bringen das Hospitality-Erlebnis zu Ihren Kunden."
//   ctaUrl="/messe-catering"
// />
//
// <ServiceCard
//   imageUrl="/test-assets/test-image.jpg"
//   title="Hochzeiten"
//   description="Unvergessliche Cocktails für den schönsten Tag in Ihrem Leben - professionell und stilvoll."
//   ctaUrl="/hochzeiten"
// />

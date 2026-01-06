import React, { type ReactNode } from 'react';

interface AssertionSectionProps {
  /** Primary heading text */
  title: string;
  /** Optional secondary description */
  subtitle?: ReactNode;
  /** Heading accent colour. Defaults to theme accent (orange / coral)  */
  colorClassName?: string;
  /** Subtitle colour class. Defaults to on-dark (white/off-white). */
  subtitleClassName?: string;
  /** Optional id for the <h2> element */
  headingId?: string;
  /** Optional additional class names for outer <section>  */
  className?: string;
}

/**
 * AssertionSection – standardised introductory section heading & description.
 * Ensures pixel-perfect consistency in typography, colour and spacing across
 * all pages. Uses fluid `clamp()` sizing and Tailwind utility classes so that
 * the text scales smoothly between mobile → tablet → desktop breakpoints.
 *
 * Usage:
 * ```tsx
 * <AssertionSection
 *   title="Vertrauen von führenden Unternehmen"
 *   subtitle="Diese Unternehmen haben uns bereits für ihre Events gebucht"
 * />
 * ```
 */
export const AssertionSection: React.FC<AssertionSectionProps> = ({
  title,
  subtitle,
  colorClassName = 'heading-on-dark',
  subtitleClassName = 'text-on-dark',
  headingId,
  className = '',
}) => (
  <section
    className={`assertion-section w-full px-6 py-8 text-center md:px-8 md:py-12 lg:px-10 lg:py-16 ${className}`}
  >
    <h2 id={headingId} className={`${colorClassName} heading-l font-bold`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`${subtitleClassName} paragraph-l mx-auto mt-4 max-w-[65ch] font-semibold`}>
        {subtitle}
      </p>
    )}
  </section>
);

export default AssertionSection;

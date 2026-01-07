/**
 * PageTemplate Component
 * ===================
 *
 * Standard page wrapper that provides consistent structure for all pages.
 * Handles navigation, footer, SEO meta tags, cosmic background effects,
 * and responsive container management.
 *
 * Features:
 * - Automatic SEO meta tag injection via React Helmet
 * - CosmicNav navigation with fixed positioning
 * - PageBackground with optional glow effects
 * - Responsive container with multiple size variants
 * - Configurable spacing and background colors
 * - Error boundary for graceful error handling
 *
 * @example
 * ```tsx
 * <PageTemplate
 *   title="About Us | Velo.Bar"
 *   description="Learn about our mobile cocktail bar service"
 *   withContainer={true}
 *   containerSize="narrow"
 *   spacing="lg"
 * >
 *   <YourPageContent />
 * </PageTemplate>
 * ```
 *
 * @component
 * @category Templates
 */

import React from 'react';
import { CosmicNav } from '../components/organisms/CosmicNav.tsx';
import Footer from '../components/pages/Footer.tsx';
import { Section, PageBackground } from '../components/atoms/index.ts';
import Meta from '@/components/Meta.tsx';
import ErrorBoundary from '../components/layout/ErrorBoundary.tsx';
import { cn } from '../utils/classname.ts';

interface PageTemplateProps {
  /** Main content of the page */
  children: React.ReactNode;
  /** Page title (will be appended with site name) */
  title?: string;
  /** Meta description for SEO */
  description?: string;
  /** Canonical URL path for SEO */
  canonicalPath?: string;
  /** JSON-LD structured data for SEO rich results */
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  /** Whether to wrap content in a Section component */
  withContainer?: boolean;
  /** Optional: additional head elements to render (Helmet ok) */
  headChildren?: React.ReactNode;
  /** Container width variant */
  containerSize?: 'default' | 'narrow' | 'wide';
  /** Vertical spacing size */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Background style */
  background?: 'transparent' | 'dark' | 'darker' | 'default' | 'accent' | 'accent-subtle' | 'light';
  /** Additional CSS classes for the main content area */
  className?: string;
  /** Whether to include cosmic glow effects */
  withGlow?: boolean;
}

export function PageTemplate({
  children,
  title = 'Velo.Bar - Mobile Cocktailbar',
  description = 'Mobile Cocktailbar für Firmenevents, Hochzeiten & private Feiern in München & Coburg',
  canonicalPath = '',
  structuredData,
  withContainer = true,
  containerSize = 'default',
  spacing = 'lg',
  background = 'transparent',
  className,
  withGlow = true,
  headChildren,
}: PageTemplateProps) {
  // DEV: Add ?bgOnly to any URL to preview gradient background in isolation
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const backgroundPreview = import.meta.env.DEV && search.includes('bgOnly');

  // Detect if children already include a <main> element (avoid duplicate landmarks)
  const childrenArray = React.Children.toArray(children);
  const hasMain = childrenArray.some((child) => {
    if (!React.isValidElement(child)) return false;
    const childType: any = child.type;
    // For intrinsic elements like <main> the type is a string 'main'
    if (typeof childType === 'string' && childType === 'main') return true;
    // Also check for explicit id prop used across pages
    if (child.props && child.props.id === 'main-content') return true;
    return false;
  });

  return (
    <PageBackground
      fullHeight
      withGlow={withGlow}
      backgroundOnly={backgroundPreview}
      className='flex flex-col'
    >
      {/* Meta tags for SEO */}
      {title && description && (
        <Meta
          title={`${title} | Velo.Bar`}
          description={description}
          canonicalPath={canonicalPath}
          structuredData={structuredData}
        />
      )}

      {/* Optional additional head elements (preload, preconnect, etc.) */}
      {headChildren}

      {/* Navigation */}
      <ErrorBoundary>
        <CosmicNav />
      </ErrorBoundary>

      {/* Main content */}
      {hasMain ? (
        // If the page already provides a main landmark, render children as-is
        children
      ) : (
        <main id='main-content' className={cn('flex-1', className)}>
          {withContainer ? (
            <Section
              spacing={spacing}
              background={background}
              container={containerSize}
              className='w-full'
            >
              {children}
            </Section>
          ) : (
            children
          )}
        </main>
      )}

      {/* Footer */}
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </PageBackground>
  );
}

export default PageTemplate;

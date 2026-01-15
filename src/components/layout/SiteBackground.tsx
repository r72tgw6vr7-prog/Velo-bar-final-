import React from 'react';
import '@/styles/pages/home-new.css';
import '@/styles/pages/home-new-unified.css';

interface SiteBackgroundProps {
  children: React.ReactNode;
}

/**
 * SiteBackground Component
 * =======================
 * Wraps page content to apply the standard "Home New" theme and background styles.
 * Ensures consistent design tokens (colors, cards, typography) across all pages.
 * 
 * Usage:
 * ```tsx
 * <SiteBackground>
 *   <PageTemplate>
 *     ...
 *   </PageTemplate>
 * </SiteBackground>
 * ```
 */
export const SiteBackground: React.FC<SiteBackgroundProps> = ({ children }) => {
  return (
    <div className='home-new w-full min-h-screen'>
      {children}
    </div>
  );
};

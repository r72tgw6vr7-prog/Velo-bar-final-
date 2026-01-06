import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout Component
 *
 * Master layout component that enforces consistent width, padding, and alignment
 * across the entire application. Fixes critical misalignment between navigation
 * and page sections.
 *
 * Design Specifications:
 * - Max width: 1280px (max-w-7xl)
 * - Centered with mx-auto
 * - Responsive horizontal padding: px-4 sm:px-6 lg:px-8
 * - Vertical padding: py-8 sm:py-12
 * - Inherits background from body (#1a2332)
 *
 * @deprecated Legacy layout wrapper. Prefer using PageTemplate with Section/Container for new pages.
 *
 * @example
 * ```tsx
 * <MainLayout>
 *   <StudioHero />
 *   <ServiceCards />
 * </MainLayout>
 * ```
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <main className='mx-auto max-w-7xl px-8 py-8 sm:px-8 sm:py-16 lg:px-8'>{children}</main>;
};

export default MainLayout;

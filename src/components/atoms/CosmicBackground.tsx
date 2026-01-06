/**
 * BrandBackground Component (legacy: CosmicBackground)
 * =====================================================
 * Brand-compliant wrapper for the entire application.
 * Uses navy (#1a2332) background per Velo.Bar brand kit.
 */

import React from 'react';
import '@/styles/glassmorphism.css';

export interface CosmicBackgroundProps {
  children: React.ReactNode;
}

/**
 * Root background component that provides the brand theme.
 * This should wrap your entire application at the root level.
 * @deprecated Use solid black background directly via body CSS
 */
export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ children }) => {
  return <div className='brand-root'>{children}</div>;
};

export default CosmicBackground;

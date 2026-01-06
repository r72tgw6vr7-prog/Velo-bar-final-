/**
 * Foundation module exports
 *
 * This file serves as the entry point for the foundation module, making it easier to import
 * design system components and tokens throughout the application.
 */

import { BusinessProvider, useBusinessDesignSystem, designSystemTokens } from './BusinessProvider';

// Re-export design tokens
export { designTokens } from '../design-tokens';

// Export everything
export { BusinessProvider, useBusinessDesignSystem, designSystemTokens };

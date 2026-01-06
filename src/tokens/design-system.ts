/**
 * @deprecated This file is deprecated. Use `src/design-tokens.ts` as the single source of truth.
 * This file is kept for backward compatibility and re-exports from the main tokens file.
 *
 * Migration: Replace imports of this file with:
 * import { designTokens } from '@/design-tokens';
 */

// Thin alias to the single source of truth
export * from '../design-tokens';
export { default } from '../design-tokens';

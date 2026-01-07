/**
 * BACKWARD COMPATIBILITY WRAPPER
 * ================================
 *
 * This file is a compatibility wrapper that re-exports the Input component.
 * ConsolidatedInput has been renamed to Input as it is now the primary
 * input component.
 *
 * This wrapper ensures any existing imports from ConsolidatedInput
 * continue to work without breaking changes.
 *
 * Migration Path:
 * 1. Phase 1: This wrapper provides backward compatibility (CURRENT)
 * 2. Phase 2: Update imports to use './Input.ts directly
 * 3. Phase 3: Remove this wrapper file (future cleanup sprint)
 *
 * @deprecated Use './Input' instead
 * @see ./Input.ts
 */

// Re-export everything from the main Input component
export * from './Input.tsx';
export { default } from './Input.tsx';

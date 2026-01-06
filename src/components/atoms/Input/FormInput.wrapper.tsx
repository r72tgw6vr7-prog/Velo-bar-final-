/**
 * BACKWARD COMPATIBILITY WRAPPER
 * ================================
 *
 * This file is a compatibility wrapper that re-exports the Input component.
 * FormInput has been consolidated into the main Input component.
 *
 * This wrapper ensures any existing imports from FormInput
 * continue to work without breaking changes.
 *
 * Migration Path:
 * 1. Phase 1: This wrapper provides backward compatibility (CURRENT)
 * 2. Phase 2: Update imports to use './Input' directly
 * 3. Phase 3: Remove this wrapper file (future cleanup sprint)
 *
 * @deprecated Use './Input' instead
 * @see ./Input.tsx
 */

// Re-export the consolidated Input component
export { Input as FormInput } from './Input';
export { default } from './Input';

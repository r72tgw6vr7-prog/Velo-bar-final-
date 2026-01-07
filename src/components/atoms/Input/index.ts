/**
 * Input Component Exports
 * =======================
 *
 * Primary export: Input (consolidated component)
 * Legacy exports: ConsolidatedInput, InputField, FormInput (for backward compatibility)
 */

// Primary export - the consolidated Input component
export { default as Input } from './Input.ts';
export { Input as default } from './Input.ts';

// Re-export types
export type {
  InputProps,
  InputSize,
  InputVariant,
  IconPosition,
  ValidationState,
  InputColorScheme,
} from './Input.tsx';

// Backward compatibility exports
export { default as ConsolidatedInput } from './ConsolidatedInput.ts';
export { default as InputField } from './InputField.wrapper.ts';
export { default as FormInput } from './FormInput.wrapper.ts';

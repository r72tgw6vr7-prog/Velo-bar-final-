/**
 * Input Component Exports
 * =======================
 *
 * Primary export: Input (consolidated component)
 * Legacy exports: ConsolidatedInput, InputField, FormInput (for backward compatibility)
 */

// Primary export - the consolidated Input component
export { default as Input } from './Input';
export { Input as default } from './Input';

// Re-export types
export type {
  InputProps,
  InputSize,
  InputVariant,
  IconPosition,
  ValidationState,
  InputColorScheme,
} from './Input';

// Backward compatibility exports
export { default as ConsolidatedInput } from './ConsolidatedInput';
export { default as InputField } from './InputField.wrapper';
export { default as FormInput } from './FormInput.wrapper';

import { FieldValues, UseFormReturn, FieldError as RHFError } from 'react-hook-form';

export interface FormFieldProps<T extends FieldValues> {
  /** The name of the field in the form */
  name: keyof T;
  /** Label text for the field */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Helper text to display below the field */
  helperText?: string;
  /** Error message to display */
  error?: string | RHFError | null;
  /** Additional class name for the field container */
  className?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is in a loading state */
  isLoading?: boolean;
}

export interface FormErrorProps {
  /** Error message to display */
  message?: string | null;
  /** Additional class name */
  className?: string;
  /** Whether to show an icon with the error */
  withIcon?: boolean;
}

export type FormMethods<T extends FieldValues> = UseFormReturn<T>;

export type { FieldValues, FieldError } from 'react-hook-form';

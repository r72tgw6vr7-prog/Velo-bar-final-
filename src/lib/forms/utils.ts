import { FieldValues, Path, UseFormReturn, DefaultValues } from 'react-hook-form';
import { z, ZodTypeAny } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Get the error message for a form field
 */
export function getErrorMessage<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: Path<T>,
): string | undefined {
  const error = form.formState.errors[name];

  if (!error) {
    return undefined;
  }

  if (typeof error.message === 'string') {
    return error.message;
  }

  if (Array.isArray(error)) {
    return error[0]?.message;
  }

  return 'Invalid field';
}

/**
 * Create a form resolver with Zod
 */
export function createFormResolver<T extends Record<string, ZodTypeAny>>(schema: z.ZodObject<T>) {
  return zodResolver(schema);
}

/**
 * Format a form field name for display
 * Example: 'firstName' -> 'First name'
 */
export function formatFieldName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/([0-9]+)/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Check if a form field has an error
 */
export function hasError<T extends FieldValues>(form: UseFormReturn<T>, name: Path<T>): boolean {
  return Boolean(form.formState.errors[name]);
}

/**
 * Check if a form is submitting
 */
export function isSubmitting<T extends FieldValues>(form: UseFormReturn<T>): boolean {
  return form.formState.isSubmitting;
}

/**
 * Reset a form to its default values
 */
export function resetForm<T extends FieldValues>(
  form: UseFormReturn<T>,
  values?: Partial<T>,
): void {
  const defaults =
    (values as DefaultValues<T>) ??
    (form.formState.defaultValues as DefaultValues<T>) ??
    ({} as DefaultValues<T>);
  form.reset(defaults);
}

/**
 * Set form errors from an API response
 */
export function setFormErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: Record<string, string[]>,
): void {
  Object.entries(errors).forEach(([field, messages]) => {
    form.setError(field as Path<T>, {
      type: 'manual',
      message: messages.join(' '),
    });
  });
}

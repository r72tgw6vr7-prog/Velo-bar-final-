import { z } from 'zod';

/**
 * Common validation messages
 */
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (length: number) => `Must be at least ${length} characters`,
  maxLength: (length: number) => `Must be at most ${length} characters`,
  url: 'Please enter a valid URL',
  phone: 'Please enter a valid phone number',
  password: {
    minLength: 'Password must be at least 8 characters',
    uppercase: 'Must contain at least one uppercase letter',
    lowercase: 'Must contain at least one lowercase letter',
    number: 'Must contain at least one number',
    special: 'Must contain at least one special character',
  },
} as const;

/**
 * Common field validators
 */
export const validators = {
  required: (message = VALIDATION_MESSAGES.required) => z.string().min(1, { message }),

  email: (message = VALIDATION_MESSAGES.email) => z.string().email({ message }),

  minLength: (length: number, message?: string) =>
    z.string().min(length, {
      message: message || VALIDATION_MESSAGES.minLength(length),
    }),

  maxLength: (length: number, message?: string) =>
    z.string().max(length, {
      message: message || VALIDATION_MESSAGES.maxLength(length),
    }),

  url: (message = VALIDATION_MESSAGES.url) => z.string().url({ message }),

  phone: (message = VALIDATION_MESSAGES.phone) =>
    z.string().regex(/^\+?[\d\s-()]{10,}$/, { message }),

  password: (
    options: {
      minLength?: number;
      requireUppercase?: boolean;
      requireLowercase?: boolean;
      requireNumber?: boolean;
      requireSpecialChar?: boolean;
    } = {},
  ) => {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumber = true,
      requireSpecialChar = true,
    } = options;

    let schema = z.string();

    if (minLength > 0) {
      schema = schema.min(minLength, {
        message: VALIDATION_MESSAGES.password.minLength,
      });
    }

    if (requireUppercase) {
      schema = schema.regex(/[A-Z]/, {
        message: VALIDATION_MESSAGES.password.uppercase,
      });
    }

    if (requireLowercase) {
      schema = schema.regex(/[a-z]/, {
        message: VALIDATION_MESSAGES.password.lowercase,
      });
    }

    if (requireNumber) {
      schema = schema.regex(/[0-9]/, {
        message: VALIDATION_MESSAGES.password.number,
      });
    }

    if (requireSpecialChar) {
      schema = schema.regex(/[^A-Za-z0-9]/, {
        message: VALIDATION_MESSAGES.password.special,
      });
    }

    return schema;
  },
} as const;

/**
 * Create a validation schema for a form
 */
export function createFormSchema<T extends Record<string, any>>(schema: T): z.ZodObject<T> {
  return z.object(schema);
}

/**
 * Infer TypeScript type from a form schema
 */
export type InferFormSchema<T extends z.ZodTypeAny> = z.infer<T>;

/**
 * Service Data Validation Schemas
 * ================================
 * Runtime validation using Zod for service data integrity
 *
 * @see {@link ../data/services.ts} for the actual data
 * @see {@link ../components/templates/ServicePageLayout.tsx} for TypeScript types
 */

import { z } from 'zod';

/**
 * Service Package Schema
 * Validates pricing packages with features and optional highlighting
 */
export const ServicePackageSchema = z.object({
  name: z.string().min(1, 'Package name is required'),
  price: z.string().min(1, 'Price is required'),
  priceDetail: z.string().optional(),
  features: z
    .array(z.string().min(1, 'Feature cannot be empty'))
    .min(1, 'At least one feature is required'),
  highlighted: z.boolean().optional(),
});

/**
 * FAQ Schema
 * Validates question/answer pairs
 */
export const FAQSchema = z.object({
  question: z.string().min(3, 'Question must be at least 3 characters'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
});

/**
 * Testimonial Schema
 * Validates customer testimonials with ratings
 */
export const TestimonialSchema = z.object({
  quote: z.string().min(10, 'Quote must be at least 10 characters'),
  author: z.string().min(2, 'Author name must be at least 2 characters'),
  company: z.string().min(1, 'Company/event type is required'),
  rating: z.number().min(1).max(5).optional(),
});

/**
 * Service Category Schema
 * Validates complete service category data structure
 */
export const ServiceCategorySchema = z.object({
  packages: z.array(ServicePackageSchema),
  faqs: z.array(FAQSchema),
  testimonials: z.array(TestimonialSchema),
});

/**
 * Complete Service Data Schema
 * Validates the entire service data structure
 */
export const ServiceDataSchema = z.object({
  packages: z.record(z.string(), z.array(ServicePackageSchema)),
  faqs: z.record(z.string(), z.array(FAQSchema)),
  testimonials: z.object({
    shared: z.array(TestimonialSchema),
    hochzeiten: z.array(TestimonialSchema),
    firmenFeiern: z.array(TestimonialSchema),
    privateFeiern: z.array(TestimonialSchema),
    weihnachtsfeiern: z.array(TestimonialSchema),
    messeCatering: z.array(TestimonialSchema),
    teamEvents: z.array(TestimonialSchema),
    buchungMuc: z.array(TestimonialSchema).optional(),
    velobarco: z.array(TestimonialSchema).optional(),
  }),
});

// ============================================
// Type Exports (inferred from schemas)
// ============================================

export type ValidatedServicePackage = z.infer<typeof ServicePackageSchema>;
export type ValidatedFAQ = z.infer<typeof FAQSchema>;
export type ValidatedTestimonial = z.infer<typeof TestimonialSchema>;
export type ValidatedServiceCategory = z.infer<typeof ServiceCategorySchema>;
export type ValidatedServiceData = z.infer<typeof ServiceDataSchema>;

// ============================================
// Type Guards
// ============================================

/**
 * Type guard for ServicePackage
 * @param data - Data to validate
 * @returns True if data is a valid ServicePackage
 */
export function isServicePackage(data: unknown): data is ValidatedServicePackage {
  return ServicePackageSchema.safeParse(data).success;
}

/**
 * Type guard for FAQ
 * @param data - Data to validate
 * @returns True if data is a valid FAQ
 */
export function isFAQ(data: unknown): data is ValidatedFAQ {
  return FAQSchema.safeParse(data).success;
}

/**
 * Type guard for Testimonial
 * @param data - Data to validate
 * @returns True if data is a valid Testimonial
 */
export function isTestimonial(data: unknown): data is ValidatedTestimonial {
  return TestimonialSchema.safeParse(data).success;
}

/**
 * Type guard for ServiceCategory
 * @param data - Data to validate
 * @returns True if data is a valid ServiceCategory
 */
export function isServiceCategory(data: unknown): data is ValidatedServiceCategory {
  return ServiceCategorySchema.safeParse(data).success;
}

/**
 * Type guard for complete ServiceData
 * @param data - Data to validate
 * @returns True if data is valid ServiceData
 */
export function isServiceData(data: unknown): data is ValidatedServiceData {
  return ServiceDataSchema.safeParse(data).success;
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Validates an array of service packages
 * @param packages - Array of packages to validate
 * @throws {z.ZodError} If validation fails
 * @returns Validated packages
 */
export function validateServicePackages(packages: unknown[]) {
  return z.array(ServicePackageSchema).parse(packages);
}

/**
 * Validates an array of FAQs
 * @param faqs - Array of FAQs to validate
 * @throws {z.ZodError} If validation fails
 * @returns Validated FAQs
 */
export function validateFAQs(faqs: unknown[]) {
  return z.array(FAQSchema).parse(faqs);
}

/**
 * Validates an array of testimonials
 * @param testimonials - Array of testimonials to validate
 * @throws {z.ZodError} If validation fails
 * @returns Validated testimonials
 */
export function validateTestimonials(testimonials: unknown[]) {
  return z.array(TestimonialSchema).parse(testimonials);
}

/**
 * Safe validation that returns result with error details
 * @param data - Data to validate
 * @param schema - Zod schema to validate against
 * @returns Object with success status and data or error
 */
export function safeValidate<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Formats Zod validation errors for logging
 * @param error - Zod error object
 * @returns Formatted error message
 */
export function formatValidationError(error: z.ZodError): string {
  return error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
}

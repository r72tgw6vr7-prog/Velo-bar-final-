/**
 * Service Data Validation Tests
 * ==============================
 * Tests for Zod schema validation of service data
 */

import { describe, it, expect } from 'vitest';
import {
  ServicePackageSchema,
  FAQSchema,
  TestimonialSchema,
  isServicePackage,
  isFAQ,
  isTestimonial,
  validateServicePackages,
  validateFAQs,
  validateTestimonials,
  safeValidate,
  formatValidationError,
} from '@/schemas/service';

describe('ServicePackageSchema', () => {
  it('should validate a valid service package', () => {
    const validPackage = {
      name: 'Premium Package',
      price: '€1.500',
      priceDetail: 'for 50-100 guests',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      highlighted: true,
    };

    expect(() => ServicePackageSchema.parse(validPackage)).not.toThrow();
  });

  it('should accept package without optional fields', () => {
    const minimalPackage = {
      name: 'Basic Package',
      price: '€500',
      features: ['Feature 1'],
    };

    expect(() => ServicePackageSchema.parse(minimalPackage)).not.toThrow();
  });

  it('should reject package with empty name', () => {
    const invalidPackage = {
      name: '',
      price: '€1.500',
      features: ['Feature 1'],
    };

    expect(() => ServicePackageSchema.parse(invalidPackage)).toThrow();
  });

  it('should reject package with empty features array', () => {
    const invalidPackage = {
      name: 'Package',
      price: '€1.500',
      features: [],
    };

    expect(() => ServicePackageSchema.parse(invalidPackage)).toThrow();
  });

  it('should reject package with empty feature string', () => {
    const invalidPackage = {
      name: 'Package',
      price: '€1.500',
      features: ['Feature 1', '', 'Feature 3'],
    };

    expect(() => ServicePackageSchema.parse(invalidPackage)).toThrow();
  });
});

describe('FAQSchema', () => {
  it('should validate a valid FAQ', () => {
    const validFAQ = {
      question: 'What is included in the package?',
      answer: 'The package includes professional bartenders, cocktail menu, and decoration.',
    };

    expect(() => FAQSchema.parse(validFAQ)).not.toThrow();
  });

  it('should reject FAQ with short question', () => {
    const invalidFAQ = {
      question: 'Hi',
      answer: 'This is a valid answer.',
    };

    expect(() => FAQSchema.parse(invalidFAQ)).toThrow();
  });

  it('should reject FAQ with short answer', () => {
    const invalidFAQ = {
      question: 'What is this?',
      answer: 'Short',
    };

    expect(() => FAQSchema.parse(invalidFAQ)).toThrow();
  });
});

describe('TestimonialSchema', () => {
  it('should validate a valid testimonial with rating', () => {
    const validTestimonial = {
      quote: 'Excellent service and amazing cocktails!',
      author: 'John Doe',
      company: 'Tech Corp',
      rating: 5,
    };

    expect(() => TestimonialSchema.parse(validTestimonial)).not.toThrow();
  });

  it('should validate testimonial without rating', () => {
    const validTestimonial = {
      quote: 'Great experience overall.',
      author: 'Jane Smith',
      company: 'Design Studio',
    };

    expect(() => TestimonialSchema.parse(validTestimonial)).not.toThrow();
  });

  it('should reject testimonial with short quote', () => {
    const invalidTestimonial = {
      quote: 'Good',
      author: 'John Doe',
      company: 'Tech Corp',
    };

    expect(() => TestimonialSchema.parse(invalidTestimonial)).toThrow();
  });

  it('should reject testimonial with invalid rating', () => {
    const invalidTestimonial = {
      quote: 'Excellent service!',
      author: 'John Doe',
      company: 'Tech Corp',
      rating: 6,
    };

    expect(() => TestimonialSchema.parse(invalidTestimonial)).toThrow();
  });

  it('should reject testimonial with negative rating', () => {
    const invalidTestimonial = {
      quote: 'Excellent service!',
      author: 'John Doe',
      company: 'Tech Corp',
      rating: 0,
    };

    expect(() => TestimonialSchema.parse(invalidTestimonial)).toThrow();
  });
});

describe('Type Guards', () => {
  it('isServicePackage should return true for valid package', () => {
    const validPackage = {
      name: 'Package',
      price: '€500',
      features: ['Feature 1'],
    };

    expect(isServicePackage(validPackage)).toBe(true);
  });

  it('isServicePackage should return false for invalid package', () => {
    const invalidPackage = {
      name: '',
      price: '€500',
      features: [],
    };

    expect(isServicePackage(invalidPackage)).toBe(false);
  });

  it('isFAQ should return true for valid FAQ', () => {
    const validFAQ = {
      question: 'Valid question?',
      answer: 'Valid answer with enough characters.',
    };

    expect(isFAQ(validFAQ)).toBe(true);
  });

  it('isFAQ should return false for invalid FAQ', () => {
    const invalidFAQ = {
      question: 'Q',
      answer: 'A',
    };

    expect(isFAQ(invalidFAQ)).toBe(false);
  });

  it('isTestimonial should return true for valid testimonial', () => {
    const validTestimonial = {
      quote: 'Great service!',
      author: 'John',
      company: 'Corp',
    };

    expect(isTestimonial(validTestimonial)).toBe(true);
  });

  it('isTestimonial should return false for invalid testimonial', () => {
    const invalidTestimonial = {
      quote: 'Hi',
      author: 'J',
      company: '',
    };

    expect(isTestimonial(invalidTestimonial)).toBe(false);
  });
});

describe('Validation Helpers', () => {
  it('validateServicePackages should validate array of packages', () => {
    const packages = [
      {
        name: 'Package 1',
        price: '€500',
        features: ['Feature 1'],
      },
      {
        name: 'Package 2',
        price: '€1000',
        features: ['Feature 1', 'Feature 2'],
      },
    ];

    expect(() => validateServicePackages(packages)).not.toThrow();
  });

  it('validateFAQs should validate array of FAQs', () => {
    const faqs = [
      {
        question: 'Question 1?',
        answer: 'Answer 1 with enough characters.',
      },
      {
        question: 'Question 2?',
        answer: 'Answer 2 with enough characters.',
      },
    ];

    expect(() => validateFAQs(faqs)).not.toThrow();
  });

  it('validateTestimonials should validate array of testimonials', () => {
    const testimonials = [
      {
        quote: 'Great service!',
        author: 'John Doe',
        company: 'Tech Corp',
        rating: 5,
      },
      {
        quote: 'Amazing cocktails!',
        author: 'Jane Smith',
        company: 'Design Studio',
      },
    ];

    expect(() => validateTestimonials(testimonials)).not.toThrow();
  });
});

describe('safeValidate', () => {
  it('should return success for valid data', () => {
    const validPackage = {
      name: 'Package',
      price: '€500',
      features: ['Feature 1'],
    };

    const result = safeValidate(validPackage, ServicePackageSchema);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validPackage);
    }
  });

  it('should return error for invalid data', () => {
    const invalidPackage = {
      name: '',
      price: '€500',
      features: [],
    };

    const result = safeValidate(invalidPackage, ServicePackageSchema);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeDefined();
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});

describe('formatValidationError', () => {
  it('should format Zod errors into readable strings', () => {
    const invalidPackage = {
      name: '',
      price: '',
      features: [],
    };

    try {
      ServicePackageSchema.parse(invalidPackage);
    } catch (error: any) {
      const formatted = formatValidationError(error);
      expect(formatted).toContain('name');
      expect(formatted).toContain('price');
      expect(formatted).toContain('features');
    }
  });
});

describe('Real Service Data Integration', () => {
  it('should import and validate actual service data without errors', async () => {
    // This test will fail if the actual service data doesn't match the schemas
    const { servicePackages, serviceFAQs, serviceTestimonials } = await import('@/data/services');

    // Validate packages
    Object.entries(servicePackages).forEach(([key, packages]) => {
      expect(() => validateServicePackages(packages)).not.toThrow(
        `servicePackages.${key} validation failed`,
      );
    });

    // Validate FAQs
    Object.entries(serviceFAQs).forEach(([key, faqs]) => {
      expect(() => validateFAQs(faqs)).not.toThrow(`serviceFAQs.${key} validation failed`);
    });

    // Validate testimonials
    Object.entries(serviceTestimonials).forEach(([key, testimonials]) => {
      expect(() => validateTestimonials(testimonials)).not.toThrow(
        `serviceTestimonials.${key} validation failed`,
      );
    });
  });
});

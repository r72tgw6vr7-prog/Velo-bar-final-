/**
 * Content Types Unit Tests
 * =========================
 * Validates content structure, types, and data integrity
 */

import { describe, it, expect } from 'vitest';
import firmenfeiernContentDE, { firmenfeiernContentEN } from '../content/firmenfeiern.ts';
import weihnachtsfeiernContentDE, { weihnachtsfeiernContentEN } from '../content/weihnachtsfeiern.ts';
import messeCateringContentDE, { messeCateringContentEN } from '../content/messe-catering.ts';
import privateFeiernContentDE, { privateFeiernContentEN } from '../content/private-feiern.ts';

describe('Content Types - Structure Validation', () => {
  describe('FirmenFeiern Content', () => {
    it('DE content has required fields', () => {
      expect(firmenfeiernContentDE.slug).toBe('firmenfeiern');
      expect(firmenfeiernContentDE.seoTitle).toBeDefined();
      expect(firmenfeiernContentDE.seoDescription).toBeDefined();
      expect(firmenfeiernContentDE.hero).toBeDefined();
      expect(firmenfeiernContentDE.pricingTiers).toBeDefined();
      expect(firmenfeiernContentDE.faqs).toBeDefined();
      expect(firmenfeiernContentDE.cta).toBeDefined();
    });

    it('EN content has required fields', () => {
      expect(firmenfeiernContentEN.slug).toBe('corporate-events');
      expect(firmenfeiernContentEN.seoTitle).toBeDefined();
      expect(firmenfeiernContentEN.seoDescription).toBeDefined();
      expect(firmenfeiernContentEN.hero).toBeDefined();
      expect(firmenfeiernContentEN.pricingTiers).toBeDefined();
      expect(firmenfeiernContentEN.faqs).toBeDefined();
    });

    it('has valid pricing tiers structure', () => {
      expect(firmenfeiernContentDE.pricingTiers).toHaveLength(3);

      firmenfeiernContentDE.pricingTiers.forEach((tier) => {
        expect(tier.id).toBeDefined();
        expect(tier.name).toBeDefined();
        expect(tier.pricePerGuest).toBeDefined();
        expect(tier.basePrice).toBeDefined();
        expect(tier.duration).toBeDefined();
        expect(tier.guests).toBeDefined();
        expect(tier.benefits).toBeInstanceOf(Array);
        expect(tier.benefits.length).toBeGreaterThan(0);
        expect(tier.cta).toBeDefined();
      });
    });

    it('has valid FAQ structure', () => {
      expect(firmenfeiernContentDE.faqs.length).toBeGreaterThan(0);

      firmenfeiernContentDE.faqs.forEach((faq) => {
        expect(faq.id).toBeDefined();
        expect(faq.question).toBeDefined();
        expect(faq.answer).toBeDefined();
        expect(faq.question.length).toBeGreaterThan(0);
        expect(faq.answer.length).toBeGreaterThan(0);
      });
    });

    it('DE and EN have same number of pricing tiers', () => {
      expect(firmenfeiernContentDE.pricingTiers.length).toBe(
        firmenfeiernContentEN.pricingTiers.length,
      );
    });

    it('DE and EN have same number of FAQs', () => {
      expect(firmenfeiernContentDE.faqs.length).toBe(firmenfeiernContentEN.faqs.length);
    });
  });

  describe('WeihnachtsFeiern Content', () => {
    it('DE content has required fields', () => {
      expect(weihnachtsfeiernContentDE.slug).toBe('weihnachtsfeiern');
      expect(weihnachtsfeiernContentDE.seoTitle).toBeDefined();
      expect(weihnachtsfeiernContentDE.hero).toBeDefined();
      expect(weihnachtsfeiernContentDE.pricingTiers).toBeDefined();
      expect(weihnachtsfeiernContentDE.seasonalCocktails).toBeDefined();
    });

    it('EN content has required fields', () => {
      expect(weihnachtsfeiernContentEN.slug).toBe('christmas-parties');
      expect(weihnachtsfeiernContentEN.seoTitle).toBeDefined();
      expect(weihnachtsfeiernContentEN.hero).toBeDefined();
    });

    it('has seasonal cocktails', () => {
      expect(weihnachtsfeiernContentDE.seasonalCocktails.length).toBeGreaterThan(0);

      weihnachtsfeiernContentDE.seasonalCocktails.forEach((cocktail) => {
        expect(cocktail.name).toBeDefined();
        expect(cocktail.description).toBeDefined();
        expect(cocktail.category).toBeDefined();
        expect(['warm', 'klassisch', 'prickelnd', 'alkoholfrei']).toContain(cocktail.category);
      });
    });

    it('has office setups', () => {
      expect(weihnachtsfeiernContentDE.officeSetups).toBeDefined();
      expect(weihnachtsfeiernContentDE.officeSetups.length).toBeGreaterThan(0);

      weihnachtsfeiernContentDE.officeSetups.forEach((setup) => {
        expect(setup.id).toBeDefined();
        expect(setup.title).toBeDefined();
        expect(setup.guests).toBeDefined();
        expect(setup.location).toBeDefined();
      });
    });
  });

  describe('MesseCatering Content', () => {
    it('DE content has required fields', () => {
      expect(messeCateringContentDE.slug).toBe('messe-catering');
      expect(messeCateringContentDE.seoTitle).toBeDefined();
      expect(messeCateringContentDE.hero).toBeDefined();
      expect(messeCateringContentDE.pricingTiers).toBeDefined();
    });

    it('EN content has required fields', () => {
      expect(messeCateringContentEN.slug).toBe('trade-fair-catering');
      expect(messeCateringContentEN.seoTitle).toBeDefined();
    });

    it('has valid pricing structure', () => {
      expect(messeCateringContentDE.pricingTiers.length).toBe(3);

      const highlighted = messeCateringContentDE.pricingTiers.filter((t) => t.highlighted);
      expect(highlighted.length).toBe(1); // Only one highlighted tier
    });
  });

  describe('PrivateFeiern Content', () => {
    it('DE content has required fields', () => {
      expect(privateFeiernContentDE.slug).toBe('private-feiern');
      expect(privateFeiernContentDE.seoTitle).toBeDefined();
      expect(privateFeiernContentDE.hero).toBeDefined();
    });

    it('EN content has required fields', () => {
      expect(privateFeiernContentEN.slug).toBe('private-parties');
      expect(privateFeiernContentEN.seoTitle).toBeDefined();
    });

    it('has testimonials', () => {
      expect(privateFeiernContentDE.testimonials).toBeDefined();

      if (privateFeiernContentDE.testimonials) {
        privateFeiernContentDE.testimonials.forEach((testimonial) => {
          expect(testimonial.id).toBeDefined();
          expect(testimonial.quote).toBeDefined();
          expect(testimonial.author).toBeDefined();
          expect(testimonial.rating).toBeDefined();
          expect(testimonial.rating).toBeGreaterThanOrEqual(1);
          expect(testimonial.rating).toBeLessThanOrEqual(5);
        });
      }
    });
  });
});

describe('Content Types - Data Integrity', () => {
  it('all content has unique slugs', () => {
    const slugs = [
      firmenfeiernContentDE.slug,
      weihnachtsfeiernContentDE.slug,
      messeCateringContentDE.slug,
      privateFeiernContentDE.slug,
    ];

    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('all pricing tiers have unique IDs within each content', () => {
    const contents = [
      firmenfeiernContentDE,
      weihnachtsfeiernContentDE,
      messeCateringContentDE,
      privateFeiernContentDE,
    ];

    contents.forEach((content) => {
      const ids = content.pricingTiers.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  it('all FAQs have unique IDs within each content', () => {
    const contents = [
      firmenfeiernContentDE,
      weihnachtsfeiernContentDE,
      messeCateringContentDE,
      privateFeiernContentDE,
    ];

    contents.forEach((content) => {
      const ids = content.faqs.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  it('SEO titles are within recommended length', () => {
    const contents = [
      firmenfeiernContentDE,
      weihnachtsfeiernContentDE,
      messeCateringContentDE,
      privateFeiernContentDE,
    ];

    contents.forEach((content) => {
      expect(content.seoTitle.length).toBeLessThanOrEqual(60);
      expect(content.seoTitle.length).toBeGreaterThan(10);
    });
  });

  it('SEO descriptions are within recommended length', () => {
    const contents = [
      firmenfeiernContentDE,
      weihnachtsfeiernContentDE,
      messeCateringContentDE,
      privateFeiernContentDE,
    ];

    contents.forEach((content) => {
      expect(content.seoDescription.length).toBeLessThanOrEqual(160);
      expect(content.seoDescription.length).toBeGreaterThan(50);
    });
  });

  it('CTA links are valid paths', () => {
    const contents = [
      firmenfeiernContentDE,
      weihnachtsfeiernContentDE,
      messeCateringContentDE,
      privateFeiernContentDE,
    ];

    contents.forEach((content) => {
      expect(content.cta.primary.href).toMatch(/^\/|^mailto:|^tel:/);
      if (content.cta.secondary) {
        expect(content.cta.secondary.href).toMatch(/^\/|^mailto:|^tel:/);
      }
    });
  });
});

describe('Content Types - i18n Consistency', () => {
  it('FirmenFeiern: DE and EN have matching pricing tier IDs', () => {
    const deIds = firmenfeiernContentDE.pricingTiers.map((t) => t.id);
    const enIds = firmenfeiernContentEN.pricingTiers.map((t) => t.id);

    expect(deIds).toEqual(enIds);
  });

  it('FirmenFeiern: DE and EN have matching FAQ IDs', () => {
    const deIds = firmenfeiernContentDE.faqs.map((f) => f.id).sort();
    const enIds = firmenfeiernContentEN.faqs.map((f) => f.id).sort();

    // Both should have the same IDs (order may differ)
    expect(deIds.length).toBe(enIds.length);
    expect(new Set(deIds)).toEqual(new Set(enIds));
  });

  it('WeihnachtsFeiern: DE and EN have matching pricing tier IDs', () => {
    const deIds = weihnachtsfeiernContentDE.pricingTiers.map((t) => t.id);
    const enIds = weihnachtsfeiernContentEN.pricingTiers.map((t) => t.id);

    expect(deIds).toEqual(enIds);
  });

  it('all content has non-empty hero titles', () => {
    const allContent = [
      firmenfeiernContentDE,
      firmenfeiernContentEN,
      weihnachtsfeiernContentDE,
      weihnachtsfeiernContentEN,
      messeCateringContentDE,
      messeCateringContentEN,
      privateFeiernContentDE,
      privateFeiernContentEN,
    ];

    allContent.forEach((content) => {
      expect(content.hero.title).toBeDefined();
      expect(content.hero.title.length).toBeGreaterThan(0);
    });
  });
});

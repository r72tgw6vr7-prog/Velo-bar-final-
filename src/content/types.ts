export interface HeroContent {
  readonly eyebrow?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly primaryCtaLabel?: string;
  readonly secondaryCtaLabel?: string;
}

export interface SectionContent {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly body?: readonly string[];
}

export interface PageContentBase {
  readonly slug: string;
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly hero: HeroContent;
  readonly sections: readonly SectionContent[];
}

export interface ListingItemContent {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly href?: string;
  readonly meta?: readonly string[];
  readonly priceCents?: number;
  readonly externalUrl?: string;
}

export interface ListingPageContent extends PageContentBase {
  readonly groups?: readonly {
    readonly id: string;
    readonly title: string;
    readonly items: readonly ListingItemContent[];
  }[];
}

export interface ServiceCategoryContent {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly priceFromLabel?: string;
}

export interface ServicePackageContent {
  readonly id: string;
  readonly categoryId: string;
  readonly title: string;
  readonly description: string;
  readonly priceFrom: number;
  readonly priceUnit: string;
  readonly duration?: string;
  readonly features: readonly string[];
  readonly cta: string;
}

export interface ContactStudioInfoContent {
  readonly sectionEyebrow?: string;
  readonly sectionTitle: string;
  readonly sectionDescription?: string;
  readonly name: string;
  readonly address: {
    readonly street: string;
    readonly city: string;
  };
  readonly contact: {
    readonly email: string;
    readonly phone: string;
  };
  readonly hours: {
    readonly weekdays: string;
    readonly saturday: string;
    readonly sunday: string;
  };
  readonly social: {
    readonly instagramHandle: string;
    readonly instagramUrl: string;
    readonly facebook: string;
    readonly googleRating: number;
  };
  readonly labels: {
    readonly address: string;
    readonly phone: string;
    readonly email: string;
    readonly hours: string;
    readonly instagram: string;
    readonly facebook: string;
    readonly reviews: string;
    readonly reviewsSuffix: string;
  };
}

export interface ContactFormValidationContent {
  readonly nameRequired: string;
  readonly nameMinLength: string;
  readonly emailRequired: string;
  readonly emailInvalid: string;
  readonly subjectRequired: string;
  readonly subjectMinLength: string;
  readonly messageRequired: string;
  readonly messageMinLength: string;
  readonly genericError: string;
}

export interface ContactFormContent {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly successTitle: string;
  readonly successBody: string;
  readonly submitLabel: string;
  readonly submittingLabel: string;
  readonly messageMinLengthHint?: string;
  readonly validation: ContactFormValidationContent;
}

export type HomePageContent = PageContentBase;

export interface ServicesPageContent extends ListingPageContent {
  readonly categories: readonly ServiceCategoryContent[];
  readonly services: readonly ServicePackageContent[];
}
export type BlogPageContent = ListingPageContent;
export type AboutPageContent = PageContentBase;

export interface ContactPageContent extends PageContentBase {
  readonly studio: ContactStudioInfoContent;
  readonly form: ContactFormContent;
}

export type LegalPageContent = PageContentBase;

export interface NotFoundPageContent extends PageContentBase {
  readonly ctaLabel: string;
}

export interface BlogPostDetailContent {
  readonly slug: string;
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly title: string;
  readonly publishedAt?: string;
  readonly readingTime?: string;
  readonly tags?: readonly string[];
  readonly body: readonly {
    readonly id: string;
    readonly heading?: string;
    readonly paragraphs: readonly string[];
  }[];
}

export interface FooterLinkContent {
  readonly id: string;
  readonly href: string;
  readonly label: string;
}

export interface FooterSocialLinkContent {
  readonly id: string;
  readonly href: string;
  readonly label: string;
  readonly icon: 'instagram' | 'github';
}

export interface FooterContent {
  readonly brandName: string;
  readonly tagline: string;
  readonly locationLines: readonly string[];
  readonly quickLinks: readonly FooterLinkContent[];
  readonly legalLinks: readonly FooterLinkContent[];
  readonly bottomLinks: readonly FooterLinkContent[];
  readonly socialLinks: readonly FooterSocialLinkContent[];
}

// ============================================
// SERVICE PAGE TYPES (B2B Event Catering)
// ============================================

export interface PricingTierContent {
  readonly id: string;
  readonly name: string;
  readonly pricePerGuest: string;
  readonly basePrice: string;
  readonly duration: string;
  readonly guests: string;
  readonly benefits: readonly string[];
  readonly cta: string;
  readonly highlighted?: boolean;
}

export interface FAQItemContent {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface TestimonialContent {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly role?: string;
  readonly company?: string;
  readonly rating?: number;
}

export interface ServicePageContent extends PageContentBase {
  readonly pricingTiers: readonly PricingTierContent[];
  readonly faqs: readonly FAQItemContent[];
  readonly testimonials?: readonly TestimonialContent[];
  readonly usps?: readonly {
    readonly id: string;
    readonly icon: string;
    readonly title: string;
    readonly description: string;
  }[];
  readonly cta: {
    readonly primary: {
      readonly label: string;
      readonly href: string;
    };
    readonly secondary?: {
      readonly label: string;
      readonly href: string;
    };
  };
}

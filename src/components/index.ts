// Atoms
export * from './atoms/Container.ts';
// export * from './atoms/ImageWithFallback.ts; // DISABLED - replaced with plain img tags
// export * from './atoms/ProcessStepCard.ts'; // NOT FOUND
// export * from './atoms/ServiceCard.ts'; // NOT FOUND
export { default as Button } from './atoms/Button/Button.tsx'; // Replaces AccessibleButton

// Molecules
// export * from './molecules/NavigationBar.ts'; // NOT FOUND
// export * from './molecules/Footer.ts'; // NOT FOUND
export * from './molecules/TrustBadgesBar.ts';
export * from './molecules/TrustBadgesMarquee.ts';
export * from './molecules/CookieConsentBanner.ts';
export * from './molecules/BookingCallToAction.ts';
export * from './molecules/FocusTrap.ts';

// Organisms
// export * from './organisms/HomepageHero.ts'; // NOT FOUND
// export * from './organisms/ProcessTimeline.ts; // REMOVED - using src/sections/ProcessTimeline instead
// export * from './organisms/SalonCarousel.ts'; // Missing file
export * from './organisms/ServiceHighlights.ts';
// export * from './organisms/ServiceMindMap.ts'; // NOT FOUND
// export * from './organisms/AccessibleModal.ts'; // NOT FOUND

// New components
// export * from './ComprehensiveFooter.ts'; // REMOVED - using src/components/Footer.tsinstead
// export * from './BookingModalMobile.ts'; // REMOVED - stub, using src/components/booking/BookingModalMobile.ts
export * from './AccessibilityEnhancements.ts';
// export * from './GDPRCompliance.ts'; // REMOVED - duplicate, using molecules/GDPRCompliance
export * from './ConsentManager.ts';
// export * from './PricingPageSimple.ts'; // REMOVED - using src/pages/PricingPage.tsinstead
// export * from './StudioShowcase.ts'; // Missing file

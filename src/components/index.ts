// Atoms
export * from './atoms/Container';
// export * from './atoms/ImageWithFallback'; // DISABLED - replaced with plain img tags
// export * from './atoms/ProcessStepCard'; // NOT FOUND
// export * from './atoms/ServiceCard'; // NOT FOUND
export { default as Button } from './atoms/Button/Button'; // Replaces AccessibleButton

// Molecules
// export * from './molecules/NavigationBar'; // NOT FOUND
// export * from './molecules/Footer'; // NOT FOUND
export * from './molecules/TrustBadgesBar';
export * from './molecules/TrustBadgesMarquee';
export * from './molecules/CookieConsentBanner';
export * from './molecules/BookingCallToAction';
export * from './molecules/FocusTrap';

// Organisms
// export * from './organisms/HomepageHero'; // NOT FOUND
// export * from './organisms/ProcessTimeline'; // REMOVED - using src/sections/ProcessTimeline instead
// export * from './organisms/SalonCarousel'; // Missing file
export * from './organisms/ServiceHighlights';
// export * from './organisms/ServiceMindMap'; // NOT FOUND
// export * from './organisms/AccessibleModal'; // NOT FOUND

// New components
// export * from './ComprehensiveFooter'; // REMOVED - using src/components/Footer.tsx instead
// export * from './BookingModalMobile'; // REMOVED - stub, using src/components/booking/BookingModalMobile.tsx
export * from './AccessibilityEnhancements';
// export * from './GDPRCompliance'; // REMOVED - duplicate, using molecules/GDPRCompliance
export * from './ConsentManager';
// export * from './PricingPageSimple'; // REMOVED - using src/pages/PricingPage.tsx instead
// export * from './StudioShowcase'; // Missing file

# Language Audit Report
**Date:** January 14, 2026  
**Project:** velo-bar.com

---

## Executive Summary

The site uses a JSON-based i18n system with `de.json` and `en.json` files managed by `LanguageContext.tsx`. However, there are **critical issues**:

1. **German text uses formal "Sie/Ihre/Ihnen"** throughout the codebase
2. **Language switcher exists but content is mixed** (German appears in English mode and vice versa)
3. **Hardcoded German text in components** bypasses the translation system

---

## 1. Language System Architecture

### Translation Files
- **Location:** `/src/locales/`
- **Files:**
  - `de.json` (109 lines) - German translations
  - `en.json` (109 lines) - English translations
  - `ar.json` (Arabic - not in scope)

### Language Management
- **Context:** `src/contexts/LanguageContext.tsx`
- **Default Language:** German (DE)
- **Storage:** localStorage (`velo-language`)
- **Fallback:** German if key not found

### Language Switcher Components
- `src/components/molecules/LanguageToggle.tsx` - Toggle component
- `src/components/atoms/LanguageSwitcher.tsx`
- `src/components/molecules/LanguageSwitcher.tsx`

---

## 2. Formal German ("Sie") Occurrences

### Translation Files

#### `de.json` - 1 occurrence
- **Line 30:** `"subtitle": "Von Firmenfeiern über Messen bis hin zu privaten Events – wir bringen die Bar zu Ihnen"`

### Hardcoded German Content (316 matches across 54 files)

#### High Priority Files (Most "Sie/Ihre/Ihnen" usage):

1. **`src/data/services.ts`** (47 matches)
   - Lines 83, 96, 215, 337, 379, 550, etc.
   - Contains all service packages, FAQs, testimonials
   - Examples:
     - "Premium-Dekoration in Ihren Hochzeitsfarben"
     - "Persönliche Cocktail-Kreationen mit Ihren Namen"
     - "Wo finden die Workshops statt? Wir kommen zu Ihnen!"

2. **`src/pages/blog/messestand-ideen-hospitality.tsx`** (31 matches)
   - Blog content with formal German throughout

3. **`src/content/privacy-de.ts`** (26 matches)
   - Privacy policy in formal German (acceptable for legal text)

4. **`src/pages/resources/corporate-event-catering-guide.tsx`** (16 matches)

5. **`src/pages/DatenschutzPage.tsx`** (15 matches)

6. **`src/pages/FAQPage.tsx`** (13 matches)
   - Line 192: "Wir helfen Ihnen gerne"
   - Mixed: Some FAQs use "du" (lines 21, 39, 51) but heading uses "Sie"

7. **`src/pages/blog/roi-hospitality-events.tsx`** (13 matches)

8. **`src/pages/blog/messecatering-kosten-2025.tsx`** (10 matches)

9. **`src/pages/blog/catering-ohne-stromanschluss.tsx`** (9 matches)

10. **`src/pages/locations/DistrictPage.tsx`** (9 matches)

11. **`src/components/organisms/BookingForm/BookingForm.tsx`** (8 matches)
    - Hardcoded German error messages (lines 98-111, 122-123, 131-132)
    - Mixed with English labels in form fields

---

## 3. Language Switcher Issues

### Current Behavior
- **Component:** `LanguageToggle.tsx` has local state only
- **Problem:** Component doesn't integrate with `LanguageContext`
- **Result:** Switching language doesn't update global state

### Expected Behavior
- Switch to German → ALL text becomes German (informal "du")
- Switch to English → ALL text becomes English
- No mixed content in either mode

### Root Causes
1. **Hardcoded strings** in components bypass translation system
2. **Missing translation keys** for many sections
3. **Language switcher** doesn't use `useLanguage()` hook from context

---

## 4. Mixed Language Content Examples

### English Mode Shows German:
- BookingForm component has German error messages
- Service data files contain German text
- Blog pages are entirely in German

### German Mode Shows English:
- BookingForm labels: "Full Name*", "Phone Number*", "Email Address*"
- Button text: "Submit Now", "Booking Submitted!"
- Form placeholders in English

---

## 5. Files Requiring Changes

### Category A: Translation Files (2 files)
- `src/locales/de.json` - Convert Sie → du

### Category B: Service Data (1 file, 47 matches)
- `src/data/services.ts` - All packages, FAQs, testimonials

### Category C: Page Components (13 files)
- `src/pages/FAQPage.tsx`
- `src/pages/FirmenFeiernPage.tsx`
- `src/pages/WeihnachtsFeiernPage.tsx`
- `src/pages/TeamEventsWorkshopsPage.tsx`
- `src/pages/DatenschutzPage.tsx`
- `src/pages/ImpressumPage.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/BuchungMucPage.tsx`
- `src/pages/VelobarcoPage.tsx`
- `src/pages/locations/LocationsIndexPage.tsx`
- `src/pages/locations/DistrictPage.tsx`
- `src/pages/UILabPreviewPage.tsx`
- `src/pages/App.tsx`

### Category D: Blog Posts (7 files)
- `src/pages/blog/messestand-ideen-hospitality.tsx`
- `src/pages/blog/roi-hospitality-events.tsx`
- `src/pages/blog/messecatering-kosten-2025.tsx`
- `src/pages/blog/catering-ohne-stromanschluss.tsx`
- `src/pages/blog/last-minute-catering-muenchen.tsx`
- `src/pages/blog/alkoholfreie-cocktails-firmenevents.tsx`
- `src/pages/blog/nachhaltige-firmenfeier.tsx`

### Category E: Components (10 files)
- `src/components/organisms/BookingForm/BookingForm.tsx`
- `src/components/molecules/CookieConsentBanner.tsx`
- `src/components/molecules/ServiceCard.tsx`
- `src/components/molecules/BookingCallToAction.tsx`
- `src/components/organisms/MesseCatering/ProblemSolutionSection.tsx`
- `src/components/organisms/ProcessTimeline.tsx`
- `src/sections/ProcessTimeline/ProcessTimeline.tsx`
- `src/components/templates/ServicePageLayout.tsx`
- `src/components/layout/ErrorBoundary.tsx`
- `src/components/ConsentProvider.tsx`

### Category F: Content Files (5 files)
- `src/content/privacy-de.ts` (Legal - may keep formal)
- `src/content/about.ts`
- `src/content/firmenfeiern.ts`
- `src/content/messe-catering.ts`
- `src/content/weihnachtsfeiern.ts`

### Category G: Language Switcher Fix (1 file)
- `src/components/molecules/LanguageToggle.tsx` - Integrate with LanguageContext

---

## 6. Formal → Informal Conversion Rules

### Pronouns
- Sie → du
- Ihre → deine (feminine/plural nouns)
- Ihr → dein (masculine/neuter nouns)
- Ihnen → dir
- Ihrem → deinem
- Ihrer → deiner

### Verb Forms
- Kontaktieren Sie → Kontaktiere / Kontaktier
- Buchen Sie → Buche / Buch
- Feiern Sie → Feiere / Feier
- Planen Sie → Plane / Plan
- Schreiben Sie → Schreibe / Schreib

### Capitalization
- Use lowercase "du/dein/deine/dir" in web copy
- Only capitalize in formal letters (not applicable here)

---

## 7. Exceptions (Keep Formal)

### Legal Documents
- Privacy Policy (`privacy-de.ts`, `DatenschutzPage.tsx`)
- Terms & Conditions
- Imprint (`ImpressumPage.tsx`)

**Rationale:** Legal documents traditionally use formal German for clarity and professionalism.

---

## 8. Next Steps

1. ✅ **STEP 1 COMPLETE:** Audit completed
2. **STEP 2:** Convert all German to informal "du" voice
3. **STEP 3:** Fix language switcher integration
4. **STEP 4:** Move hardcoded strings to translation files
5. **STEP 5:** Manual QA and testing

---

## Summary Statistics

- **Total files with formal German:** 54 files
- **Total "Sie/Ihre/Ihnen" matches:** 316+
- **Translation files to update:** 2 (de.json, en.json)
- **Component files to update:** ~35 files
- **Language switcher files:** 3 files
- **Estimated changes:** 300+ replacements

---

**Report Generated:** January 14, 2026  
**Next Action:** Begin formal → informal conversion

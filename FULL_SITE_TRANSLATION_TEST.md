# Full Site Translation Test Checklist

This checklist verifies that **all user-facing UI copy switches correctly between DE and EN** using the site translation system.

## How to run
- Start dev server
- Open in desktop browser
- Also test on iPhone Safari/WebKit (LAN IP) if applicable

## Global checks (do once)
- [ ] **Language toggle is visible** and can switch between DE/EN
- [ ] **Language choice persists** when navigating to another page
- [ ] **No raw translation keys** like `pages.*` are visible in the UI
- [ ] **No console warnings**: “Translation key not found: …”

## Pages / routes

### Home
- [ ] `/` renders in **DE**
- [ ] `/` renders in **EN**
- [ ] **Locations section** title/subtitle switches
- [ ] **Services section** title/subtitle + CTA label switches
- [ ] **Stats section** title/subtitle + stat labels switch

### Services (consolidated)
- [ ] `/leistungen` renders in **DE**
- [ ] `/leistungen` renders in **EN**
- [ ] All service cards headings/descriptions switch
- [ ] Any schema/SEO strings that are rendered switch (no hardcoded DE)

### Legacy service routes (redirect validation)
- [ ] `/firmenfeiern` redirects to `/leistungen#firmenfeiern`
- [ ] `/weihnachtsfeiern` redirects to `/leistungen#weihnachtsfeiern`
- [ ] `/messe-catering` redirects to `/leistungen#messe-catering`
- [ ] `/team-events` redirects to `/leistungen#team-events-workshops`
- [ ] After redirect, the page is still in the **selected language**

### Team Events page (if accessible separately)
- [ ] `/team-events` (or the section content it maps to) shows **packages** in DE
- [ ] Toggle to EN: **packages** text switches
- [ ] Toggle to EN: **FAQs** text switches
- [ ] Toggle to EN: **testimonials** text switches

### Pricing
- [ ] `/preise` renders in **DE**
- [ ] `/preise` renders in **EN**

### Gallery
- [ ] `/galerie` renders in **DE**
- [ ] `/galerie` renders in **EN**

### Menu
- [ ] `/menu` renders in **DE**
- [ ] `/menu` renders in **EN**

### About
- [ ] `/about` renders in **DE**
- [ ] `/about` renders in **EN**
- [ ] Parallax/About section headings + aria/alt text switch

### FAQ
- [ ] `/faq` renders in **DE**
- [ ] `/faq` renders in **EN**

### Contact / Inquiry
- [ ] `/anfrage` renders in **DE**
- [ ] `/anfrage` renders in **EN**

### Legal
- [ ] `/impressum` renders in **DE**
- [ ] `/impressum` renders in **EN**
- [ ] `/datenschutz` renders in **DE**
- [ ] `/datenschutz` renders in **EN**

## Shared components

### Navigation
- [ ] Main nav labels switch DE/EN
- [ ] Mobile menu open/close aria-labels switch
- [ ] Logo `alt` text switches

### Footer
- [ ] Footer column titles switch
- [ ] Footer legal link labels switch
- [ ] Footer `logo alt` switches

### BookingForm
- [ ] Booking form headings/labels/placeholders switch
- [ ] Booking form validation and toast messages switch
- [ ] Booking form contact email/phone display switches

### Partners & testimonials
- [ ] Partners section headings switch
- [ ] Testimonials section headings switch
- [ ] Loading/error messages switch
- [ ] Carousel aria-labels switch

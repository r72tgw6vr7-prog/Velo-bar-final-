# Site Architecture & Information Hierarchy

## Navigation Structure

### Primary Navigation (Header)

```
Velo.Bar (Logo/Home) | Jetzt anfragen! (Primary CTA)
```

### Main Menu

1. **Drinks** → `/menu`
2. **Shop** → `/veloshop`
3. **Über uns** → `/ber-uns`
4. **Blog** → `/blog`

### Social Links (Header)

- Instagram (@velo.bar)
- Facebook (VeloBar)
- LinkedIn (Velo.Bar Company)

---

## Footer Navigation

### Footer Sections

#### 1. Hashtag

**#Velo.Bar**

#### 2. Legal Links

- [Impressum & Stornogebühren](https://www.velo-bar.com/impressum)
- [Datenschutz](https://www.velo-bar.com/datenschutz)

#### 3. Quick Links (Redundant with main nav)

- Drinks
- Shop
- Über uns
- Blog
- Social links (repeated)

---

## Page Hierarchy & URL Structure

### Home

**URL:** `/`
**Purpose:** City selection, brand introduction
**Key CTAs:**

- München & Umgebung → `/velobar/buchungmuc`
- Coburg & Umgebung → `/velobarco`
- Gin-Tastings Coburg → `/veloshop/tastings`

---

### Service Pages

#### München Service Page

**URL:** `/velobar/buchungmuc`
**Purpose:** Complete München offering (events, weddings, gin-tastings)
**Sections:**

1. Hero + CTAs
2. Problem/Solution
3. Technical specs (All-in-one solution)
4. Service description
5. Gin-Tasting offer
6. Gallery + Merch
7. Partnership CTA
8. Team

**Primary CTA:** `/anfrage` or `/anfragen` (booking form)
**Secondary CTA:** `/preise` (pricing overview)

#### Coburg Service Page

**URL:** `/velobarco`
**Purpose:** Coburg-specific offerings
**Note:** Content not fully captured, likely similar structure to München page

---

### Content Pages

#### About Us

**URL:** `/ber-uns`
**Purpose:** Team introduction, brand story
**Content:**

- Lars Eggers bio + portrait
- Sebastian bio + portrait
- COVID origin story
- Values & mission

#### Drinks Menu

**URL:** `/menu`
**Purpose:** Cocktail inspiration, service showcase
**Content:**

- SESES Longdrinks (signature line)
- Customization options
- Consultation approach

#### Blog

**URL:** `/blog`
**Purpose:** Content marketing, stories, updates
**Note:** Structure not fully captured

---

### Commerce

#### Shop

**URL:** `/veloshop`
**Purpose:** Merch sales
**Products visible:**

- Velobar Hoodie
- Velobar Shirt
- Cap Velobar

#### Gin-Tastings (Shop subcategory)

**URL:** `/veloshop/tastings`
**Purpose:** Tasting package bookings (Coburg)

---

### Transactional

#### Contact/Booking Form

**URLs:** `/anfrage` OR `/anfragen` (both seem to work)
**Purpose:** Event booking inquiries
**Form fields (expected):**

- Name
- Email
- Phone
- Event type
- Date
- Guest count
- Location (München/Coburg)
- Message/Details

#### Pricing Page

**URL:** `/preise`
**Purpose:** Service & pricing overview
**Note:** Content not captured, likely package breakdowns

---

### Legal

#### Impressum & Cancellation Policy

**URL:** `/impressum`
**Purpose:** Legal imprint, cancellation fees

#### Privacy Policy

**URL:** `/datenschutz`
**Purpose:** GDPR compliance, data protection

---

### Partnership

#### Sponsoring/Partnership Page (München)

**URL:** `/velobarmucsponsoring`
**Purpose:** B2B partnerships, sponsorship opportunities
**Note:** Referenced but content not captured

---

## User Flows

### Flow 1: Event Booking (Primary)

```
Home → City Selection → Service Page → CTA "Jetzt anfragen!" → Booking Form
```

### Flow 2: Learn About Service

```
Home → Service Page → Read sections → CTA "Service- und Preisübersicht" → Pricing Page → Booking Form
```

### Flow 3: Gin-Tasting Booking

```
Home → Coburg Selection → Gin-Tastings Link → Shop/Tastings → Booking
OR
Home → München Service Page → Gin-Tasting Section → Booking CTA
```

### Flow 4: Team Discovery

```
Home → Über uns → Read team bios → CTA to book/contact
```

### Flow 5: Merch Purchase

```
Home → Shop → Product selection → Checkout
```

---

## Interaction Patterns

### CTAs (Call-to-Actions)

#### Primary CTA

**Text:** "Jetzt anfragen!" / "JETZT ANFRAGEN"
**Style:** Bold, prominent button
**Placement:** Header (sticky), hero sections, end of service descriptions
**Action:** Navigate to `/anfrage` form

#### Secondary CTAs

**Text:** "Service- und Preisübersicht", "Hier gehts zu...", etc.
**Style:** Less prominent, often text links or secondary buttons
**Placement:** Within content sections
**Action:** Navigate to supporting pages (pricing, shop, etc.)

### Cookie Consent

**Pattern:** Banner on first visit
**Options:**

- "Geht klar!" (Accept)
- "Nein Danke!" (Decline)
  **Copy:** GDPR-compliant explanation in friendly tone

### Image Galleries

**Pattern:** Grid layout with lightbox
**Context:** Service impressions, event photos, team portraits
**Interaction:** Click to view full-size (likely)

### Shop Products

**Pattern:** Card-based grid
**Interaction:** "SCHNELLANSICHT" (Quick view) overlay
**Flow:** Quick view → Add to cart → Checkout

### Forms

**Expected patterns:**

- Inline validation
- Required field indicators
- Success/error messages
- Mobile-friendly inputs
- Likely using Squarespace form builder

---

## Mobile Considerations

### Mobile-First Elements

- Sticky header with CTA
- Hamburger menu for main nav
- Tap-friendly buttons (large hit areas)
- Vertical stacking of content sections
- Mobile-optimized images
- Click-to-call for phone numbers (expected)

### Responsive Breakpoints (Typical Squarespace)

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Key Behavioral Notes

### Tone & Interaction Style

- **Professionell & einladend:** Sie-Form throughout
- **Souverän:** Klar, wertschätzend, ohne Übertreibung
- **Persönlich:** Direkte Ansprache, klare Nutzenargumentation
- **Hilfsbereit:** "Sprechen Sie uns gerne an" approach

### Trust Signals

- Team photos & personal bios
- Crowdfunding badge (transparency)
- Social proof (social media links)
- Professional event photos
- Technical specifications (shows expertise)

### Conversion Optimization

- Multiple CTAs per page
- Low-friction booking process
- Clear value propositions
- Visual proof (gallery)
- Pricing transparency (ab 49€ pro Person stated)
- Flexibility messaging (customization)

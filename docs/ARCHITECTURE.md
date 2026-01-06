# Architecture Overview

**Velo Bar Corporate Site**

System architecture, folder structure, and key technical decisions.

---

## Tech Stack

| Layer          | Technology            | Version      | Purpose             |
| -------------- | --------------------- | ------------ | ------------------- |
| **Framework**  | React                 | 18.2.0       | UI library          |
| **Language**   | TypeScript            | ^5.0.0       | Type safety         |
| **Build Tool** | Vite                  | ^7.1.12      | Fast dev + bundling |
| **Styling**    | Tailwind CSS          | ^4.1.14      | Utility-first CSS   |
| **Routing**    | React Router DOM      | ^7.9.4       | Client-side routing |
| **Forms**      | React Hook Form + Zod | ^7.66 / ^4.1 | Form validation     |
| **Animation**  | Framer Motion         | ^11.18       | Animations          |
| **Deployment** | Vercel                | -            | Serverless hosting  |

---

## Project Type

**Single Page Application (SPA)** - B2B marketing site with event booking funnel

**Target Market:** München & Coburg, Germany  
**Services:** Corporate events, weddings, trade shows, cocktail workshops

---

## Folder Structure

```
/
├── api/                          # Vercel serverless functions
│   ├── booking.js               # Booking form handler
│   ├── contact.js               # Contact form handler
│   ├── csrf-token.js            # CSRF token generation
│   └── middleware/
│       ├── csrfProtection.js    # CSRF validation
│       └── rateLimiter.js       # Rate limiting (100 req/15min)
│
├── public/                       # Static assets
│   ├── sitemap.xml              # SEO sitemap
│   ├── robots.txt               # Crawler instructions
│   └── Velo Gallery/            # Event images (754 files)
│
├── src/
│   ├── components/              # Atomic Design structure
│   │   ├── atoms/               # Buttons, inputs, cards
│   │   ├── molecules/           # Forms, carousels
│   │   ├── organisms/           # Navigation, footers
│   │   └── templates/           # Page layouts
│   │
│   ├── pages/                   # Route components
│   │   ├── HomePage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── [17 more pages]
│   │
│   ├── styles/                  # Global styles
│   │   ├── design-tokens.css    # Color/spacing tokens
│   │   ├── globals.css          # Base styles
│   │   └── typography.css       # Typography utilities
│   │
│   ├── lib/                     # Utilities
│   │   ├── webVitals.ts        # Performance tracking
│   │   └── api.ts              # API client
│   │
│   ├── hooks/                   # Custom React hooks
│   ├── context/                 # React Context providers
│   └── types/                   # TypeScript types
│
├── docs/                         # Documentation (you are here)
├── tests/                        # Test suites
│   ├── unit/                    # Vitest unit tests
│   ├── e2e/                     # Playwright E2E tests
│   └── p0/                      # Critical path tests
│
└── [config files]
```

---

## Component Architecture

### Atomic Design Hierarchy

```
Atoms (primitives)
  ↓
Molecules (composite components)
  ↓
Organisms (complex sections)
  ↓
Templates (page layouts)
  ↓
Pages (route components)
```

**Example:**

```
Button (atom)
  → ContactForm (molecule)
    → ContactSection (organism)
      → PageTemplate (template)
        → ContactPage (page)
```

### Key Components

| Component       | Purpose                     | Location                     |
| --------------- | --------------------------- | ---------------------------- |
| `Button`        | Primary interactive element | `atoms/Button/`              |
| `Card`          | Content container           | `atoms/Card/`                |
| `CosmicNav`     | Main navigation             | `organisms/CosmicNav.tsx`    |
| `Footer`        | Site footer                 | `organisms/Footer.tsx`       |
| `PageTemplate`  | Standard page layout        | `templates/PageTemplate.tsx` |
| `BookingWizard` | Multi-step booking form     | `organisms/BookingWizard/`   |

---

## State Management

### React Context API

**No Redux** - lightweight context-based state for marketing site

**Contexts:**

1. **AppContext** - Global app state (theme, modal, etc.)
2. **LanguageContext** - i18n state (DE/EN switching)

### Form State

- React Hook Form for form state
- Zod for runtime validation

---

## Routing

### React Router v7

**Key Routes:**

- `/` - Homepage
- `/leistungen` - Services
- `/galerie` - Gallery
- `/anfrage` - Contact/Booking
- `/faq` - FAQ
- `/ueber-uns` - About
- `/impressum` - Imprint (legal)
- `/datenschutz` - Privacy Policy

**Dynamic Routes:**

- `/blog/:slug` - Blog posts (5 SEO articles)

---

## Styling System

### Tailwind CSS v4

**Design Tokens:** `src/styles/design-tokens.css`

```css
/* Brand Colors */
--color-teal: #003141; /* Navy background */
--offwhite-primary: #fff8ec; /* Cream text */
--orange-primary: #ee7868; /* Coral accent */
--yellow-primary: #fab81d; /* Golden accent */
```

**Breakpoints:**

```css
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**8pt Grid System:** All spacing follows 8px increments

---

## Build System

### Vite Configuration

**Code Splitting Strategy:**

```javascript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        'vendor-radix': ['@radix-ui/*'],
        'vendor-framer': ['framer-motion'],
        'vendor-icons': ['lucide-react'],
        'ui': [/* UI components */],
        'primitives': [/* Atomic components */]
      }
    }
  }
}
```

**Compression:**

- Gzip + Brotli via `vite-plugin-compression`
- Console logs stripped in production

---

## API Architecture

### Serverless Functions (Vercel)

**Endpoints:**

- `POST /api/booking` - Process booking requests
- `POST /api/contact` - Handle contact form
- `GET /api/csrf-token` - Generate CSRF tokens
- `POST /api/newsletter` - Newsletter signup

**Security Middleware:**

1. **Rate Limiting:** 100 requests per 15 minutes per IP
2. **CSRF Protection:** Token-based validation
3. **Input Sanitization:** Zod schema validation
4. **CORS:** Restricted origins

---

## Performance Strategy

### Bundle Optimization

- **Target:** < 500KB initial load
- **Code splitting:** Route-based lazy loading
- **Tree shaking:** Unused code elimination
- **Chunk strategy:** Vendor + UI separation

### Image Optimization

- **Format:** WebP with JPG fallback
- **Responsive:** Multiple sizes (320w, 640w, 1024w, 1920w)
- **Lazy loading:** Intersection Observer
- **Gallery:** 754 images optimized

### Core Web Vitals Targets

- LCP: < 2.5s
- CLS: < 0.1
- INP: < 200ms
- FCP: < 1.8s
- TTFB: < 800ms

See: `docs/PERFORMANCE.md`

---

## Security Architecture

### Defense in Depth

1. **Client-Side:**
   - XSS prevention (React escaping)
   - CSRF token validation
   - Input validation (Zod schemas)

2. **API Layer:**
   - Rate limiting per IP
   - Request size limits
   - Timeout enforcement

3. **Headers:**
   - CSP (Content Security Policy)
   - HSTS (Force HTTPS)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff

See: `docs/SECURITY.md`

---

## Testing Strategy

### Test Pyramid

**Unit Tests (Vitest):**

- 76+ tests for atoms/molecules
- Component rendering
- User interactions
- Form validation

**E2E Tests (Playwright):**

- Critical user paths
- Booking flow
- Contact form
- Navigation

**Visual Regression (Playwright):**

- Screenshot comparison
- Cross-browser (Chrome, Firefox, Safari)
- Responsive breakpoints

See: `docs/QA.md`

---

## Key Technical Decisions

### Why React over Next.js?

- **SPA sufficient** for marketing site
- **No SSR needed** (static content, fast CDN)
- **Simpler deployment** (Vercel SPA mode)
- **Lower complexity** for small team

### Why Tailwind v4?

- **Design tokens** integrated directly
- **Performance** (smaller CSS bundle)
- **Developer experience** (utility-first)

### Why Vite over Webpack?

- **Speed** (10x faster HMR)
- **Modern defaults** (ESM, optimized builds)
- **Simple config** (vs Webpack complexity)

### Why Vercel Serverless?

- **Zero-config** API routes
- **Auto-scaling** (no server management)
- **Edge network** (global CDN)
- **Cost-effective** for B2B traffic volume

---

## Known Limitations

1. **No server-side rendering** - Initial SEO depends on client rendering
   - Mitigated: Vercel pre-renders routes, structured data in HTML
2. **Gallery performance** - 754 images can slow initial paint
   - Mitigated: Lazy loading, WebP, responsive variants
3. **Booking form complexity** - 825-line BookingWizard component
   - Future: Consider refactoring into sub-components

---

## Future Enhancements

- [ ] Implement blog CMS (Sanity/Contentful)
- [ ] Add Storybook for component documentation
- [ ] Implement A/B testing for CTAs
- [ ] Add real-time booking availability
- [ ] Integrate with CRM (Zoho/HubSpot)

---

## Development Workflow

### Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run typecheck # TypeScript validation
npm run lint      # ESLint + Prettier
```

### Git Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes + commit
3. Run tests: `npm run test`
4. Push + create PR
5. Deploy preview (Vercel automatic)
6. Merge to main → auto-deploy production

---

## Support

- **Quick Start:** `QUICK_START.md`
- **Deployment:** `docs/DEPLOYMENT.md`
- **Design System:** See `src/styles/design-tokens.css`
- **Component Docs:** See `src/components/README.md`

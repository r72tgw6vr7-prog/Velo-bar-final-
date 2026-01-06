# Velobar Corporate Site

Premium mobile cocktailbar and event catering website built with React, TypeScript, and Tailwind CSS v4. Features bilingual support (DE/EN), comprehensive design system, and WCAG AA accessibility.

**Target Markets:** München & Coburg, Bayern (Germany)  
**Services:** Firmenfeiern, Hochzeiten, Messen, Corporate Events, Cocktail-Workshops

**📖 [Complete Documentation →](docs/README.md)**

---

## 🎨 Design System

**Brand Colors** (Canonical source: [`src/styles/design-tokens.css`](src/styles/design-tokens.css)):

- Background (Navy): `#003141`
- Text (Cream): `#fff8ec`
- Accent (Coral): `#ee7868`
- Secondary accent (Yellow): `#fab81d`

**Typography**:

- Headlines & Body: Source Sans Pro (similar to Velo.Bar's proxima-nova)
- Fallback: proxima-nova, sans-serif
- Modular scale: 8px grid system

**Key Features**:

- ✅ Clean Navy/Cream palette with Coral accent
- ✅ Glassmorphic navigation
- ✅ WCAG AA accessibility compliance
- ✅ Touch targets ≥ 44px
- ✅ Responsive 320px to 2000px
- ✅ Bilingual DE/EN support

---

## 📚 Component Library

Built on atomic design principles with comprehensive component library:

- **Consolidated Components**: Standardized, well-documented components
- **Atomic Design Structure**: Atoms, molecules, organisms, templates, and pages
- **Accessibility**: WCAG AA compliance built into all components
  **📖 Documentation Hub:** [docs/README.md](docs/README.md)  
  **🚀 Quick Start:** [QUICK_START.md](QUICK_START.md)  
  **🎨 Design System:** [docs/design/](docs/design/)  
  **🔒 Security:** [docs/security/](docs/security/)  
  **🧪 Testing:** [docs/testing/](docs/testing/ived from design tokens)
- [Design System Usage Guide (Archive)](./docs/archive/DESIGN_SYSTEM_USAGE_GUIDE.md)
- [Cosmic Glassmorphism Guide (Archive)](./docs/archive/COSMIC_GLASSMORPHISM_GUIDE.md)

---

## 📘 Documentation

- [Quick Start](./QUICK_START.md) – Get the site running in 5 minutes
- [AI Project Rules](./docs/AI_PROJECT_RULES.md) – Project structure, naming, routing, and design-system rules
- [Content Guide](./docs/CONTENT_GUIDE.md) – How to manage and extend `src/content/**`
- [Developer Quick Reference](./DEVELOPER_QUICK_REFERENCE.md) – High-level map of files, scripts, and conventions
- [Project Status](./docs/PROJECT_STATUS.md) – Current progress snapshot and next actions

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 20.x (see `package.json` engines)
- **npm**: Compatible with Node 20.x
- **Git**: Latest version

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/business-website.git
cd business-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your API keys to .env.local (see Environment Variables section)

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory. Start from `.env.example` and fill in only what you need.

```bash
# Email Service (SendGrid recommended; server-side)
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Google Maps (for Contact page)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# reCAPTCHA (spam protection)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here

# Analytics (optional)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Production URL
VITE_SITE_URL=https://your-business.com
```

### Getting API Keys

**SendGrid** (Email):

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key with "Mail Send" permissions
3. Add to `.env` as `VITE_SENDGRID_API_KEY`

**Google Maps** (Contact Page):

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable "Maps JavaScript API"
3. Create an API key
4. Add to `.env` as `VITE_GOOGLE_MAPS_API_KEY`

**reCAPTCHA** (Spam Protection):

1. Register site at [google.com/recaptcha](https://www.google.com/recaptcha)
2. Choose reCAPTCHA v3
3. Add both site key and secret key to `.env`

---

## 📦 Build & Deployment

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

Build output will be in `/dist` directory.

### Deployment Options

**Recommended: Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Alternative: Netlify**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Build Settings**:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20.x`

---

## 📁 Project Structure

```
/
├── src/
│   ├── app/                # App shell + routing
│   ├── components/         # React components (atoms/molecules/organisms)
│   ├── content/            # Typed content layer (`src/content/**`)
│   ├── core/               # Route config, shared types/constants
│   ├── pages/              # Route-level pages
│   └── styles/             # Centralized CSS (`design-tokens.css`, `design-system.css`, `hero.css`, ...)
├── api/                    # Serverless API endpoints (email, CSRF, rate limiting, etc.)
├── public/                 # Static assets
├── scripts/                # Build/QA scripts (SEO, image optimization, gallery tooling)
└── tests/                  # Playwright E2E tests (including `tests/p0/`)
```

---

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start dev server (Vite)

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript checks
npm run validate         # Typecheck + lint (+ prettier check)

# Testing
npm run test             # Run unit tests (Vitest)
npm run test:e2e         # Run end-to-end tests (Playwright)
npm run test:p0          # Run P0 critical behavior tests
npm run test:p0:headed   # Run P0 tests with visible browser
npm run test:p0:report   # Run P0 tests and open HTML report
```

---

## 🌐 Multi-Language Support

The site supports **German** (primary) and **English**.

### Content Files

- `/data/artists-de.ts` - German artist data
- `/data/artists-en.ts` - English artist data
- Component strings are managed in each component's `content` object

### Language Toggle

- Located in navigation (desktop) and mobile menu
- Persisted in localStorage
- Default: German (DE)

### Adding Translations

1. Update component content objects with DE/EN keys
2. Update data files in `/data/`
3. Ensure all UI strings have both languages

---

## ♿ Accessibility

This site follows **WCAG AA** standards:

✅ **Color Contrast**: All text meets 4.5:1 minimum
✅ **Touch Targets**: All interactive elements ≥ 44px
✅ **Keyboard Navigation**: Full site navigable via keyboard
✅ **Focus Indicators**: Visible focus states on all elements
✅ **Screen Readers**: Proper ARIA labels and semantic HTML
✅ **Alt Text**: All images have meaningful descriptions

### Testing

```bash
# Install axe-core for accessibility testing
npm install -D @axe-core/cli

# Run accessibility audit
npx axe https://localhost:5173
```

---

## 🔬 P0 Critical Testing

**P0 tests** verify critical user experience behaviors at runtime using Playwright.

### Quick Start

```bash
# Setup (one-time)
npx playwright install

# Run all P0 tests
npm run test:p0

# Run with visual browser
npm run test:p0:headed

# Generate HTML report
npm run test:p0:report
```

### Test Coverage

| Test ID  | Behavior                      | Status         |
| -------- | ----------------------------- | -------------- |
| **R2**   | Scroll to top on navigation   | ✅ Implemented |
| **C6**   | Google Maps fallback behavior | ✅ Implemented |
| **T4**   | Font weight token compliance  | ✅ Implemented |
| **SEO5** | GA4 analytics event tracking  | ✅ Implemented |

### Environment Setup

Create `.env.local`:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

📖 **P0 tests live in** `tests/p0/`.

---

## 📱 Responsive Design

Tested and optimized for:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1439px
- **Desktop**: 1440px+

### Breakpoints

```css
/* Mobile Portrait */
@media (max-width: 320px) {
  /* Ultra-small */
}
@media (min-width: 375px) {
  /* iPhone standard */
}

/* Tablet */
@media (min-width: 768px) {
  /* Tablet portrait */
}
@media (min-width: 1024px) {
  /* Tablet landscape */
}

/* Desktop */
@media (min-width: 1440px) {
  /* Desktop standard */
}
@media (min-width: 2000px) {
  /* Ultra-wide */
}
```

---

## 🎨 Design System Documentation

Start here:

- `src/styles/design-tokens.css` (canonical tokens)
- `docs/design-tokens.md` (token usage rules)
- `docs/CSS-ARCHITECTURE-RULES.md` (CSS rules)

---

## 🔌 API Integration

### Backend Endpoints

**Booking Form** (`POST /api/booking`)

```json
{
  "artistId": "string",
  "serviceId": "string",
  "date": "ISO 8601",
  "time": "HH:MM",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "details": "string",
  "gdprConsent": { ... }
}
```

**Contact Form** (`POST /api/contact`)

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Email Service** (`POST /api/send-mail`)

```json
{
  "to": "string",
  "subject": "string",
  "template": "booking|contact|confirmation",
  "data": { ... }
}
```

See the `api/` directory for implementations.

---

## 🧩 Component Usage

### Using Design Tokens

```tsx
import './index.css';

// Prefer semantic tokens via Tailwind v4 token syntax
<div className="bg-(--color-bg-page) text-(--color-text-on-dark)">
```

### Perfect Button Example

```tsx
import { Button } from '@/components/atoms';

<Button variant='primary' size='lg'>
  Jetzt anfragen
</Button>;
```

---

## 🐛 Known Issues & Limitations

### ⚠️ Placeholder Content

- Team photos use placeholder images
- Some artist bios are demo content
- **Action Required**: Replace with real content

### ⚠️ Image Optimization

- Images not converted to WebP
- No responsive image sets (srcset)
- **Action Required**: Run image optimization script

### ✅ Everything Else

- Design system: 100% complete
- Components: 100% complete
- Pages: 100% complete
- Responsive: 100% complete
- Accessibility: 100% complete

---

## 📊 Performance Targets

- **Lighthouse Score**: 90+ (all categories)
- **Page Load**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5 seconds

### Optimization Checklist

- [ ] Convert all images to WebP
- [ ] Implement lazy loading for images
- [ ] Add image srcset for responsive images
- [ ] Minify CSS/JS in production
- [ ] Enable gzip/brotli compression
- [ ] Set up CDN for static assets
- [ ] Implement service worker for offline support

---

## 🔒 Security

### Implemented

✅ GDPR-compliant cookie consent
✅ Input sanitization on forms
✅ HTTPS enforced in production
✅ Environment variables for secrets
✅ CORS configuration

### To Implement

- [ ] Rate limiting on API endpoints
- [ ] reCAPTCHA on booking/contact forms
- [ ] CSP (Content Security Policy) headers
- [ ] XSS protection headers

---

## 📞 Support & Contact

**Project Repository**: [GitHub URL]
**Design System Lead**: [Name]
**Developer Lead**: [Name]
**Client Contact**: Your Business Name

**Documentation**:

- Design Tokens: `docs/design-tokens.md`
- CSS Architecture: `docs/CSS-ARCHITECTURE-RULES.md`
- Project Status: `docs/PROJECT_STATUS.md`

---

## 📄 License

MIT License - © 2025 Business Website Template.

---

## 🎉 Acknowledgments

- Design System: Custom luxury design system
- UI Components: ShadCN UI
- Icons: Lucide React
- Fonts: Playfair Display + Inter (Google Fonts)
- Build Tool: Vite
- Framework: React 18 + TypeScript
- Deployment: Node 20

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Status**: Production Ready

# Deployment Guide

**Velo Bar - Mobile Cocktailbar München & Coburg**

Production deployment checklist and environment configuration.

---

## Quick Deploy (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Deploy to production
vercel --prod
```

---

## Environment Variables

### Required Variables

```bash
# Email (Booking/Contact Forms)
VITE_SENDGRID_API_KEY=your_sendgrid_key
VITE_CONTACT_EMAIL=info@velo-bar.com

# Google Maps (Location Display)
VITE_GOOGLE_MAPS_API_KEY=your_maps_key

# Analytics (Optional)
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Security Variables (Vercel Only)

These are handled automatically by Vercel:

- CSRF protection (cookie-based)
- Rate limiting (Vercel KV)

---

## Pre-Deployment Checklist

### SEO Fundamentals ✅

- [ ] All pages have unique `<title>` and meta descriptions
- [ ] Sitemap.xml generated (`/public/sitemap.xml`)
- [ ] Robots.txt configured
- [ ] Structured data (LocalBusiness, FAQPage) implemented
- [ ] Canonical URLs set

### Performance ✅

- [ ] Images optimized (WebP, responsive srcset)
- [ ] Lazy loading enabled
- [ ] Code splitting configured
- [ ] Bundle size < 500KB initial load
- [ ] Lighthouse score > 90

### Security ✅

- [ ] CSRF protection active
- [ ] Rate limiting (100 req/15min per IP)
- [ ] CSP headers configured
- [ ] HTTPS enforced
- [ ] No hardcoded secrets in repo

### Accessibility ✅

- [ ] Touch targets ≥ 44px
- [ ] Color contrast WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Lighthouse accessibility score > 95

### Testing ✅

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run test` passes (76+ unit tests)
- [ ] `npm run test:e2e` passes (Playwright)

---

## Build Commands

### Vercel Configuration

Already configured in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "vite",
  "outputDirectory": "dist"
}
```

### Local Production Build

```bash
# Build
npm run build

# Preview locally
npm run preview
```

---

## Domain Configuration

### Primary Domain

- **Production:** `https://www.velo-bar.com`
- **Canonical:** `www.velo-bar.com` (redirect non-www → www)

### SSL/HTTPS

- Automatically handled by Vercel
- Force HTTPS: configured in `vercel.json` headers

---

## Post-Deployment Verification

### 1. SEO Verification

```bash
# Check sitemap
curl https://www.velo-bar.com/sitemap.xml

# Check robots.txt
curl https://www.velo-bar.com/robots.txt

# Verify structured data
# Visit: https://search.google.com/test/rich-results
```

### 2. Performance Check

```bash
# Run Lighthouse
npx lighthouse https://www.velo-bar.com --view

# Check Core Web Vitals
# Visit: https://pagespeed.web.dev/
```

### 3. Security Test

```bash
# Test rate limiting
npm run security:test:production

# Test CSRF protection
# See: docs/SECURITY.md
```

### 4. Functionality Test

- [ ] Navigate to all major pages
- [ ] Submit contact form (test mode)
- [ ] Test booking flow
- [ ] Test mobile responsiveness (375px to 1920px)
- [ ] Test language switcher (DE ↔ EN)

---

## Rollback Plan

### Instant Rollback (Vercel)

```bash
# View deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Git Rollback

```bash
# Revert to previous commit
git revert HEAD
git push

# Or reset (dangerous)
git reset --hard [commit-hash]
git push --force
```

---

## CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Monitoring Setup

### Google Analytics 4

1. Get measurement ID from GA4
2. Add to Vercel environment variables: `VITE_GA4_MEASUREMENT_ID`
3. Verify tracking in GA4 real-time view

### Web Vitals Monitoring

Already implemented via `src/lib/webVitals.ts`:

- LCP, CLS, INP, FCP, TTFB tracked
- Data sent to GA4 automatically

See: `docs/PERFORMANCE.md`

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist .turbo
npm install
npm run build
```

### Environment Variables Not Working

- Vercel: Set via dashboard or CLI
  ```bash
  vercel env add VITE_SENDGRID_API_KEY
  ```
- Local: Create `.env.local` (never commit)

### 404 on Routes

- Vercel handles SPA routing automatically via `vercel.json`
- If issues: verify `vercel.json` has `"rewrites"` configuration

### Rate Limiting Issues

- Increase limit in `api/middleware/rateLimiter.js`
- Or implement Vercel KV for distributed rate limiting

---

## Support

- **Documentation:** `docs/README.md`
- **Architecture:** `docs/ARCHITECTURE.md`
- **Security:** `docs/SECURITY.md`
- **Performance:** `docs/PERFORMANCE.md`

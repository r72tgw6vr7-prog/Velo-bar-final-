# Performance Monitoring

**Web Vitals Tracking & Optimization**

---

## Core Web Vitals Targets

| Metric   | Target  | Purpose             |
| -------- | ------- | ------------------- |
| **LCP**  | < 2.5s  | Loading performance |
| **CLS**  | < 0.1   | Visual stability    |
| **INP**  | < 200ms | Interactivity       |
| **FCP**  | < 1.8s  | First paint         |
| **TTFB** | < 800ms | Server response     |

---

## Monitoring Setup (Already Implemented)

### Web Vitals Tracking ✅

**Files:**

- `src/lib/webVitals.ts` - Core tracking
- `src/hooks/useWebVitals.ts` - React hook
- `src/components/AnalyticsProvider.tsx` - Provider

**Metrics Tracked:**

```typescript
✅ LCP (Largest Contentful Paint)
✅ CLS (Cumulative Layout Shift)
✅ INP (Interaction to Next Paint)
✅ FCP (First Contentful Paint)
✅ TTFB (Time to First Byte)
```

###GA4 Setup (Required)

**1. Get Measurement ID:**

1. Go to https://analytics.google.com
2. Create property → Copy Measurement ID (`G-XXXXXXXXXX`)

**2. Add to Environment:**

```bash
# .env.local
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

**3. Verify:**

- Open site → Check GA4 Real-time view
- Web Vitals appear in custom events

---

## Performance Optimization

### Bundle Size

**Current Status:**

- Initial load: < 500KB target
- Code splitting: Route-based lazy loading
- Vendor chunks: React, Radix, Framer Motion separated

**Check bundle size:**

```bash
npm run build
npm run build -- --analyze  # If analyzer configured
```

### Image Optimization

**Current:**

- Format: WebP with JPG fallback
- Responsive srcset: 320w, 640w, 1024w, 1920w
- Lazy loading: Intersection Observer
- 754 gallery images optimized

**Verify:**

```bash
# Check image sizes
ls -lh public/Velo\ Gallery/*.webp | head -10
```

### Code Splitting

**Vite Configuration:**

```javascript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom'],
        'vendor-radix': ['@radix-ui/*'],
        'vendor-framer': ['framer-motion'],
        'ui': [/* UI components */]
      }
    }
  }
}
```

---

## Performance Testing

### Lighthouse Audit

```bash
# Build first
npm run build
npm run preview

# Run Lighthouse
npx lighthouse http://localhost:4173 --view

# Target scores:
# Performance: > 90
# Accessibility: > 95
# Best Practices: > 90
# SEO: > 95
```

### Real User Monitoring (RUM)

**Web Vitals automatically sent to GA4:**

```typescript
// src/lib/webVitals.ts
onCLS((metric) =>
  gtag('event', 'web_vitals', {
    name: 'CLS',
    value: metric.value,
    metric_rating: metric.rating,
  }),
);
```

**View in GA4:**

- Reports → Events → web_vitals
- Configure custom dashboard

---

## Performance Checklist

### Pre-Deployment ✅

- [ ] Lighthouse performance score > 90
- [ ] Bundle size < 500KB initial
- [ ] All images optimized (WebP)
- [ ] Lazy loading implemented
- [ ] Code splitting configured
- [ ] Compression enabled (Gzip + Brotli)
- [ ] Font preloading configured
- [ ] Critical CSS inlined

### Runtime ✅

- [ ] LCP < 2.5s on 3G
- [ ] CLS < 0.1 (no layout shifts)
- [ ] INP < 200ms (smooth interactions)
- [ ] No blocking resources
- [ ] Service worker (if using PWA)

---

## Common Performance Issues

### Issue: Slow LCP

**Causes:**

- Large images above fold
- Blocking scripts
- Slow server response (TTFB)

**Solutions:**

```html
<!-- Preload critical images -->
<link rel="preload" as="image" href="/hero.webp" />

<!-- Lazy load below-fold images -->
<img src="image.webp" loading="lazy" />
```

### Issue: High CLS

**Causes:**

- Images without dimensions
- Web fonts loading (FOUT)
- Dynamic content injection

**Solutions:**

```css
/* Reserve space for images */
img {
  aspect-ratio: 16 / 9;
}

/* Font loading strategy */
@font-face {
  font-family: 'SourceSansPro';
  font-display: swap;
}
```

### Issue: Slow INP

**Causes:**

- Heavy JavaScript execution
- Unoptimized event handlers
- Blocking main thread

**Solutions:**

```typescript
// Debounce expensive operations
const debouncedSearch = debounce(handleSearch, 300);

// Use requestIdleCallback for non-critical work
requestIdleCallback(() => {
  // Low-priority work
});
```

---

## Performance Budget

### Targets

| Resource         | Budget    | Current       |
| ---------------- | --------- | ------------- |
| JavaScript       | 300KB     | ~250KB ✅     |
| CSS              | 50KB      | ~30KB ✅      |
| Images (initial) | 500KB     | ~400KB ✅     |
| Fonts            | 100KB     | ~80KB ✅      |
| **Total**        | **< 1MB** | **~760KB ✅** |

### Enforce in CI

```json
// package.json
{
  "scripts": {
    "test:size": "bundlesize"
  },
  "bundlesize": [
    {
      "path": "./dist/**/*.js",
      "maxSize": "300 KB"
    }
  ]
}
```

---

## Monitoring Dashboard

### GA4 Custom Dashboard

1. GA4 → Explore → Blank
2. Add charts:
   - **LCP Over Time** (line chart)
   - **CLS Distribution** (bar chart)
   - **INP by Page** (table)
3. Add segments for mobile vs desktop

### Alerts

Set up GA4 alerts:

- LCP > 4s (poor)
- CLS > 0.25 (poor)
- INP > 500ms (poor)

**Configure:**
GA4 → Admin → Custom Alerts → New Alert

---

## Advanced Optimizations

### Service Worker (Future)

```javascript
// src/service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['/', '/styles.css', '/app.js']);
    }),
  );
});
```

### Resource Hints

```html
<!-- DNS prefetch -->
<link rel="dns-prefetch" href="https://www.google-analytics.com" />

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" />

<!-- Prefetch next page -->
<link rel="prefetch" href="/services" />
```

---

## Resources

- [Web Vitals Chrome Extension](https://chrome.google.com/webstore/detail/web-vitals)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## Support

- **Architecture:** `docs/ARCHITECTURE.md`
- **Deployment:** `docs/DEPLOYMENT.md`
- **QA:** `docs/QA.md`

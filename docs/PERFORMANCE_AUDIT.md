# Performance Audit — Quick Summary (automated Lighthouse run)

Date: 2026-01-04
Engine: Lighthouse (via scripts/performance-benchmark.mjs)
Environment: dev server (http://localhost:5173)
Report: ./artifacts/performance/lighthouse-2026-01-04T13-03-19-030Z.report.html
JSON: ./artifacts/performance/lighthouse-2026-01-04T13-03-19-030Z.report.json

---

## Key results

- Lighthouse scores (dev): **Performance: 26** | Accessibility: 96 | Best Practices: 96 | SEO: 100
- Core Web Vitals (dev): **LCP 45.9 s (poor)**, FCP 20.1 s, TTI 47.7 s, CLS 0.000 (good)

> Primary reason for the extremely poor numbers in this run: the benchmark was executed against the Vite _development_ server which serves unoptimized assets (large images, dev JS bundles, @vite/client, source maps, etc.). This inflates payloads and CPU work. A production build run is required to determine production-level scores.

---

## Top findings (from Lighthouse)

1. Enormous network payloads (Total: ~117 MB) — largest items are gallery images (~25 MB each). (Audit: `total-byte-weight`)
2. Unminified / oversized JavaScript & unused JS (~2.6 MB savable, est LCP savings ~15s) — many node_modules chunks + dev client are included. (Audit: `unminified-javascript`, `unused-javascript`)
3. Large render and main-thread work leading to extremely slow FCP/LCP/TTI. (Audit: `speed-index`, `first-contentful-paint`, `largest-contentful-paint`)
4. Offscreen images not deferred (logo and gallery images): modest savings possible by lazy-loading. (Audit: `offscreen-images`)
5. Server response time is OK for this run (Root doc ~120 ms). (Audit: `server-response-time`)

---

## Prioritized recommendations (short, actionable)

### Priority 0 — Immediate / Blocking (high impact, small effort)

- Run the benchmark against a production build: `npm run build` and serve the `dist` (or use `npm run perf:benchmark:prod` against production) and compare results. (Rationale: dev server inflates payloads and CPU work.)
- Compress and serve images in modern formats (AVIF/WebP) and resize large images. Replace the massive gallery images with optimized versions (critical: hero/LCP image). Estimated impact: LCP reduced dramatically (from 45s → <3s), performance score +40–60 points.

### Priority 1 — High impact changes

- Implement responsive images (srcset + sizes) and ensure LCP image is preloaded. Use `ResponsiveImage` component to deliver correct sizes.
- Lazy-load non-critical/offscreen images and media. (Audit indicates >117 KiB saving for logo + significant gallery savings.)
- Remove dev-only code from production (ensure Vite dev client, source maps, and large dev-only imports are not included in prod bundles).
- Enable gzip/brotli on the server/CDN and cache headers for static assets.

### Priority 2 — Bundle & JS optimizations

- Code-split: dynamic import large pages/components (gallery, admin, big widgets) so critical route loads stay small.
- Tree-shake and remove unused dependencies (audit lists react-router chunk, framer-motion, gsap, etc.).
- Minify and compress JS in production builds (Vite does this by default; ensure no dev flags remain).

### Priority 3 — Medium/Long term

- Adopt image CDN (or on-build image optimization pipeline) to produce multiple formats/sizes and edge caching.
- Consider SSR/Edge rendering for faster LCP when applicable (or pre-render the main pages).
- Audit third-party scripts and defer/async where possible.

---

## Quick, safe checklist you can run now

1. Build production: `npm run build` → `serve -s dist` (or use a static server) and run `npm run perf:benchmark` against that URL.
2. Run `scripts/performance-benchmark.mjs https://velo.bar` (or `npm run perf:benchmark:prod`) to compare live production metrics.
3. Replace the top 5 largest gallery images with optimized/resized versions and re-run benchmark.
4. Add lazy-loading (loading="lazy") to non-critical `<img>` and ensure hero image is `loading="eager"` + preloaded.

---

## Notes & caveats

- The numbers above are from a dev-server benchmark; they show actionable items but **do not** represent production results. Many dev-only artifacts (Vite dev client, large unoptimized images in source) explain the extreme values.
- After the production benchmark is run we should produce a small PR with the highest-impact items (image optimization + one code-splitting change) and re-run to quantify gains.

---

Prepared by: automated audit (scripts/performance-benchmark.mjs)

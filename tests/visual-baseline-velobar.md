# Visual baseline — Velo.Bar

This file documents the frozen visual baseline for the project. Screenshots in `tests/baseline/` are the canonical references and must not be changed unless explicitly approved.

---

Pages captured (flags OFF):

- / (homepage)
  - URL: https://www.velo-bar.com/
  - Viewports: 375, 768, 1024, 1440
  - Screenshot path examples:
    - `tests/baseline/home-375.png`
    - `tests/baseline/home-768.png`
    - `tests/baseline/home-1024.png`
    - `tests/baseline/home-1440.png`
  - Expected: Hero illustration (inline SVG) visible at top as LCP; navigation at top, responsive two/three-column content below; marquee or parallax elements animate subtly but do not change layout. No layout shifts beyond typical font loading.

- /velobar/buchungmuc (Munich booking page)
  - URL: https://www.velo-bar.com/velobar/buchungmuc
  - Viewports: 375, 768, 1024, 1440
  - Screenshot path examples:
    - `tests/baseline/buchungmuc-375.png`
  - Expected: Multi-step booking form visible; hero with heading "VELO.BAR München" and content blocks stacked on narrow viewports and side-by-side on larger ones. Animations are limited to micro-interactions; content blocks, spacing and number of form fields must remain identical.

- /anfrage (booking/inquiry page)
  - URL: https://www.velo-bar.com/anfrage
  - Viewports: 375, 768, 1024, 1440
  - Screenshot path examples:
    - `tests/baseline/anfrage-375.png`
  - Expected: Inquiry form and explanatory text; no unexpected wrapping or missing items. Visual animations (button hover, subtle fades) are allowed but overall layout, spacing and visible content must match baseline.

- /galerie (gallery)
  - URL: https://www.velo-bar.com/galerie
  - Viewports: 375, 768, 1024, 1440
  - Screenshot path examples:
    - `tests/baseline/galerie-375.png`
  - Expected: Responsive image grid; hero carousel / gallery present. Number of visible items per row adjusts by viewport width; image aspect ratios and gaps must remain identical.

- /blog/nachhaltige-firmenfeier (sample blog post)
  - URL: https://www.velo-bar.com/blog/nachhaltige-firmenfeier
  - Viewports: 375, 768, 1024, 1440
  - Screenshot path examples:
    - `tests/baseline/blog-nachhaltige-firmenfeier-375.png`
  - Expected: Article header and content with images inline; typography and line wrapping must remain stable. Any small animated elements (e.g., subtle header reveal) are allowed but layout must not shift.

---

This is the frozen baseline. Any comparison run will write candidate screenshots to `tests/candidate/<flag-name>/` and diffs to `tests/diffs/`.

If a candidate run produces any visible difference (layout, spacing, timing that affects layout, number of items, wrapping), the flag is considered a FAILURE and must remain OFF. If all screenshots match pixel-for-pixel, the flag is SAFE and may be proposed for production.

---

## Candidate flag results

### VITE_PERF_HERO_SVG — FAILURE ⚠️

- Result: Visual differences detected on the **homepage** across multiple viewports.
- Diffs saved at:
  - `tests/diffs/VITE_PERF_HERO_SVG/home-375-diff.png`
  - `tests/diffs/VITE_PERF_HERO_SVG/home-768-diff.png`
  - `tests/diffs/VITE_PERF_HERO_SVG/home-1024-diff.png`
  - `tests/diffs/VITE_PERF_HERO_SVG/home-1440-diff.png`
- Short note: Switching the hero to an external SVG image changes the rendered hero area (visual details and layering/spacing), which affects the LCP hero area — this caused pixel-level differences and therefore must remain OFF.

### VITE_PERF_MARQUEE_DEFER — FAILURE ⚠️

- Result: Visual differences detected on the **homepage** across multiple viewports when the marquee init was deferred (requestIdleCallback path).
- Diffs saved at:
  - `tests/diffs/VITE_PERF_MARQUEE_DEFER/home-375-diff.png`
  - `tests/diffs/VITE_PERF_MARQUEE_DEFER/home-768-diff.png`
  - `tests/diffs/VITE_PERF_MARQUEE_DEFER/home-1024-diff.png`
  - `tests/diffs/VITE_PERF_MARQUEE_DEFER/home-1440-diff.png`
- Short note: Deferring marquee initialization changes the initial rendered state of the hero/hero-adjacent area (items in marquee not initialized at the same time), producing visible differences; therefore keep OFF.


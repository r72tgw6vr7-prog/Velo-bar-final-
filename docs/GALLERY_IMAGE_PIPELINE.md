# Gallery AVIF Pipeline

This repo already supports responsive image variants (WebP + JPG) and includes an enhanced optimizer that can generate **AVIF + WebP + JPG** variants plus blur placeholders.

## Goals

- **No layout/design changes** (only optimized delivery)
- Prefer **AVIF** when supported, then **WebP**, then **JPG**
- Generate responsive variants at widths used by the `ResponsiveImage` component:
  - `320`, `640`, `1024`, `1920`

## How it works

- Variants are stored next to the source image using the naming convention:
  - `name-320w.avif`, `name-640w.avif`, ...
  - `name-320w.webp`, `name-640w.webp`, ...
  - `name-320w.jpg`, `name-640w.jpg`, ...
- Blur placeholders are stored as:
  - `name.meta.json`

## Generate / refresh gallery variants

Run:

```bash
npm run optimize:images:gallery
```

This uses `scripts/optimize-images-enhanced.mjs`, which:
- scans `public/Velo Gallery` recursively
- generates AVIF/WebP/JPG variants at multiple widths
- generates blur placeholders

## Delivery (runtime)

`ResponsiveImage` already renders `<picture>` sources in this order:
1. `image/avif`
2. `image/webp`
3. `image/jpeg`

So once AVIF variants exist, modern browsers will automatically pick them.

## Caching

For production, make sure your hosting sets long-term immutable caching for static variants:

- `Cache-Control: public, max-age=31536000, immutable`

This repo already includes long-cache headers for image folders in `vercel.json`.

## CI guardrails

A CI workflow checks **changed** gallery images in PRs:
- If a new/modified source image is committed under `public/Velo Gallery/**`, required variants must exist.
- If a WebP/JPG variant is changed, the matching AVIF sibling must exist.
- Basic size budgets are enforced to prevent large regressions.

If CI fails, regenerate with:

```bash
npm run optimize:images:gallery
```

# Image Optimization Runbook — Velo.Bar

Purpose: map current large/unoptimized images, define exact optimized outputs, and provide an implementation plan and verification steps. Do not change visual layout.

## Overview
- Goal: Reduce total image bytes (Lighthouse estimated savings ~6,268 KiB) by converting oversized images to responsive AVIF/WebP variants, adding missing size variants, ensuring site uses base paths (so `ResponsiveImage` serves the correct srcset), and removing large unused originals after verification.

## Mapping (initial candidates from Lighthouse)
Each entry: path (in `public/`), where used, recommended outputs.

1) /public/Velo Gallery/drinks-selection.jpg
- Where used: `src/data/parallaxGalleryImages.ts`, `src/data/galleryImages.ts`, `src/components/HeroParallax/HeroParallax.tsx`
- Current problem: original JPG used directly in `galleryImages` (literal asset mode) - large (≈1.6 MB, 3804x5760). Responsive variants exist (`-320w`, `-640w`) but the site sometimes resolves literal JPG.
- Output: Generate AVIF + WebP at widths: 256, 320, 640, 1024, 1920. Generate `/Velo Gallery/drinks-selection-<w>w.avif` and `-<w>w.webp` and update `drinks-selection.meta.json` placeholder & aspectRatio.

2) /public/Velo Gallery/wedding-bar.jpg
- Where used: `src/data/galleryImages.ts` and hero/gallery references
- Current problem: large JPG used directly.
- Output: Create `wedding-bar-320w, -640w, -1024w` in AVIF/WebP + meta JSON.

3) /public/Velo Gallery/A7401220-1920w.jpg
- Where used: Home location card (Coburg)
- Current problem: Uses 1920 JPG; ensure WebP/AVIF equivalents and smaller sizes for mobile.
- Output: Generate webp/avif at 320/640/1024/1920 and meta.json.

4) /public/Velo Gallery/teamevent-und-workshops/teamevent-und-workshops-1920w.webp
- Where used: service cards and gallery
- Current problem: file is large and may need higher compression or additional sizes (320/640/1024).
- Output: Re-encode with higher compression and generate AVIF; ensure smaller sizes exist.

5) /public/Velo Gallery/private-feiern/private-feiern-1920w.webp
- Where used: service card
- Output: Re-encode at better compression, create smaller widths.

6) /public/Velo Gallery/messen/messen-1920w.webp
7) /public/Velo Gallery/hochzeit/hochzeiten-1920w.webp
8) /public/Velo Gallery/firemnfeier/firmenfeier-1920w.webp
(These 1920w WebP images) — create 320/640/1024 variants + AVIF

---

## Implementation plan (safe, reversible)
1. Add script `scripts/image-optimize.mjs` (Node + sharp) to:
   - Scan `public/Velo Gallery` for original images (jpg/jpeg/png/webp) listed in the mapping or larger than threshold (≥200 KB and resolution >1000px in any dimension).
   - For each image: generate resized outputs in AVIF and WebP for widths: 256, 320, 640, 1024, 1920 (skip sizes larger than original resolution).
   - Generate a blur placeholder (20px wide WebP base64) and aspectRatio in `<base>.meta.json` next to the base file (e.g., `drinks-selection.meta.json`).
   - Keep originals intact during the run but write optimized files to `public/Velo Gallery/optimized/` or alongside originals (prefer alongside to keep existing resolvePublicPath behavior). Prefer writing alongside with the naming convention `-<w>w.avif` and `-<w>w.webp`.
   - Avoid reprocessing if target files already exist with same timestamp and size (idempotent behavior).

2. Update code where images are referenced literally:
   - Replace `/Velo%20Gallery/drinks-selection.jpg` with `/Velo%20Gallery/drinks-selection` in `src/data/galleryImages.ts` so `ResponsiveImage` uses responsive srcsets.
   - Replace other direct .jpg usages (wedding-bar.jpg, A7401220-1920w.jpg) with base path (without extension) where possible or with `-640w.webp` if base path not applicable.

3. Run the script locally, inspect generated files, test pages in dev build (Lighthouse), and verify LCP improvements.

4. Cleanup: after verification (two successful deploy checks / 72 hours), delete original oversized source files (e.g., `drinks-selection.jpg`, `A7401220-1920w.jpg`) or move to `/public/Velo Gallery/originals-archive/` if retention desired.

---

## Verification
- Manual checks:
  - Confirm generated files exist (e.g., `/Velo Gallery/drinks-selection-320w.avif`)
  - Confirm `<picture>` includes AVIF/WebP responsive sources (via ResponsiveImage logic)
  - Lighthouse: confirm image savings drop and LCP improves; expected ~6,268 KiB savings overall.
- Automated checks:
  - Add `scripts/check-images.mjs` to scan for large images (>200 KB) and fail if any remain in key directories.

---

## Safety & Rollback
- Do not remove original files until two staging deploys validate the changes.
- Keep backups in `public/Velo Gallery/originals-archive/` for 30 days post-deploy.

---

If you approve, I will: (1) add the Node script (`scripts/image-optimize.mjs`) and a lightweight `check-images.mjs`, (2) update `package.json` with `npm run images:optimize`, and (3) change the minimal set of code lines to reference base image paths (e.g., `drinks-selection` instead of `.jpg`) for pages flagged by Lighthouse.

Implementation commands (run locally / on CI):

1) Install dependencies (if needed):
   - npm install sharp --save-dev

2) Run optimization script (will create -<w>w.avif and -<w>w.webp and meta.json files):
   - npm run images:optimize:runbook

3) Rebuild gallery manifest so `resolvePublicPath` picks up new files:
   - npm run gallery:rebuild

4) Run quick checks:
   - npm run check:images (lists images >200KB in `public/Velo Gallery`)
   - npm run build && open dev server or deploy preview and run Lighthouse to confirm savings/LCP improvements

5) After 2 successful preview builds and verification, remove or archive originals (move to `public/Velo Gallery/originals-archive/`).

Would you like me to proceed with the script and code updates now? If yes, I will also:
- Run the optimization script locally (requires sharp installed), generate artifacts, and provide the list of generated files and Lighthouse before/after estimates.
- Or I can just prepare everything and leave the final `npm run images:optimize:runbook` for you to run in CI/local environment.
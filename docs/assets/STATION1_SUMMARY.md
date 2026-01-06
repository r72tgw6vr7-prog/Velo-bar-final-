# Station 1 Results

## Stats
- Total images scanned: **768**
- Duplicate groups: **119** (258 physical files)
- Largest folder: **/public/Velo Gallery/gallery-carousel** (497 files)
- Format counts: **webp 468**, **jpg 270**, **svg 29**, **jpeg 1**

## Critical Issues
1. Legacy gallery dump (`/public/Velo Gallery/velo bar bilder 2`) reintroduced as `gallery-carousel` is responsible for ~65% of all assets and most duplicates; references still point to the legacy path.
2. Repeated hero/background assets (e.g., `hero.jpg`, `custom-hero.jpg`, wedding derivatives) appear across `/public`, `/public/assets`, and gallery folders, inflating repo size.
3. Optimized folders contain redundant `.webp` derivatives (partners/bar/drinks) due to prior manual copies; needs canonical source selection before further optimization.
4. `public/public/` nested folder remains empty placeholders — safe to remove once confirmed unused.

## Folder Observations
- `/public/Velo Gallery/gallery-carousel/optimized` already stores AVIF/WebP/JPG stacks but duplicates the cleaner `/public/Velo Gallery/optimized` directory.
- Specialized folders (`firemnfeier`, `private-feiern`, `hochzeit`, `messen`, `teamevent-und-workshops`) are tidy and ready to become canonical sources.
- Non-gallery assets (`/public/assets/**`, `/public/images/**`) account for <5% of total files but still include duplicated hero backgrounds and placeholder SVG/WebP binaries.

Station 1 complete. Awaiting approval before proceeding to Station 2 (usage mapping).

# Velo Bar SSG & Local SEO Migration Summary (2026-01-04)

## What was implemented

- Attempted to convert the Vite+React SPA to a statically pre-rendered site (SSG) using vite-ssg and vite-plugin-ssg.
- Added explicit route list for SSG in `src/ssg.routes.ts`.
- Added Coburg NAP to `.env.example` and schema system.
- Extended JSON-LD output ([src/components/StructuredData.tsx](src/components/StructuredData.tsx)) to include both München and Coburg LocalBusiness nodes, all env-driven.
- Updated Vercel config for static HTML and asset caching.
- Documented SSG setup and route addition in `SSG_README.md`.

## Files changed

- `.env.example`, `src/lib/env.ts`, `src/components/StructuredData.tsx`, `vite.config.ts`, `package.json`, `vercel.json`, `src/ssg.routes.ts`, `SSG_README.md`

## Issues/Limitations

- vite-ssg and vite-plugin-ssg are not React-first and have Vue dependencies; build fails on Vite 7+ with React.
- No static HTML was generated; SSG build fails due to missing Vue dependencies.
- Tests also fail due to web server/startup issues.
- All schema and NAP changes are present and ready for when a compatible SSG/SSR solution is adopted (e.g., Vike or Astro).

## Next steps / Recommendations

- Migrate to [Vike](https://vike.dev/) or [Astro](https://astro.build/) for robust React SSG/SSR support on Vite 7+.
- Manually verify Google Business Profiles for both München and Coburg; ensure NAP and URLs match schema exactly.
- When new location pages are built, update GBP links to point to those.
- Use Google Rich Results Test to verify LocalBusiness schema is detected for both locations.

## Local SEO foundation

- NAP and schema for both locations are now consistent and environment-driven.
- No visual or layout changes were made; all updates are in the head/schema only.

---

For further SSG/SSR migration or local SEO improvements, see this file and `SSG_README.md`.

# Image checks and manifest

This project includes automated checks to ensure image references in source code resolve to files served from `public/` so images don't 404 in production.

Commands

- Generate manifest: `node scripts/generate-image-manifest.cjs`
- Create public shims (idempotent): `node scripts/create-public-shims.cjs`
- Run static checker: `node scripts/check-images.cjs` (exits 1 when missing > 0)
- Run runtime smoke checks (requires a static server at http://127.0.0.1:5000): `node scripts/smoke-check.cjs`

CI

A GitHub Actions workflow `image-path-check.yml` runs the generator, shim creator, the static checker and a runtime smoke test on push or PR and will fail if image references are missing or runtime checks fail.

Notes

- `src/generated/imageManifest.ts` is auto-generated. Add new assets to `public/` and run the generator to include them.
- Prefer adding `.meta.json` files next to important gallery images to provide placeholders or blurups (see `public/Velo Gallery/*.meta.json`).

Gallery

- Canonical gallery folder: `public/Velo Gallery/`
- Do not create `public/public/`.
- In code, reference gallery images from the web root:
  - Use `/Velo Gallery/<image-base>`
  - Do not use `/public/...`

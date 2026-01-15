#!/usr/bin/env node
// Simple wrapper to call the existing ESM implementation (generate-image-manifest.mjs)
(async () => {
  try {
    await import('./generate-image-manifest.mjs');
  } catch (err) {
    console.error('[generate-image-manifest] failed:', err);
    process.exit(1);
  }
})();

#!/bin/bash

# Protect background images from deletion
PROTECTED_BACKGROUNDS=(
  # No protected backgrounds currently - add as needed
)

echo "🔒 Verifying protected backgrounds..."
MISSING=0
for bg in "${PROTECTED_BACKGROUNDS[@]}"; do
  if [ ! -f "$bg" ]; then
    echo "⚠️  Missing protected background: $bg"
    MISSING=1
  fi
done

if [ $MISSING -eq 1 ]; then
  # In CI (production-like) builds, fail hard. Locally, warn only to avoid blocking dev/preview.
  if [ -n "$CI" ]; then
    echo "🚨 CRITICAL: One or more protected backgrounds are missing (CI). Failing build."
    exit 1
  else
    echo "⚠️  Warning: Missing protected backgrounds detected (non-blocking locally)."
  fi
else
  echo "[OK] All protected backgrounds verified"
fi

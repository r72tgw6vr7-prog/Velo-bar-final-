#!/bin/sh
#
# Pre-commit hook to prevent committing non-brand hex colors
#

# Define allowed hex codes (Brand Palette)
# Canonical palette (see docs/BRAND_COLOR_SYSTEM.md)
# Coral: #ee7868, #f08b7d, #f6b0a6
# Yellow: #fab81d, #f8c84d, #fde29a
# Navy: #003141, #002635, #0a4f60
# Cream: #fff8ec, #fff2de
# White: #ffffff
# Gray: #bbbbbb
ALLOWED_HEXES="ee7868|f08b7d|f6b0a6|fab81d|f8c84d|fde29a|003141|002635|0a4f60|fff8ec|fff2de|ffffff|bbbbbb"

# Files to check (staged files)
# Exclude design tokens, tailwind config, and this script itself from the check
# Also exclude tests, coverage reports, and build artifacts
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E "\.(js|jsx|ts|tsx|css|scss|html)$" | grep -vE "(design-tokens\.css|index\.css|tailwind\.config\.mjs|BRAND_COLOR_SYSTEM\.md|scripts/lint-colors\.sh|tests/|coverage/|dist/|build/|node_modules/)")

if [ -z "$FILES" ]; then
  exit 0
fi

# Check for hex codes
FORBIDDEN_COLORS_FOUND=0

for FILE in $FILES; do
  # Grep for hex codes, excluding allowed ones
  # Pattern matches # followed by 6 hex digits
  # We use grep -vE to exclude the allowed hexes (case insensitive)
  
  # 1. Find all hex codes
  HEX_CODES=$(grep -oE "#[0-9a-fA-F]{6}" "$FILE")
  
  if [ -n "$HEX_CODES" ]; then
    # 2. Filter out allowed ones
    BAD_HEXES=$(echo "$HEX_CODES" | grep -ivE "$ALLOWED_HEXES")
    
    if [ -n "$BAD_HEXES" ]; then
      echo "❌ Error: Forbidden hex colors found in $FILE:"
      echo "$BAD_HEXES" | sort | uniq
      FORBIDDEN_COLORS_FOUND=1
    fi
  fi
done

if [ $FORBIDDEN_COLORS_FOUND -eq 1 ]; then
  echo ""
  echo "⚠️  Please use design tokens (var(--name) or Tailwind classes) instead of raw hex values."
  echo "See docs/BRAND_COLOR_SYSTEM.md for the official palette."
  exit 1
fi

exit 0

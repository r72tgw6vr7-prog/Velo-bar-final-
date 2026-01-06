#!/bin/bash

# Apply 4 fixes to ALL .tsx/.jsx files in src/components

echo "Applying 4 fixes to all components..."

find src/components -name "*.tsx" -o -name "*.jsx" | while read file; do
  # Backup original
  cp "$file" "$file.backup"
  
  # Fix 1: Add import if missing
  if ! grep -q "from '../design-tokens'" "$file" && ! grep -q "from '../../design-tokens'" "$file"; then
    sed -i '1i import { colors, fonts } from "../design-tokens";' "$file"
  fi
  
  # Fix 2-3: Replace color and font references
  sed -i 's/colors\.accent/colors?.accent || "#ff6b35"/g' "$file"
  sed -i 's/colors\.background/colors?.background || "#222222"/g' "$file"
  sed -i 's/colors\.white/colors?.white || "#FFFFFF"/g' "$file"
  sed -i 's/colors\.chrome/colors?.chrome || "#C0C0C0"/g' "$file"
  sed -i 's/fonts\.heading/fonts?.heading || "\"Playfair Display\", serif"/g' "$file"
  sed -i 's/fonts\.body/fonts?.body || "\"Inter\", sans-serif"/g' "$file"
  
  echo "Fixed: $file"
done

echo "All components fixed!"
echo "Run: npm run build to verify"

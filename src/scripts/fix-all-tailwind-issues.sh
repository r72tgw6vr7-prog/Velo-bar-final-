#!/bin/bash
# Script to fix all Tailwind issues across the codebase
# Usage: ./fix-all-tailwind-issues.sh

DIRECTORY="/Users/yos/Work/CascadeProjects/Stargate/src"

echo "Finding and fixing Tailwind issues across the codebase..."

# Find all relevant files (TypeScript, React)
FILES=$(find "$DIRECTORY" -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" \) | sort)

echo "Found $(echo "$FILES" | wc -l | xargs) files to process."

# Process each file
for file in $FILES; do
  echo "Processing $file..."
  
  # Create backup
  cp "$file" "${file}.bak"
  
  # 1. Replace [var(--var)] with (--var)
  sed -i '' -E 's/\[var\((--[^)]+)\)\]/(\1)/g' "$file"
  
  # 2. Standardize transitions
  sed -i '' -E 's/transition-colors[[:space:]]+duration-[0-9]+[[:space:]]+ease-[a-z]+[[:space:]]+transition/transition/g' "$file"
  sed -i '' -E 's/transition[[:space:]]+transition-colors[[:space:]]+duration-[0-9]+[[:space:]]+ease-[a-z]+/transition/g' "$file"
  sed -i '' -E 's/transition-colors[[:space:]]+first:[^[:space:]]+[[:space:]]+last:[^[:space:]]+[[:space:]]+transition/first:\1 last:\2 transition/g' "$file"
  sed -i '' -E 's/transition-colors[[:space:]]+duration-[0-9]+[[:space:]]+ease-[a-z]+/transition duration-200 ease-out/g' "$file"
  
  # 3. Fix bg-white/[0.03] to bg-white/3
  sed -i '' 's/bg-white\/\[0\.03\]/bg-white\/3/g' "$file"
  
  # 4. Fix other common Tailwind issues
  sed -i '' 's/transition-colors rounded/transition rounded/g' "$file"
  sed -i '' 's/transition-duration/duration/g' "$file"
  sed -i '' 's/bg-\[var(--brand-primary)\]/bg-(--brand-primary)/g' "$file"
  sed -i '' 's/hover:bg-\[var(--brand-hover)\]/hover:bg-(--brand-hover)/g' "$file"
  sed -i '' 's/border-\[var(--brand-primary)\]/border-(--brand-primary)/g' "$file"
  sed -i '' 's/hover:border-\[var(--brand-primary)\]\/50/hover:border-(--brand-primary)\/50/g' "$file"
  
  # Check if changes were made
  if ! diff -q "$file" "${file}.bak" > /dev/null; then
    echo "Fixed Tailwind issues in $file"
  else
    echo "No changes needed in $file"
  fi
  
  # Remove backup
  rm "${file}.bak"
done

echo "Process completed!"

exit 0

#!/bin/bash
# Script to fix CSS variable usage and standardize transitions
# Usage: ./fix-css-vars.sh <directory>

if [ -z "$1" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

DIRECTORY="$1"

# Check if directory exists
if [ ! -d "$DIRECTORY" ]; then
  echo "Error: Directory $DIRECTORY does not exist"
  exit 1
fi

echo "Finding files with CSS variable issues..."

# Find all TSX/JSX files
FILES=$(find "$DIRECTORY" -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" \) | sort)

count=0
fixed=0

# Process each file
for file in $FILES; do
  # Check if file contains [var(--
  if grep -q "\[var(--" "$file"; then
    count=$((count + 1))
    echo "Processing $file..."
    
    # Create backup
    cp "$file" "${file}.bak"
    
    # 1. Replace [var(--var)] with (--var)
    sed -i '' -E 's/\[var\((--[^)]+)\)\]/(\1)/g' "$file"
    
    # Check if changes were made
    if ! diff -q "$file" "${file}.bak" > /dev/null; then
      fixed=$((fixed + 1))
      echo "Fixed CSS variables in $file"
    else
      echo "No CSS variable changes made in $file"
    fi
    
    # Remove backup
    rm "${file}.bak"
  fi
  
  # Check if file contains transition-colors and transition together
  if grep -q "transition-colors.*transition\|transition.*transition-colors" "$file"; then
    # Create backup if not already created
    if [ ! -f "${file}.bak" ]; then
      cp "$file" "${file}.bak"
    fi
    
    # 2. Standardize transitions
    sed -i '' -E 's/transition-colors[[:space:]]+duration-[0-9]+[[:space:]]+ease-[a-z]+[[:space:]]+transition/transition/g' "$file"
    sed -i '' -E 's/transition[[:space:]]+transition-colors[[:space:]]+duration-[0-9]+[[:space:]]+ease-[a-z]+/transition/g' "$file"
    sed -i '' -E 's/transition-colors[[:space:]]+duration-[0-9]+[[:space:]]+ease-[a-z]+/transition duration-200 ease-out/g' "$file"
    
    # Check if changes were made
    if [ -f "${file}.bak" ] && ! diff -q "$file" "${file}.bak" > /dev/null; then
      fixed=$((fixed + 1))
      echo "Standardized transitions in $file"
    else
      echo "No transition changes made in $file"
    fi
    
    # Remove backup if exists
    if [ -f "${file}.bak" ]; then
      rm "${file}.bak"
    fi
  fi
  
  # 3. Fix bg-white/[0.03] to bg-white/3
  if grep -q "bg-white/\[0\.03\]" "$file"; then
    # Create backup if not already created
    if [ ! -f "${file}.bak" ]; then
      cp "$file" "${file}.bak"
    fi
    
    sed -i '' 's/bg-white\/\[0\.03\]/bg-white\/3/g' "$file"
    
    # Check if changes were made
    if [ -f "${file}.bak" ] && ! diff -q "$file" "${file}.bak" > /dev/null; then
      fixed=$((fixed + 1))
      echo "Fixed bg-white opacity in $file"
    else
      echo "No opacity changes made in $file"
    fi
    
    # Remove backup if exists
    if [ -f "${file}.bak" ]; then
      rm "${file}.bak"
    fi
  fi
done

echo "Process completed!"
echo "Summary: Found $count files with potential issues, fixed $fixed issues."

exit 0

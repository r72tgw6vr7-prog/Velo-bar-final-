#!/bin/bash

# Find all TypeScript/React files
find . -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
  # Skip node_modules
  if [[ $file == *"node_modules"* ]]; then
    continue
  fi
  
  # Remove unused React imports
  sed -i '' 's/import React from '\''react'\'';//' "$file"
  sed -i '' 's/import React, /import /' "$file"
  
  # Fix any ESLint warnings about unused variables
  sed -i '' 's/const \([a-zA-Z0-9]*\) = [^;]*;[ ]*\/\/ eslint-disable-line no-unused-vars/const _\1 = \2;/' "$file"
done
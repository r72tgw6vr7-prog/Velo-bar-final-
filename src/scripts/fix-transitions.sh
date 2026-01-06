#!/bin/bash
# Script to fix transition properties in EnhancedGalleryPage.tsx

FILE="/Users/yos/Work/CascadeProjects/Stargate/src/pages/EnhancedGalleryPage.tsx"

# Check if file exists
if [ ! -f "$FILE" ]; then
  echo "Error: File $FILE does not exist"
  exit 1
fi

echo "Processing transition properties in $FILE..."

# Create backup
cp "$FILE" "${FILE}.bak"

# Replace transition-colors first:rounded-t-lg last:rounded-b-lg transition
sed -i '' -E 's/transition-colors first:rounded-t-lg last:rounded-b-lg transition/first:rounded-t-lg last:rounded-b-lg transition/g' "$FILE"

# Check if changes were made
if ! diff -q "$FILE" "${FILE}.bak" > /dev/null; then
  echo "Fixed transition properties"
else
  echo "No transition changes needed"
fi

# Remove backup
rm "${FILE}.bak"

echo "Process completed!"

exit 0

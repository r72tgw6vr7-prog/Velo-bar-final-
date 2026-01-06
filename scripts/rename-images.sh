#!/bin/bash

# Function to rename files to lowercase and replace spaces with hyphens
rename_files() {
  find "$1" -type f -name "*" | while read -r file; do
    # Get directory and filename
    dir=$(dirname "$file")
    filename=$(basename "$file")
    
    # Convert to lowercase and replace spaces with hyphens
    newname=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    
    # Only rename if the name would change
    if [ "$filename" != "$newname" ]; then
      echo "Renaming: $file -> $dir/$newname"
      mv -n "$file" "$dir/$newname"
    fi
  done

  # Rename directories
  find "$1" -type d -name "*" | sort -r | while read -r dir; do
    # Skip the root directory
    [ "$dir" = "$1" ] && continue
    
    # Get parent directory and directory name
    parent=$(dirname "$dir")
    dirname=$(basename "$dir")
    
    # Convert to lowercase and replace spaces with hyphens
    newname=$(echo "$dirname" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    
    # Only rename if the name would change
    if [ "$dirname" != "$newname" ]; then
      echo "Renaming directory: $dir -> $parent/$newname"
      mv -n "$dir" "$parent/$newname"
    fi
  done
}

# Process images directory
IMAGES_DIR="/Users/yos/Downloads/Medusa-Web/public/images"

# Rename files in artists directory
rename_files "${IMAGES_DIR}/artists"

# Rename studio images
for file in "${IMAGES_DIR}"/Studio_*.jpg; do
  if [ -e "$file" ]; then
    base=$(basename "$file")
    num=$(echo "$base" | grep -o '[0-9]\+')
    newname="${IMAGES_DIR}/studio-interior-${num}.jpg"
    echo "Renaming: $file -> $newname"
    mv -n "$file" "$newname"
  fi
done

echo "Image renaming complete!"

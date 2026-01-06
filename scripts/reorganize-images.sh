#!/bin/bash

# Migration script for organizing image structure
# Generated: November 4, 2025

echo "Starting image reorganization..."

# Create new directory structure
mkdir -p public/images/{gallery/{tattoos/{debi,loui,luz,legacy},piercings,other},artists/headshots,backgrounds,placeholders,icons}

# 1. Move artist headshots
echo "Moving artist headshots..."
mv public/images/artists/team-bio/headshots/*.webp public/images/artists/headshots/

# 2. Move background images
echo "Moving background images..."
mv public/images/piercing-card-bg*.webp public/images/backgrounds/
mv public/images/tattoo-card-bg*.webp public/images/backgrounds/
mv public/images/process-timeline-bg*.webp public/images/backgrounds/

# 3. Move placeholder images
echo "Moving placeholder images..."
mv public/images/placeholder*.webp public/images/placeholders/
mv public/images/placeholder.svg public/images/placeholders/

# 4. Move icons
echo "Moving icons..."
mv public/images/icons/*.{svg,png} public/images/icons/
mv public/images/hero/icons/*.svg public/images/icons/

# 5. Move gallery images (with lowercase conversion)
echo "Moving gallery images..."

# Tattoo images
for artist in Debi Loui Luz; do
  lc_artist=$(echo $artist | tr '[:upper:]' '[:lower:]')
  mv "public/images/gallery/tattoos/$artist/"* "public/images/gallery/tattoos/$lc_artist/"
done

# Piercing images
mv public/images/gallery/piercings/Medusa/* public/images/gallery/piercings/
rmdir public/images/gallery/piercings/Medusa

# Legacy images (if any found in root gallery)
mv public/images/gallery/*.{jpg,webp} public/images/gallery/tattoos/legacy/ 2>/dev/null || true

# 6. Clean up empty directories
echo "Cleaning up empty directories..."
find public/images -type d -empty -delete

echo "Image reorganization complete!"
#!/bin/bash

# Create required directories
mkdir -p public/icons
mkdir -p public/images/footer
mkdir -p public/images/hero/icons

# Remove unused assets
rm -f footer\ svg/Icon_{7,8,9}.svg
rm -f dist/images/placeholder.svg
rm -f public/images/hero-icons/Container_*.svg

# Rename and optimize footer icons
for i in {1..12}; do
  if [ -f "footer svg/Icon_${i}.svg" ]; then
    case $i in
      1) newname="address";;
      2) newname="hours";;
      3) newname="phone";;
      4) newname="email";;
      5) newname="link";;
      6) newname="rating";;
      10) newname="instagram";;
      11) newname="facebook";;
      12) newname="google";;
      *) continue;;
    esac
    npx svgo -i "footer svg/Icon_${i}.svg" -o "public/images/footer/${newname}.svg"
  fi
done

# Rename and optimize hero icons
for i in {1..8}; do
  if [ -f "public/images/hero/Container_${i}.svg" ]; then
    npx svgo -i "public/images/hero/Container_${i}.svg" -o "public/images/hero/icons/icon-${i}.svg"
  fi
done

# Convert hero artwork to WebP
if [ -f "public/images/hero/Medusa_tattoo_artwork.png" ]; then
  # Standard version
  cwebp -q 85 "public/images/hero/Medusa_tattoo_artwork.png" -o "public/images/hero/artwork.webp"
  
  # @2x version (assuming original is high resolution)
  convert "public/images/hero/Medusa_tattoo_artwork.png" -resize 200% "public/images/hero/artwork@2x.png"
  cwebp -q 85 "public/images/hero/artwork@2x.png" -o "public/images/hero/artwork@2x.webp"
  rm "public/images/hero/artwork@2x.png"
fi

# Generate PWA icons
convert -size 32x32 xc:#222222 -fill "#D4AF37" -font "Helvetica-Bold" -pointsize 24 -gravity center -draw "text 0,0 'M'" "public/icons/favicon-32x32.png"
convert -size 16x16 xc:#222222 -fill "#D4AF37" -font "Helvetica-Bold" -pointsize 12 -gravity center -draw "text 0,0 'M'" "public/icons/favicon-16x16.png"
convert "public/icons/favicon-32x32.png" "public/icons/favicon-16x16.png" "public/icons/favicon.ico"

convert -size 144x144 xc:#222222 -fill "#D4AF37" -font "Helvetica-Bold" -pointsize 100 -gravity center -draw "text 0,0 'M'" "public/icons/icon-144x144.png"
convert -size 192x192 xc:#222222 -fill "#D4AF37" -font "Helvetica-Bold" -pointsize 140 -gravity center -draw "text 0,0 'M'" "public/icons/icon-192x192.png"

echo "Asset optimization complete!"

#!/bin/bash

# Configuration
STUDIO_IMAGES_DIR="website-core-assets/studio"
PUBLIC_IMAGES_DIR="public/images"
TEMP_DIR="temp-images"

# Create necessary directories
mkdir -p "$STUDIO_IMAGES_DIR"
mkdir -p "$PUBLIC_IMAGES_DIR"
mkdir -p "$TEMP_DIR"

# Function to optimize images
optimize_image() {
    local input=$1
    local output=$2
    local size=$3
    
    # Create WebP version
    convert "$input" -resize "$size" -quality 85 -strip "$output.webp"
    # Create JPG version
    convert "$input" -resize "$size" -quality 85 -strip "$output.jpg"
}

# Process studio images
process_studio_images() {
    echo "Processing studio images..."
    
    for img in "$STUDIO_IMAGES_DIR"/*; do
        if [[ -f "$img" ]]; then
            filename=$(basename "$img")
            name="${filename%.*}"
            
            # Generate different sizes
            optimize_image "$img" "$PUBLIC_IMAGES_DIR/studio-${name}" "1920x"
            optimize_image "$img" "$PUBLIC_IMAGES_DIR/studio-${name}-mobile" "800x"
        fi
    done
}

# Main execution
echo "🖼️ Image Management Script"
echo "========================="

if [ "$1" == "--process-studio" ]; then
    process_studio_images
    echo "[OK] Studio images processed"
elif [ "$1" == "--help" ]; then
    echo "Usage:"
    echo "  --process-studio : Process studio images"
    echo "  --help          : Show this help"
else
    echo "Please specify an action. Use --help for usage information."
fi
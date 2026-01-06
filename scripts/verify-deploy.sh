#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to check if required assets exist
check_assets() {
    local missing=0
    
    echo "Checking required assets..."
    
    # Check studio images
    for i in {1..3}; do
        if [ ! -f "public/images/studio-interior-$i.jpg" ]; then
            echo -e "${RED}[ERROR] Missing: studio-interior-$i.jpg${NC}"
            missing=$((missing + 1))
        fi
    done
    
    if [ $missing -eq 0 ]; then
        echo -e "${GREEN}[OK] All required assets present${NC}"
        return 0
    else
        echo -e "${RED}[ERROR] Missing $missing required assets${NC}"
        return 1
    fi
}

# Function to verify build
verify_build() {
    echo "Verifying build..."
    
    # Check if dist directory exists
    if [ ! -d "dist" ]; then
        echo -e "${RED}[ERROR] dist directory not found${NC}"
        return 1
    fi
    
    # Check if main bundle exists
    if [ ! -f "dist/index.html" ]; then
        echo -e "${RED}[ERROR] index.html not found in dist${NC}"
        return 1
    fi
    
    echo -e "${GREEN}[OK] Build verification passed${NC}"
    return 0
}

# Main execution
echo "[START] Deployment Verification"
echo "========================"

check_assets
assets_status=$?

verify_build
build_status=$?

if [ $assets_status -eq 0 ] && [ $build_status -eq 0 ]; then
    echo -e "\n${GREEN}[OK] All checks passed - Ready for deployment${NC}"
    exit 0
else
    echo -e "\n${RED}[ERROR] Verification failed - Please fix issues before deploying${NC}"
    exit 1
fi
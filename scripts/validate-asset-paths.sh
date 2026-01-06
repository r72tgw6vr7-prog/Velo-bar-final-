#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Scanning for asset references...${NC}"

# Old paths to search for
declare -a OLD_PATHS=(
  "footer svg/Icon.svg"
  "footer svg/Icon_2.svg"
  "footer svg/Icon_3.svg"
  "footer svg/Icon_4.svg"
  "footer svg/Icon_5.svg"
  "footer svg/Icon_6.svg"
  "footer svg/Icon_10.svg"
  "footer svg/Icon_11.svg"
  "footer svg/Icon_12.svg"
  "images/hero/Container.svg"
  "images/hero/Container_2.svg"
  "images/hero/Container_3.svg"
  "images/hero/Container_4.svg"
  "images/hero/Container_5.svg"
  "images/hero/Container_6.svg"
  "images/hero/Container_7.svg"
  "images/hero/Container_8.svg"
  "images/hero/Medusa_tattoo_artwork.png"
)

# New paths that should exist
declare -a REQUIRED_PATHS=(
  "public/images/footer/address.svg"
  "public/images/footer/hours.svg"
  "public/images/footer/phone.svg"
  "public/images/footer/email.svg"
  "public/images/footer/link.svg"
  "public/images/footer/rating.svg"
  "public/images/footer/instagram.svg"
  "public/images/footer/facebook.svg"
  "public/images/footer/google.svg"
  "public/images/hero/icons/icon-1.svg"
  "public/images/hero/icons/icon-2.svg"
  "public/images/hero/icons/icon-3.svg"
  "public/images/hero/icons/icon-4.svg"
  "public/images/hero/icons/icon-5.svg"
  "public/images/hero/icons/icon-6.svg"
  "public/images/hero/icons/icon-7.svg"
  "public/images/hero/icons/icon-8.svg"
  "public/images/hero/artwork.webp"
  "public/icons/favicon.ico"
  "public/icons/icon-144x144.png"
  "public/icons/icon-192x192.png"
)

# Find files containing old paths
echo -e "\n${YELLOW}Checking for old asset paths...${NC}"
found_old_paths=false

for path in "${OLD_PATHS[@]}"; do
  files=$(grep -r "$path" src/ components/ --include="*.tsx" --include="*.ts" --include="*.css")
  if [ ! -z "$files" ]; then
    echo -e "${RED}Found old path '$path' in:${NC}"
    echo "$files"
    found_old_paths=true
  fi
done

# Verify required paths exist
echo -e "\n${YELLOW}Verifying required assets...${NC}"
missing_paths=false

for path in "${REQUIRED_PATHS[@]}"; do
  if [ ! -f "$path" ]; then
    echo -e "${RED}Missing required asset: $path${NC}"
    missing_paths=true
  fi
done

# Check for incorrect asset paths in components
echo -e "\n${YELLOW}Checking for incorrect asset paths...${NC}"
incorrect_paths=false

find src/ components/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec grep -l "src=\".*\.(svg|png|webp)\"" {} \; | while read -r file; do
  if grep -q "src=\"[^@/]" "$file"; then
    echo -e "${RED}Found relative path in $file${NC}"
    incorrect_paths=true
  fi
done

# Summary
echo -e "\n${YELLOW}Asset Path Validation Summary:${NC}"
if [ "$found_old_paths" = true ]; then
  echo -e "${RED}[FAIL] Old paths found - needs migration${NC}"
else
  echo -e "${GREEN}[OK] No old paths found${NC}"
fi

if [ "$missing_paths" = true ]; then
  echo -e "${RED}[FAIL] Missing required assets${NC}"
else
  echo -e "${GREEN}[OK] All required assets present${NC}"
fi

if [ "$incorrect_paths" = true ]; then
  echo -e "${RED}[FAIL] Incorrect relative paths found${NC}"
else
  echo -e "${GREEN}[OK] All asset paths are correct${NC}"
fi

# Exit with error if any issues found
if [ "$found_old_paths" = true ] || [ "$missing_paths" = true ] || [ "$incorrect_paths" = true ]; then
  exit 1
fi

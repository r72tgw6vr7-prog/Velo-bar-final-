#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting asset path migration...${NC}"

# Asset path mappings
declare -A path_mappings=(
  ["/footer svg/Icon.svg"]="/images/footer/address.svg"
  ["/footer svg/Icon_2.svg"]="/images/footer/hours.svg"
  ["/footer svg/Icon_3.svg"]="/images/footer/phone.svg"
  ["/footer svg/Icon_4.svg"]="/images/footer/email.svg"
  ["/footer svg/Icon_5.svg"]="/images/footer/link.svg"
  ["/footer svg/Icon_6.svg"]="/images/footer/rating.svg"
  ["/footer svg/Icon_10.svg"]="/images/footer/instagram.svg"
  ["/footer svg/Icon_11.svg"]="/images/footer/facebook.svg"
  ["/footer svg/Icon_12.svg"]="/images/footer/google.svg"
  ["/images/hero/Container.svg"]="/images/hero/icons/icon-1.svg"
  ["/images/hero/Container_2.svg"]="/images/hero/icons/icon-2.svg"
  ["/images/hero/Container_3.svg"]="/images/hero/icons/icon-3.svg"
  ["/images/hero/Container_4.svg"]="/images/hero/icons/icon-4.svg"
  ["/images/hero/Container_5.svg"]="/images/hero/icons/icon-5.svg"
  ["/images/hero/Container_6.svg"]="/images/hero/icons/icon-6.svg"
  ["/images/hero/Container_7.svg"]="/images/hero/icons/icon-7.svg"
  ["/images/hero/Container_8.svg"]="/images/hero/icons/icon-8.svg"
  ["/images/hero/Medusa_tattoo_artwork.png"]="/images/hero/artwork.webp"
)

# Function to check if a file contains any of the old paths
check_file() {
  local file=$1
  local found=0
  for old_path in "${!path_mappings[@]}"; do
    if grep -q "$old_path" "$file"; then
      found=1
      break
    fi
  done
  return $found
}

# Find all TypeScript/TSX files
files=$(find src/ components/ -type f \( -name "*.tsx" -o -name "*.ts" \))

# Counter for modified files
modified_count=0
error_count=0

# Process each file
for file in $files; do
  if check_file "$file"; then
    echo -e "${YELLOW}Processing: $file${NC}"
    
    # Create backup
    cp "$file" "${file}.bak"
    
    # Apply all replacements
    for old_path in "${!path_mappings[@]}"; do
      new_path=${path_mappings[$old_path]}
      
      # Replace in src attributes
      sed -i '' "s|src=\"${old_path}\"|src=\"${new_path}\"|g" "$file"
      
      # Replace in import statements
      sed -i '' "s|from '${old_path}'|from '${new_path}'|g" "$file"
      sed -i '' "s|import '${old_path}'|import '${new_path}'|g" "$file"
      
      if [ $? -eq 0 ]; then
        echo -e "${GREEN}  [OK] Replaced: $old_path → $new_path${NC}"
        ((modified_count++))
      else
        echo -e "${RED}  [FAIL] Failed to replace: $old_path${NC}"
        ((error_count++))
        # Restore from backup on error
        mv "${file}.bak" "$file"
        continue 2
      fi
    done
    
    # Remove backup if successful
    rm "${file}.bak"
  fi
done

echo -e "\n${GREEN}Migration complete!${NC}"
echo -e "Modified files: $modified_count"
echo -e "Errors: $error_count"

# Verify all assets exist
echo -e "\n${YELLOW}Verifying asset paths...${NC}"
missing_count=0

for new_path in "${path_mappings[@]}"; do
  if [ ! -f "public$new_path" ]; then
    echo -e "${RED}Missing asset: public$new_path${NC}"
    ((missing_count++))
  fi
done

if [ $missing_count -eq 0 ]; then
  echo -e "${GREEN}[OK] All assets verified${NC}"
else
  echo -e "${RED}[FAIL] Missing $missing_count assets${NC}"
fi

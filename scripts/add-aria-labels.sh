#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Adding aria-labels to buttons...${NC}"

# Function to extract text content from button
extract_button_text() {
  local file=$1
  local line_number=$2
  local button_line=$3
  
  # Try to find text content in the button
  if [[ $button_line =~ \>([^<]+)\< ]]; then
    echo "${BASH_REMATCH[1]}"
  else
    # Look for children text content
    local next_line
    local content=""
    local depth=1
    local current_line=$((line_number + 1))
    
    while IFS= read -r next_line; do
      if [[ $next_line =~ \<button ]]; then
        ((depth++))
      elif [[ $next_line =~ \</button\> ]]; then
        ((depth--))
        if [ $depth -eq 0 ]; then
          break
        fi
      elif [ $depth -eq 1 ] && [[ $next_line =~ \>([^<]+)\< ]]; then
        content="${BASH_REMATCH[1]}"
        break
      fi
      ((current_line++))
    done < <(tail -n +$((line_number + 1)) "$file")
    
    echo "$content"
  fi
}

# Process each TypeScript/TSX file
find src/ components/ -type f -name "*.tsx" | while read -r file; do
  echo -e "\nProcessing $file..."
  
  # Create a temporary file
  temp_file=$(mktemp)
  
  # Process the file line by line
  line_number=1
  while IFS= read -r line; do
    # Check if line contains a button without aria-label
    if [[ $line =~ \<button && ! $line =~ aria-label ]]; then
      # Extract button text content
      button_text=$(extract_button_text "$file" "$line_number" "$line")
      
      if [ -n "$button_text" ]; then
        # Clean up the text
        button_text=$(echo "$button_text" | xargs)
        
        # Add aria-label attribute
        if [[ $line =~ ^([[:space:]]*)\<button ]]; then
          indent="${BASH_REMATCH[1]}"
          if [[ $line =~ style=\{[^\}]+\} ]]; then
            # Add aria-label before style
            line=$(echo "$line" | sed "s/style=/aria-label=\"$button_text\" style=/")
          else
            # Add aria-label after <button
            line=$(echo "$line" | sed "s/<button/<button aria-label=\"$button_text\"/")
          fi
          echo -e "${GREEN}Added aria-label=\"$button_text\"${NC}"
        fi
      else
        echo -e "${RED}Could not extract text content for button${NC}"
      fi
    fi
    
    # Write the line to temp file
    echo "$line" >> "$temp_file"
    ((line_number++))
  done < "$file"
  
  # Replace original file with temp file
  mv "$temp_file" "$file"
done

echo -e "\n${GREEN}Finished adding aria-labels to buttons${NC}"

#!/bin/bash

# Remove console.log statements from production components
find /Users/yos/Downloads/Medusa-Web /components -type f -name "*.tsx" -exec sed -i '' -e '/console\.log(/d' {} \;

echo "Removed console.log statements from production components"

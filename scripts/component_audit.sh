#!/usr/bin/env bash
set -euo

# Component audit script for Velo Bar V2
# Read-only on the repo, writes analysis artifacts under /tmp/velo_component_audit

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

TMP_BASE="/tmp/velo_component_audit"
mkdir -p "$TMP_BASE"

ALL_COMPONENTS="$TMP_BASE/all_components.txt"
INVENTORY="$TMP_BASE/component_inventory.txt"
USAGE_RAW="$TMP_BASE/component_usage_raw.txt"
USAGE="$TMP_BASE/component_usage.txt"
ORPHANS="$TMP_BASE/orphaned_components.txt"
GENERIC="$TMP_BASE/generic_components.txt"
NON_B2B="$TMP_BASE/non_b2b_components.txt"
BUSINESS="$TMP_BASE/business_components.txt"
DUPLICATE_NAMES="$TMP_BASE/duplicate_names.txt"
ORPHANED_SIZE="$TMP_BASE/orphaned_size.txt"
GENERIC_SIZE="$TMP_BASE/generic_size.txt"
NON_B2B_SIZE="$TMP_BASE/non_b2b_size.txt"
TOTAL_DELETABLE="$TMP_BASE/total_deletable_size.txt"

echo "=== COMPONENT FILE DISCOVERY ==="
find src -type f \( -name "*.tsx" -o -name "*.jsx" \) \
  ! -name "*.test.tsx" \
  ! -name "*.test.jsx" \
  ! -name "*.stories.tsx" \
  ! -path "*/node_modules/*" \
  | sort > "$ALL_COMPONENTS"

TOTAL_COMPONENTS=$(wc -l < "$ALL_COMPONENTS")
echo "Total components found: $TOTAL_COMPONENTS"

echo "=== COMPONENTS BY CATEGORY ==="
if [ -d src/components/atoms ]; then
  ATOMS=$(find src/components/atoms -name "*.tsx" ! -name "*.test.tsx" | wc -l)
else
  ATOMS=0
fi
if [ -d src/components/molecules ]; then
  MOLECULES=$(find src/components/molecules -name "*.tsx" ! -name "*.test.tsx" | wc -l)
else
  MOLECULES=0
fi
if [ -d src/components/organisms ]; then
  ORGANISMS=$(find src/components/organisms -name "*.tsx" ! -name "*.test.tsx" | wc -l)
else
  ORGANISMS=0
fi
if [ -d src/components/templates ]; then
  TEMPLATES=$(find src/components/templates -name "*.tsx" ! -name "*.test.tsx" | wc -l)
else
  TEMPLATES=0
fi
if [ -d src/pages ]; then
  PAGES=$(find src/pages -name "*.tsx" ! -name "*.test.tsx" | wc -l)
else
  PAGES=0
fi
if [ -d src/sections ]; then
  SECTIONS=$(find src/sections -name "*.tsx" ! -name "*.test.tsx" | wc -l)
else
  SECTIONS=0
fi
OTHER=$(find src -name "*.tsx" ! -name "*.test.tsx" ! -path "*/components/*" ! -path "*/pages/*" ! -path "*/sections/*" | wc -l)

echo "Atoms: $ATOMS"
echo "Molecules: $MOLECULES"
echo "Organisms: $ORGANISMS"
echo "Templates: $TEMPLATES"
echo "Pages: $PAGES"
echo "Sections: $SECTIONS"
echo "Other: $OTHER"

echo "=== COMPONENT INVENTORY WITH METADATA ==="
: > "$INVENTORY"
while IFS= read -r file; do
  base="$(basename "$file")"
  name="${base%.*}"
  size_bytes=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
  size_kb=$(( (size_bytes + 1023) / 1024 ))
  lines=$(wc -l < "$file")
  modified=$(stat -f "%Sm" -t "%Y-%m-%d" "$file" 2>/dev/null || stat -c "%y" "$file" 2>/dev/null | cut -d' ' -f1)
  printf "%s|%s|%dKB|%d|%s\n" "$name" "$file" "$size_kb" "$lines" "$modified" >> "$INVENTORY"
done < "$ALL_COMPONENTS"

column -t -s"|" "$INVENTORY" | head -30

echo "=== COMPONENT PURPOSE EXTRACTION (SAMPLE) ==="
count=0
while IFS= read -r file && [ "$count" -lt 20 ]; do
  base="$(basename "$file")"
  name="${base%.*}"
  purpose=$(head -20 "$file" | grep -E "^/\*\*|^ \*|^//.*Component" | head -3 | sed 's:^[/* ]*::')
  if [ -z "$purpose" ]; then
    purpose=$(head -5 "$file" | grep -E "export (default )?(function|const|class)" | head -1)
  fi
  echo "$name: $purpose"
  count=$((count + 1))
done < "$ALL_COMPONENTS"

echo "=== IMPORT FREQUENCY ANALYSIS ==="
: > "$USAGE_RAW"
while IFS= read -r file; do
  base="$(basename "$file")"
  name="${base%.*}"
  import_count=$(grep -R "^import .*${name}" src --include="*.tsx" --include="*.ts" --exclude-dir="__tests__" --exclude-dir="node_modules" --exclude="*.test.tsx" --exclude="*.test.ts" 2>/dev/null | wc -l)
  from_count=$(grep -R "from .*${name}" src --include="*.tsx" --include="*.ts" --exclude-dir="__tests__" --exclude-dir="node_modules" --exclude="*.test.tsx" --exclude="*.test.ts" 2>/dev/null | wc -l)
  total=$((import_count + from_count))
  printf "%s|%d|%s\n" "$name" "$total" "$file" >> "$USAGE_RAW"
done < "$ALL_COMPONENTS"

sort -t"|" -k2 -n "$USAGE_RAW" | column -t -s"|" > "$USAGE"
awk '$2 == 0' "$USAGE" > "$ORPHANS"

echo "=== GENERIC TEMPLATE PATTERNS ==="
grep -E "(Example|Demo|Test|Sample|Placeholder|Template|Starter|Boiler|Clean|clean)" "$ALL_COMPONENTS" | tee "$GENERIC" || true

echo "=== NON-B2B COMPONENTS ==="
grep -iE "(Blog|Post|Article|CMS|Cart|Checkout|Shop|Product|Auth|Login|Register|Portfolio|CaseStudy|Pricing)" "$ALL_COMPONENTS" | tee "$NON_B2B" || true

echo "=== VELO BAR BUSINESS COMPONENTS ==="
grep -iE "(Booking|Event|Cocktail|Drink|Bar|Service|Venue|Menu|Gallery|Testimonial|Quote|Inquiry|Corporate|Firmenfeiern|Weihnachts|Messe)" "$ALL_COMPONENTS" | tee "$BUSINESS" || true

# Duplicate names
cat "$ALL_COMPONENTS" | xargs -I {} basename {} .tsx | sort | uniq -d > "$DUPLICATE_NAMES" || true

echo "=== SIZE ANALYSIS (BYTES) ==="
# Orphaned size
if [ -s "$ORPHANS" ]; then
  total_orphaned_size=0
  while IFS= read -r line; do
    file=$(echo "$line" | awk '{print $3}')
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
    total_orphaned_size=$((total_orphaned_size + size))
  done < "$ORPHANS"
  echo "$total_orphaned_size" > "$ORPHANED_SIZE"
else
  echo 0 > "$ORPHANED_SIZE"
fi

# Generic template size
if [ -s "$GENERIC" ]; then
  total_generic_size=0
  while IFS= read -r file; do
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
    total_generic_size=$((total_generic_size + size))
  done < "$GENERIC"
  echo "$total_generic_size" > "$GENERIC_SIZE"
else
  echo 0 > "$GENERIC_SIZE"
fi

# Non-B2B size
if [ -s "$NON_B2B" ]; then
  total_non_b2b_size=0
  while IFS= read -r file; do
    size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
    total_non_b2b_size=$((total_non_b2b_size + size))
  done < "$NON_B2B"
  echo "$total_non_b2b_size" > "$NON_B2B_SIZE"
else
  echo 0 > "$NON_B2B_SIZE"
fi

orphaned=$(cat "$ORPHANED_SIZE")
generic=$(cat "$GENERIC_SIZE")
nonb2b=$(cat "$NON_B2B_SIZE")

total_deletable=$((orphaned + generic + nonb2b))
echo "$total_deletable" > "$TOTAL_DELETABLE"

echo "Total orphaned size (bytes): $orphaned"
echo "Total generic template size (bytes): $generic"
echo "Total non-B2B size (bytes): $nonb2b"
echo "Total deletable size (bytes): $total_deletable"

echo "Analysis artifacts written under $TMP_BASE"

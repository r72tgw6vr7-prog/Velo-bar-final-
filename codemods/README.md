# Automated Refactoring Codemods

**Purpose**: Systematic transformation of legacy code patterns to design-system-compliant primitives.

---

## Available Transforms

### 1. `transform-cards.js` - Card Primitive Migration

**What it does**:

- Finds div-based cards (with `rounded`, `border`, `shadow`, `bg-` classes)
- Verifies they're inside a grid layout
- Converts to slot-based `<Card>` primitive
- Categorizes content into Header/Body/Footer slots
- Adds Card import automatically
- Preserves all existing content

**Dry Run (Preview Changes)**:

```bash
npx jscodeshift -t codemods/transform-cards.js --dry --print src/components/TeamGrid.tsx
```

**Run on Single File**:

```bash
npx jscodeshift -t codemods/transform-cards.js src/components/TeamGrid.tsx
```

**Run on Directory**:

```bash
npx jscodeshift -t codemods/transform-cards.js src/components/**/*.tsx
```

**Run on Entire Codebase**:

```bash
npx jscodeshift -t codemods/transform-cards.js src/**/*.tsx
```

---

## Installation

If `jscodeshift` is not installed:

```bash
npm install -g jscodeshift
```

Or use via `npx` (no install needed):

```bash
npx jscodeshift -t codemods/transform-cards.js [files]
```

---

## Transform Logic

### Input Pattern (Detected)

```tsx
// ❌ OLD: div-based card in grid
<div className='grid grid-cols-3 gap-24'>
  <div className='rounded-lg border bg-[#1A1A1A] p-24 shadow-lg'>
    <h3 className='text-24 text-[#D4AF37]'>Title</h3>
    <p className='text-white/80'>Description text here</p>
    <button className='bg-[#D4AF37]'>Click Me</button>
  </div>
</div>
```

### Output Pattern (Generated)

```tsx
// ✅ NEW: Card primitive with slots
import { Card } from '@/components/primitives/Card';

<div className='grid grid-cols-3 gap-24'>
  <Card variant='elevated' hover={true}>
    <Card.Header>
      <h3 className='text-24 text-[#D4AF37]'>Title</h3>
    </Card.Header>
    <Card.Body>
      <p className='text-white/80'>Description text here</p>
    </Card.Body>
    <Card.Footer>
      <button className='bg-[#D4AF37]'>Click Me</button>
    </Card.Footer>
  </Card>
</div>;
```

---

## Content Categorization Heuristics

The transform uses intelligent heuristics to categorize content:

### Header Slot

- `<h1>` through `<h6>` elements at the start
- `<img>` elements at the start
- First 1-2 elements typically

### Body Slot

- Paragraphs (`<p>`)
- Lists (`<ul>`, `<ol>`)
- General content between header and footer
- Everything that's not header or footer

### Footer Slot

- `<button>` elements at the end
- `<a>` or `<Link>` elements at the end
- Last 1-2 interactive elements

---

## Variant Detection

The transform automatically selects the correct Card variant:

| Original Classes               | Detected Variant |
| ------------------------------ | ---------------- |
| `shadow-lg`, `shadow-xl`       | `elevated`       |
| `border-2`, `border-[#D4AF37]` | `outlined`       |
| `backdrop-blur`                | `glass`          |
| Default                        | `default`        |

---

## Safety Features

### Skip Conditions

The transform **will NOT** modify divs if:

1. ❌ No card-like classes detected
2. ❌ Not inside a grid parent
3. ❌ Already has `flex flex-col h-full` (already fixed)
4. ❌ No meaningful content to migrate

### Preserves

- ✅ All existing content and structure
- ✅ All text nodes
- ✅ All JSX expressions
- ✅ Original semantic HTML elements

---

## Recommended Workflow

### Step 1: Dry Run (Safe Preview)

```bash
npx jscodeshift -t codemods/transform-cards.js --dry --print src/components/TeamGrid.tsx
```

Review the output carefully. Make sure transformations look correct.

### Step 2: Test on Single File

```bash
npx jscodeshift -t codemods/transform-cards.js src/components/TeamGrid.tsx
```

### Step 3: Verify Changes

- Check the file in your editor
- Run linter: `npm run lint -- src/components/TeamGrid.tsx`
- Test in browser

### Step 4: Commit Single File

```bash
git add src/components/TeamGrid.tsx
git commit -m "refactor(TeamGrid): migrate to Card primitive via codemod"
```

### Step 5: Expand to Directory

```bash
npx jscodeshift -t codemods/transform-cards.js src/components/**/*.tsx
```

### Step 6: Full Codebase (When Confident)

```bash
npx jscodeshift -t codemods/transform-cards.js src/**/*.tsx
```

---

## Expected Results

### Before Transform

- 786 card layout violations
- Inconsistent card patterns
- Manual refactoring required

### After Transform

- ✅ Standardized Card primitive usage
- ✅ Automatic `flex flex-col h-full` layout
- ✅ Equal-height cards in grids
- ✅ Enforcer-compliant code

---

## Troubleshooting

### Transform Doesn't Run

```bash
# Make sure jscodeshift is installed
npm install -g jscodeshift

# Or use npx
npx jscodeshift --version
```

### No Changes Made

- Check if divs actually have card-like classes
- Verify divs are inside a grid parent
- Use `--dry --print` to see what would change

### Unexpected Output

- Review the dry run first
- Transform one file at a time initially
- Check the categorization heuristics in the script

### Import Path Issues

The transform uses `@/components/primitives/Card`. If your project uses a different alias:

- Edit `transform-cards.js` line ~233
- Change import path to match your setup

---

## Statistics

Running the transform on the full codebase should:

- Process: ~214 source files
- Transform: ~50-100 card-like divs
- Fix: ~786 card layout violations
- Time: ~10-30 seconds

---

## Next Steps After Transform

1. **Run Linter**:

   ```bash
   npm run lint
   ```

2. **Auto-Fix Remaining Issues**:

   ```bash
   npm run lint:fix
   ```

3. **Test Visual Output**:
   - Check all transformed pages in browser
   - Verify equal-height cards
   - Test responsive behavior

4. **Commit Changes**:
   ```bash
   git add .
   git commit -m "refactor: migrate card patterns to Card primitive (automated)"
   ```

---

**Created**: October 25, 2025  
**Transform Target**: 786 card layout violations  
**Expected Fix Rate**: ~90-95% automated

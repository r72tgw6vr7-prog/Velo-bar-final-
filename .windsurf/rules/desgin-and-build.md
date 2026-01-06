---
trigger: manual
---

## 🚨 **RULES FOR CSS REFACTORING - NO EXCEPTIONS**

### **RULE 1: BEFORE CREATING ANYTHING, SCAN FIRST**

```
BEFORE you write any CSS, create any file, or make any change:
1. Search the ENTIRE project for existing files with similar purpose
   - grep -r "container" src/
   - grep -r "section" src/
   - grep -r "spacing" src/
   - grep -r the filename you want to create
2. If a file with that purpose exists → USE IT, DON'T CREATE A NEW ONE
3. If it exists but has wrong values → FIX IT IN PLACE, DON'T DUPLICATE
4. Only create NEW if nothing similar exists
5. REPORT what you found before making changes
```

### **RULE 2: ONE FILE PER PURPOSE - NO DUPLICATES**

```
❌ DO NOT have:
- design-system.css AND variables.css AND system.css
- globals.css AND global.css AND base.css
- responsive-layout.css AND responsive-breakpoints.css
- spacing-system.css AND utility-classes.css (both doing same thing)

✅ HAVE ONLY:
- ONE design-system.css (colors, fonts, spacing, radii, shadows as variables)
- ONE base.css or typography.css (element resets and defaults)
- ONE utility-classes.css (helper classes)
- ONE responsive-layout.css (container, grid, section layouts)
- Component modules (each component has its own .module.css)

If you find duplicates:
  1. Check which one is imported
  2. Merge the best of both into the active one
  3. DELETE the duplicate
  4. Update imports if needed
  5. REPORT: "Found duplicate X and Y, merged into X, deleted Y"
```

### **RULE 3: ALL VALUES MUST USE VARIABLES**

```
❌ DO NOT write:
  color: #d4af37;
  padding: 16px;
  border-radius: 8px;

✅ DO write:
  color: var(--color-brand-gold);
  padding: var(--space-4);
  border-radius: var(--radius-md);

If a variable doesn't exist:
  1. ADD IT to design-system.css
  2. Then use it in the component CSS
  3. REPORT: "Added --new-variable to design-system.css"
```

### **RULE 4: CSS MUST BE IN THE RIGHT PLACE**

```
✅ Component styles → Component folder as .module.css
  /components/HeroSection/HeroSection.module.css
  /components/TeamGrid/TeamGrid.module.css
  /components/ServiceCards/ServiceCards.module.css

✅ Global variables → src/styles/design-system.css
✅ Global utilities → src/styles/utility-classes.css
✅ Typography defaults → src/styles/typography.css
✅ Responsive layouts → src/styles/responsive-layout.css

❌ DO NOT put component styles in /styles/ folder
❌ DO NOT put global styles in component folders
❌ DO NOT create random files anywhere
```

### **RULE 5: IMPORT CHAIN MUST BE EXACT**

```
main.tsx imports:
  1. './index.css'

index.css imports:
  1. @import 'tailwindcss/base'
  2. @import Google Fonts
  3. @import './styles/design-system.css'
  4. @import './styles/base.css'
  5. @import './styles/responsive-layout.css'
  6. @import './styles/utility-classes.css'

Components import their own .module.css:
  import styles from './ComponentName.module.css'

Order MATTERS. If you change import order:
  1. Test that layout doesn't break
  2. REPORT the change
  3. Only do it if absolutely necessary
```

### **RULE 6: NO GLOBAL RESETS IN MULTIPLE FILES**

```
❌ DO NOT have resets in:
- design-system.css AND base.css AND globals.css

✅ Resets ONLY in:
- base.css (one file only)
- OR keep them in design-system.css
- NOT BOTH

Global reset includes:
  * { margin: 0; padding: 0; }
  html { font-family: ... }
  body { ... }
  h1, h2, h3 { ... }
  a { ... }

If you see resets in multiple files:
  1. Pick ONE file to keep them
  2. DELETE them from other files
  3. REPORT: "Consolidated resets from X, Y, Z into base.css"
```

### **RULE 7: NO !important FLAGS**

```
❌ NEVER use:
  color: gold !important;

✅ If you're tempted to use !important:
  1. STOP
  2. Figure out WHY you need it
  3. Fix the root cause (specificity, class order, etc.)
  4. Use normal CSS
  5. REPORT: "Removed !important from X by fixing root cause"
```

### **RULE 8: NO CLASS NAME DUPLICATES**

```
❌ DO NOT have:
  .container defined in design-system.css AND globals.css AND responsive-layout.css
  .section defined in base.css AND spacing-system.css AND globals.css

✅ Each class name exists in ONLY ONE file

If you find the same class in multiple files:
  1. Compare what each one does
  2. Merge them into ONE file
  3. DELETE from other files
  4. Update imports
  5. REPORT: "Consolidated .container from 3 files into responsive-layout.css"
```

### **RULE 9: SCAN FOR ROUTING/IMPORT PROBLEMS**

```
After EVERY change:
  1. List ALL files you modified
  2. Check if they're imported/connected:
     - Is design-system.css imported? Check index.css
     - Is component CSS imported? Check component .tsx file
     - Are broken imports? grep for old filenames
  3. If a file is disconnected:
     - Add the import
     - REPORT: "Connected X.css to Y.tsx"
  4. Run dev server:
     npm run dev
     Check if changes appear instantly
  5. If changes don't appear:
     - STOP and debug
     - Don't continue until hot reload works
     - REPORT the problem
```

### **RULE 10: EVERY CHANGE MUST RESTART DEV SERVER**

```
After you make ANY CSS or structure change:
  1. Close dev server (Ctrl+C)
  2. Restart it (npm run dev)
  3. Wait for it to compile
  4. Open browser and verify changes appear
  5. Take a screenshot
  6. REPORT: "Restarted dev server, changes visible at [URL]"

DO NOT skip this step.
DO NOT assume changes will work without restarting.
```

### **RULE 11: REPORT EVERY CHANGE WITH FULL TRANSPARENCY**

```
After ANY modification, you MUST report:

Files modified:
  ✅ /path/to/file1.css (what changed)
  ✅ /path/to/file2.tsx (what changed)

Files deleted:
  ❌ /path/to/old-file.css (why deleted)

Files created:
  ✨ /path/to/new-file.css (why created)

Duplicates found and merged:
  🔗 Merged X and Y into Z

Variables added:
  📦 Added --new-var: value to design-system.css

Routing/imports updated:
  🔌 Connected new-file.css to component-file.tsx

Hot reload status:
  ✅ Changes visible in browser
  ⚠️ Changes NOT visible - debug needed

Screenshot/preview:
  📸 [Show what it looks like after change]
```

### **RULE 12: ASK BEFORE DELETING ANYTHING**

```
❌ DO NOT silently delete files

✅ Before deleting:
  1. REPORT: "Found duplicate file X.css doing same job as Y.css"
  2. ASK: "Should I delete X.css and keep Y.css?"
  3. Wait for approval
  4. Then delete and CONFIRM

Exception: Only auto-delete if:
  - File is in .backup folder
  - File name contains "old", "backup", "deprecated", "unused"
  - File is NOT imported anywhere
  - You confirmed with user first
```

### **RULE 13: NEVER TOUCH FILES YOU DON'T UNDERSTAND**

```
If you see a CSS file and you're not 100% sure:
  1. Don't modify it
  2. Don't delete it
  3. Ask the user: "What does X.css do? Should I touch it?"
  4. Wait for answer
  5. Then proceed

Exception: You can modify files if:
  - They're explicitly in the task
  - You've scanned the whole codebase first
  - You understand what it does
  - You've reported what you found
```

### **RULE 14: COMPONENT CSS MUST USE CSS MODULES**

```
✅ Component CSS files MUST be:
  ComponentName.module.css

✅ Imported in component as:
  import styles from './ComponentName.module.css'

✅ Used in component as:
  className={styles.componentClass}

❌ DO NOT use:
  global CSS classes in components
  Mixing Tailwind + CSS Modules in same component
  Component styles outside component folder
```

### **RULE 15: SCAN THE ENTIRE PROJECT EVERY TIME**

```
Before ANY change:
  1. grep -r "\.container" src/styles/ (find all container defs)
  2. grep -r "\.section" src/styles/ (find all section defs)
  3. grep -r "@import" src/styles/ (find import chain)
  4. grep -r "margin: 0" src/styles/ (find resets)
  5. Find if a file with that purpose exists
  6. REPORT findings to user
  7. Only then propose a change

This prevents 90% of duplicate chaos.
```

---

## 📋 **CHECKLIST FOR EVERY CHANGE**

Before committing any change, your copilot must verify:

```markdown
CHANGE VERIFICATION CHECKLIST

- [ ] Scanned entire project for duplicate/similar files
- [ ] No new files created without checking for existing ones
- [ ] All CSS values use variables from design-system.css
- [ ] CSS is in the right location (component folder or /styles/)
- [ ] No duplicate class definitions across files
- [ ] No !important flags used
- [ ] All resets are in ONE file only
- [ ] Component CSS uses .module.css format
- [ ] Import chain verified and updated
- [ ] Dev server restarted and changes visible
- [ ] All modified files listed
- [ ] All deleted files justified
- [ ] All new variables added to design-system.css
- [ ] Screenshot/preview taken
- [ ] Full transparency report provided
```

---

## 🎯 **THE PROMPT TO GIVE WINDSURF AI EVERY TIME**

```markdown
STRICT CSS MODIFICATION PROTOCOL

BEFORE making ANY change:

1. Run these scans:
   grep -r "\.container" src/
   grep -r "\.section" src/
   grep -r "@import" src/
   grep -r "margin: 0" src/
2. Report what you found
3. Ask: "Should I modify/delete/create this file?"
4. Wait for approval

WHILE making changes:

1. Use variables from design-system.css ONLY
2. Put CSS in the right place (component folder or /styles/)
3. Never use !important
4. Never create duplicate classes
5. Use CSS Modules for components
6. Update imports if needed

AFTER making changes:

1. Restart dev server (npm run dev)
2. Take a screenshot
3. Report:
   - Files modified (list each)
   - Files deleted (list each with reason)
   - Files created (list each with reason)
   - Variables added to design-system.css
   - Imports updated
   - Screenshot showing changes
4. Ask: "Does this look right?"
5. Wait for approval before moving forward

NEVER skip the scanning step.
NEVER create duplicates.
NEVER assume changes work without restarting.
NEVER use !important.
NEVER delete files silently.
```

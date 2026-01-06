# Developer Tooling Guide

This directory contains development tools and scripts to maintain code quality and analyze the project.

## 🛠️ Available Tools

### 1. Import Path Validator (`validate-imports.mjs`)

Validates that all imports follow project standards.

**Run:**

```bash
npm run validate:imports
```

**Checks:**

- ✅ No deep relative imports (more than 2 levels)
- ✅ Proper use of path aliases (@/)
- ✅ Import consistency

**Output:**

- Lists all violations with file locations
- Provides suggestions for fixes
- Exit code 1 if issues found (CI-friendly)

---

### 2. Bundle Size Analyzer (`analyze-bundle.mjs`)

Analyzes production build and reports bundle sizes.

**Run:**

```bash
npm run build
npm run analyze:bundle
```

**Provides:**

- Total bundle size
- Breakdown by file type (JS, CSS, images, etc.)
- Top 5 largest files per category
- JavaScript chunk analysis
- Recommendations for optimization

**Size Limits:**

- JavaScript: 500 KB
- CSS: 100 KB
- Total: 2 MB

---

### 3. Circular Dependency Detector (`detect-circular-deps.mjs`)

Detects circular dependencies in the codebase.

**Run:**

```bash
node scripts/detect-circular-deps.mjs
```

**Output:**

- Lists all circular dependency chains
- Shows full import paths
- Provides refactoring recommendations

---

### 4. Run All Analyses

Run all tools in sequence:

```bash
npm run analyze:all
```

---

## 📝 Test Utilities

### Test Helpers (`src/__tests__/utils/testHelpers.ts`)

Comprehensive testing utilities:

```typescript
import { renderWithProviders } from '@/__tests__/utils/testHelpers';

// Render with all providers (Router, Language, Accessibility)
renderWithProviders(<MyComponent />, { initialLanguage: 'DE' });

// Setup browser mocks
setupBrowserMocks();

// Mock image loading
const img = createMockImage(true);

// Type in input
await typeText(input, 'test text');

// Mock API response
const response = createMockApiResponse({ data: 'test' }, 200);
```

---

### Mock Data Fixtures (`src/__tests__/fixtures/mockData.ts`)

Reusable test data:

```typescript
import {
  mockArtist,
  mockArtists,
  mockGalleryImage,
  mockService,
  mockBookingFormData
} from '@/__tests__/fixtures/mockData';

// Use in tests
test('renders artist card', () => {
  renderWithProviders(<ArtistCard artist={mockArtist} />);
});
```

---

## 🎨 VS Code Snippets

**Location:** `.vscode/snippets.code-snippets`

### Available Snippets:

| Prefix               | Description             |
| -------------------- | ----------------------- |
| `rct-component`      | Basic React component   |
| `atom-component`     | Atomic component (Atom) |
| `molecule-component` | Molecule component      |
| `test-suite`         | Component test suite    |
| `hook-custom`        | Custom React hook       |
| `api-handler`        | Serverless API handler  |
| `page-component`     | Full page component     |
| `store-slice`        | Zustand store slice     |

**Usage in VS Code:**

1. Start typing the prefix
2. Press Tab to expand
3. Fill in the placeholders

---

## 🔧 Adding New Tools

### Template for New Script:

```javascript
#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// Your script logic here

function main() {
  console.log('🔍 Running analysis...');
  // ...
  process.exit(0);
}

main();
```

### Add to package.json:

```json
{
  "scripts": {
    "your-script": "node scripts/your-script.mjs"
  }
}
```

---

## 📊 CI/CD Integration

All tools are designed to work in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Validate Imports
  run: npm run validate:imports

- name: Check Bundle Size
  run: |
    npm run build
    npm run analyze:bundle

- name: Detect Circular Dependencies
  run: node scripts/detect-circular-deps.mjs
```

**Exit Codes:**

- `0` - Success, no issues
- `1` - Issues found, fail CI

---

## 🎯 Best Practices

1. **Run before commit:**

   ```bash
   npm run validate:imports
   ```

2. **Monitor bundle size:**

   ```bash
   npm run analyze:bundle
   ```

3. **Check for circular deps regularly:**

   ```bash
   node scripts/detect-circular-deps.mjs
   ```

4. **Use test helpers consistently:**
   - Always use `renderWithProviders` for component tests
   - Use mock data fixtures to avoid duplication
   - Setup browser mocks in `beforeEach`

5. **Use VS Code snippets:**
   - Ensures consistent component structure
   - Faster development
   - Follows project conventions

---

## 🐛 Troubleshooting

**Issue:** Import validator shows false positives

**Solution:** Update ignore patterns in the script:

```javascript
const IGNORE_PATTERNS = [
  'node_modules',
  'dist',
  // Add your patterns here
];
```

---

**Issue:** Bundle analyzer can't find dist folder

**Solution:** Build first:

```bash
npm run build
npm run analyze:bundle
```

---

**Issue:** Test helpers can't find providers

**Solution:** Check import paths match your project structure:

```typescript
import { LanguageProvider } from '../../contexts/LanguageContext';
```

---

## 📚 Related Documentation

- [COMPREHENSIVE_FORENSIC_ANALYSIS_REPORT.md](../COMPREHENSIVE_FORENSIC_ANALYSIS_REPORT.md)
- [COMPONENT_CONSOLIDATION_EXECUTION_PLAN.md](../COMPONENT_CONSOLIDATION_EXECUTION_PLAN.md)
- [Testing Guide](../docs/TESTING_GUIDE.md) _(create if needed)_

---

**Last Updated:** November 12, 2025  
**Maintainer:** Development Team

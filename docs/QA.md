# Quality Assurance Guide

**Testing Strategy & Verification Procedures**

---

## Quick Test Commands

```bash
# Run all checks
npm run typecheck && npm run lint && npm run test

# TypeScript validation
npm run typecheck

# Code linting
npm run lint
npm run lint:fix  # Auto-fix issues

# Unit tests
npm run test
npm run test:watch  # Watch mode

# E2E tests
npm run test:e2e
npm run test:e2e:ui  # With Playwright UI

# Visual regression
npm run test:visual

# Coverage report
npm run test:coverage
```

---

## Test Pyramid

### Unit Tests (Vitest) - 76+ Tests

**Coverage:**

- ✅ Button component (28 tests)
- ✅ Card component (30 tests)
- ✅ HeroSection (18 tests)
- ✅ Form validation
- ✅ API utilities

**Example:**

```typescript
// Button.test.tsx
describe('Button', () => {
  it('renders with correct variant', () => {
    render(<Button variant="primary">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

**Run:**

```bash
npm run test
```

---

### E2E Tests (Playwright)

**Critical User Paths:**

- ✅ Navigation flow (all pages)
- ✅ Contact form submission
- ✅ Booking wizard (multi-step)
- ✅ Language switcher (DE ↔ EN)
- ✅ Gallery lightbox
- ✅ Mobile responsiveness

**Example:**

```typescript
// booking.spec.ts
test('complete booking flow', async ({ page }) => {
  await page.goto('/anfrage');

  // Fill form
  await page.fill('[name="name"]', 'Test Company');
  await page.fill('[name="email"]', 'test@company.de');
  await page.selectOption('[name="eventType"]', 'corporate');

  // Submit
  await page.click('button[type="submit"]');

  // Verify success
  await expect(page.getByText('Vielen Dank')).toBeVisible();
});
```

**Run:**

```bash
npm run test:e2e
npm run test:e2e:ui  # Interactive mode
```

---

### Visual Regression Tests

**Screenshot Comparison:**

- Homepage (mobile/tablet/desktop)
- Services page
- Gallery page
- Contact form

**Browsers:**

- Chromium
- Firefox
- Safari (WebKit)

**Run:**

```bash
npm run test:visual
```

---

## Pre-Deployment Checklist

### Code Quality ✅

- [ ] `npm run typecheck` - No TypeScript errors
- [ ] `npm run lint` - No ESLint warnings
- [ ] `npm run test` - All unit tests pass
- [ ] `npm run test:e2e` - E2E tests pass
- [ ] No `console.log` in production code
- [ ] No commented-out code blocks

### Performance ✅

- [ ] Lighthouse score > 90 (all categories)
- [ ] Bundle size < 500KB initial load
- [ ] Images optimized (WebP, responsive)
- [ ] Lazy loading implemented
- [ ] Core Web Vitals in green:
  - LCP < 2.5s
  - CLS < 0.1
  - INP < 200ms

**Check:**

```bash
npm run build
npm run preview
npx lighthouse http://localhost:4173 --view
```

### Accessibility ✅

- [ ] Touch targets ≥ 44px (WCAG 2.1 AAA)
- [ ] Color contrast ≥ 4.5:1 (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Alt text on all images
- [ ] Form labels properly associated

**Check:**

```bash
# Lighthouse accessibility audit
npx lighthouse http://localhost:4173 --only-categories=accessibility --view
```

### SEO ✅

- [ ] All pages have unique `<title>` tags
- [ ] Meta descriptions present (< 160 chars)
- [ ] H1 tags present on all pages
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured
- [ ] Structured data validated
- [ ] Canonical URLs set

**Check:**

```bash
curl http://localhost:4173/sitemap.xml
curl http://localhost:4173/robots.txt

# Google Rich Results Test
# https://search.google.com/test/rich-results
```

### Security ✅

- [ ] CSRF protection active
- [ ] Rate limiting configured (100 req/15min)
- [ ] No hardcoded secrets in code
- [ ] Environment variables used for sensitive data
- [ ] HTTPS enforced
- [ ] Security headers set (CSP, HSTS)

**Check:**

```bash
npm run security:test:production
# See: docs/SECURITY.md
```

### Functionality ✅

- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Booking form validates correctly
- [ ] Language switcher works (DE ↔ EN)
- [ ] Gallery lightbox opens/closes
- [ ] Mobile menu works
- [ ] 404 page renders correctly

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Test Breakpoints:**

- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 12/13)
- [ ] 768px (iPad)
- [ ] 1024px (Desktop small)
- [ ] 1920px (Desktop large)

---

## Testing Best Practices

### 1. Test Naming Convention

```typescript
// ✅ Good
it('submits form when all required fields are filled');
it('shows error message when email is invalid');

// ❌ Bad
it('works correctly');
it('test 1');
```

### 2. Arrange-Act-Assert Pattern

```typescript
it('increments counter on button click', () => {
  // Arrange
  render(<Counter initial={0} />);

  // Act
  fireEvent.click(screen.getByRole('button'));

  // Assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 3. Test User Behavior, Not Implementation

```typescript
// ✅ Good - tests user behavior
it('displays success message after form submission', async () => {
  render(<ContactForm />);
  await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(await screen.findByText('Thank you')).toBeVisible();
});

// ❌ Bad - tests implementation details
it('calls handleSubmit when form is submitted', () => {
  const handleSubmit = vi.fn();
  render(<ContactForm onSubmit={handleSubmit} />);
  // ...
  expect(handleSubmit).toHaveBeenCalled();
});
```

### 4. Use Testing Library Queries Correctly

```typescript
// Priority order:
1. getByRole        // Accessibility-first
2. getByLabelText   // Form fields
3. getByPlaceholderText
4. getByText
5. getByTestId      // Last resort
```

---

## Manual Testing Checklist

### Navigation Testing

- [ ] Click all nav links
- [ ] Test breadcrumbs (service pages)
- [ ] Test mobile hamburger menu
- [ ] Test footer links
- [ ] Test logo link (back to home)

### Form Testing

- [ ] Submit empty form (validation errors show)
- [ ] Fill invalid email (error shows)
- [ ] Fill all fields correctly (success message)
- [ ] Test CSRF protection (inspect network tab)
- [ ] Test rate limiting (spam submit button)

### Responsive Testing

- [ ] Desktop layout (1920px)
- [ ] Tablet layout (768px)
- [ ] Mobile layout (375px)
- [ ] Test landscape orientation
- [ ] Test touch interactions

### Performance Testing

- [ ] Check Network tab (no 404s, no large files)
- [ ] Check Console (no errors/warnings)
- [ ] Test on slow 3G connection
- [ ] Verify lazy loading works (scroll gallery)

---

## Debugging Tests

### Failed Test

```bash
# Run single test file
npm run test Button.test.tsx

# Run tests matching pattern
npm run test -- -t "renders correctly"

# Watch mode (auto-rerun on changes)
npm run test:watch

# Debug mode
npm run test -- --inspect-brk
```

### Playwright Debugging

```bash
# UI mode (best for debugging)
npm run test:e2e:ui

# Debug mode (opens browser)
PWDEBUG=1 npm run test:e2e

# Trace viewer (after test run)
npx playwright show-trace trace.zip
```

---

## Test Coverage

### Current Coverage (76+ tests)

| Component       | Coverage | Tests |
| --------------- | -------- | ----- |
| Button          | 100%     | 28    |
| Card            | 100%     | 30    |
| HeroSection     | 100%     | 18    |
| Form validation | 90%      | 15+   |
| API utilities   | 85%      | 10+   |

### Generate Coverage Report

```bash
npm run test:coverage
# Opens coverage/index.html in browser
```

**Coverage Targets:**

- Atoms: 100%
- Molecules: 90%
- Organisms: 80%
- Pages: 70%

---

## CI/CD Integration

### GitHub Actions (Optional)

Create `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test
      - run: npx playwright install
      - run: npm run test:e2e
```

---

## Regression Testing

### Before Major Changes

1. Run full test suite
2. Take Lighthouse baseline
3. Document current bundle size
4. Screenshot critical pages

### After Major Changes

1. Compare test results
2. Compare Lighthouse scores
3. Compare bundle sizes
4. Visual diff screenshots

---

## Test Data Management

### Mock Data Location

```
tests/
├── fixtures/
│   ├── users.json
│   ├── events.json
│   └── responses.json
└── mocks/
    ├── api.ts
    └── handlers.ts
```

### Example Mock

```typescript
// tests/mocks/api.ts
export const mockBookingResponse = {
  success: true,
  message: 'Booking received',
  id: 'mock-123',
};
```

---

## Support

- **Architecture:** `docs/ARCHITECTURE.md`
- **Performance:** `docs/PERFORMANCE.md`
- **Security:** `docs/SECURITY.md`
- **Deployment:** `docs/DEPLOYMENT.md`

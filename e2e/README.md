# End-to-End Testing with Playwright

This directory contains Playwright end-to-end tests with integrated accessibility testing using @axe-core/playwright.

## Test Files

### Places.spec.ts (Accessible Version)
Tests the accessible version of the Places page (`/places`). These tests should pass with **zero accessibility violations**.

**Key Tests:**
- No automatically detectable accessibility issues
- All 5 mock places are displayed
- Proper heading structure (h1)
- Accessible Add Place button
- Accessible Edit buttons with proper labels
- Accessible Delete buttons with proper labels
- Proper keyboard navigation order
- Accessible breadcrumb navigation
- Color contrast compliance (WCAG 2.1 AA/AAA)
- Proper ARIA attributes
- Focus management

### PlacesInaccessible.spec.ts (Inaccessible Version)
Tests the intentionally inaccessible version (`/places-inaccessible`). These tests **expect and document accessibility violations** for workshop demonstration.

**Known Issues Detected:**
- Button role violations (delete buttons are divs)
- Non-keyboard accessible elements
- Poor tab order (Edit buttons rendered after list)
- Missing semantic HTML
- WCAG compliance failures

## Running Tests

### Install Playwright Browsers (First Time Only)
```bash
pnpm exec playwright install
```

### Run All Tests
```bash
pnpm run test:e2e
```

### Run Tests with UI Mode (Interactive)
```bash
pnpm run test:e2e:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
pnpm run test:e2e:headed
```

### Debug Tests
```bash
pnpm run test:e2e:debug
```

### View Test Report
```bash
pnpm run test:e2e:report
```

## Running tests - variations

### Using the test name (grep pattern)

```bash
pnpm exec playwright test PlacesInaccessible.spec.ts -g "should have automatically detectable"
```

### Run the entire PlacesInaccessible test file

```bash
pnpm exec playwright test PlacesInaccessible.spec.ts
```

### Run with a specific browser

```bash
pnpm exec playwright test PlacesInaccessible.spec.ts --project=chromium
```

### Run with UI mode (interactive, great for debugging)

```bash
pnpm exec playwright test PlacesInaccessible.spec.ts --ui
```

### Run in headed mode (see the browser)

```bash
pnpm exec playwright test PlacesInaccessible.spec.ts --headed
```

### Run just one specific test with exact match

```bash
pnpm exec playwright test PlacesInaccessible.spec.ts -g "should have automatically detectable accessibility issues"
```

## Test Structure

```
e2e/
├── fixtures/
│   └── mockPlaces.ts          # 5 mock places for testing
├── helpers/
│   └── storageHelpers.ts      # Capacitor storage mocking utilities
├── Places.spec.ts             # Accessible version tests
├── PlacesInaccessible.spec.ts # Inaccessible version tests (expects violations)
└── README.md                  # This file
```

## Accessibility Testing with Axe

All tests use `@axe-core/playwright` to run automated accessibility checks. The axe-core engine detects common accessibility issues including:

✅ **Color contrast** (WCAG 2.1 AA/AAA)
✅ **Keyboard accessibility**
✅ **ARIA usage**
✅ **Form labels**
✅ **Button names**
✅ **Semantic HTML**
✅ **Focus management**
✅ **Screen reader support**

### Example: Running Axe Scan

```typescript
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/places');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

### Filtering by WCAG Tags

```typescript
// Check specific WCAG levels
const results = await new AxeBuilder({ page })
  .withTags(['wcag2aa', 'wcag2aaa'])
  .analyze();

// Check color contrast specifically
const colorContrastViolations = results.violations.filter(
  (violation) => violation.id === 'color-contrast'
);
```

## Workshop Use Cases

### Demonstrate Accessibility Violations
Run the inaccessible version tests to show how axe-core catches violations:

```bash
pnpm playwright test PlacesInaccessible --headed
```

This will show:
- Console logs of all violations found
- Visual demonstration of keyboard navigation issues
- Comparison between semantic and non-semantic HTML

### Compare Accessible vs Inaccessible
Run both test files to compare results:

```bash
pnpm playwright test Places.spec.ts PlacesInaccessible.spec.ts
```

The accessible version should pass with 0 violations, while the inaccessible version should detect multiple issues.

## CI Integration

The tests are configured to run in CI mode automatically. The `playwright.config.ts` includes:
- Retries on failure (in CI only)
- Video recording on first retry
- Trace collection for debugging

## Tips

1. **View violations in detail**: Check the console output when running PlacesInaccessible tests - they log detailed violation information
2. **Use UI mode for debugging**: `pnpm run test:e2e:ui` provides a great visual interface
3. **Run specific tests**: `npx playwright test -g "keyboard"` to run tests matching "keyboard"
4. **Update snapshots**: If you change the UI, you may need to update test expectations

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Axe-core Playwright Integration](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Deque University](https://dequeuniversity.com/) - Accessibility training

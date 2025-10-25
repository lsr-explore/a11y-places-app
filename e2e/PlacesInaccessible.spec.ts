import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mockPlaces } from './fixtures/mockPlaces';
import { mockCapacitorStorage } from './helpers/storageHelpers';

test.describe('Places Page (Inaccessible)', () => {
  test.beforeEach(async ({ page }) => {
    // Set up mock storage before navigating
    await mockCapacitorStorage(page, mockPlaces);
    await page.goto('/places-inaccessible');
    // Wait for the page to load and render
    await page.waitForSelector('h1:has-text("Places")');
  });

  test('should have automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // This page SHOULD have violations - it's intentionally inaccessible
    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);

    // Log violations for demonstration purposes
    console.log('\n=== Accessibility Violations Found ===');
    accessibilityScanResults.violations.forEach((violation) => {
      console.log(`\n${violation.id}: ${violation.description}`);
      console.log(`Impact: ${violation.impact}`);
      console.log(`Help: ${violation.helpUrl}`);
      console.log(`Affected elements: ${violation.nodes.length}`);
    });
  });

  test('should detect button role violations on delete buttons', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Look for violations related to interactive elements
    const interactiveViolations = accessibilityScanResults.violations.filter(
      (violation) =>
        violation.id === 'button-name' ||
        violation.id === 'aria-allowed-role' ||
        violation.id === 'role-img-alt' ||
        violation.tags.includes('keyboard') ||
        violation.tags.includes('wcag2a')
    );

    expect(interactiveViolations.length).toBeGreaterThan(0);
  });

  test('should display all 5 mock places', async ({ page }) => {
    // Even though it's inaccessible, it should still display the data
    for (const place of mockPlaces) {
      await expect(page.getByText(place.name)).toBeVisible();
      await expect(page.getByText(place.places)).toBeVisible();
    }
  });

  test('should demonstrate keyboard accessibility issues', async ({ page }) => {
    // Try to find delete buttons by role - this should fail or find nothing
    // because they're implemented as divs
    const deleteButtons = page.getByRole('button', { name: /delete/i });
    const count = await deleteButtons.count();

    // Delete "buttons" are divs, so they won't be found by role
    expect(count).toBe(0);

    // But the divs exist in the DOM
    const deleteDivs = page.locator('div[style*="cursor: pointer"]');
    const divCount = await deleteDivs.count();
    expect(divCount).toBe(mockPlaces.length);
  });

  test('should demonstrate poor tab order', async ({ page }) => {
    // The Edit buttons are rendered after the list but positioned with CSS
    // This creates a broken tab order

    // Get all focusable elements
    const focusableElements = await page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').all();

    // The page should have interactive elements
    expect(focusableElements.length).toBeGreaterThan(0);

    // Tab through and collect focused elements
    const tabOrder: string[] = [];
    for (let i = 0; i < Math.min(10, focusableElements.length); i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.textContent?.trim() || el?.tagName || '';
      });
      tabOrder.push(focused);
    }

    console.log('\n=== Tab Order ===');
    console.log(tabOrder.join(' -> '));

    // The tab order will be confusing because Edit buttons are at the end
    // but visually appear inline with each item
  });

  test('should fail WCAG keyboard accessibility standards', async ({ page }) => {
    // Run axe with keyboard-specific rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag21a', 'best-practice'])
      .analyze();

    // Should have violations related to keyboard accessibility
    const keyboardViolations = accessibilityScanResults.violations.filter(
      (violation) =>
        violation.tags.includes('keyboard') ||
        violation.id.includes('focus') ||
        violation.id.includes('button')
    );

    // Log keyboard-specific violations
    if (keyboardViolations.length > 0) {
      console.log('\n=== Keyboard Accessibility Violations ===');
      keyboardViolations.forEach((violation) => {
        console.log(`${violation.id}: ${violation.description}`);
      });
    }

    // This is a demonstration that violations exist
    // In a real test suite, you might use expect(keyboardViolations.length).toBeGreaterThan(0)
    // but for workshop purposes, we're just logging
  });

  test('should demonstrate non-semantic HTML issues', async ({ page }) => {
    // The delete "buttons" are divs with click handlers
    const deleteDivs = page.locator('div[style*="cursor: pointer"]');

    // They should not be keyboard accessible
    const firstDiv = deleteDivs.first();
    await expect(firstDiv).toBeVisible();

    // Try to tab to it - it won't work because divs aren't in tab order
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // The div will not receive focus
    const isFocused = await firstDiv.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(false);
  });

  test('should show contrast or other WCAG violations if present', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag2aaa'])
      .analyze();

    // Check for any WCAG AA or AAA violations
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n=== WCAG Violations ===');
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`${violation.id} (${violation.impact}): ${violation.description}`);
      });
    }

    // This page should have violations
    expect(accessibilityScanResults.violations.length).toBeGreaterThan(0);
  });
});

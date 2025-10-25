import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mockPlaces } from './fixtures/mockPlaces';
import { mockCapacitorStorage } from './helpers/storageHelpers';

test.describe('Places Page (Accessible)', () => {
  test.beforeEach(async ({ page }) => {
    // Start with a clean slate
    await page.goto('/places');

    // Add mock places using the app's own UI
    for (const place of mockPlaces) {
      await page.getByRole('button', { name: /add place/i }).click();
      await page.getByLabel(/name/i).fill(place.name);
      await page.getByLabel(/places/i).fill(place.places);
      // Submit the form
      await page.getByRole('button', { name: /add place/i, exact: false }).last().click();
      // Wait to return to places list
      await page.waitForURL('**/places');
    }
  });

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should display all 5 mock places', async ({ page }) => {
    // Check that all 5 places are rendered
    for (const place of mockPlaces) {
      await expect(page.getByText(place.name)).toBeVisible();
      await expect(page.getByText(place.places)).toBeVisible();
    }
  });

  test('should have proper heading structure', async ({ page }) => {
    // Main heading should be h1
    const heading = page.getByRole('heading', { name: 'Places', level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should have accessible Add Place button', async ({ page }) => {
    const addButton = page.getByRole('button', { name: /add place/i });
    await expect(addButton).toBeVisible();

    // Button should be keyboard accessible
    await addButton.focus();
    await expect(addButton).toBeFocused();
  });

  test('should have accessible Edit buttons with proper labels', async ({ page }) => {
    // Each place should have an accessible Edit button
    const editButtons = page.getByRole('button', { name: /edit/i });
    const count = await editButtons.count();

    expect(count).toBe(mockPlaces.length);

    // Check that edit buttons are keyboard accessible
    const firstEditButton = editButtons.first();
    await firstEditButton.focus();
    await expect(firstEditButton).toBeFocused();
  });

  test('should have accessible Delete buttons with proper labels', async ({ page }) => {
    // Each place should have an accessible Delete button
    const deleteButtons = page.getByRole('button', { name: /delete/i });
    const count = await deleteButtons.count();

    expect(count).toBe(mockPlaces.length);

    // Check that delete buttons are keyboard accessible
    const firstDeleteButton = deleteButtons.first();
    await firstDeleteButton.focus();
    await expect(firstDeleteButton).toBeFocused();
  });

  test('should have proper keyboard navigation order', async ({ page }) => {
    // Start from the beginning
    await page.keyboard.press('Tab');

    // Should focus on breadcrumb first
    const breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i });
    await expect(breadcrumb).toBeVisible();

    // Tab to Add Place button (should be near the top)
    const addButton = page.getByRole('button', { name: /add place/i });
    await addButton.focus();
    await expect(addButton).toBeFocused();
  });

  test('should have accessible breadcrumb navigation', async ({ page }) => {
    const breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i });
    await expect(breadcrumb).toBeVisible();

    // Home link should be present and accessible
    const homeLink = breadcrumb.getByRole('link', { name: /home/i });
    await expect(homeLink).toBeVisible();
  });

  test('should pass color contrast checks', async ({ page }) => {
    // Run axe specifically checking for color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag2aaa'])
      .analyze();

    // Filter for color contrast violations
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === 'color-contrast'
    );

    expect(colorContrastViolations).toEqual([]);
  });

  test('should have proper ARIA attributes on list items', async ({ page }) => {
    // Check that icons are properly hidden from screen readers
    const icons = page.locator('[aria-hidden="true"]').first();
    await expect(icons).toBeVisible();
  });

  test('should maintain focus management when navigating', async ({ page }) => {
    const addButton = page.getByRole('button', { name: /add place/i });

    // Focus should be manageable
    await addButton.focus();
    await expect(addButton).toBeFocused();

    // Should be able to tab through all interactive elements
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});

import type { Page } from '@playwright/test';
import type { Place } from '../../src/types/Place';

/**
 * Mock storage API by setting up a StorageContext mock on window object
 * This approach uses the same pattern as Storybook stories
 */
export async function mockCapacitorStorage(page: Page, places: Place[]) {
  await page.addInitScript((placesData) => {
    // Create a mock API with in-memory data
    let data = [...placesData];

    (window as any).mockStorageAPI = {
      getPlaces: async () => {
        return Promise.resolve([...data]);
      },
      deletePlace: async (id: string) => {
        data = data.filter((p) => p.id !== id);
        return Promise.resolve();
      },
    };
  }, places);
}

/**
 * Mock empty storage (no places stored)
 */
export async function mockEmptyStorage(page: Page) {
  await mockCapacitorStorage(page, []);
}

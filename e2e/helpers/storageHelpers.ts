import type { Page } from '@playwright/test';
import type { Place } from '../../src/types/Place';

/**
 * Mock Capacitor Preferences API to return predefined places data
 * Directly manipulates the storage backend that Capacitor uses
 */
export async function mockCapacitorStorage(page: Page, places: Place[]) {
  // Capacitor Preferences uses different storage backends depending on the environment
  // In the browser, it typically uses localStorage or IndexedDB
  // We'll set the data in the format Capacitor expects
  await page.evaluate(async (placesData) => {
    // Try IndexedDB first (Capacitor's preferred web storage)
    try {
      const DB_NAME = 'CapacitorStorage';
      const STORE_NAME = 'CapacitorStorage';

      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      await new Promise((resolve, reject) => {
        request.onsuccess = async (event: any) => {
          const db = event.target.result;
          const transaction = db.transaction([STORE_NAME], 'readwrite');
          const store = transaction.objectStore(STORE_NAME);

          // Store the places data
          store.put(JSON.stringify(placesData), 'places');

          transaction.oncomplete = () => {
            db.close();
            resolve(null);
          };
          transaction.onerror = () => reject(transaction.error);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      // Fallback to localStorage if IndexedDB fails
      console.log('IndexedDB failed, using localStorage', e);
      localStorage.setItem('_cap_places', JSON.stringify(placesData));
    }
  }, places);
}

/**
 * Mock empty Capacitor Preferences (no places stored)
 */
export async function mockEmptyStorage(page: Page) {
  await page.evaluate(async () => {
    // Clear from IndexedDB
    try {
      const DB_NAME = 'CapacitorStorage';
      const STORE_NAME = 'CapacitorStorage';

      const request = indexedDB.open(DB_NAME, 1);
      await new Promise((resolve) => {
        request.onsuccess = async (event: any) => {
          const db = event.target.result;
          const transaction = db.transaction([STORE_NAME], 'readwrite');
          const store = transaction.objectStore(STORE_NAME);
          store.delete('places');
          transaction.oncomplete = () => {
            db.close();
            resolve(null);
          };
        };
        request.onerror = () => resolve(null);
      });
    } catch (e) {
      console.log('IndexedDB clear failed', e);
    }

    // Also clear localStorage
    localStorage.removeItem('_cap_places');
  });
}

/**
 * Simple authentication utility for map access
 *
 * SECURITY NOTE: This is basic client-side authentication suitable for
 * demo/workshop purposes. The password is stored in environment variables
 * and gets baked into the JavaScript bundle. It keeps credentials out of
 * source control but is still discoverable by inspecting the built app.
 */

const MAP_PASSWORD = process.env.REACT_APP_MAP_PASSWORD || 'orchid123';

/**
 * Check if the provided password matches the configured map password
 */
export const validateMapPassword = (inputPassword: string): boolean => {
  return inputPassword === MAP_PASSWORD;
};

/**
 * Storage key for authentication state
 */
const AUTH_STORAGE_KEY = 'map_authenticated';

/**
 * Check if user is currently authenticated
 */
export const isAuthenticated = (): boolean => {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

/**
 * Set authentication state
 */
export const setAuthenticated = (authenticated: boolean): void => {
  if (authenticated) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

/**
 * Clear authentication (logout)
 */
export const logout = (): void => {
  setAuthenticated(false);
};

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.workshop.a11yplaces',
  appName: 'A11y Places',
  webDir: 'build',
  server: {
    // Handle the /a11y-places-app/ base path from the web build
    // This allows the app to work with the existing homepage setting
    androidScheme: 'https',
    iosScheme: 'capacitor'
  }
};

export default config;

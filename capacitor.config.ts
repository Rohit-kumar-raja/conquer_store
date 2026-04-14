import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.conquer.store.app',
  appName: 'Conquer Store',
  webDir: 'dist',
  server: {
    url: 'http://10.14.159.113:3000',  // your local IP
    cleartext: true,                  // needed for HTTP
  },
};

export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.akhidawah.app',
  appName: 'Akhi Dawah',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;

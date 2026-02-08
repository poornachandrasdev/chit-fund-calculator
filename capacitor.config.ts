import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chitfund.calculator',
  appName: 'ChitFund Calculator',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
  },
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SystemBars: {
      insetsHandling: 'css',
      style: 'DARK',
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#2563EB',
      showSpinner: false,
    },
  },
};

export default config;

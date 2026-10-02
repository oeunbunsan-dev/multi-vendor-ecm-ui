interface AppConfig {
  apiUrl: string;
  apiUrlWithoutSuffixApi: string;
  appVariant: 'development' | 'staging' | 'production';
}

export const ENV: AppConfig = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api',
  apiUrlWithoutSuffixApi: process.env.EXPO_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost:5000',
  appVariant: (process.env.EXPO_PUBLIC_APP_VARIANT as any) || 'development',
};

export const isDevelopment = ENV.appVariant === 'development';
export const isStaging = ENV.appVariant === 'staging';
export const isProduction = ENV.appVariant === 'production';

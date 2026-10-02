import { ENV } from '@/src/config';
import tokenStorage from '@/src/storage/token';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// ─────────────────────────────────────────────────────────────
// Create the axios instance
// ─────────────────────────────────────────────────────────────
export const apiClient = axios.create({
  baseURL: ENV.apiUrl,
  timeout: 30_000, // 30s — enough for image uploads
  headers: {
    Accept: 'application/json',
  },
});

// ─────────────────────────────────────────────────────────────
// Request interceptor — attach auth token
// ─────────────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await tokenStorage.getAccessToken();
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (err) {
      console.warn('[apiClient] Failed to read token:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─────────────────────────────────────────────────────────────
// Response interceptor — global error handling
// ─────────────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        // Token expired / invalid → clear and redirect to login
        console.warn('[apiClient] 401 Unauthorized');
        // await AsyncStorage.removeItem('token');
        // e.g. router.replace('/login'); or emit an event
        break;

      case 403:
        console.warn('[apiClient] 403 Forbidden');
        break;

      case 413:
        console.warn('[apiClient] 413 Payload Too Large');
        break;

      case 500:
      case 502:
      case 503:
        console.warn('[apiClient] Server error', status);
        break;

      default:
        if (!error.response) {
          console.warn('[apiClient] Network error:', error.message);
        }
    }

    return Promise.reject(error);
  }
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// ១. បង្កើត Target Interface (កិច្ចសន្យារួមដែលគ្រប់ Storage ត្រូវតែមាន)
interface IStorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// ២. បង្កើត Web Storage Adapter (សម្រាប់ Web LocalStorage)
class WebStorageAdapter implements IStorageAdapter {
  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }
  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }
  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

// ៣. បង្កើត Mobile Storage Adapter (សម្រាប់ Mobile AsyncStorage)
class MobileStorageAdapter implements IStorageAdapter {
  async getItem(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }
  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }
  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}

// ៤. ជ្រើសរើសយក Adapter ឱ្យត្រូវតាមឧបករណ៍ស្វ័យប្រវត្តិ
const storageAdapter: IStorageAdapter = Platform.OS === 'web'
  ? new WebStorageAdapter()
  : new MobileStorageAdapter();

const TOKEN_KEY = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

const tokenStorage = {
  async getAccessToken(): Promise<string | null> {
    try {
      return await storageAdapter.getItem(TOKEN_KEY.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  async setAccessToken(token: string): Promise<void> {
    try {
      await storageAdapter.setItem(TOKEN_KEY.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  },

  async removeAccessToken(): Promise<void> {
    try {
      await storageAdapter.removeItem(TOKEN_KEY.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error removing access token:', error);
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await storageAdapter.getItem(TOKEN_KEY.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  async setRefreshToken(token: string): Promise<void> {
    try {
      await storageAdapter.setItem(TOKEN_KEY.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  },

  async removeRefreshToken(): Promise<void> {
    try {
      await storageAdapter.removeItem(TOKEN_KEY.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error removing refresh token:', error);
    }
  },

  async clear(): Promise<void> {
    try {
      await storageAdapter.removeItem(TOKEN_KEY.ACCESS_TOKEN);
      await storageAdapter.removeItem(TOKEN_KEY.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }
};

export default tokenStorage;

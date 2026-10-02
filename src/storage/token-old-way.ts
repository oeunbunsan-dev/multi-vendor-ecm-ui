import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const TOKEN_KEY = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

// ឆែកមើលថាតើកំពុងរត់នៅលើ Web មែនឬទេ
const isWeb = Platform.OS === 'web';

const tokenStorage = {
  // ១. ទាញយក Access Token
  async getAccessToken(): Promise<string | null> {
    try {
      if (isWeb) {
        return localStorage.getItem(TOKEN_KEY.ACCESS_TOKEN);
      }
      return await AsyncStorage.getItem(TOKEN_KEY.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  // ២. រក្សាទុក Access Token
  async setAccessToken(token: string): Promise<void> {
    try {
      if (isWeb) {
        localStorage.setItem(TOKEN_KEY.ACCESS_TOKEN, token);
        return;
      }
      await AsyncStorage.setItem(TOKEN_KEY.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  },

  // ៣. លុប Access Token
  async removeAccessToken(): Promise<void> {
    try {
      if (isWeb) {
        localStorage.removeItem(TOKEN_KEY.ACCESS_TOKEN);
        return;
      }
      await AsyncStorage.removeItem(TOKEN_KEY.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error removing access token:', error);
    }
  },

  // ៤. ចូលយក Refresh Token
  async getRefreshToken(): Promise<string | null> {
    try {
      if (isWeb) {
        return localStorage.getItem(TOKEN_KEY.REFRESH_TOKEN);
      }
      return await AsyncStorage.getItem(TOKEN_KEY.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  // ៥. រក្សាទុក Refresh Token
  async setRefreshToken(token: string): Promise<void> {
    try {
      if (isWeb) {
        localStorage.setItem(TOKEN_KEY.REFRESH_TOKEN, token);
        return;
      }
      await AsyncStorage.setItem(TOKEN_KEY.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  },

  // ៦. លុប Refresh Token
  async removeRefreshToken(): Promise<void> {
    try {
      if (isWeb) {
        localStorage.removeItem(TOKEN_KEY.REFRESH_TOKEN);
        return;
      }
      await AsyncStorage.removeItem(TOKEN_KEY.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error removing refresh token:', error);
    }
  },

  // ៧. មុខងារសម្អាត (Clear) Token ទាំងអស់ចោលពេល Logout
  async clear(): Promise<void> {
    try {
      if (isWeb) {
        localStorage.removeItem(TOKEN_KEY.ACCESS_TOKEN);
        localStorage.removeItem(TOKEN_KEY.REFRESH_TOKEN);
        return;
      }
      await AsyncStorage.multiRemove([TOKEN_KEY.ACCESS_TOKEN, TOKEN_KEY.REFRESH_TOKEN]);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }
};

export default tokenStorage;

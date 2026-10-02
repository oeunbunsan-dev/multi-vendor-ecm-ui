import { apiClient } from "../core";

class AuthService {
  customerRegister = async (credentials : any) => {
    const res = await apiClient.post('/auth/register', credentials);
    return res.data;
  };

  vendorRegister = async (credentials : any) => {
    const res = await apiClient.post('/auth/vendor/register-vendor', credentials);
    return res.data;
  };

  login = async (credentials : any) => {
    const res = await apiClient.post('/auth/login', credentials);
    return res.data;
  };

  refreshToken = async (refreshToken : string) => {
    const res = await apiClient.post('/auth/refresh', { refreshToken });
    return res.data;
  };

  forgotPassword = async (email : string) => {
    const res = await apiClient.post('/auth/forgot-password', { email });
    return res.data;
  };

  resetPassword = async (token : string, newPassword : string) => {
    const res = await apiClient.post('/auth/reset-password', { token, newPassword });
    return res.data;
  };

  verifyEmail = async (token : string) => {
    const res = await apiClient.get('/auth/verify-email?token=' + token);
    return res.data;
  };

  changePassword = async (currentPassword : string, newPassword : string) => {
    const res = await apiClient.post('/auth/change-password', { currentPassword, newPassword });
    return res.data;
  };

  getCurrentUser = async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  };
};

export const authService = new AuthService();

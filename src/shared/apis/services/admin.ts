import { apiClient } from "../core";

class AdminService {
  getDashboard = async () => {
    const response = await apiClient.get("/admin/dashboard");
    return response.data;
  };

  listVendorsWithFilters = async (params: any) => {
    const response = await apiClient.get("/admin/vendors", { params });
    return response.data;
  };
};

export const adminService = new AdminService();

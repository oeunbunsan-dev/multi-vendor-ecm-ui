
import { apiClient } from "../core"
class UserService {
  updateProfile = async (data: any) => {
    const response = await apiClient.put("/users/profile", data)
    return response.data
  };

  getAddress = async () => {
    const response = await apiClient.get("/users/address")
    return response.data
  };

  createAddress = async (data: any) => {
    const response = await apiClient.post("/users/address", data)
    return response.data
  };

  updateAddress = async (data: any) => {
    const response = await apiClient.put("/users/address", data)
    return response.data
  };

  deleteAddress = async (id: string) => {
    const response = await apiClient.delete(`/users/address/${id}`)
    return response.data
  };
};

export const userService = new UserService();

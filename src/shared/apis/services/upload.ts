import { apiClient } from "../core";

type UploadImageParams = {
  uri: string;
  name?: string;
  type?: string;
};

class UploadService {
  uploadImage = async ({ uri, name, type }: UploadImageParams) => {
    const formData = new FormData();

    formData.append("file", {
      uri,
      name: name ?? uri.split("/").pop() ?? "photo.jpg",
      type: type ?? "image/jpeg",
    } as any);

    const response = await apiClient.post("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  };
}

export const uploadService = new UploadService();

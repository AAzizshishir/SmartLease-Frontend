import { api } from "@/lib/axios/http-client";

export const propertyService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/api/properties", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/api/properties/${id}`);
    return data;
  },

  create: async (payload: FormData) => {
    const { data } = await api.post("/properties", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  update: async (id: string, payload: unknown) => {
    const { data } = await api.patch(`/properties/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/properties/${id}`);
    return data;
  },
};

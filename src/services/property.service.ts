import { api } from "@/lib/axios/http-client";
import { ICreateProperty } from "@/types/property.type";

export const propertyService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/api/properties", { params });
    return data;
  },

  getMy: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/api/properties/my", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/api/properties/${id}`);
    return data;
  },

  create: async (payload: ICreateProperty) => {
    const { data } = await api.post("/api/properties", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  },

  update: async (id: string, payload: Partial<ICreateProperty>) => {
    const { data } = await api.patch(`/api/properties/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/api/properties/${id}`);
    return data;
  },
};

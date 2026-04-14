import { api } from "@/lib/axios/http-client";
import { ICreateProperty } from "@/types/property.type";

export const propertyService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/properties", { params });
    return data;
  },

  getMy: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/properties/my", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/properties/${id}`);
    return data;
  },

  create: async (payload: ICreateProperty) => {
    const { data } = await api.post("/properties", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  },

  addImage: async (propertyId: string, images: FormData) => {
    const { data } = await api.post(`/properties/${propertyId}/images`, images);
    return data;
  },

  deleteImage: async (propertyId: string, imageId: string) => {
    const { data } = await api.delete(
      `/properties/${propertyId}/images/${imageId}`,
    );
    return data;
  },

  update: async (id: string, payload: Partial<ICreateProperty>) => {
    const { data } = await api.patch(`/properties/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/properties/${id}`);
    return data;
  },
};

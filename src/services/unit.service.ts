import { api } from "@/lib/axios/http-client";
import { Unit } from "@/types/unit.type";
import { CreateUnitInput } from "@/validations/unit.validation";

export const unitService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/units", { params });
    return data;
  },

  getById: async (unitId: string) => {
    const { data } = await api.get(`/unit/${unitId}`);
    return data;
  },

  create: async (propertyId: string, payload: CreateUnitInput) => {
    const { data } = await api.post(`/unit/${propertyId}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  },

  addImage: async (unitId: string, images: FormData) => {
    const { data } = await api.post(`/unit/${unitId}/images`, images);
    return data;
  },

  deleteImage: async (unitId: string, imageId: string) => {
    const { data } = await api.delete(`/ubit/${unitId}/images/${imageId}`);
    return data;
  },

  update: async (id: string, payload: Partial<Unit>) => {
    const { data } = await api.patch(`/properties/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/properties/${id}`);
    return data;
  },
};

// import { api } from "@/lib/axios/http-client";

import { api } from "@/lib/axios/http-client";
import { CreateLeaseInput } from "@/validations/lease.validation";

export const leaseService = {
  // getAll: async (params?: Record<string, unknown>) => {
  //   const { data } = await api.get("/unit", { params });
  //   return data;
  // },
  // getById: async (unitId: string) => {
  //   const { data } = await api.get(`/unit/${unitId}`);
  //   return data;
  // },
  create: async (application_id: string, payload: CreateLeaseInput) => {
    const { data } = await api.post(`/lease/${application_id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  },

  // update: async (unitId: string, payload: Partial<Unit>) => {
  //   const { data } = await api.put(`/unit/${unitId}`, payload);
  //   return data;
  // },
  // delete: async (unitId: string) => {
  //   const { data } = await api.delete(`/unit/${unitId}`);
  //   return data;
  // },
};

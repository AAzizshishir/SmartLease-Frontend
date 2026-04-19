// import { api } from "@/lib/axios/http-client";

import { api } from "@/lib/axios/http-client";
import { CreateLeaseInput } from "@/validations/lease.validation";

export const leaseService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/lease", { params });
    return data;
  },
  getById: async (lease_id: string) => {
    const { data } = await api.get(`/lease/${lease_id}`);
    return data;
  },

  create: async (application_id: string, payload: CreateLeaseInput) => {
    const { data } = await api.post(`/lease/${application_id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  },

  getTenantLease: async () => {
    const { data } = await api.get("/lease/my-lease");
    return data;
  },

  confirmLease: async (lease_id: string) => {
    const { data } = await api.patch(`/lease/${lease_id}/confirm`);
    return data;
  },
  // delete: async (unitId: string) => {
  //   const { data } = await api.delete(`/unit/${unitId}`);
  //   return data;
  // },
};

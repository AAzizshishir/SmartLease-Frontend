import { api } from "@/lib/axios/http-client";
import { CreateLeaseApplicationInput } from "@/validations/lease-application.validation";

export const leaseApplicationService = {
  create: async (payload: CreateLeaseApplicationInput) => {
    const { data } = await api.post(`/lease-application`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  },

  getLandlordApplications: async (params?: Record<string, unknown>) => {
    const { data } = await api.get("/lease-application/landlord");
    return data;
  },
};

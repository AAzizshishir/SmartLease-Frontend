import { api } from "@/lib/axios/http-client";
import { CreateLeaseApplicationInput } from "@/validations/lease-application.validation";

export const leaseApplication = {
  create: async (payload: CreateLeaseApplicationInput) => {
    const { data } = await api.post(`/lease-application`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  },
};

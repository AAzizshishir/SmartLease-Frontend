import { api } from "@/lib/axios/http-client";

export const paymentService = {
  getMyPayments: (params?: any) =>
    api.get("/payment", { params }).then((r) => r.data),

  getDepositPayment: () => api.get("/payment/deposit").then((r) => r.data),

  payNow: (paymentId: string) =>
    api.patch(`/payment/${paymentId}/pay`).then((r) => r.data),

  getPaymentSummary: async () => {
    const { data } = await api.get("/payment/summary");
    return data;
  },
};

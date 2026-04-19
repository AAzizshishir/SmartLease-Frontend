import { useMutation, useQuery } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";
import { toast } from "sonner";

export const useGetMyPayment = (params?: any) =>
  useQuery({
    queryKey: ["payment", params],
    queryFn: () => paymentService.getMyPayments(params),
  });

export const useGetDepositPayment = () =>
  useQuery({
    queryKey: ["payments", "deposit"],
    queryFn: paymentService.getDepositPayment,
  });

export const usePayNow = () =>
  useMutation({
    mutationFn: paymentService.payNow,
    onSuccess: (data) => {
      // Stripe URL-এ redirect
      if (data?.data?.url) {
        window.location.href = data.data.url;
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Payment failed");
    },
  });

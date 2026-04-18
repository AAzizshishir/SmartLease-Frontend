import { leaseService } from "@/services/lease.service";
import { CreateLeaseInput } from "@/validations/lease.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// hooks/useLease.ts
export const useCreateLease = (application_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeaseInput) =>
      leaseService.create(application_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["leases"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

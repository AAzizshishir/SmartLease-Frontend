import { leaseService } from "@/services/lease.service";
import { CreateLeaseInput } from "@/validations/lease.validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

// Get All
export const useGetLeases = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["leases", params],
    queryFn: () => leaseService.getAll(params),
  });
};

// Get Details
export const useGetLeaseDetails = (lease_id: string) => {
  return useQuery({
    queryKey: ["lease", lease_id],
    queryFn: () => leaseService.getById(lease_id),
  });
};

export const useGetTenantLease = () => {
  return useQuery({
    queryKey: ["lease"],
    queryFn: leaseService.getTenantLease,
  });
};

// Confirm Lease
export const useConfirmLease = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => leaseService.confirmLease(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lease", id] });
      toast.success("Confirm Lease");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

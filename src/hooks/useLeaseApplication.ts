import { leaseApplicationService } from "@/services/lease_application.service";
import { CreateLeaseApplicationInput } from "@/validations/lease-application.validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateLeaseApplication = () => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeaseApplicationInput) =>
      leaseApplicationService.create(data),
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["lease", propertyId] });
      toast.success("Apply Successfull");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useGetLandlordApplications = () => {
  return useQuery({
    queryKey: ["lease_applications"],
    queryFn: leaseApplicationService.getLandlordApplications,
  });
};

export const useGetApplicationDetails = (id: string) => {
  return useQuery({
    queryKey: ["lease_application", id],
    queryFn: () => leaseApplicationService.getApplicationDetails(id),
  });
};

export const useApproveApplication = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => leaseApplicationService.approveApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lease_application", id] });
      toast.success("Application Approved");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

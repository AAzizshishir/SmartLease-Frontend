import { leaseApplication } from "@/services/lease_application.service";
import { CreateLeaseApplicationInput } from "@/validations/lease-application.validation";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateLeaseApplication = () => {
  //   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeaseApplicationInput) =>
      leaseApplication.create(data),
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["lease", propertyId] });
      toast.success("Unit added successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

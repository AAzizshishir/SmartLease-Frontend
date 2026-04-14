import { unitService } from "@/services/unit.service";
import { CreateUnitInput } from "@/validations/unit.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateUnit = (propertyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUnitInput) => unitService.create(propertyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units", propertyId] });
      toast.success("Unit added successfully");
    },
    onError: (error) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });
};

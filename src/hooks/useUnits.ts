import { unitService } from "@/services/unit.service";
import { CreateUnitInput } from "@/validations/unit.validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateUnit = (propertyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUnitInput) => unitService.create(propertyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units", propertyId] });
      toast.success("Unit added successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useGetUnitDetails = (unitId: string) => {
  return useQuery({
    queryKey: ["unit", unitId],
    queryFn: () => unitService.getById(unitId),
  });
};

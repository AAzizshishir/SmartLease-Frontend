import { propertyService } from "@/services/property.service";
import { ICreateProperty } from "@/types/property.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetProperties = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["properties", params],
    queryFn: () => propertyService.getAll(params),
  });
};

export const usePropertyDetails = (id: string) => {
  return useQuery({
    queryKey: ["properties", id],
    queryFn: () => propertyService.getById(id),
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: propertyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });
};

import { propertyService } from "@/services/property.service";
import { useQuery } from "@tanstack/react-query";

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

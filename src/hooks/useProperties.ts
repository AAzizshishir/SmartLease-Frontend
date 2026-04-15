import { propertyService } from "@/services/property.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// Get All
export const useGetProperties = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["properties", params],
    queryFn: () => propertyService.getAll(params),
  });
};

// Get for landlord
export const useGetMyProperties = (params?: Record<string, unknown>) => {
  return useQuery({
    queryKey: ["properties", params],
    queryFn: () => propertyService.getMy(params),
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
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

// Images
export const useUploadPropertyImages = (propertyId: string) => {
  return useMutation({
    mutationFn: (images: FormData) =>
      propertyService.addImage(propertyId, images),
    onSuccess: () => {
      toast.success("Image added successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useDeletePropertyImage = (propertyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: string) =>
      propertyService.deleteImage(propertyId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties", propertyId] });
      toast.success("Image deleted");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

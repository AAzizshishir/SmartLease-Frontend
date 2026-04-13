import { propertyService } from "@/services/property.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    onError: (error) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });
};

// // Images
// export const useUploadPropertyImages = (propertyId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (files: FileList) => {
//       const formData = new FormData();
//       Array.from(files).forEach((f) => formData.append("images", f));
//       return api.post(`/properties/${propertyId}/images`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
//       toast.success("Images uploaded");
//     },
//     onError: () => toast.error("Upload failed"),
//   });
// };

// export const useDeletePropertyImage = (propertyId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (imageId: string) =>
//       api.delete(`/properties/${propertyId}/images/${imageId}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
//       toast.success("Image deleted");
//     },
//   });
// };

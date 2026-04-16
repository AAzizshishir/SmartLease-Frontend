import { unitService } from "@/services/unit.service";
import { Unit } from "@/types/unit.type";
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

export const useGetAllUnits = () => {
  return useQuery({
    queryKey: ["unit"],
    queryFn: () => unitService.getAll(),
  });
};

export const useGetUnitDetails = (unit_id: string) => {
  return useQuery({
    queryKey: ["unit", unit_id],
    queryFn: () => unitService.getById(unit_id),
  });
};

export const useUpdateUnit = (unitId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Unit>) => unitService.update(unitId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unit", unitId] });
      toast.success("Unit updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

// Image

export const useUploadUnitImages = (unitId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (images: FormData) => unitService.addImage(unitId, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units", unitId] });
      toast.success("Image added successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useDeleteUnitImage = (unitId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: string) => unitService.deleteImage(unitId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units", unitId] });
      toast.success("Image deleted");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

import { getAllUsers, getMe } from "@/app/_actions/user.action";
import { userService } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getMe,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateMe,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["profile"] });
      toast.success("Profile updated");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "ACTIVE" | "BLOCKED";
    }) => userService.updateStatus(id, status),

    onSuccess: (data, variables) => {
      // Invalidate or update cache so UI reflects new status
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    },
  });
};

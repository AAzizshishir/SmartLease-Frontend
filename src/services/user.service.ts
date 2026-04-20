import { api } from "@/lib/axios/http-client";

export const userService = {
  getAllUsers: async () => {
    const { data } = await api.get(`/users`);
    return data;
  },

  getMe: async () => {
    const { data } = await api.get("/users/me");
    return data;
  },

  updateMe: async (payload: { name?: string; image?: File }) => {
    const formData = new FormData();
    if (payload.name) formData.append("name", payload.name);
    if (payload.image) formData.append("image", payload.image);

    const { data } = await api.patch("/users/me", formData);
    return data;
  },

  updateStatus: async (id: string, status: "ACTIVE" | "BLOCKED") => {
    const { data } = await api.patch(`/users/${id}`, { status });
    return data;
  },
};

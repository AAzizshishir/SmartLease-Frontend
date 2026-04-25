"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { cookies } from "next/headers";

export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const usersRes = await fetch(`${API_URL}/users`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    const data = await usersRes.json();
    if (data.success) {
      return data;
    } else {
      return { error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const usersRes = await fetch(`${API_URL}/users/me`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    const data = await usersRes.json();
    if (data.success) {
      return data;
    } else {
      return { error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

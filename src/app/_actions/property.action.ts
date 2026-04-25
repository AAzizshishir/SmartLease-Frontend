"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const propertyAction = {
//   getMy: async (params?: Record<string, unknown>) => {
//     const cookieStore = await cookies();

//     const url = new URL(`${API_URL}/properties/my`);
//     if (params) {
//       Object.entries(params).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           url.searchParams.append(key, String(value));
//         }
//       });
//     }

//     const res = await fetch(url.toString(), {
//       cache: "no-store",
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     const data = await res.json();
//     return data;
//   },
// };

export const getMyProperties = async () => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/properties/my`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();

    if (data.success) {
      return data;
    } else {
      return { data: null, error: { message: data.message || "Failed" } };
    }
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

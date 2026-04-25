import { Roles } from "@/constants/role";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  const sessionData =
    request.cookies.get("__Secure-better-auth.session_data")?.value ||
    request.cookies.get("better-auth.session_data")?.value;

  // If either cookie is missing, redirect
  if (!sessionToken || !sessionData) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Parse session_data (Better Auth stores JSON here)
  let parsedData: any;

  try {
    const decoded = Buffer.from(sessionData, "base64").toString("utf-8");
    parsedData = JSON.parse(decoded);
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Extract role directly from parsedData
  const role = parsedData?.session?.user?.role;
  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based restrictions
  if (role === Roles.admin) {
    if (
      pathname.startsWith("/landlord-dashboard") ||
      pathname.startsWith("/tenant-dashboard") ||
      pathname.startsWith("/add-property") ||
      pathname.startsWith("/create-lease") ||
      pathname.startsWith("/edit-unit") ||
      pathname.startsWith("/lease") ||
      pathname.startsWith("/lease-application") ||
      pathname.startsWith("/property") ||
      pathname.startsWith("/my-application") ||
      pathname.startsWith("/my-lease") ||
      pathname.startsWith("/payment")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (role === Roles.landlord) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/tenant-dashboard") ||
      pathname.startsWith("/users") ||
      pathname.startsWith("/my-application") ||
      pathname.startsWith("/my-lease") ||
      pathname.startsWith("/payment")
    ) {
      return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }
  }

  if (role === Roles.tenant) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/landlord-dashboard") ||
      pathname.startsWith("/users") ||
      pathname.startsWith("/add-property") ||
      pathname.startsWith("/create-lease") ||
      pathname.startsWith("/edit-unit") ||
      pathname.startsWith("/lease") ||
      pathname.startsWith("/lease-application") ||
      pathname.startsWith("/property")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/landlord-dashboard",
    "/landlord-dashboard/:path*",
    "/tenant-dashboard",
    "/tenant-dashboard/:path*",
    "/add-property",
    "/create-lease",
    "/edit-unit",
    "/lease",
    "/lease-application",
    "/users",
    "/property",
    "/my-application",
    "/my-lease",
    "/payment",
  ],
};

import { NavRoute, Route } from "@/types/routes.type";

export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Profile",
        url: "/profile",
      },
      {
        title: "Users",
        url: "/users",
      },
    ],
  },
];

export const adminNavRoutes: NavRoute[] = [
  { title: "Home", url: "/" },
  {
    title: "Units",
    url: "/units",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Dashboard",
    url: "/admin-dashboard",
  },
];

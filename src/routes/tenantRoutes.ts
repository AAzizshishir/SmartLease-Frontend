import { NavRoute, Route } from "@/types/routes.type";

export const tenantRoutes: Route[] = [
  {
    title: "Tenant Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "My Application",
        url: "/my-application",
      },
      {
        title: "My Lease",
        url: "/my-lease",
      },
    ],
  },
];

export const tenantNavRoutes: NavRoute[] = [
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
    url: "/tenant-dashboard",
  },
];

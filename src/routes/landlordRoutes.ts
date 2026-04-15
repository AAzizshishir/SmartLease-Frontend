import { NavRoute, Route } from "@/types/routes.type";

export const landlordRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Property",
        url: "/property",
      },
      {
        title: "Add Property",
        url: "/add-property",
      },
    ],
  },
];

export const landlordNavRoutes: NavRoute[] = [
  { title: "Home", url: "/" },
  {
    title: "Units",
    url: "/unit",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Dashboard",
    url: "/landlord-dashboard",
  },
];

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
        title: "Profile",
        url: "/profile",
      },
      {
        title: "Property",
        url: "/property",
      },
      {
        title: "Add Property",
        url: "/add-property",
      },
      {
        title: "My Application",
        url: "/lease-application",
      },
      {
        title: "All Lease",
        url: "/lease",
      },
    ],
  },
];

export const landlordNavRoutes: NavRoute[] = [
  { title: "Home", url: "/" },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Dashboard",
    url: "/landlord-dashboard",
  },
];

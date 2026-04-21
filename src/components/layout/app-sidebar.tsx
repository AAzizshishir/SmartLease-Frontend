"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types/session.type";
import { Route } from "@/types/routes.type";
import { adminRoutes } from "@/routes/adminRoutes";
import { landlordRoutes } from "@/routes/landlordRoutes";
import { tenantRoutes } from "@/routes/tenantRoutes";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useSession();
  const session = data as AppSession | null;
  const role = session?.user.role?.toLowerCase();
  let routes: Route[] = [];

  switch (role) {
    case "admin":
      routes = adminRoutes;
      break;

    case "landlord":
      routes = landlordRoutes;
      break;

    case "tenant":
      routes = tenantRoutes;
      break;

    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="py-6 hover:text-[#ff9638] dark:hover:bg-linear-to-r from-[#037ec0] to-[#011a2e]">
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

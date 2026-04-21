"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppSession } from "@/types/session.type";
import { signOut, useSession } from "@/lib/auth-client";
import { NavRoute } from "@/types/routes.type";
import { adminNavRoutes } from "@/routes/adminRoutes";
import { landlordNavRoutes } from "@/routes/landlordRoutes";
import { tenantNavRoutes } from "@/routes/tenantRoutes";
import { publicNavRoutes } from "@/routes/publicRoutes";
import { ModeToggle } from "./modeToggle";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data } = useSession();
  const session = data as AppSession | null;
  const role = session?.user?.role;

  let routes: NavRoute[] = [];

  switch (role) {
    case "ADMIN":
      routes = adminNavRoutes;
      break;

    case "LANDLORD":
      routes = landlordNavRoutes;
      break;

    case "TENANT":
      routes = tenantNavRoutes;
      break;

    default:
      routes = publicNavRoutes;
      break;
  }

  return (
    <nav className="shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#ff9638]">
          SmartLease
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-6 lg:flex ">
          {routes.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="text-sm font-medium hover:text-[#ff9638]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden gap-3 lg:flex">
          <ModeToggle />
          {session ? (
            <>
              <Button
                onClick={() => signOut()}
                className="cursor-pointer bg-btn-primary text-black"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="rounded-md border border-border-color hover:bg-btn-primary text-btn-text  px-3 py-1 text-sm font-medium bg-transparent">
                <Link href="/login">Login</Link>
              </Button>
              <Button className="rounded-md bg-btn-primary text-black hover:border-border-color  px-3 py-1 text-sm font-medium">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t px-6 py-4">
          <nav className="flex flex-col gap-4 ">
            {routes.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-base font-medium hover:text-[#ff9638]"
                onClick={() => setMobileOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <ModeToggle />
            {session ? (
              <>
                <Button
                  onClick={() => signOut()}
                  className="cursor-pointer bg-btn-primary hover:bg-[#fd8924] text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="rounded-md border border-border-color hover:bg-btn-primary text-btn-text  px-3 py-1 text-sm font-medium bg-transparent">
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="rounded-md bg-btn-primary hover:bg-transparent text-btn-text hover:border-border-color  px-3 py-1 text-sm font-medium">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

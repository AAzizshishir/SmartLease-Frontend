"use client";

import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types/session.type";

export default function RoleBasedContent({
  admin,
  landlord,
  tenant,
}: {
  admin: React.ReactNode;
  landlord: React.ReactNode;
  tenant: React.ReactNode;
}) {
  const { data } = useSession();
  const session = data as AppSession | null;
  const role = session?.user.role?.toLowerCase();

  if (role === "admin") return <>{admin}</>;
  if (role === "landlord") return <>{landlord}</>;
  if (role === "tenant") return <>{tenant}</>;
}

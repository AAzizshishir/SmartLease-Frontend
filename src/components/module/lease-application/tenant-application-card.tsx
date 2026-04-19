"use client";

import { CardSkeletonGrid } from "@/components/shared/card-skeleton-grid";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetTenantApplication,
  useTenantCancelApplication,
} from "@/hooks/useLeaseApplication";
import { LeaseApplication } from "@/types/leaseApplication.type";
import Link from "next/link";

const TenantApplicationCard = () => {
  const { data, isLoading } = useGetTenantApplication();

  const { mutate, isPending } = useTenantCancelApplication();

  const applications = data?.data;
  console.log(applications);
  if (isLoading) return <CardSkeletonGrid count={3} />;

  if (!applications) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12">
          <p className="text-muted-foreground text-sm">No Applications Yet</p>
          <Button asChild size="sm">
            <Link href="/units">Browse Units</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CardHeader>
        <CardTitle>Application</CardTitle>
      </CardHeader>

      {applications.map((application: LeaseApplication) => (
        <div key={application.id}>
          <CardContent className="space-y-2 border-b py-4">
            <div>
              <p className="font-semibold">Unit:</p>
              <p>
                {application.unit.unit_number} (Floor {application.unit.floor})
              </p>
            </div>

            <div>
              <p className="font-semibold">Property:</p>
              <p>
                {application.unit.property.name},{" "}
                {application.unit.property.city}
              </p>
            </div>

            <div>
              <p className="font-semibold">Monthly Rent:</p>
              <p>{application.unit.monthly_rent} BDT</p>
            </div>

            <div>
              <p className="font-semibold">Status:</p>
              <p className="capitalize">{application.status}</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            {application.status === "pending" ? (
              <Button
                className="bg-red-500 text-white"
                onClick={() => mutate(application.id)}
              >
                {isPending ? "Canceling..." : "Cancel"}
              </Button>
            ) : application.status === "cancelled" ? (
              <p className="text-sm italic">
                This application is {application.status}
              </p>
            ) : application.status === "rejected" ? (
              <p className="text-sm italic">
                This application is {application.status}. Because{" "}
                {application.rejection_reason}
              </p>
            ) : application.status === "expired" ? (
              <p className="text-sm italic">
                This application is {application.status}
              </p>
            ) : (
              <p className="text-sm italic">
                This application is {application.status}
              </p>
            )}
          </CardFooter>
        </div>
      ))}
    </Card>
  );
};

export default TenantApplicationCard;

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
import { useGetTenantApplication } from "@/hooks/useLeaseApplication";
import { LeaseApplication } from "@/types/leaseApplication.type";

const TenantApplicationCard = () => {
  const { data, isLoading } = useGetTenantApplication();

  const applications = data?.data;
  console.log(applications);

  if (isLoading) return <CardSkeletonGrid count={3} />;

  return (
    <Card className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CardHeader>
        <CardTitle>Application</CardTitle>
      </CardHeader>
      {applications.map((application: LeaseApplication) => (
        <CardContent key={application.id} className="space-y-2 border-b py-4">
          <div>
            <p className="font-semibold">Unit:</p>
            <p>
              {application.unit.unit_number} (Floor {application.unit.floor})
            </p>
          </div>

          <div>
            <p className="font-semibold">Property:</p>
            <p>
              {application.unit.property.name}, {application.unit.property.city}
            </p>
          </div>

          <div>
            <p className="font-semibold">Tenant:</p>
            <p>
              {application.tenant.name} ({application.tenant.email})
            </p>
          </div>

          <div>
            <p className="font-semibold">Monthly Rent:</p>
            <p>{application.unit.monthly_rent} BDT</p>
          </div>

          {/* <div>
      <p className="font-semibold">Deposit Status:</p>
      <p>{application.}</p>
    </div> */}

          <div className="flex justify-start gap-2 pt-2">
            <Button className="bg-red-500 text-white">Cancel</Button>
          </div>
        </CardContent>
      ))}
    </Card>
  );
};

export default TenantApplicationCard;

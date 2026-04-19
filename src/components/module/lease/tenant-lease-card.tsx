"use client";

import { CardSkeletonGrid } from "@/components/shared/card-skeleton-grid";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useConfirmLease, useGetTenantLease } from "@/hooks/useLease";

const TenantLeaseCard = () => {
  const { data, isLoading } = useGetTenantLease();

  const id = data?.data?.id;

  const { mutate, isPending } = useConfirmLease(id);

  if (isLoading) return <CardSkeletonGrid count={1} />;

  const lease = data?.data;

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>My Lease</CardTitle>
          <CardDescription>
            Unit {lease.unit.unit_number} ({lease.unit.type}) -{" "}
            {lease.unit.property.name}, {lease.unit.property.city}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">Tenant:</p>
            <p>
              {lease.tenant?.name} ({lease.tenant?.email})
            </p>
          </div>

          <div>
            <p className="font-semibold">Landlord:</p>
            <p>
              {lease.unit.property.landlord?.name} (
              {lease.unit.property.landlord?.email})
            </p>
          </div>

          <div>
            <p className="font-semibold">Property Address:</p>
            <p>{lease.unit.property.address}</p>
          </div>

          <div>
            <p className="font-semibold">Monthly Rent:</p>
            <p>{lease.monthly_rent} BDT</p>
          </div>

          <div>
            <p className="font-semibold">Security Deposit:</p>
            <p>{lease.security_deposit} BDT</p>
          </div>

          <div>
            <p className="font-semibold">Lease Period:</p>
            <p>
              {new Date(lease.start_date).toLocaleDateString()} →{" "}
              {new Date(lease.end_date).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="font-semibold">Status:</p>
            <p className="capitalize">{lease.status.replace("_", " ")}</p>
          </div>

          <div>
            <p className="font-semibold">Deposit Status:</p>
            <p className="capitalize">{lease.deposit_status}</p>
          </div>

          <div>
            <p className="font-semibold">Late Fee:</p>
            <p>
              {lease.late_fee_amount} BDT after {lease.late_fee_after_days} days
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Download Document</Button>
          {lease.status === "pending_tenant" && (
            <>
              <Button className="bg-green-500" onClick={() => mutate()}>
                {isPending ? "Confirming..." : "Confirm"}
              </Button>
              <Button className="bg-red-500 text-white">Reject</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TenantLeaseCard;

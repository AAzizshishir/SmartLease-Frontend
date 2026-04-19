"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Lease } from "@/types/lease.type";
import { useGetLeaseDetails } from "@/hooks/useLease";
import { useParams } from "next/navigation";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton-grid";

interface LeaseDetailsProps {
  lease: Lease;
}

const LeaseDetailsCard = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetLeaseDetails(id as string);

  if (isLoading) return <CardSkeletonGrid count={1} />;

  const lease = data?.data;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Lease Details</CardTitle>
        <CardDescription>
          Unit {lease.unit.unit_number} - {lease.unit.property.name} (
          {lease.unit.property.city})
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="font-semibold">Tenant:</p>
          <p>
            {lease.tenant.name} ({lease.tenant.email})
          </p>
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
    </Card>
  );
};

export default LeaseDetailsCard;

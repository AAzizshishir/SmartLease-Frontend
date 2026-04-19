"use client";

import { CardSkeletonGrid } from "@/components/shared/card-skeleton-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useConfirmLease, useGetTenantLease } from "@/hooks/useLease";
import { format } from "date-fns";
import Link from "next/link";
import { ConfirmLeaseButton } from "./confirm-lease-button";
import { Lease } from "@/types/lease.type";
import DepositPayment from "../payment/deposit-payment";

const TenantLeaseCard = () => {
  const { data, isLoading } = useGetTenantLease();

  const lease = data?.data as Lease;

  if (isLoading) return <CardSkeletonGrid count={1} />;

  if (!lease) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12">
          <p className="text-muted-foreground text-sm">No active lease</p>
          <Button asChild size="sm">
            <Link href="/my-application">See Application</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (lease.status === "pending_tenant") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Lease ready for review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Unit</span>
              <span>
                {lease.unit.unit_number} — {lease.unit.property.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Start date</span>
              <span>{format(new Date(lease.start_date), "dd MMM yyyy")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">End date</span>
              <span>{format(new Date(lease.end_date), "dd MMM yyyy")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly rent</span>
              <span>{Number(lease.monthly_rent).toLocaleString()} BDT</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Security deposit</span>
              <span>{Number(lease.security_deposit).toLocaleString()} BDT</span>
            </div>
          </div>
          <ConfirmLeaseButton leaseId={lease.id} />
        </CardContent>
      </Card>
    );
  }
  // active lease
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">My lease</CardTitle>
          <Badge variant="default">Active</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Lease Info */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Unit</span>
            <span className="font-medium">
              {lease.unit.unit_number} — {lease.unit.property.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Address</span>
            <span>
              {lease.unit.property.name}, {lease.unit.property.city}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Period</span>
            <span>
              {format(new Date(lease.start_date), "MMM yyyy")} →{" "}
              {format(new Date(lease.end_date), "MMM yyyy")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monthly rent</span>
            <span className="font-medium">
              {Number(lease.monthly_rent).toLocaleString()} BDT
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Due on</span>
            <span>{lease.payment_due_day}th every month</span>
          </div>
        </div>

        <Separator />

        {/* Deposit Section */}
        <DepositPayment />

        <Separator />

        {/* Landlord */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Landlord
          </p>
          <p className="text-sm font-medium">
            {lease.unit.property.landlord.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {lease.unit.property.landlord.email}
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href="/payment">View all payments</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TenantLeaseCard;

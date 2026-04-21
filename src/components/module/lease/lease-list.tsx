"use client";

import { ListSkeletonGrid } from "@/components/shared/list-skeleton-grid";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetLeases } from "@/hooks/useLease";
import { Lease } from "@/types/lease.type";
import Link from "next/link";

const LeaseList = () => {
  const { data, isLoading } = useGetLeases();

  if (isLoading) return <ListSkeletonGrid count={5} />;

  const leases = data?.data;

  if (!data) return <h2>You have no active Lease</h2>;

  console.log(data);
  return (
    <div className="bg-transparent">
      <Table>
        <TableCaption>All Leases</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Unit</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Monthly Rent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leases.map((lease: Lease) => (
            <TableRow key={lease.id}>
              <TableCell>{lease.unit.unit_number}</TableCell>
              <TableCell>
                {lease.unit.property.name} ({lease.unit.property.city})
              </TableCell>
              <TableCell>{lease.tenant.name}</TableCell>
              <TableCell>{lease.monthly_rent}</TableCell>
              <TableCell>{lease.status}</TableCell>
              <TableCell>
                <Button>
                  <Link href={`/lease/${lease.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaseList;

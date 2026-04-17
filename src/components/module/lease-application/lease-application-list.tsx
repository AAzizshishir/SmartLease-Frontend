"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetLandlordApplications } from "@/hooks/useLeaseApplication";
import { LeaseApplication } from "@/types/leaseApplication.type";
import Link from "next/link";

const LeaseApplicationList = () => {
  const { data, isLoading } = useGetLandlordApplications();
  const applications = data?.data;

  if (isLoading)
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-full rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );

  if (!applications) return <h2>No Application</h2>;

  return (
    <div>
      <Table>
        <TableCaption>All Lease Application</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Property City</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Unit Number</TableHead>
            <TableHead>Tenant Name</TableHead>
            <TableHead>Tenant Profession</TableHead>
            <TableHead>Tenant Income</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application: LeaseApplication) => (
            <TableRow key={application.id}>
              <TableCell>{application.unit.property.name}</TableCell>
              <TableCell>{application.unit.property.city}</TableCell>
              <TableCell>{application.unit.floor}</TableCell>
              <TableCell>{application.unit.unit_number}</TableCell>
              <TableCell>{application.tenant.name}</TableCell>
              <TableCell>{application.profession}</TableCell>
              <TableCell>{application.monthly_income}</TableCell>
              <TableCell>
                <Button>
                  <Link href={`/lease-application/${application.id}`}>
                    Details
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaseApplicationList;

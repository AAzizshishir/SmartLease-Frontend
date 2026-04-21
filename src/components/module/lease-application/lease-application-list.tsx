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
import { useGetLandlordApplications } from "@/hooks/useLeaseApplication";
import { LeaseApplication } from "@/types/leaseApplication.type";
import Link from "next/link";

const LeaseApplicationList = () => {
  const { data, isLoading } = useGetLandlordApplications();
  const applications = data?.data;

  if (isLoading) return <ListSkeletonGrid count={10} />;

  if (applications.length === 0)
    return <h2 className="text-center mt-10">No Applications Yet</h2>;

  return (
    <div>
      <Table>
        <TableCaption>All Lease Application</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Property City</TableHead>
            <TableHead>Unit Number</TableHead>
            <TableHead>Tenant Name</TableHead>
            <TableHead>Tenant Profession</TableHead>
            <TableHead>Tenant Income</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application: LeaseApplication) => (
            <TableRow key={application.id}>
              <TableCell>{application.unit.property.name}</TableCell>
              <TableCell>{application.unit.property.city}</TableCell>
              <TableCell>{application.unit.unit_number}</TableCell>
              <TableCell>{application.tenant.name}</TableCell>
              <TableCell>{application.profession}</TableCell>
              <TableCell>{application.monthly_income}</TableCell>
              <TableCell>{application.status}</TableCell>
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

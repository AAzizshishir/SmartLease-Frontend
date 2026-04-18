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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useApproveApplication,
  useGetApplicationDetails,
} from "@/hooks/useLeaseApplication";
import { LeaseApplication } from "@/types/leaseApplication.type";
import Link from "next/link";
import { useParams } from "next/navigation";

const ApplicationDetailsCard = () => {
  const { application_id } = useParams();

  const { data, isLoading } = useGetApplicationDetails(
    application_id as string,
  );
  const { mutate, isPending } = useApproveApplication(application_id as string);

  if (isLoading) return <CardSkeletonGrid count={1} />;

  if (!data) return <h2>No application found</h2>;
  const {
    id,
    // unit_id,
    // lease_id,
    unit,
    status,
    tenant,
    has_pets,
    profession,
    monthly_income,
    preferred_move_in,
    num_occupants,
    income_proof_url,
    message,
    nid_url,
    rejection_reason,
    work_place_address,
    created_at,
    expires_at,
  } = data?.data as LeaseApplication;

  return (
    <Card className="max-w-7xl mx-auto my-10">
      <CardHeader>
        <CardTitle>
          {tenant.name} ({status})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>Email:</strong> {tenant.email}
        </p>

        <p>
          <strong>Property:</strong> {unit.property.name} ({unit.property.city})
        </p>

        <p>
          <strong>Unit:</strong> {unit.unit_number}
        </p>

        <p>
          <strong>Monthly Rent:</strong> {unit.monthly_rent} BDT
        </p>

        <p>
          <strong>Profession:</strong> {profession}
        </p>

        <p>
          <strong>Monthly Income:</strong> {monthly_income} BDT
        </p>

        <p>
          <strong>Move-in Date:</strong>{" "}
          {new Date(preferred_move_in).toLocaleDateString()}
        </p>

        <p>
          <strong>Occupants:</strong> {num_occupants}
        </p>

        <p>
          <strong>Has Pets:</strong> {has_pets ? "Yes" : "No"}
        </p>

        {work_place_address && (
          <p>
            <strong>Work Address:</strong> {work_place_address}
          </p>
        )}

        {message && (
          <p>
            <strong>Message:</strong> {message}
          </p>
        )}

        {nid_url && (
          <p>
            <strong>NID:</strong>{" "}
            <Link
              href={nid_url}
              target="_blank"
              className="text-blue-500 underline"
            >
              View
            </Link>
          </p>
        )}

        {income_proof_url && (
          <p>
            <strong>Income Proof:</strong>{" "}
            <Link
              href={income_proof_url}
              target="_blank"
              className="text-blue-500 underline"
            >
              View
            </Link>
          </p>
        )}

        {rejection_reason && (
          <p>
            <strong>Rejection Reason: </strong> {rejection_reason}
          </p>
        )}

        <p>
          <strong>Applied At:</strong> {new Date(created_at).toLocaleString()}
        </p>

        <p>
          <strong>Expires At:</strong> {new Date(expires_at).toLocaleString()}
        </p>
      </CardContent>
      {status === "approved" ? (
        <p className="text-xl m-4">Approved</p>
      ) : status === "rejected" ? (
        <p className="text-xl m-4">Rejected</p>
      ) : (
        <CardFooter className="flex gap-2">
          <Button className="bg-green-500" onClick={() => mutate()}>
            {isPending ? "Approving..." : "Approve"}
          </Button>
          <Button className="bg-red-500">Reject</Button>
        </CardFooter>
      )}
      {status === "approved" && (
        <Button>
          <Link href={`/lease/${id}`}>Create Lease</Link>
        </Button>
      )}
    </Card>
  );
};

export default ApplicationDetailsCard;

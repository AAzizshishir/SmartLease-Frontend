"use client";

import { useParams } from "next/navigation";
import { useGetApplicationDetails } from "@/hooks/useLeaseApplication";
import { FormSkeleton } from "@/components/shared/form-skeleton";
import LeaseForm from "./lease-form";

const LeaseCreateForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationDetails(id as string);

  if (isLoading) return <FormSkeleton />;
  if (!data?.data) return <p>Application not found</p>;

  return <LeaseForm application={data.data} />;
};

export default LeaseCreateForm;

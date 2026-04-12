"use client";

import { usePropertyDetails } from "@/hooks/useProperties";
import { useParams } from "next/navigation";
import UnitsList from "./units-list";

const PropertyDetailsCard = () => {
  // { params }: { params: { id: string } }
  // const id = params.id;
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = usePropertyDetails(id);

  console.log(data.data.units);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <UnitsList units={data?.data?.units || []} />
    </div>
  );
};

export default PropertyDetailsCard;

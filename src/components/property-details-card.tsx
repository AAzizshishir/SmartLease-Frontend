"use client";

import { usePropertyDetails } from "@/hooks/useProperties";
import { useParams } from "next/navigation";
import UnitsList from "./units-list";

const PropertyDetailsCard = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = usePropertyDetails(id);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {data?.data?.units.length === 0 ? (
        <p>No Units in this property</p>
      ) : (
        <UnitsList units={data?.data?.units || []} />
      )}
    </div>
  );
};

export default PropertyDetailsCard;

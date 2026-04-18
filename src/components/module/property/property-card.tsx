"use client";

import { useGetMyProperties } from "@/hooks/useProperties";
import Image from "next/image";
import { Property } from "@/types/property.type";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton-grid";

const PropertyCard = () => {
  const { data, isLoading } = useGetMyProperties();
  // console.log(data?.data.data);
  const property = data?.data?.data;
  console.log(property);

  if (isLoading) return <CardSkeletonGrid count={6} />;

  if (!property) return <div>No properties</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {property?.map((property: Property) => (
        <div
          key={property.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
        >
          {/* Image */}
          {property.images?.length > 0 ? (
            <Image
              src={property?.images[0].url}
              alt={property.name}
              className="w-full h-48 object-cover rounded-t-lg"
              width={400}
              height={400}
            />
          ) : (
            <div className="w-full h-48 bg-muted flex flex-col items-center justify-center rounded-t-lg gap-2">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">No image</p>
            </div>
          )}

          {/* Content */}
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold">{property.name}</h2>

            <p className="text-sm text-gray-500 capitalize">
              {property.type} • {property.total_units} Units
            </p>

            <p className="text-sm text-gray-500">
              {property.address}, {property.city}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(property.created_at).toLocaleDateString()}
            </p>

            <Button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              <Link href={`/property/${property.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;

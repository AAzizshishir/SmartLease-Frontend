"use client";

import { useGetProperties } from "@/hooks/useProperties";
import Image from "next/image";
import { Button } from "./ui/button";
import { Property } from "@/types/property.type";
import Link from "next/link";

const PropertyCard = () => {
  const { data, isLoading } = useGetProperties();
  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.data?.map((property: Property) => (
        <div
          key={property.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
        >
          {/* Image */}
          <Image
            src={property.image}
            alt={property.name}
            className="w-full h-48 object-cover"
            width={400}
            height={400}
          />

          {/* Content */}
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold">{property.name}</h2>

            <p className="text-sm text-gray-500 capitalize">
              {property.type} • {property.total_units} Units
            </p>

            <p className="text-sm text-gray-600 line-clamp-2">
              {property.description}
            </p>

            <p className="text-sm text-gray-500">
              {property.address}, {property.city}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(property.created_at).toLocaleDateString()}
            </p>

            <Button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              <Link href={`/property/${property.id}`}>View Units</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;

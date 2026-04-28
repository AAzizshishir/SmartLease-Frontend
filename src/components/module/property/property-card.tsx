"use client";

import { useGetMyProperties } from "@/hooks/useProperties";
import Image from "next/image";
import { Property } from "@/types/property.type";
import Link from "next/link";
import { Building2, Calendar, Home, ImageIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton-grid";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PropertyCard = () => {
  const { data, isLoading } = useGetMyProperties();
  const property = data?.data?.data;

  if (isLoading) return <CardSkeletonGrid count={3} />;

  if (!property) return <div>No properties</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {property?.map((property: Property) => (
        <div
          key={property.id}
          className=" border rounded-md shadow-md overflow-hidden hover:shadow-xl transition"
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
          <div className="p-4 space-y-2 border-[#024374] bg-transparent">
            <h1 className="flex gap-3">
              <Home className="w-5 h-5" /> {property.name}
            </h1>
            <h3 className="flex gap-3">
              <Building2 className="w-5 h-5" />
              {property.type} • {property.total_units} Units
            </h3>
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {property.address}, {property.city}
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-4 h-4" />
              Added on {new Date(property.created_at).toLocaleDateString()}
            </p>
            <Button className="w-full mt-2 transition">
              <Link href={`/property/${property.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;

"use client";

import { usePropertyDetails } from "@/hooks/useProperties";
import { useParams, useRouter } from "next/navigation";
import PropertyImageCard from "./property-images-card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Building2,
  Home,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PropertyUnitsCard from "./property-units-card";

const PropertyDetailsCard = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data, isLoading } = usePropertyDetails(id);

  const property = data?.data;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="gap-1 text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Images Section */}
      <PropertyImageCard propertyId={id} images={property.images ?? []} />

      {/* Property Info Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{property.name}</CardTitle>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="text-sm">
                  {property.address}, {property.city}
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {property.type}
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-4 space-y-4">
          {/* Stats */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {property.total_units} total units
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm capitalize">{property.type}</span>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <p className="text-sm text-muted-foreground">
              {property.description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Pencil className="h-3 w-3" />
              Edit
            </Button>
            <Button size="sm" variant="destructive" className="gap-1">
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Units Section */}
      <PropertyUnitsCard propertyId={id} data={data.data} />
    </div>
  );
};

export default PropertyDetailsCard;

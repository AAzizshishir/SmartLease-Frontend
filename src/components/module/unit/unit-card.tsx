"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllUnits } from "@/hooks/useUnits";
import { Unit } from "@/types/unit.type";
import {
  ImageIcon,
  BedDouble,
  Bath,
  Ruler,
  Building2,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UnitCard = () => {
  const { data } = useGetAllUnits();
  const units = data?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {units?.map((unit: Unit) => (
          <Card
            key={unit.id}
            className="bg-transparent border border-border/50 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-2xl transition duration-300"
          >
            {/* Image Section */}
            <div className="relative w-full h-52 overflow-hidden">
              {unit.images?.length > 0 ? (
                <Image
                  src={unit.images[1].url}
                  alt="Unit Image"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              ) : (
                <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">No image</p>
                </div>
              )}

              {/* Top Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Type Badge */}
              <Badge className="absolute top-3 left-3 bg-white/90 text-black backdrop-blur">
                {unit.type}
              </Badge>

              {/* Price on image */}
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-lg font-semibold">BDT {unit.monthly_rent}</p>
                <span className="text-xs opacity-80">per month</span>
              </div>
            </div>

            {/* Content */}
            <CardContent>
              {/* Title */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">
                  Unit {unit.unit_number}
                </h2>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" /> Floor {unit.floor}
                </span>
              </div>

              {/* Info Row */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  Area Sqt {unit.area_sqft} sqft
                </span>
                <span className="flex items-center gap-1">
                  <BedDouble className="h-4 w-4" />
                  Bedrooms {unit.bedrooms || "-"}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  Bathrooms {unit.bathrooms || "-"}
                </span>
              </div>

              {/* Furnishing */}
              <p className="text-sm mt-2 text-muted-foreground capitalize">
                {unit.furnishing_status?.replace("_", " ")}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  Deposit: {unit.security_deposit_months} months
                </span>

                <Button size="sm" className="rounded-xl" asChild>
                  <Link href={`/units/${unit.id}`}>Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UnitCard;

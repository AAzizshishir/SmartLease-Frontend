"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Unit } from "@/types/unit.type";

const UnitsList = ({ units }: { units: Unit[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {units.map((unit) => (
        <Card key={unit.id} className="rounded-2xl shadow-sm">
          <CardContent className="p-4 space-y-3">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Unit {unit.unit_number}</h3>
              <Badge
                variant={unit.status === "vacant" ? "default" : "secondary"}
              >
                {unit.status}
              </Badge>
            </div>

            {/* Type */}
            <p className="text-sm text-gray-500 capitalize">{unit.type}</p>

            {/* Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                {unit.bedrooms} Beds • {unit.bathrooms} Baths
              </p>
              <p>
                Floor {unit.floor} • {unit.area_sqft} sqft
              </p>
              <p> {unit.has_parking ? "Parking Available" : "No Parking"}</p>
            </div>

            {/* Rent */}
            <div className="text-lg font-bold text-blue-600">
              ৳ {unit.monthly_rent}/month
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UnitsList;

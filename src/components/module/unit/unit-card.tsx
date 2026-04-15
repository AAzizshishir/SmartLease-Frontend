"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllUnits } from "@/hooks/useUnits";
import { Unit } from "@/types/unit.type";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UnitCard = () => {
  const { data, isLoading } = useGetAllUnits();
  const units = data?.data;
  const meta = data?.meta;
  console.log("units", units);
  console.log("meta", meta);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl font-medium">
            Units
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {units?.map((unit: Unit) => (
            <div key={unit.id}>
              {/* Image */}
              {unit.images?.length > 0 ? (
                <Image
                  src={unit?.images[0].url}
                  alt={"Unit Image"}
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
                <h2>Unit No. {unit.unit_number}</h2>
                <h3>Floor: {unit.floor}</h3>
                <p>Area: {unit.area_sqft}</p>
                <p>Type: {unit.type}</p>
                <p>{unit.furnishing_status}</p>
                <p>Monthly Rent: {unit.monthly_rent} BDT</p>
                <p>Security Deposit Months:{unit.security_deposit_months}</p>
                <Button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  <Link href={`/units/${unit.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitCard;

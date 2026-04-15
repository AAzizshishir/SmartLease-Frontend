"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUnitDetails } from "@/hooks/useUnits";
import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types/session.type";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const UnitDetailsCard = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.unit_id as string;
  console.log(id);
  const { data, isLoading } = useGetUnitDetails(id);
  console.log(data);
  const unit = data?.data;

  const { data: sessionData } = useSession();
  const session = sessionData as AppSession | null;
  const role = session?.user.role;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
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
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>
            Unit {unit.unit_number} - {unit.type}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Floor:</strong> {unit.floor}
          </p>
          <p>
            <strong>Bedrooms:</strong> {unit.bedrooms}
          </p>
          <p>
            <strong>Bathrooms:</strong> {unit.bathrooms}
          </p>
          <p>
            <strong>Balconies:</strong> {unit.balconies}
          </p>
          <p>
            <strong>Area:</strong> {unit.area_sqft} sqft
          </p>
          <p>
            <strong>Furnishing:</strong> {unit.furnishing_status}
          </p>
          <p>
            <strong>Rent:</strong> {unit.monthly_rent} BDT
          </p>
          <p>
            <strong>Deposit:</strong> {unit.security_deposit_months} months
          </p>
          <p>
            <strong>Status:</strong> {unit.status}
          </p>
          <p>
            <strong>Pet Friendly:</strong> {unit.is_pet_friendly ? "Yes" : "No"}
          </p>
          <p>
            <strong>Amenities:</strong>
            {unit.has_ac && " AC,"}
            {unit.has_gas && " Gas,"}
            {unit.has_generator && " Generator,"}
            {unit.has_lift && " Lift,"}
            {unit.has_parking && " Parking,"}
            {unit.has_water_supply && " Water Supply"}
          </p>
          <p>
            <small>
              Created at: {new Date(unit.created_at).toLocaleDateString()}
            </small>
          </p>
        </CardContent>
        {role === "LANDLORD" && (
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Edit Unit</Button>
            <Button variant="destructive">Delete Unit</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default UnitDetailsCard;

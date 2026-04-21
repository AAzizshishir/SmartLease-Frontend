"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUnitDetails } from "@/hooks/useUnits";
import { useSession } from "@/lib/auth-client";
import { AppSession } from "@/types/session.type";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import UnitImageCard from "./unit-image-card";
import LandlordActions from "@/features/landlord/landlord-actions";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeletonGrid } from "@/components/shared/card-skeleton-grid";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const UnitDetailsCard = () => {
  const params = useParams();
  const router = useRouter();
  const unitId = params.unit_id as string;
  const { data, isLoading } = useGetUnitDetails(unitId);
  const unit = data?.data;

  const { data: sessionData } = useSession();
  const session = sessionData as AppSession | null;
  const role = session?.user.role;

  if (isLoading) return <CardSkeletonGrid count={1} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
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
      <UnitImageCard unitId={unitId} unit={unit} />

      <Card className="shadow-md border rounded-lg bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Unit {unit?.unit_number} — Floor {unit?.floor}
          </CardTitle>
          <CardDescription>
            {unit?.type?.toUpperCase()} • {unit?.area_sqft} sqft
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex gap-1">
            <p className="font-semibold">Bedrooms :</p>
            <Badge variant="outline">{unit?.bedrooms}</Badge>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold">Bathrooms :</p>
            <Badge variant="outline">{unit?.bathrooms}</Badge>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold">Balconies :</p>
            <Badge variant="outline">{unit?.balconies}</Badge>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold">Furnishing :</p>
            <span className="text-gray-700 dark:text-gray-300">
              {unit?.furnishing_status}
            </span>
          </div>
          <div>
            <p className="font-semibold">Rent :</p>
            <span className="text-[#ff9638] font-medium">
              {unit?.monthly_rent} BDT
            </span>
          </div>
          <div>
            <p className="font-semibold">Deposit :</p>
            <span>{unit?.security_deposit_months} months</span>
          </div>
          <div>
            <p className="font-semibold">Status :</p>
            <Badge
              variant={unit?.status === "vacant" ? "default" : "secondary"}
            >
              {unit?.status}
            </Badge>
          </div>
          <div>
            <p className="font-semibold">Pet Friendly :</p>
            <span>{unit?.is_pet_friendly ? "Yes" : "No"}</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <p className="font-semibold">Amenities :</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {unit?.has_ac && <Badge>AC</Badge>}
                {unit?.has_gas && <Badge>Gas</Badge>}
                {unit?.has_generator && <Badge>Generator</Badge>}
                {unit?.has_lift && <Badge>Lift</Badge>}
                {unit?.has_parking && <Badge>Parking</Badge>}
                {unit?.has_water_supply && <Badge>Water</Badge>}
              </div>
            </div>
            <small className="text-gray-500">
              Created at: {new Date(unit?.created_at).toLocaleDateString()}
            </small>
          </div>
          <div>
            {role === "LANDLORD" ? (
              <LandlordActions unitId={unit?.id} />
            ) : role === "TENANT" ? (
              <div>
                <Button>
                  <Link href={`/units/${unitId}/apply`}>Apply</Link>
                </Button>
              </div>
            ) : (
              <Button>
                <Link href={"/login"}>Please Login for apply</Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnitDetailsCard;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Property } from "@/types/property.type";
import { Unit } from "@/types/unit.type";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const PropertyUnitsCard = ({
  propertyId,
  data,
}: {
  propertyId: string;
  data: Property;
}) => {
  const router = useRouter();
  console.log(data, "from property units card");

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Units</CardTitle>
          <Button size="sm" className="gap-1">
            <Plus className="h-3 w-3" />
            Add unit
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {data?.units.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No units yet. Add your first unit.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.units.map((unit: Unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">
                    {unit.unit_number}
                  </TableCell>
                  <TableCell>{unit.floor}</TableCell>
                  <TableCell className="capitalize">
                    {unit.type.replace("_", " ")}
                  </TableCell>
                  <TableCell>
                    ৳ {Number(unit.monthly_rent).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={"default"} className="capitalize text-xs">
                      {unit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        router.push(
                          `/landlord/properties/${propertyId}/units/${unit.id}`,
                        )
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyUnitsCard;

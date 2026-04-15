"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUnitDetails, useUpdateUnit } from "@/hooks/useUnits";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const AMENITIES = [
  { name: "has_parking", label: "Parking" },
  { name: "has_ac", label: "AC" },
  { name: "has_lift", label: "Lift" },
  { name: "has_gas", label: "Gas" },
  { name: "has_generator", label: "Generator" },
  { name: "has_water_supply", label: "Water supply" },
  { name: "is_pet_friendly", label: "Pet friendly" },
] as const;

const EditUnitCard = () => {
  const { unit_id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetUnitDetails(unit_id as string);
  const { mutate, isPending } = useUpdateUnit(unit_id as string);
  const unit = data?.data;
  const form = useForm({
    defaultValues: {
      type: unit?.type || "studio",
      furnishing_status: unit?.furnishing_status || "unfurnished",
      area_sqft: unit?.area_sqft || "",
      bedrooms: unit?.bedrooms ?? 0,
      bathrooms: unit?.bathrooms ?? 1,
      balconies: unit?.balconies ?? 0,
      monthly_rent: unit?.monthly_rent || "",
      security_deposit_months: unit?.security_deposit_months ?? 2,
      has_parking: unit?.has_parking ?? false,
      has_ac: unit?.has_ac ?? false,
      has_lift: unit?.has_lift ?? false,
      has_gas: unit?.has_gas ?? false,
      has_generator: unit?.has_generator ?? false,
      has_water_supply: unit?.has_water_supply ?? true,
      is_pet_friendly: unit?.is_pet_friendly ?? false,
      available_from: unit?.available_from,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => router.back(),
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="gap-1 text-muted-foreground mb-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Edit unit</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            id="edit-unit-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Type + Furnishing */}
              <div className="grid grid-cols-2 gap-3">
                <form.Field name="type">
                  {(field) => (
                    <Field>
                      <Label>Type</Label>
                      <select
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value as
                              | "studio"
                              | "one_bed"
                              | "two_bed"
                              | "three_bed"
                              | "four_bed"
                              | "penthouse",
                          )
                        }
                        className="border border-gray-300 rounded-md p-2 w-full text-sm"
                      >
                        <option value="studio">Studio</option>
                        <option value="one_bed">1 Bed</option>
                        <option value="two_bed">2 Bed</option>
                        <option value="three_bed">3 Bed</option>
                        <option value="four_bed">4 Bed</option>
                        <option value="penthouse">Penthouse</option>
                      </select>
                    </Field>
                  )}
                </form.Field>

                <form.Field name="furnishing_status">
                  {(field) => (
                    <Field>
                      <Label>Furnishing</Label>
                      <select
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value as
                              | "unfurnished"
                              | "semi_furnished"
                              | "fully_furnished",
                          )
                        }
                        className="border border-gray-300 rounded-md p-2 w-full text-sm"
                      >
                        <option value="unfurnished">Unfurnished</option>
                        <option value="semi_furnished">Semi furnished</option>
                        <option value="fully_furnished">Fully furnished</option>
                      </select>
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Bedrooms + Bathrooms + Balconies */}
              <div className="grid grid-cols-3 gap-3">
                <form.Field name="bedrooms">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <Label>Bedrooms</Label>
                        <Input
                          type="number"
                          min={0}
                          value={field.state.value ?? ""}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="bathrooms">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <Label>Bathrooms</Label>
                        <Input
                          type="number"
                          min={1}
                          value={field.state.value ?? ""}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="balconies">
                  {(field) => (
                    <Field>
                      <Label>Balconies</Label>
                      <Input
                        type="number"
                        min={0}
                        value={field.state.value ?? ""}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Rent + Deposit months + Area */}
              <div className="grid grid-cols-3 gap-3">
                <form.Field name="monthly_rent">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <Label>Monthly rent (৳)</Label>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Monthly Rent"
                          value={field.state.value ?? ""}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="security_deposit_months">
                  {(field) => (
                    <Field>
                      <Label>Deposit (months)</Label>
                      <Input
                        type="number"
                        min={1}
                        max={6}
                        value={field.state.value ?? ""}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="area_sqft">
                  {(field) => (
                    <Field>
                      <Label>Area (sqft)</Label>
                      <Input
                        type="number"
                        min={0}
                        placeholder="850"
                        value={field.state.value ?? ""}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                      />
                    </Field>
                  )}
                </form.Field>
              </div>

              {/* Amenities */}
              <Field>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {AMENITIES.map((amenity) => (
                    <form.Field key={amenity.name} name={amenity.name}>
                      {(field) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={amenity.name}
                            checked={field.state.value as boolean}
                            onCheckedChange={(checked) =>
                              field.handleChange(Boolean(checked))
                            }
                          />
                          <label
                            htmlFor={amenity.name}
                            className="text-sm cursor-pointer"
                          >
                            {amenity.label}
                          </label>
                        </div>
                      )}
                    </form.Field>
                  ))}
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            form="edit-unit-form"
            type="submit"
            className="w-full disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditUnitCard;

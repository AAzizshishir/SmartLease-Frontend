// components/unit/AddUnitCard.tsx
"use client";

// import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useCreateUnit } from "@/hooks/useUnits";
import {
  createUnitSchema,
  CreateUnitInput,
} from "@/validations/unit.validation";
import { Label } from "@/components/ui/label";

interface Props {
  propertyId: string;
}

const AMENITIES = [
  { name: "has_parking", label: "Parking" },
  { name: "has_ac", label: "AC" },
  { name: "has_lift", label: "Lift" },
  { name: "has_gas", label: "Gas" },
  { name: "has_generator", label: "Generator" },
  { name: "has_water_supply", label: "Water supply" },
  { name: "is_pet_friendly", label: "Pet friendly" },
] as const;

const AddUnitCard = ({ propertyId }: Props) => {
  const { mutate, isPending } = useCreateUnit(propertyId);

  const form = useForm({
    defaultValues: {
      unit_number: "",
      floor: 0,
      type: "one_bed",
      furnishing_status: "unfurnished",
      area_sqft: undefined,
      bedrooms: 1,
      bathrooms: 1,
      balconies: 0,
      monthly_rent: 0,
      security_deposit_months: 2,
      has_parking: false,
      has_ac: false,
      has_lift: false,
      has_gas: false,
      has_generator: false,
      has_water_supply: true,
      is_pet_friendly: false,
      available_from: undefined,
    } as CreateUnitInput,
    onSubmit: async ({ value }) => {
      const validationResult = createUnitSchema.safeParse(value);
      if (!validationResult.success) {
        throw new Error("Validation failed");
      }
      mutate(value, {
        onSuccess: () => form.reset(),
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Add new unit</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="add-unit-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Unit number + Floor */}
            <div className="grid grid-cols-2 gap-3">
              <form.Field name="unit_number">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Label>Unit number</Label>
                      <Input
                        placeholder="101"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="floor">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Label>Floor</Label>
                      <Input
                        type="number"
                        min={0}
                        placeholder="3"
                        value={field.state.value}
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
            </div>

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
                      <option value="one_bed">1 Bedroom</option>
                      <option value="two_bed">2 Bedroom</option>
                      <option value="three_bed">3 Bedroom</option>
                      <option value="four_bed">4 Bedroom</option>
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
                        value={field.state.value}
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
                        value={field.state.value}
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
                      value={field.state.value}
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
                        placeholder="18000"
                        value={field.state.value}
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
                      value={field.state.value}
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

            {/* Available from — Date Picker */}
            <form.Field name="available_from">
              {(field) => (
                <Field>
                  <Label>Available from (optional)</Label>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.state.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value
                          ? format(field.state.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.state.value}
                        onSelect={(date) => field.handleChange(date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            </form.Field>

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
          form="add-unit-form"
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add unit"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddUnitCard;

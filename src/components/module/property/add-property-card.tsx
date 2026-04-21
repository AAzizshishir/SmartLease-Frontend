"use client";

import { useCreateProperty } from "@/hooks/useProperties";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useForm } from "@tanstack/react-form";
import {
  CreatePropertyInput,
  createPropertySchema,
} from "@/validations/property.validation";
import { Field, FieldError, FieldGroup } from "../../ui/field";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { PropertyType } from "@/types/property.type";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const AddPropertyCard = () => {
  const { mutate, isPending } = useCreateProperty();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      type: "apartment",
      total_units: 0,
      description: "",
    } as CreatePropertyInput,
    validators: {
      onSubmit: createPropertySchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => router.push("/propperty"),
      });
    },
  });
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-lg text-center">Add new property</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="add-property-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label>Property Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Property Name"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Address */}
            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label>Property Address</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Property Address"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* City + Type */}
            <div className="grid grid-cols-2 gap-3">
              <form.Field name="city">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Label>City</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="Enter City Name"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="type">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Label>Property Type</Label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value as PropertyType)
                        }
                        className="border border-gray-300 rounded-md p-2 w-full text-sm bg-white text-black 
             dark:bg-[#001524] dark:text-white"
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="commercial">Commercial</option>
                      </select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            {/* Total Units */}
            <form.Field name="total_units">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label>Total Units</Label>
                    <Input
                      type="number"
                      id={field.name}
                      name={field.name}
                      value={field.state.value ?? ""}
                      placeholder="Enter Total Unit"
                      min={1}
                      max={500}
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

            {/* Description */}
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label>Description</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Describe your property... (optional)"
                      className="resize-none"
                      rows={2}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          form="add-property-form"
          type="submit"
          className="w-full font-medium cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Add property"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddPropertyCard;

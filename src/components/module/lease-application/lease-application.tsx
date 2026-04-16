"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateLeaseApplication } from "@/hooks/useLeaseApplication";
import { createLeaseApplicationSchema } from "@/validations/lease-application.validation";

const LeaseApplicationCard = ({ unitId }: { unitId: string }) => {
  const { mutate, isPending } = useCreateLeaseApplication();

  const form = useForm({
    defaultValues: {
      unit_id: unitId,
      preferred_move_in: undefined as unknown as Date,
      profession: "",
      monthly_income: 0,
      work_place_address: "",
      num_occupants: 1,
      has_pets: false,
      nid_url: "",
      income_proof_url: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => form.reset(),
      });
      console.log(value);
    },
  });

  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle>Application</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="add-lease-application-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Preferred Move-in */}
          <form.Field name="preferred_move_in">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <Label>Preferred Move-in Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.state.value && "text-muted-foreground",
                          hasError && "border-red-500",
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
                        selected={field.state.value || undefined}
                        onSelect={(date) =>
                          field.handleChange(date || new Date())
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {hasError && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Profession */}
          <form.Field name="profession">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <Label>Profession *</Label>
                  <Input
                    placeholder="Software Engineer"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={hasError ? "border-red-500" : ""}
                  />
                  {hasError && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Monthly Income */}
          <form.Field name="monthly_income">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <Label>Monthly Income *</Label>
                  <Input
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="50000"
                    value={field.state.value || ""}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
                    onBlur={field.handleBlur}
                    className={hasError ? "border-red-500" : ""}
                  />
                  {hasError && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Work Place Address */}
          <form.Field name="work_place_address">
            {(field) => (
              <div className="space-y-2">
                <Label>Work Place Address</Label>
                <Input
                  placeholder="Company Address"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          {/* Number of Occupants */}
          <form.Field name="num_occupants">
            {(field) => (
              <div className="space-y-2">
                <Label>Number of Occupants</Label>
                <Input
                  type="number"
                  min={1}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </div>
            )}
          </form.Field>

          {/* Has Pets */}
          <form.Field name="has_pets">
            {(field) => (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="has_pets"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="has_pets">Has Pets</Label>
              </div>
            )}
          </form.Field>

          {/* NID URL */}
          <form.Field name="nid_url">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <Label>NID Document URL (Optional)</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/nid.pdf"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={hasError ? "border-red-500" : ""}
                  />
                  {hasError && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Income Proof URL */}
          <form.Field name="income_proof_url">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <Label>Income Proof URL (Optional)</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/income.pdf"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={hasError ? "border-red-500" : ""}
                  />
                  {hasError && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          {/* Message */}
          <form.Field name="message">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="space-y-2">
                  <Label>Message (Optional)</Label>
                  <textarea
                    className={cn(
                      "w-full border rounded p-2",
                      hasError && "border-red-500",
                    )}
                    rows={3}
                    placeholder="Additional notes..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  {hasError && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="add-lease-application-form"
          type="submit"
          className="w-full disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Applying..." : "Apply For Lease"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeaseApplicationCard;

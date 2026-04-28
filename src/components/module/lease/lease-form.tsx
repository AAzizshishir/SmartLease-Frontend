"use client";

import { FormSkeleton } from "@/components/shared/form-skeleton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetApplicationDetails } from "@/hooks/useLeaseApplication";
import { cn } from "@/lib/utils";
import { LeaseApplication } from "@/types/leaseApplication.type";
import { Field, useForm } from "@tanstack/react-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CreateLeaseInput,
  createLeaseSchema,
} from "@/validations/lease.validation";
import { useCreateLease } from "@/hooks/useLease";

interface Props {
  application: LeaseApplication;
}

const LeaseForm = ({ application }: Props) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateLease(application.id);

  const form = useForm({
    defaultValues: {
      start_date: new Date(application.preferred_move_in),
      end_date: new Date(),
      monthly_rent: Number(application.unit.monthly_rent),
      payment_due_day: 5,
      late_fee_after_days: 5,
      late_fee_amount: 500,
      security_deposit: Number(application.unit.monthly_rent) * 2,
      deposit_deadline: new Date(),
      document_url: "",
    } as CreateLeaseInput,
    validators: {
      onSubmit: createLeaseSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          toast.success("Lease created successfully");
          router.back();
        },
      });
    },
  });

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>Lease Create Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="lease-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Start Date */}
            <form.Field name="start_date">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label>Start Date</Label>
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

            {/* End Date */}
            <form.Field name="end_date">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label>End Date</Label>
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

            {/* Monthly rent */}
            <form.Field name="monthly_rent">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label>Monthly Rent</Label>
                    <Input
                      placeholder="Monthly Rent"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

            {/* Payment Due day */}
            <form.Field name="payment_due_day">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label>Payment Due Day</Label>
                    <Input
                      placeholder="Payment Due Day"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

            {/* Late Fee after Days */}
            <form.Field name="late_fee_after_days">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label>Late Fee After Days</Label>
                    <Input
                      placeholder="Late Fee After Days"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

            {/* Late Fee */}
            <form.Field name="late_fee_amount">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label>Late Fee</Label>
                    <Input
                      placeholder="Late Fee"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

            {/* Security Deposit */}
            <form.Field name="security_deposit">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label>Security Deposit</Label>
                    <Input
                      placeholder="Security Deposit"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

            {/* Deposit Deadline */}
            <form.Field name="deposit_deadline">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="space-y-2">
                    <Label>Deposit Deadline</Label>
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="lease-form"
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create lease"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LeaseForm;

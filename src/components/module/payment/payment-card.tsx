"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import {
  useGetDepositPayment,
  useGetMyPayment,
  usePayNow,
} from "@/hooks/usePayment";

// status → badge variant
const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  paid: "default",
  pending: "secondary",
  late: "destructive",
  failed: "destructive",
  waived: "outline",
};

const statusLabel: Record<string, string> = {
  paid: "Paid",
  pending: "Pending",
  late: "Overdue",
  failed: "Failed",
  waived: "Waived",
};

export const PaymentCard = () => {
  const { data: paymentsData, isLoading } = useGetMyPayment({
    sortBy: "due_date",
    sortOrder: "asc",
  });
  const { data: depositData } = useGetDepositPayment();
  const { mutate: payNow, isPending: paying } = usePayNow();

  const payments = paymentsData?.data ?? [];
  const deposit = depositData?.data;

  return (
    <div className="space-y-6">
      {/* Deposit section — শুধু pending হলে দেখাবে */}
      {deposit && deposit.status !== "paid" && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900">
                    Security deposit pending
                  </p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    ৳ {Number(deposit.total_amount).toLocaleString()} · Due by{" "}
                    {deposit.due_date
                      ? format(new Date(deposit.due_date), "dd MMM yyyy")
                      : "—"}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => payNow(deposit.id)}
                disabled={paying}
                className="bg-amber-500 hover:bg-amber-700"
              >
                Pay deposit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deposit paid confirmation */}
      {deposit && deposit.status === "paid" && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  Security deposit paid
                </p>
                <p className="text-xs text-green-700 mt-0.5">
                  ৳ {Number(deposit.amount).toLocaleString()} · Paid on{" "}
                  {deposit.paid_at
                    ? format(new Date(deposit.paid_at), "dd MMM yyyy")
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rent payments table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Rent payments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : payments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No payments yet
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Paid on</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.billing_month}
                    </TableCell>

                    <TableCell>
                      <span>
                        ৳ {Number(payment.total_amount).toLocaleString()}
                      </span>
                      {Number(payment.late_fee) > 0 && (
                        <span className="text-xs text-destructive ml-1">
                          (+৳{Number(payment.late_fee).toLocaleString()} late)
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {payment.type}
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {payment.due_date
                        ? format(new Date(payment.due_date), "dd MMM yyyy")
                        : "—"}
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {payment.paid_at
                        ? format(new Date(payment.paid_at), "dd MMM yyyy")
                        : "—"}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={statusVariant[payment.status] ?? "secondary"}
                      >
                        {statusLabel[payment.status] ?? payment.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {(payment.status === "pending" ||
                        payment.status === "late") && (
                        <Button
                          size="sm"
                          variant={
                            payment.status === "late"
                              ? "destructive"
                              : "default"
                          }
                          onClick={() => payNow(payment.id)}
                          disabled={paying}
                        >
                          Pay
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

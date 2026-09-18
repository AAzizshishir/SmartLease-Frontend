"use client";

import { CheckCircle2, Clock3, CreditCard, WalletCards } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPaymentSummary } from "@/hooks/usePayment";

// type PaymentSummary = {
//   collected?: number;
//   late?: number;
//   pending?: number;
//   totalAmount?: number;
// };

const formatAmount = (amount = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

const PaymentSummaryCard = () => {
  const { data, isLoading, error } = useGetPaymentSummary();
  console.log(data);
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["total", "paid", "pending", "amount"].map((item) => (
          <Card key={item} className="animate-pulse">
            <CardContent className="space-y-3 p-6">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-8 w-32 rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-destructive">
          Unable to load payment summary.
        </CardContent>
      </Card>
    );
  }

  const summary = data?.data ?? data ?? {};
  console.log(summary);
  const items = [
    {
      label: "Total payments",
      value: summary?.total ?? 0,
      icon: CreditCard,
      format: (value: number) => value.toLocaleString(),
    },
    {
      label: "Paid payments",
      value: summary.totalPaid ?? 0,
      icon: CheckCircle2,
      format: (value: number) => value.toLocaleString(),
    },
    {
      label: "Pending payments",
      value: summary.pending.amount ?? 0,
      icon: Clock3,
      format: (value: number) => value.toLocaleString(),
    },
    {
      label: "Total amount",
      value: summary.totalAmount ?? 0,
      icon: WalletCards,
      format: formatAmount,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, icon: Icon, format }) => (
        <Card key={label}>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">{label}</CardTitle>
            <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{format(value)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PaymentSummaryCard;

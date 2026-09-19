import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PaymentSummary } from "./payment.types";
import { formatCurrency } from "./payment.utils";

type PaymentSummaryCardsProps = {
  summary: PaymentSummary;
};

export const PaymentSummaryCards = ({ summary }: PaymentSummaryCardsProps) => {
  const cards = [
    {
      title: "Expected This Month",
      value: formatCurrency(summary.expected),
      color: "text-foreground",
    },
    {
      title: "Collected",
      value: formatCurrency(summary.collected),
      color: "text-green-600",
    },
    {
      title: "Pending",
      value: formatCurrency(summary.pending),
      color: "text-yellow-600",
    },
    {
      title: "Overdue",
      value: formatCurrency(summary.overdue),
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className={`text-2xl font-semibold ${card.color}`}>
              {card.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

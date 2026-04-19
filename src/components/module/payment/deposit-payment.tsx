import { useGetDepositPayment, usePayNow } from "@/hooks/usePayment";
import { AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DepositPayment = () => {
  const { data, isLoading } = useGetDepositPayment();

  const { mutate: payNow, isPending } = usePayNow();

  if (isLoading) return null;

  const payment = data?.data;

  if (!payment) return null;

  if (payment.status === "paid") {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <div>
          <p className="text-sm font-medium text-green-800">
            Security deposit paid
          </p>
          <p className="text-xs text-green-600">
            {Number(payment.amount).toLocaleString()} BDT · Paid on{" "}
            {payment.paid_at
              ? format(new Date(payment.paid_at), "dd MMM yyyy")
              : ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium">Security deposit</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Due by{" "}
            {payment.due_date
              ? format(new Date(payment.due_date), "dd MMM yyyy")
              : ""}
          </p>
        </div>
        <Badge
          variant={payment.status === "late" ? "destructive" : "secondary"}
        >
          {payment.status === "late" ? "Overdue" : "Pending"}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">
            {Number(payment.total_amount).toLocaleString()} BDT
          </p>
          {payment.late_fee > 0 && (
            <p className="text-xs text-destructive">
              Includes {Number(payment.late_fee).toLocaleString()} BDT late fee
            </p>
          )}
        </div>
        <Button
          onClick={() => payNow(payment.id)}
          disabled={isPending}
          size="sm"
        >
          {isPending ? "Processing..." : "Pay deposit"}
        </Button>
      </div>

      {payment.status === "late" && (
        <div className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          <span>Lease will be cancelled if not paid soon</span>
        </div>
      )}
    </div>
  );
};

export default DepositPayment;

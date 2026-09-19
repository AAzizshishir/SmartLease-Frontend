import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight, Eye } from "lucide-react";

import { Payment } from "./payment.types";
import {
  formatCurrency,
  formatDate,
  isOverdue,
  statusConfig,
} from "./payment.utils";

type PaymentMonthGroupProps = {
  month: string;
  monthPayments: Payment[];
  isExpanded: boolean;
  onToggle: (month: string) => void;
  onView: (payment: Payment) => void;
  formatBillingMonth: (month: string | null) => string;
};

export const PaymentMonthGroup = ({
  month,
  monthPayments,
  isExpanded,
  onToggle,
  onView,
  formatBillingMonth,
}: PaymentMonthGroupProps) => {
  const monthTotal = monthPayments.reduce(
    (total, payment) => total + Number(payment.total_amount),
    0,
  );

  const monthCollected = monthPayments
    .filter((payment) => payment.status === "paid")
    .reduce((total, payment) => total + Number(payment.total_amount), 0);

  return (
    <Card key={month} className="overflow-hidden">
      <button
        type="button"
        onClick={() => onToggle(month)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}

          <div>
            <p className="font-semibold">{formatBillingMonth(month)}</p>

            <p className="text-sm text-muted-foreground">
              {monthPayments.length} payment
              {monthPayments.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-semibold">{formatCurrency(monthTotal)}</p>

          <p className="text-xs text-muted-foreground">
            Collected: {formatCurrency(monthCollected)}
          </p>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property / Unit</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {monthPayments.map((payment) => {
                  const calculatedStatus = isOverdue(payment)
                    ? "overdue"
                    : payment.status;

                  const status = statusConfig[calculatedStatus];

                  return (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.tenant.name}</p>

                          <p className="text-sm text-muted-foreground">
                            {payment.tenant.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {payment.lease.unit.property.name}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Unit {payment.lease.unit.unit_number}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline">
                          {payment.type === "rent"
                            ? "Rent"
                            : "Security Deposit"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {formatCurrency(payment.total_amount)}
                          </p>

                          {Number(payment.late_fee) > 0 && (
                            <p className="text-xs text-muted-foreground">
                              Late fee: {formatCurrency(payment.late_fee)}
                            </p>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>{formatDate(payment.due_date)}</TableCell>

                      <TableCell>
                        <Badge className={status.className}>
                          {status.label}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(payment)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </Card>
  );
};

"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useGetAllLandlordPayments } from "@/hooks/usePayment";
import { ChevronDown, ChevronRight, Eye, Search } from "lucide-react";

type PaymentStatus = "pending" | "paid" | "late";

type Payment = {
  id: string;
  type: "rent" | "security_deposit";
  amount: string;
  late_fee: string;
  total_amount: string;
  billing_month: string | null;
  due_date: string;
  paid_at: string | null;
  status: PaymentStatus;

  tenant: {
    id: string;
    name: string;
    email: string;
  };

  lease: {
    id: string;
    monthly_rent: string;
    unit: {
      id: string;
      unit_number: string;
      property: {
        id: string;
        name: string;
        address: string;
      };
    };
  };
};

type PaymentTab = "overview" | "rent" | "overdue" | "security_deposit";

const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatBillingMonth = (month: string | null) => {
  if (!month) return "—";

  const [year, monthNumber] = month.split("-");

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(Number(year), Number(monthNumber) - 1));
};

const getCurrentMonth = () => {
  const now = new Date();

  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const getPaymentMonth = (payment: Payment) => {
  if (payment.billing_month) return payment.billing_month;

  return payment.due_date.slice(0, 7);
};

const isOverdue = (payment: Payment) => {
  return (
    payment.status !== "paid" &&
    new Date(payment.due_date).getTime() < Date.now()
  );
};

const statusConfig: Record<
  PaymentStatus | "overdue",
  {
    label: string;
    className: string;
  }
> = {
  paid: {
    label: "Paid",
    className:
      "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400",
  },
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400",
  },
  late: {
    label: "Late",
    className:
      "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400",
  },
  overdue: {
    label: "Overdue",
    className:
      "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400",
  },
};

const AllLandlordPayments = () => {
  const { data, isLoading, error } = useGetAllLandlordPayments();

  const payments: Payment[] = data?.data ?? [];

  const [activeTab, setActiveTab] = useState<PaymentTab>("overview");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>(
    {
      [getCurrentMonth()]: true,
    },
  );

  const properties = useMemo(() => {
    const propertyMap = new Map<string, string>();

    payments.forEach((payment) => {
      const property = payment.lease.unit.property;

      propertyMap.set(property.id, property.name);
    });

    return Array.from(propertyMap.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  }, [payments]);

  const availableMonths = useMemo(() => {
    const months = new Set<string>();

    payments.forEach((payment) => {
      if (payment.type === "rent") {
        months.add(getPaymentMonth(payment));
      }
    });

    return Array.from(months).sort((a, b) => b.localeCompare(a));
  }, [payments]);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const paymentMonth = getPaymentMonth(payment);

      const matchesMonth =
        selectedMonth === "all" ||
        paymentMonth === selectedMonth ||
        (activeTab === "security_deposit" &&
          payment.type === "security_deposit");

      const matchesProperty =
        selectedProperty === "all" ||
        payment.lease.unit.property.id === selectedProperty;

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        payment.tenant.name.toLowerCase().includes(search) ||
        payment.tenant.email.toLowerCase().includes(search) ||
        payment.lease.unit.property.name.toLowerCase().includes(search) ||
        payment.lease.unit.unit_number.toLowerCase().includes(search);

      const matchesTab =
        activeTab === "overview"
          ? payment.type === "rent"
          : activeTab === "rent"
            ? payment.type === "rent"
            : activeTab === "overdue"
              ? payment.type === "rent" && isOverdue(payment)
              : payment.type === "security_deposit";

      return matchesMonth && matchesProperty && matchesSearch && matchesTab;
    });
  }, [payments, selectedMonth, selectedProperty, searchTerm, activeTab]);

  const groupedPayments = useMemo(() => {
    const groups = new Map<string, Payment[]>();

    filteredPayments.forEach((payment) => {
      const month = getPaymentMonth(payment);

      if (!groups.has(month)) {
        groups.set(month, []);
      }

      groups.get(month)?.push(payment);
    });

    return Array.from(groups.entries()).sort(([monthA], [monthB]) =>
      monthB.localeCompare(monthA),
    );
  }, [filteredPayments]);

  const summary = useMemo(() => {
    const currentMonth = getCurrentMonth();

    const currentMonthPayments = payments.filter(
      (payment) =>
        payment.type === "rent" && getPaymentMonth(payment) === currentMonth,
    );

    const expected = currentMonthPayments.reduce(
      (total, payment) => total + Number(payment.total_amount),
      0,
    );

    const collected = currentMonthPayments
      .filter((payment) => payment.status === "paid")
      .reduce((total, payment) => total + Number(payment.total_amount), 0);

    const overdue = currentMonthPayments
      .filter((payment) => isOverdue(payment))
      .reduce((total, payment) => total + Number(payment.total_amount), 0);

    const pending = currentMonthPayments
      .filter((payment) => payment.status !== "paid" && !isOverdue(payment))
      .reduce((total, payment) => total + Number(payment.total_amount), 0);

    return {
      expected,
      collected,
      overdue,
      pending,
    };
  }, [payments]);

  const toggleMonth = (month: string) => {
    setExpandedMonths((previous) => ({
      ...previous,
      [month]: !previous[month],
    }));
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        Loading payments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
        Failed to load payments.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Landlord Payments
        </h1>

        <p className="text-sm text-muted-foreground">
          Track rent collection, overdue payments and security deposits.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expected This Month
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-semibold">
              {formatCurrency(summary.expected)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Collected
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-semibold text-green-600">
              {formatCurrency(summary.collected)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-semibold text-yellow-600">
              {formatCurrency(summary.pending)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overdue
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-semibold text-red-600">
              {formatCurrency(summary.overdue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => {
            setActiveTab("overview");
            setSelectedMonth(getCurrentMonth());
          }}
        >
          Overview
        </Button>

        <Button
          variant={activeTab === "rent" ? "default" : "outline"}
          onClick={() => setActiveTab("rent")}
        >
          Rent Payments
        </Button>

        <Button
          variant={activeTab === "overdue" ? "default" : "outline"}
          onClick={() => setActiveTab("overdue")}
        >
          Overdue
        </Button>

        <Button
          variant={activeTab === "security_deposit" ? "default" : "outline"}
          onClick={() => {
            setActiveTab("security_deposit");
            setSelectedMonth("all");
          }}
        >
          Security Deposits
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search tenant, property or unit..."
            className="pl-9"
          />
        </div>

        <Select
          value={selectedMonth}
          onValueChange={setSelectedMonth}
          disabled={activeTab === "security_deposit"}
        >
          <SelectTrigger className="w-full md:w-45">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>

            {availableMonths.map((month) => (
              <SelectItem key={month} value={month}>
                {formatBillingMonth(month)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
          <SelectTrigger className="w-full md:w-50">
            <SelectValue placeholder="Select property" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>

            {properties.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Payment groups */}
      {groupedPayments.length === 0 ? (
        <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
          No payments found for the selected filters.
        </div>
      ) : (
        <div className="space-y-4">
          {groupedPayments.map(([month, monthPayments]) => {
            const isExpanded = expandedMonths[month] ?? false;

            const monthTotal = monthPayments.reduce(
              (total, payment) => total + Number(payment.total_amount),
              0,
            );

            const monthCollected = monthPayments
              .filter((payment) => payment.status === "paid")
              .reduce(
                (total, payment) => total + Number(payment.total_amount),
                0,
              );

            return (
              <Card key={month} className="overflow-hidden">
                {/* Month header */}
                <button
                  type="button"
                  onClick={() => toggleMonth(month)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}

                    <div>
                      <p className="font-semibold">
                        {formatBillingMonth(month)}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {monthPayments.length} payment
                        {monthPayments.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(monthTotal)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Collected: {formatCurrency(monthCollected)}
                    </p>
                  </div>
                </button>

                {/* Month table */}
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
                                {/* Tenant */}
                                <TableCell>
                                  <div>
                                    <p className="font-medium">
                                      {payment.tenant.name}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                      {payment.tenant.email}
                                    </p>
                                  </div>
                                </TableCell>

                                {/* Property / Unit */}
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

                                {/* Type */}
                                <TableCell>
                                  <Badge variant="outline">
                                    {payment.type === "rent"
                                      ? "Rent"
                                      : "Security Deposit"}
                                  </Badge>
                                </TableCell>

                                {/* Amount */}
                                <TableCell>
                                  <div>
                                    <p className="font-medium">
                                      {formatCurrency(payment.total_amount)}
                                    </p>

                                    {Number(payment.late_fee) > 0 && (
                                      <p className="text-xs text-muted-foreground">
                                        Late fee:{" "}
                                        {formatCurrency(payment.late_fee)}
                                      </p>
                                    )}
                                  </div>
                                </TableCell>

                                {/* Due date */}
                                <TableCell>
                                  {formatDate(payment.due_date)}
                                </TableCell>

                                {/* Status */}
                                <TableCell>
                                  <Badge className={status.className}>
                                    {status.label}
                                  </Badge>
                                </TableCell>

                                {/* Action */}
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      console.log(
                                        "Selected payment:",
                                        payment.id,
                                      );
                                    }}
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
          })}
        </div>
      )}
    </div>
  );
};

export default AllLandlordPayments;

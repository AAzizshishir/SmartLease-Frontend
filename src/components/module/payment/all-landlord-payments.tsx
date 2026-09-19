"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetAllLandlordPayments } from "@/hooks/usePayment";

import { PaymentFilters } from "./all-landlord-payments/payment-filters";
import { PaymentMonthGroup } from "./all-landlord-payments/payment-month-group";
import { PaymentSummaryCards } from "./all-landlord-payments/payment-summary-cards";
import { Payment, PaymentTab } from "./all-landlord-payments/payment.types";
import {
  formatBillingMonth,
  getCurrentMonth,
  getPaymentMonth,
  isOverdue,
} from "./all-landlord-payments/payment.utils";

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

  const handleViewPayment = (payment: Payment) => {
    console.log("Selected payment:", payment.id);
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
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Landlord Payments
        </h1>

        <p className="text-sm text-muted-foreground">
          Track rent collection, overdue payments and security deposits.
        </p>
      </div>

      <PaymentSummaryCards summary={summary} />

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

      <PaymentFilters
        activeTab={activeTab}
        searchTerm={searchTerm}
        selectedMonth={selectedMonth}
        selectedProperty={selectedProperty}
        availableMonths={availableMonths}
        properties={properties}
        onSearchChange={setSearchTerm}
        onMonthChange={setSelectedMonth}
        onPropertyChange={setSelectedProperty}
        formatBillingMonth={formatBillingMonth}
      />

      <Separator />

      {groupedPayments.length === 0 ? (
        <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
          No payments found for the selected filters.
        </div>
      ) : (
        <div className="space-y-4">
          {groupedPayments.map(([month, monthPayments]) => (
            <PaymentMonthGroup
              key={month}
              month={month}
              monthPayments={monthPayments}
              isExpanded={expandedMonths[month] ?? false}
              onToggle={toggleMonth}
              onView={handleViewPayment}
              formatBillingMonth={formatBillingMonth}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllLandlordPayments;

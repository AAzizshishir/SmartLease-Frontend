import { Payment, PaymentStatus } from "./payment.types";

export const statusConfig: Record<
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

export const formatCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export const formatBillingMonth = (month: string | null) => {
  if (!month) return "—";

  const [year, monthNumber] = month.split("-");

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(Number(year), Number(monthNumber) - 1));
};

export const getCurrentMonth = () => {
  const now = new Date();

  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

export const getPaymentMonth = (payment: Payment) => {
  if (payment.billing_month) return payment.billing_month;

  return payment.due_date.slice(0, 7);
};

export const isOverdue = (payment: Payment) => {
  return (
    payment.status !== "paid" &&
    new Date(payment.due_date).getTime() < Date.now()
  );
};

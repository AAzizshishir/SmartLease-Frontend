export type PaymentStatus = "pending" | "paid" | "late";

export type PaymentTab = "overview" | "rent" | "overdue" | "security_deposit";

export type Payment = {
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

export type PropertyOption = {
  id: string;
  name: string;
};

export type PaymentSummary = {
  expected: number;
  collected: number;
  overdue: number;
  pending: number;
};

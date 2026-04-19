// export interface Lease {
//   id: string;
//   landlord_id: string;
//   tenant_id: string;
//   unit_id: string;

//   status: "pending_tenant" | "active" | "terminated" | "completed"; // extend as needed

//   confirmed_at: string | null;
//   created_at: string;
//   updated_at: string;

//   start_date: string;
//   end_date: string;

//   terminated_at: string | null;
//   termination_reason: string | null;

//   monthly_rent: string;
//   payment_due_day: number;

//   late_fee_after_days: number;
//   late_fee_amount: string;

//   security_deposit: string;
//   deposit_status: "pending" | "paid" | "refunded" | "deducted"; // extend as needed
//   deposit_deadline: string;
//   deposit_paid_at: string | null;
//   deposit_refunded_at: string | null;
//   deposit_deduction: string | null;
//   deposit_deduction_reason: string | null;

//   document_url: string;
// }

export interface Lease {
  id: string;
  landlord_id: string;
  tenant_id: string;
  unit_id: string;

  status: "pending_tenant" | "active" | "terminated" | "completed";

  confirmed_at: string | null;
  created_at: string;
  updated_at: string;

  start_date: string;
  end_date: string;

  terminated_at: string | null;
  termination_reason: string | null;

  monthly_rent: string;
  payment_due_day: number;

  late_fee_after_days: number;
  late_fee_amount: string;

  security_deposit: string;
  deposit_status: "pending" | "paid" | "refunded" | "deducted";
  deposit_deadline: string;
  deposit_paid_at: string | null;
  deposit_refunded_at: string | null;
  deposit_deduction: string | null;
  deposit_deduction_reason: string | null;

  document_url: string;

  tenant: {
    id: string;
    name: string;
    email: string;
  };

  unit: {
    unit_number: string;
    floor: number;
    monthly_rent: string;
    property: {
      id: string;
      landlord_id: string;
      name: string;
      city: string;
      address: string;
      landlord: {
        name: string;
        email: string;
      };
    };
  };
}

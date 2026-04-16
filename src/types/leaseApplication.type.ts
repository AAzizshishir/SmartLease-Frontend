export interface LeaseApplication {
  id: string;

  created_at: string;
  updated_at: string;
  expires_at: string;

  preferred_move_in: string;

  profession: string;
  monthly_income: string;

  work_place_address?: string | null;
  message?: string | null;

  num_occupants: number;
  has_pets: boolean;

  nid_url?: string | null;
  income_proof_url?: string | null;

  status: "pending" | "approved" | "rejected" | "cancelled";

  rejection_reason?: string | null;
  reviewed_at?: string | null;

  lease_id?: string | null;

  tenant_id: string;
  unit_id: string;

  tenant: {
    name: string;
    email: string;
  };

  unit: {
    unit_number: string;
    floor: string;
    property: {
      id: string;
      name: string;
      city: string;
    };
  };
}

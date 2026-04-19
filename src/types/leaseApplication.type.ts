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

  status: "pending" | "approved" | "rejected" | "cancelled" | "expired";

  rejection_reason?: string | null;
  reviewed_at?: string | null;

  lease_id?: string | null;

  tenant_id: string;
  unit_id: string;

  tenant: {
    id: string;
    name: string;
    email: string;
  };

  unit: {
    unit_number: string;
    floor: string;
    monthly_rent: string;
    property: {
      id: string;
      landlord_id: string;
      name: string;
      city: string;
    };
  };
}

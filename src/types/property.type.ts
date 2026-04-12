export interface Property {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  image: string;
  type: string;
  total_units: number;

  landlord_id: string;

  is_deleted: boolean;
  deleted_at: string | null;

  created_at: string;
}

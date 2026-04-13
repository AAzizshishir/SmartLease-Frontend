import { Unit } from "./unit.type";

export type PropertyType = "apartment" | "house" | "commercial";

export interface Images {
  id: string;
  property_id: string;
  url: string;
  is_primary: boolean;
}

export interface Property {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  images: Images[];
  units: Unit[];
  type: string;
  total_units: number;

  landlord_id: string;

  is_deleted: boolean;
  deleted_at: string | null;

  created_at: string;
}

export interface ICreateProperty {
  name: string;
  address: string;
  city: string;
  type: PropertyType;
  total_units: number;
  description?: string;
}

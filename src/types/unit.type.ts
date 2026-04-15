export type UnitStatus = "vacant" | "occupied";
export type FurnishingStatus =
  | "fully_furnished"
  | "semi_furnished"
  | "unfurnished";
export type UnitType = "apartment" | "penthouse" | "studio";

export interface Images {
  id: string;
  unit_id: string;
  url: string;
  is_primary: boolean;
}

export interface Unit {
  id: string;
  property_id: string;

  unit_number: string;
  type: UnitType;
  status: UnitStatus;

  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floor: number;

  area_sqft: string;
  monthly_rent: string;

  security_deposit_months: number;

  furnishing_status: FurnishingStatus;

  images: Images[];

  has_ac: boolean;
  has_gas: boolean;
  has_generator: boolean;
  has_lift: boolean;
  has_parking: boolean;
  has_water_supply: boolean;
  is_pet_friendly: boolean;

  available_from: string | null;

  is_deleted: boolean;
  deleted_at: string | null;

  created_at: string;
  updated_at: string;
}

// validations/unit.validation.ts
import * as z from "zod";

export const createUnitSchema = z.object({
  unit_number: z.string().min(1, "Unit number is required"),
  floor: z.coerce.number().int().min(0, "Cannot be negative"),
  type: z.enum([
    "studio",
    "one_bed",
    "two_bed",
    "three_bed",
    "four_bed",
    "penthouse",
  ]),
  furnishing_status: z
    .enum(["unfurnished", "semi_furnished", "fully_furnished"])
    .default("unfurnished"),
  area_sqft: z.coerce.number().positive().optional(),
  bedrooms: z.coerce.number().int().min(0).max(10),
  bathrooms: z.coerce.number().int().min(1).max(10),
  balconies: z.coerce.number().int().min(0).max(5).default(0),
  monthly_rent: z.coerce.number().positive("Rent must be greater than 0"),
  security_deposit_months: z.coerce.number().int().min(1).max(6).default(2),
  has_parking: z.boolean().default(false),
  has_ac: z.boolean().default(false),
  has_lift: z.boolean().default(false),
  has_gas: z.boolean().default(false),
  has_generator: z.boolean().default(false),
  has_water_supply: z.boolean().default(true),
  is_pet_friendly: z.boolean().default(false),
  available_from: z.date().optional(),
});

export type CreateUnitInput = z.infer<typeof createUnitSchema>;

import { z } from "zod";

export const createPropertySchema = z.object({
  name: z
    .string("Property name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name too long"),

  address: z
    .string("Address is required")
    .min(5, "Address must be at least 5 characters"),

  city: z
    .string("City is required")
    .min(2, "City must be at least 2 characters"),

  type: z.enum(["apartment", "house", "commercial"], {
    error: "Property type is required",
  }),

  total_units: z
    .number("Total units is required")
    .int("Must be a whole number")
    .positive("Must be greater than 0")
    .max(500, "Cannot exceed 500 units"),

  description: z.string().max(500, "Description too long").optional(),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;

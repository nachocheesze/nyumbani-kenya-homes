import { z } from 'zod';
import type { Property } from "./property";
import type { Tenant } from "./tenant";
import type { TenantIdentification } from "./identification";

export type QuickAddProperty = Pick<
  Property,
  "property_name" | "property_type" | "county" | "city"
> & Partial<Pick<Property, "address">>;

export type QuickAddTenant = Pick<
  Tenant,
  "full_name"
> & Partial<Pick<Tenant, "email" | "phone_number">> & Partial<Pick<TenantIdentification, "id_number" | "id_type">>;

export const quickAddPropertySchema = z.object({
  property_name: z.string().min(3, { message: "Property name must be at least 3 characters long" }),
  property_type: z.string().min(1, { message: "Please select a property type" }),
  county: z.string().min(1, { message: "Please select a county" }),
  city: z.string().min(1, { message: "Please select a city/town" }),
  address: z.string().optional(),
}) satisfies z.ZodType<QuickAddProperty>;

export const quickAddTenantSchema = z.object({
  full_name: z.string().min(3, { message: "Full name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
  phone_number: z.string().min(10, { message: "Phone number must be at least 10 digits" }).optional().or(z.literal("")),
  id_type: z.enum(["National ID", "Passport", "Alien ID"]).optional().or(z.literal("")),
  id_number: z.string().optional(),
}).refine((data) => data.email || data.phone_number, {
  message: "Either email or phone number is required.",
  path: ["email"],
}).refine((data) => {
  if (data.id_number && !data.id_type) {
    return false;
  }
  if (data.id_type && !data.id_number) {
    return false;
  }
  return true;
}, {
  message: "Both ID Type and ID Number are required if either is provided.",
  path: ["id_type"],
}) satisfies z.ZodType<QuickAddTenant>;
export type PropertyStructure = "single_unit" | "multi_unit_block" | "estate";
export type PropertyCategory = "residential" | "commercial" | "industrial" | "land";
export type PropertyOwnershipType = "freehold" | "leasehold";

import { Unit } from './unit';

export interface Property {
  id: string;
  landlord_id?: string;
  agent_id?: string;
  property_name: string;
  description: string;
  category?: PropertyCategory;
  managed_by?: "owner" | "agent" | "caretaker" | "developer";
  status?: "available" | "occupied" | "under_renovation" | "coming_soon";
  tags?: string;
  address: string;
  city: string;
  county: string;
  neighborhood?: string;
  nearest_landmark?: string;
  latitude?: number;
  longitude?: number;
  property_type: "apartment" | "house" | "commercial" | "land";
  bedrooms?: number;
  bathrooms?: number;
  rent_amount?: number;
  deposit_amount?: number;
  available_from?: string; // date
  is_available?: boolean;
  features?: string[];
  amenities?: string[];
  images?: string[];
  created_at?: string; // timestamp with time zone
  updated_at?: string; // timestamp with time zone
  property_structure?: PropertyStructure;
  has_blocks?: boolean;
  number_of_blocks?: number;
  has_unit_variations?: boolean;
  approx_unit_count?: number;
  floor_count?: number;
  has_elevator?: boolean;
  shared_utilities?: string[];
  total_units?: number;
  video_url?: string;
  virtual_tour_url?: string;
  ownership_type?: PropertyOwnershipType;
  title_deed_file_url?: string;
  lease_template_url?: string;
  construction_permit_url?: string;
  nema_certificate_url?: string;
  caretaker_id?: string;
  paybill_number?: number;
  bank_account?: string;
  internal_notes?: string;
  main_image_url?: string;
  units?: Unit[]; // Added units field
}
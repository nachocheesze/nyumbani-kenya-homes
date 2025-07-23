export interface Unit {
    unitName: string;
  id: string;
  property_id: string;
  block_name?: string; // New: for multi-block properties
  unit_name: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: number; // in sqft or sqm
  rent_amount?: number;
  deposit_amount?: number;
  is_negotiable?: boolean;
  payment_cycle?: "monthly" | "quarterly" | "annually";
  rent_due_day?: number; // Day of the month (1-31)
  is_occupied?: boolean;
  available_from?: string; // Date string, only if is_occupied is true
  tenant_id?: string; // Optional: Link to tenant if occupied
  is_available?: boolean;
  created_at?: string; // timestamp with time zone
}

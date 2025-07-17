export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  county: string;
  property_type: string;
  bedrooms?: number;
  bathrooms?: number;
  rent_amount?: number;
  deposit_amount?: number;
  description?: string;
  landlord_id?: string;
  agent_id?: string;
  is_available: boolean;
  amenities?: string[];
  image_urls?: string[];
  created_at: string;
}
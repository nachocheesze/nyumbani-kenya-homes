
export interface Block {
  id: string; // uuid
  property_id: string; // uuid
  name: string;
  unit_count: number; // integer
  unit_types?: string[]; // text[]
  amenities?: string[]; // text[]
  notes?: string;
  created_at?: string; // timestamp with time zone
  updated_at?: string; // timestamp with time zone
  floor_count?: number; // integer
  has_elevator?: boolean;
}

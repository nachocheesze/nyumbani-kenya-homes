export interface Tenant {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  property_id: string;
  lease_start_date: string;
  lease_end_date: string;
  rent_amount: number;
  status: string;
  users?: { full_name: string; phone_number: string };
  properties?: { title: string; city: string; county: string };
}
export interface TenantContact {
  id: string;
  tenant_id: string;
  contact_type: 'emergency' | 'alternate' | 'guarantor';
  full_name: string;
  relationship: string | null;
  phone_number: string;
  email: string | null;
  created_at: string;
  updated_at: string;
}

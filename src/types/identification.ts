export interface TenantIdentification {
  id: string;
  tenant_id: string;
  id_type: 'national_id' | 'passport' | 'driving_license';
  id_number: string;
  id_front_url: string | null;
  id_back_url: string | null;
  selfie_url: string | null;
  kra_pin: string;
  nhif_insurance_no: string | null;
  created_at: string;
  updated_at: string;
}

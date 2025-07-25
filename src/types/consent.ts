export interface TenantConsent {
  id: string;
  tenant_id: string;
  data_consent_given: boolean;
  lease_agreement_consent_given: boolean;
  signature_image_url: string | null;
  signed_at: string;
  created_at: string;
  updated_at: string;
}

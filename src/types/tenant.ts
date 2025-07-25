import { TenantIdentification } from './identification';
import { LeaseAgreement } from './lease';
import { TenantDocument } from './document';
import { TenantContact } from './contact';
import { TenantPreference } from './preference';
import { TenantConsent } from './consent';

export interface Tenant {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  nationality: string;
  marital_status: string;
  occupation: string;
  income_range: string;
  profile_photo_url: string | null;
  tenant_score: number;
  invitation_status: 'pending' | 'accepted' | 'rejected';
  form_completion_date: string;
  created_at: string;
  updated_at: string;

  // Relationships (optional, for joined queries)
  identification?: TenantIdentification;
  lease_agreements?: LeaseAgreement[];
  documents?: TenantDocument[];
  contacts?: TenantContact[];
  preferences?: TenantPreference;
  consents?: TenantConsent;
}
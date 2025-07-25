export interface TenantPreference {
  id: string;
  tenant_id: string;
  contact_method: 'email' | 'sms' | 'whatsapp' | 'phone_call';
  language_preference: 'en' | 'sw' | 'other';
  notification_opt_ins: Record<string, boolean> | null;
  created_at: string;
  updated_at: string;
}

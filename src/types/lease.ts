export interface LeaseAgreement {
  id: string;
  tenant_id: string;
  property_id: string;
  unit_id: string;
  move_in_date: string;
  lease_start_date: string;
  lease_end_date: string;
  lease_duration_months: number;
  rent_amount: number;
  rent_cycle: 'monthly' | 'quarterly' | 'annually';
  security_deposit_amount: number;
  payment_method: string;
  rent_due_date: number;
  lease_status: 'pending' | 'active' | 'expired' | 'terminated';
  lease_agreement_url: string | null;
  created_at: string;
  updated_at: string;
}

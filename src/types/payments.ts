
export interface PaymentMethod {
  id: string; // uuid
  property_id: string; // uuid
  method_type: 'mobile_money' | 'bank' | 'other'; // text
  provider?: string;
  channel?: string;
  account_name?: string;
  account_number: string;
  bank_name?: string;
  branch?: string;
  swift_code?: string;
  notes?: string;
  created_at: string; // timestamp with time zone
  updated_at: string; // timestamp with time zone
}

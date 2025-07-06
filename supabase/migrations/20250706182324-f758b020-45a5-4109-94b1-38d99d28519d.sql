
-- Create reusable functions for role checking
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT COALESCE(current_setting('request.jwt.claims', true)::json->>'role', '') = 'super_admin'
$$;

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT COALESCE(current_setting('request.jwt.claims', true)::json->>'role', 'tenant')
$$;

-- Create properties table with comprehensive structure
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  county TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'house', 'commercial', 'land')),
  bedrooms INTEGER,
  bathrooms INTEGER,
  rent_amount DECIMAL(12,2),
  deposit_amount DECIMAL(12,2),
  available_from DATE,
  is_available BOOLEAN DEFAULT true,
  features TEXT[],
  amenities TEXT[],
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tenants table
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  move_in_date DATE,
  lease_end_date DATE,
  rent_amount DECIMAL(12,2) NOT NULL,
  deposit_paid DECIMAL(12,2),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create maintenance_requests table
CREATE TABLE IF NOT EXISTS public.maintenance_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create rent_payments table
CREATE TABLE IF NOT EXISTS public.rent_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  amount DECIMAL(12,2) NOT NULL,
  payment_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  subject TEXT,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rent_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Properties: Landlords can view their properties" 
  ON public.properties FOR SELECT 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

CREATE POLICY "Properties: Agents can view assigned properties" 
  ON public.properties FOR SELECT 
  USING (auth.uid() = agent_id OR public.is_super_admin());

CREATE POLICY "Properties: Tenants can view their rented properties" 
  ON public.properties FOR SELECT 
  USING (
    id IN (SELECT property_id FROM public.tenants WHERE user_id = auth.uid()) 
    OR public.is_super_admin()
  );

CREATE POLICY "Properties: Public can view available properties" 
  ON public.properties FOR SELECT 
  USING (is_available = true OR public.is_super_admin());

CREATE POLICY "Properties: Landlords can insert their properties" 
  ON public.properties FOR INSERT 
  WITH CHECK (
    auth.uid() = landlord_id 
    AND public.get_user_role() IN ('landlord', 'super_admin')
  );

CREATE POLICY "Properties: Landlords can update their properties" 
  ON public.properties FOR UPDATE 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

CREATE POLICY "Properties: Landlords can delete their properties" 
  ON public.properties FOR DELETE 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

-- Tenants policies
CREATE POLICY "Tenants: Users can view their own tenant records" 
  ON public.tenants FOR SELECT 
  USING (auth.uid() = user_id OR public.is_super_admin());

CREATE POLICY "Tenants: Landlords can view their property tenants" 
  ON public.tenants FOR SELECT 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

CREATE POLICY "Tenants: Caretakers can view assigned property tenants" 
  ON public.tenants FOR SELECT 
  USING (
    property_id IN (
      SELECT property_id FROM public.caretaker_assignments 
      WHERE caretaker_id = auth.uid()
    ) 
    OR public.is_super_admin()
  );

CREATE POLICY "Tenants: Landlords can insert tenant records" 
  ON public.tenants FOR INSERT 
  WITH CHECK (
    auth.uid() = landlord_id 
    AND public.get_user_role() IN ('landlord', 'super_admin')
  );

CREATE POLICY "Tenants: Landlords can update their tenant records" 
  ON public.tenants FOR UPDATE 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

-- Maintenance requests policies
CREATE POLICY "Maintenance: Tenants can view their requests" 
  ON public.maintenance_requests FOR SELECT 
  USING (auth.uid() = tenant_id OR public.is_super_admin());

CREATE POLICY "Maintenance: Landlords can view property requests" 
  ON public.maintenance_requests FOR SELECT 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

CREATE POLICY "Maintenance: Caretakers can view assigned property requests" 
  ON public.maintenance_requests FOR SELECT 
  USING (
    property_id IN (
      SELECT property_id FROM public.caretaker_assignments 
      WHERE caretaker_id = auth.uid()
    ) 
    OR public.is_super_admin()
  );

CREATE POLICY "Maintenance: Tenants can create requests" 
  ON public.maintenance_requests FOR INSERT 
  WITH CHECK (
    auth.uid() = tenant_id 
    AND public.get_user_role() IN ('tenant', 'super_admin')
    AND tenant_id IN (SELECT user_id FROM public.tenants WHERE property_id = maintenance_requests.property_id)
  );

CREATE POLICY "Maintenance: Landlords can update property requests" 
  ON public.maintenance_requests FOR UPDATE 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

CREATE POLICY "Maintenance: Caretakers can update assigned property requests" 
  ON public.maintenance_requests FOR UPDATE 
  USING (
    property_id IN (
      SELECT property_id FROM public.caretaker_assignments 
      WHERE caretaker_id = auth.uid()
    ) 
    OR public.is_super_admin()
  );

-- Rent payments policies
CREATE POLICY "Rent: Tenants can view their payments" 
  ON public.rent_payments FOR SELECT 
  USING (auth.uid() = tenant_id OR public.is_super_admin());

CREATE POLICY "Rent: Landlords can view property payments" 
  ON public.rent_payments FOR SELECT 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

CREATE POLICY "Rent: Tenants can create their payments" 
  ON public.rent_payments FOR INSERT 
  WITH CHECK (
    auth.uid() = tenant_id 
    AND public.get_user_role() IN ('tenant', 'super_admin')
    AND tenant_id IN (SELECT user_id FROM public.tenants WHERE property_id = rent_payments.property_id)
  );

CREATE POLICY "Rent: Landlords can update property payments" 
  ON public.rent_payments FOR UPDATE 
  USING (auth.uid() = landlord_id OR public.is_super_admin());

-- Messages policies
CREATE POLICY "Messages: Users can view sent messages" 
  ON public.messages FOR SELECT 
  USING (auth.uid() = sender_id OR public.is_super_admin());

CREATE POLICY "Messages: Users can view received messages" 
  ON public.messages FOR SELECT 
  USING (auth.uid() = recipient_id OR public.is_super_admin());

CREATE POLICY "Messages: Users can send messages" 
  ON public.messages FOR INSERT 
  WITH CHECK (
    auth.uid() = sender_id 
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Messages: Users can update their received messages" 
  ON public.messages FOR UPDATE 
  USING (auth.uid() = recipient_id OR public.is_super_admin());

-- Update existing users table policies to include super admin
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

CREATE POLICY "Users can view their own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id OR public.is_super_admin());

CREATE POLICY "Users can update their own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id OR public.is_super_admin());

CREATE POLICY "Users can insert their own profile" 
  ON public.users FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Super admin can view all users" 
  ON public.users FOR SELECT 
  USING (public.is_super_admin());

-- Update caretaker_assignments policies
DROP POLICY IF EXISTS "Caretakers can view their assignments" ON public.caretaker_assignments;
DROP POLICY IF EXISTS "Users can view assignments for their properties" ON public.caretaker_assignments;
DROP POLICY IF EXISTS "Authenticated users can create assignments" ON public.caretaker_assignments;
DROP POLICY IF EXISTS "Users can update their own assignments" ON public.caretaker_assignments;
DROP POLICY IF EXISTS "Users can delete their own assignments" ON public.caretaker_assignments;

CREATE POLICY "Caretakers can view their assignments" 
  ON public.caretaker_assignments FOR SELECT 
  USING (auth.uid() = caretaker_id OR public.is_super_admin());

CREATE POLICY "Property owners can view assignments for their properties" 
  ON public.caretaker_assignments FOR SELECT 
  USING (
    property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) 
    OR public.is_super_admin()
  );

CREATE POLICY "Landlords can create caretaker assignments" 
  ON public.caretaker_assignments FOR INSERT 
  WITH CHECK (
    property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) 
    AND public.get_user_role() IN ('landlord', 'super_admin')
  );

CREATE POLICY "Property owners can update their assignments" 
  ON public.caretaker_assignments FOR UPDATE 
  USING (
    property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) 
    OR public.is_super_admin()
  );

CREATE POLICY "Property owners can delete their assignments" 
  ON public.caretaker_assignments FOR DELETE 
  USING (
    property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) 
    OR public.is_super_admin()
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_landlord_id ON public.properties(landlord_id);
CREATE INDEX IF NOT EXISTS idx_properties_agent_id ON public.properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_properties_available ON public.properties(is_available);
CREATE INDEX IF NOT EXISTS idx_tenants_user_id ON public.tenants(user_id);
CREATE INDEX IF NOT EXISTS idx_tenants_property_id ON public.tenants(property_id);
CREATE INDEX IF NOT EXISTS idx_tenants_landlord_id ON public.tenants(landlord_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_tenant_id ON public.maintenance_requests(tenant_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_property_id ON public.maintenance_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_rent_payments_tenant_id ON public.rent_payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_rent_payments_landlord_id ON public.rent_payments(landlord_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON public.messages(recipient_id);

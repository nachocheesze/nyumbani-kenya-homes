
-- Create agent_properties table to link agents to assigned properties
CREATE TABLE public.agent_properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  commission_rate NUMERIC(5,2) DEFAULT 5.00,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(agent_id, property_id)
);

-- Create developer_projects table for construction projects
CREATE TABLE public.developer_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  developer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  budget NUMERIC(15,2),
  start_date DATE,
  expected_completion DATE,
  actual_completion DATE,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'on_hold', 'cancelled')),
  project_type TEXT DEFAULT 'residential' CHECK (project_type IN ('residential', 'commercial', 'mixed_use', 'infrastructure')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create investor_projects table to link investors to projects
CREATE TABLE public.investor_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investor_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.developer_projects(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  investment_amount NUMERIC(15,2) NOT NULL,
  investment_date DATE DEFAULT CURRENT_DATE,
  ownership_percentage NUMERIC(5,2),
  expected_return_rate NUMERIC(5,2),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CHECK ((project_id IS NOT NULL AND property_id IS NULL) OR (project_id IS NULL AND property_id IS NOT NULL))
);

-- Create service_provider_orders table for service bookings
CREATE TABLE public.service_provider_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_provider_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  description TEXT NOT NULL,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completion_date TIMESTAMP WITH TIME ZONE,
  cost NUMERIC(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create short_term_bookings table for Airbnb-style hosts
CREATE TABLE public.short_term_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  booking_fee NUMERIC(10,2) DEFAULT 0,
  cleaning_fee NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CHECK (check_out_date > check_in_date)
);

-- Create real_estate_company_agents table to associate agents to companies
CREATE TABLE public.real_estate_company_agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  agent_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  hire_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'terminated')),
  commission_split NUMERIC(5,2) DEFAULT 50.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(company_id, agent_id)
);

-- Enable Row Level Security on all new tables
ALTER TABLE public.agent_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developer_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_provider_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.short_term_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_estate_company_agents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agent_properties
CREATE POLICY "Agents can view their property assignments" ON public.agent_properties
  FOR SELECT USING (auth.uid() = agent_id OR is_super_admin());

CREATE POLICY "Property owners can view agent assignments" ON public.agent_properties
  FOR SELECT USING (property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) OR is_super_admin());

CREATE POLICY "Property owners can assign agents" ON public.agent_properties
  FOR INSERT WITH CHECK (property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) AND get_user_role() = ANY(ARRAY['landlord', 'super_admin']));

CREATE POLICY "Property owners can update agent assignments" ON public.agent_properties
  FOR UPDATE USING (property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) OR is_super_admin());

CREATE POLICY "Property owners can remove agent assignments" ON public.agent_properties
  FOR DELETE USING (property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) OR is_super_admin());

-- RLS Policies for developer_projects
CREATE POLICY "Developers can manage their projects" ON public.developer_projects
  FOR ALL USING (auth.uid() = developer_id OR is_super_admin());

CREATE POLICY "Developers can create projects" ON public.developer_projects
  FOR INSERT WITH CHECK (auth.uid() = developer_id AND get_user_role() = ANY(ARRAY['developer', 'super_admin']));

-- RLS Policies for investor_projects
CREATE POLICY "Investors can view their investments" ON public.investor_projects
  FOR SELECT USING (auth.uid() = investor_id OR is_super_admin());

CREATE POLICY "Developers can view project investments" ON public.investor_projects
  FOR SELECT USING (project_id IN (SELECT id FROM public.developer_projects WHERE developer_id = auth.uid()) OR is_super_admin());

CREATE POLICY "Property owners can view property investments" ON public.investor_projects
  FOR SELECT USING (property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) OR is_super_admin());

CREATE POLICY "Investors can create investments" ON public.investor_projects
  FOR INSERT WITH CHECK (auth.uid() = investor_id AND get_user_role() = ANY(ARRAY['investor', 'super_admin']));

CREATE POLICY "Investors can update their investments" ON public.investor_projects
  FOR UPDATE USING (auth.uid() = investor_id OR is_super_admin());

-- RLS Policies for service_provider_orders
CREATE POLICY "Service providers can view their orders" ON public.service_provider_orders
  FOR SELECT USING (auth.uid() = service_provider_id OR is_super_admin());

CREATE POLICY "Clients can view their service orders" ON public.service_provider_orders
  FOR SELECT USING (auth.uid() = client_id OR is_super_admin());

CREATE POLICY "Property owners can view property service orders" ON public.service_provider_orders
  FOR SELECT USING (property_id IN (SELECT id FROM public.properties WHERE landlord_id = auth.uid()) OR is_super_admin());

CREATE POLICY "Clients can create service orders" ON public.service_provider_orders
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Service providers can update their orders" ON public.service_provider_orders
  FOR UPDATE USING (auth.uid() = service_provider_id OR is_super_admin());

CREATE POLICY "Clients can update their orders" ON public.service_provider_orders
  FOR UPDATE USING (auth.uid() = client_id OR is_super_admin());

-- RLS Policies for short_term_bookings
CREATE POLICY "Hosts can manage their bookings" ON public.short_term_bookings
  FOR ALL USING (auth.uid() = host_id OR is_super_admin());

CREATE POLICY "Hosts can create bookings" ON public.short_term_bookings
  FOR INSERT WITH CHECK (auth.uid() = host_id AND get_user_role() = ANY(ARRAY['short_term_host', 'super_admin']));

-- RLS Policies for real_estate_company_agents
CREATE POLICY "Companies can manage their agents" ON public.real_estate_company_agents
  FOR ALL USING (auth.uid() = company_id OR is_super_admin());

CREATE POLICY "Agents can view their company associations" ON public.real_estate_company_agents
  FOR SELECT USING (auth.uid() = agent_id OR is_super_admin());

CREATE POLICY "Companies can assign agents" ON public.real_estate_company_agents
  FOR INSERT WITH CHECK (auth.uid() = company_id AND get_user_role() = ANY(ARRAY['real_estate_company', 'super_admin']));

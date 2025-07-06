
-- First, let's ensure the users table role constraint includes all roles properly
-- Drop the existing constraint and recreate it with all current roles
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE public.users ADD CONSTRAINT users_role_check 
CHECK (role IN (
  'tenant',
  'landlord', 
  'agent',
  'real_estate_company',
  'service_provider',
  'developer',
  'investor',
  'short_term_host',
  'caretaker',
  'admin',
  'super_admin'
));

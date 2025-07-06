
-- Add caretaker to the existing role enum (assuming role is stored as text)
-- Since we're using text for roles, no enum modification needed

-- Create caretaker_assignments table
CREATE TABLE public.caretaker_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caretaker_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID, -- We'll add proper foreign key when properties table exists
  assigned_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on caretaker_assignments
ALTER TABLE public.caretaker_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for caretaker_assignments
CREATE POLICY "Caretakers can view their assignments" 
  ON public.caretaker_assignments 
  FOR SELECT 
  USING (auth.uid() = caretaker_id);

CREATE POLICY "Users can view assignments for their properties" 
  ON public.caretaker_assignments 
  FOR SELECT 
  USING (true); -- We'll refine this when we have properties table

-- Create policy for inserting assignments (admin/landlord level)
CREATE POLICY "Authenticated users can create assignments" 
  ON public.caretaker_assignments 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy for updating assignments
CREATE POLICY "Users can update their own assignments" 
  ON public.caretaker_assignments 
  FOR UPDATE 
  USING (auth.uid() = caretaker_id);

-- Create policy for deleting assignments
CREATE POLICY "Users can delete their own assignments" 
  ON public.caretaker_assignments 
  FOR DELETE 
  USING (auth.uid() = caretaker_id);

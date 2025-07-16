import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyForm, PropertyFormValues } from "@/components/property-management/PropertyForm";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function PropertyFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: editingProperty, isLoading: isLoadingProperty } = useQuery({
    queryKey: ["properties", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from("properties").select("*, features:features, amenities:amenities, images:images").eq("id", id).single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (formData: PropertyFormValues) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to save a property");
      }

      const propertyData = {
        ...formData,
        id: id, // Ensure id is passed for upsert
        landlord_id: user.id
      };

      const { data, error } = await supabase
        .from('properties')
        .upsert(propertyData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast({ title: `Property ${id ? 'updated' : 'created'} successfully!` });
      if (data) {
        navigate(`/properties/${data.id}`);
      }
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSave = (data: PropertyFormValues) => {
    mutation.mutate(data);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoadingProperty && id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <PropertyForm 
        editingProperty={editingProperty ?? undefined}
        onSave={handleSave} 
        onCancel={handleCancel}
        isSubmitting={mutation.isLoading}
      />
    </div>
  );
}

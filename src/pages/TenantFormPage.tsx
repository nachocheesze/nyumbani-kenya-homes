import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TenantForm, TenantFormValues } from "@/components/property-management/TenantForm";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function TenantFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: editingTenant, isLoading: isLoadingTenant } = useQuery({
    queryKey: ["tenants", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from("tenants").select("*").eq("id", id).single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (formData: TenantFormValues) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to save a tenant");
      }

      const tenantData = {
        ...formData,
        id: id, // Ensure id is passed for upsert
        user_id: user.id, // Assuming the tenant is also a user in the system
        landlord_id: user.id, // Assign landlord based on role
      };

      const { data, error } = await supabase
        .from('tenants')
        .upsert(tenantData)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast({ title: `Tenant ${id ? 'updated' : 'created'} successfully!` });
      if (data) {
        navigate(`/dashboard/property-management/tenants`);
      }
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleSave = (data: TenantFormValues) => {
    mutation.mutate(data);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoadingTenant && id) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={cn("space-y-6", "p-6 bg-white rounded-lg shadow-md")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? "Edit Tenant" : "Add New Tenant"}
            </h1>
          </div>
          <nav className="text-sm text-gray-500">
            Dashboard / Tenants / {id ? "Edit Tenant" : "Add Tenant"}
          </nav>
        </div>
        <TenantForm 
          editingTenant={editingTenant ?? undefined}
          onSave={handleSave} 
          onCancel={handleCancel}
          isSubmitting={mutation.isLoading}
        />
      </div>
    </DashboardLayout>
  );
}

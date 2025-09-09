import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { quickAddTenantSchema } from "@/types/quickAdd";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type QuickAddTenantFormValues = z.infer<typeof quickAddTenantSchema>;

export function QuickAddTenantForm() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const form = useForm<QuickAddTenantFormValues>({
    resolver: zodResolver(quickAddTenantSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      id_type: "",
      id_number: "",
    },
  });

  const selectedIdType = form.watch("id_type");

  const onSubmit = async (values: QuickAddTenantFormValues) => {
    if (!userProfile) {
      toast.error("You must be logged in to add a tenant.");
      return;
    }

    const { data: tenantData, error: tenantError } = await supabase.from("tenants").insert([
      {
        full_name: values.full_name,
        email: values.email,
        phone_number: values.phone_number,
        landlord_id: userProfile.id,
        is_quick_added: true,
        onboarding_status: 'draft',
        progress_step: 1,
      },
    ]).select();

    if (tenantError) {
      toast.error("Failed to add tenant. Please try again.");
      console.error("Error inserting tenant:", tenantError);
      return;
    }

    const newTenant = tenantData[0];

    if (values.id_type && values.id_number && newTenant) {
      const normalizedIdType = values.id_type.toLowerCase().replace(/\s/g, '_');
      const { error: identificationError } = await supabase.from("tenant_identifications").insert([
        {
          tenant_id: newTenant.id,
          id_type: normalizedIdType,
          id_number: values.id_number,
        },
      ]);

      if (identificationError) {
        toast.error("Tenant added, but failed to save identification details.");
        console.error("Error inserting tenant identification:", identificationError);
      }
    }

    toast.success("Tenant added successfully as a draft!");
    navigate("/dashboard/landlord/tenants");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. John Doe" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. john.doe@example.com"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 0712345678"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Type (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an ID type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="National ID">National ID</SelectItem>
                  <SelectItem value="Passport">Passport</SelectItem>
                  <SelectItem value="Alien ID">Alien ID</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 12345678"
                  {...field}
                  autoComplete="off"
                  disabled={!selectedIdType}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard/landlord/tenants")}
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { quickAddPropertySchema } from "@/types/quickAdd";
import { toast } from "sonner";
import PropertyStepUnits from "../properties/steps/PropertyStepUnits";
import { useAuth } from "@/contexts/AuthContext";

type QuickAddPropertyFormValues = z.infer<typeof quickAddPropertySchema>;

export function QuickAddPropertyForm() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const form = useForm<QuickAddPropertyFormValues>({
    resolver: zodResolver(quickAddPropertySchema),
    defaultValues: {
      property_name: "",
      property_type: "apartment",
      city: "",
      county: "",
      address: "",
    },
  });

  const onSubmit = async (values: QuickAddPropertyFormValues) => {
    if (!userProfile) {
      toast.error("You must be logged in to add a property.");
      return;
    }

    if (!values.property_type) {
      toast.error("Please select a property type.");
      return;
    }

    const { error } = await supabase.from("properties").insert([
      {
        property_name: values.property_name,
        property_type: values.property_type,
        city: values.city,
        county: values.county,
        address: values.address,
        is_quick_added: true,
        onboarding_status: "draft",
        progress_step: 1,
        landlord_id: userProfile.id,
      },
    ]);

    if (error) {
      toast.error("Failed to add property. Please try again.");
      console.error("Error inserting property:", error);
    } else {
      toast.success("Property added successfully!");
      navigate("/dashboard/landlord/properties");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="property_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Nyumbani Heights"
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
          name="property_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Nairobi"
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
          name="county"
          render={({ field }) => (
            <FormItem>
              <FormLabel>County</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Nairobi"
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter property address"
                  {...field}
                  autoComplete="off"
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
            onClick={() => navigate("/dashboard/landlord/properties")}
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
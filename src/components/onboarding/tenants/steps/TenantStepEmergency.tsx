import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TenantFormData } from '../TenantOnboardingForm';

interface TenantStepEmergencyProps {
  form: UseFormReturn<TenantFormData>;
}

const TenantStepEmergency: React.FC<TenantStepEmergencyProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <FormField
        control={form.control}
        name="emergency_contact_full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter emergency contact's full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="emergency_contact_relationship"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Parent, Sibling, Friend" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="emergency_contact_phone_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter emergency contact's phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      

      <h3 className="text-lg font-semibold mt-6">Guarantor Information (Optional)</h3>
      <FormField
        control={form.control}
        name="guarantor_full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guarantor Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter guarantor's full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="guarantor_phone_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guarantor Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter guarantor's phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="guarantor_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guarantor Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter guarantor's email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TenantStepEmergency;

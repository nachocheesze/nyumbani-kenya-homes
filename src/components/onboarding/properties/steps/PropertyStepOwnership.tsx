import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepOwnershipProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepOwnership: React.FC<PropertyStepOwnershipProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Management & Ownership</h2>
      <p className="text-gray-600">Capture details about the individuals or entities managing this property.</p>

      {/* Landlord ID */}
      <FormField
        control={form.control}
        name="landlord_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Landlord ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter Landlord ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Agent ID (Optional) */}
      <FormField
        control={form.control}
        name="agent_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agent ID (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter Agent ID if applicable" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Caretaker ID (Optional) */}
      <FormField
        control={form.control}
        name="caretaker_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Caretaker ID (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter Caretaker ID if applicable" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Paybill Number (Optional) */}
      <FormField
        control={form.control}
        name="paybill_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Paybill Number (Optional)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 123456" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Bank Account (Optional) */}
      <FormField
        control={form.control}
        name="bank_account"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bank Account (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 1234567890 (Account Number)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Internal Notes / Tags (Optional) */}
      <FormField
        control={form.control}
        name="internal_notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Internal Notes / Tags (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add any internal notes or tags for this property..."
                className="resize-y"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyStepOwnership;

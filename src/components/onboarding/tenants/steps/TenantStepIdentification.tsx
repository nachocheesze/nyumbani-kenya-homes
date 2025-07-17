import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TenantFormData } from '../TenantOnboardingForm';

interface TenantStepIdentificationProps {
  form: UseFormReturn<TenantFormData>;
}

const TenantStepIdentification: React.FC<TenantStepIdentificationProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="id_document_front"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>ID Document Front</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                accept="image/*"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="id_document_back"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>ID Document Back</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                accept="image/*"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="passport_photo"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Passport Photo</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                accept="image/*"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="kra_pin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>KRA PIN</FormLabel>
            <FormControl>
              <Input placeholder="Enter KRA PIN" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="occupation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Occupation</FormLabel>
            <FormControl>
              <Input placeholder="Enter occupation" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TenantStepIdentification;

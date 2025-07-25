import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TenantFormData } from '../TenantOnboardingForm';

interface TenantStepIdentificationProps {
  form: UseFormReturn<TenantFormData>;
}

const TenantStepIdentification: React.FC<TenantStepIdentificationProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Identification Details</h2>
      <FormField
        control={form.control}
        name="id_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID Document Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a document type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="national_id">National ID</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="alien_id">Alien ID</SelectItem>
                <SelectItem value="drivers_license">Driver's License</SelectItem>
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
            <FormLabel>ID Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter the ID number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
        name="selfie_photo"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Selfie Photo</FormLabel>
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
        name="nhif_insurance_no"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NHIF/Insurance Number</FormLabel>
            <FormControl>
              <Input placeholder="Enter NHIF or Insurance Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TenantStepIdentification;

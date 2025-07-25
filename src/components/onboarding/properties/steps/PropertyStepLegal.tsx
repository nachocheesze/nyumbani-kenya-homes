import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepLegalProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepLegal: React.FC<PropertyStepLegalProps> = ({ form }) => {
  const ownershipTypes = ['freehold', 'leasehold'];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Legal & Documents</h2>
      <p className="text-gray-600">Upload relevant legal documents for the property.</p>

      {/* Ownership Type */}
      <FormField
        control={form.control}
        name="ownership_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ownership Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select ownership type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ownershipTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Title Deed */}
      <FormField
        control={form.control}
        name="title_deed_file"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Title Deed (PDF)</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                accept=".pdf"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Lease Template (PDF) */}
      <FormField
        control={form.control}
        name="lease_template_file"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Lease Template (PDF, Optional)</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                accept=".pdf"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Construction Permits (PDF, Optional) */}
      <FormField
        control={form.control}
        name="construction_permit_file"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Construction Permits (PDF, Optional)</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                accept=".pdf"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* NEMA Certificate (PDF, Optional) */}
      <FormField
        control={form.control}
        name="nema_certificate_file"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>NEMA Certificate (PDF, Optional)</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                type="file"
                accept=".pdf"
                onChange={(event) => onChange(event.target.files && event.target.files[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyStepLegal;

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { TenantFormData } from '../TenantOnboardingForm';

interface TenantStepDeclarationsConsentsProps {
  form: UseFormReturn<TenantFormData>;
}

const TenantStepDeclarationsConsents: React.FC<TenantStepDeclarationsConsentsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Declarations & Consents</h2>
      <FormField
        control={form.control}
        name="data_consent_given"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I consent to the processing of my personal data as per the privacy policy.
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lease_agreement_consent_given"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I have read and agree to the terms and conditions of the lease agreement.
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="signature_image"
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel>Digital Signature (Upload Image of Signature)</FormLabel>
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
    </div>
  );
};

export default TenantStepDeclarationsConsents;

import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { TenantFormData } from '../TenantOnboardingForm';

interface TenantStepAdditionalDocumentsProps {
  form: UseFormReturn<TenantFormData>;
}

const TenantStepAdditionalDocuments: React.FC<TenantStepAdditionalDocumentsProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "additional_documents",
  });

  return (
    <div className="space-y-4">
      <FormLabel>Additional Documents</FormLabel>
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-end space-x-2">
          <FormField
            control={form.control}
            name={`additional_documents.${index}.file`}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(event) => onChange(event.target.files && event.target.files[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`additional_documents.${index}.caption`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Caption (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ file: null, caption: "" })}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Document
      </Button>
    </div>
  );
};

export default TenantStepAdditionalDocuments;

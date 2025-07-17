import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepMediaProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepMedia: React.FC<PropertyStepMediaProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "media_files",
  });

  return (
    <div className="space-y-4">
      <FormLabel>Property Images</FormLabel>
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-end space-x-2">
          <FormField
            control={form.control}
            name={`media_files.${index}.file`}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="flex-1">
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
            name={`media_files.${index}.caption`}
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
        <Plus className="h-4 w-4 mr-2" /> Add Image
      </Button>
    </div>
  );
};

export default PropertyStepMedia;
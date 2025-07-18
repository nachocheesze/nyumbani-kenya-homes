import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, X } from 'lucide-react';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepUnitsProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepUnits: React.FC<PropertyStepUnitsProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "units",
  });

  return (
    <div className="space-y-4">
      <FormLabel>Units Setup</FormLabel>
      {fields.map((item, index) => (
        <div key={item.id} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <FormField
            control={form.control}
            name={`units.${index}.unit_name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Name / Label</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Unit 1A, Penthouse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`units.${index}.rent_amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount (KES)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`units.${index}.deposit_amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Amount (KES)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={`units.${index}.is_available`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Is Available</FormLabel>
                  <FormDescription>
                    Toggle if this unit is currently available for rent.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ unit_name: "", rent_amount: 0, deposit_amount: 0, is_available: true })}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Unit
      </Button>
    </div>
  );
};

export default PropertyStepUnits;

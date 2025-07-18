import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepOverviewProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepOverview: React.FC<PropertyStepOverviewProps> = ({ form }) => {
  const structureTypes = ['single_unit', 'apartment_block', 'gated_estate', 'mixed_use'];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="property_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter property name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="structure_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Structure Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select structure type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {structureTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="total_units"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Units</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="N/A"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter property description..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyStepOverview;

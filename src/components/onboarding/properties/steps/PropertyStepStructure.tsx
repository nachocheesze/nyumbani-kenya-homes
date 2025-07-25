import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepStructureProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepStructure: React.FC<PropertyStepStructureProps> = ({ form }) => {
  const structureType = form.watch('structure_type');
  const hasBlocks = form.watch('has_blocks');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Property Structure</h2>
      <p className="text-gray-600">Tell us about the type of property you are listing.</p>

      {/* Structure Type */}
      <FormField
        control={form.control}
        name="structure_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What type of property is this?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a structure type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="single_unit">Single Unit Home (e.g., standalone house)</SelectItem>
                <SelectItem value="multi_unit_block">Multi-Unit Block (e.g., apartment building)</SelectItem>
                <SelectItem value="estate">Gated Estate (with multiple blocks/units)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Conditional: hasBlocks (only if structureType is 'estate') */}
      {structureType === 'estate' && (
        <FormField
          control={form.control}
          name="has_blocks"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Does this estate have distinct blocks?
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      )}

      {/* Conditional: numberOfBlocks (only if hasBlocks is true) */}
      {structureType === 'estate' && hasBlocks && (
        <FormField
          control={form.control}
          name="number_of_blocks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Blocks</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                  min="1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Has Unit Variations */}
      <FormField
        control={form.control}
        name="has_unit_variations"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Will units within this property have different layouts or features (e.g., 1-bed, 2-bed, different finishes)?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === 'true')}
                defaultValue={field.value?.toString()}
                className="flex items-center space-x-4"
              >
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="true" id="has_unit_variations-yes" />
                  </FormControl>
                  <FormLabel htmlFor="has_unit_variations-yes" className="font-normal">Yes</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="false" id="has_unit_variations-no" />
                  </FormControl>
                  <FormLabel htmlFor="has_unit_variations-no" className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Approximate Unit Count (Optional, for early estimation) */}
      {/* This field is now conditional based on structure_type and has_unit_variations */}
      {(structureType === 'single_unit' || (structureType === 'multi_unit_block' && !hasBlocks) || (structureType === 'estate' && !hasBlocks)) && (
        <FormField
          control={form.control}
          name="approx_unit_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Approximate Total Number of Units (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                  min="1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default PropertyStepStructure;
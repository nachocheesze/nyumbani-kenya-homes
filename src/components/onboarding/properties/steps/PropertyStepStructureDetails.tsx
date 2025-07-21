import React, { useEffect } from 'react';
import { useFormContext, useFieldArray, UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { PropertyFormData } from '../PropertyOnboardingForm';
import { generateBlockName } from '@/lib/utils';
import CheckboxGroup from '@/components/ui/CheckboxGroup';

interface PropertyStepStructureDetailsProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepStructureDetails: React.FC<PropertyStepStructureDetailsProps> = ({ form }) => {
  const { control, watch, setValue } = useFormContext<PropertyFormData>();
  const structureType = watch('structure_type');
  const hasBlocks = watch('has_blocks');
  const numberOfBlocks = watch('number_of_blocks');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'blocks',
  });

  useEffect(() => {
    if (structureType === 'estate' && hasBlocks) {
      const currentBlockCount = fields.length;
      const targetBlockCount = numberOfBlocks || 0;

      if (targetBlockCount > currentBlockCount) {
        for (let i = currentBlockCount; i < targetBlockCount; i++) {
          append({
            name: generateBlockName(i),
            floorCount: undefined,
            hasElevator: false,
            unitsInBlock: 1,
          });
        }
      } else if (targetBlockCount < currentBlockCount) {
        for (let i = currentBlockCount; i > targetBlockCount; i--) {
          remove(i - 1);
        }
      }
    } else {
      // Clear blocks if the condition is not met
      if (fields.length > 0) {
        setValue('blocks', []);
      }
    }
  }, [structureType, hasBlocks, numberOfBlocks, append, remove, fields.length, setValue]);

  const showBlockConfiguration = (structureType === 'estate' || structureType === 'multi_unit_block') && hasBlocks;

  const amenitiesOptions = ["WiFi", "Parking", "Security", "Water Tank", "Borehole", "Playground", "Gym", "Clubhouse", "Swimming Pool", "Backup Generator", "Other"];
  const utilitiesOptions = ["Water", "Electricity", "Gas", "Garbage Collection", "Sewer", "Internet", "Other"];
  const featuresOptions = ["Balcony", "Rooftop Access", "Laundry Room", "Generator Backup", "CCTV", "Lift", "Solar Panels", "Other"];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Structural Details</h2>
      <p className="text-gray-600">Provide details about the property's physical structure.</p>

      {showBlockConfiguration ? (
        <div className="space-y-4 border p-4 rounded-md">
          <h3 className="text-lg font-semibold">Block Details</h3>
          <p className="text-sm text-gray-500">These names will be used when assigning units later.</p>
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <FormField
                control={control}
                name={`blocks.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`e.g., ${generateBlockName(index)}`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={control}
                  name={`blocks.${index}.floorCount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Floors</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="e.g., 4" min="1" onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`blocks.${index}.unitsInBlock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Units in Block</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} placeholder="e.g., 8" min="1" onChange={e => field.onChange(parseInt(e.target.value) || 1)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`blocks.${index}.hasElevator`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-start space-x-2 pt-8">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0">Has Elevator?</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <FormField
            control={control}
            name="floor_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Floors</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="e.g., 1" min="1" onChange={e => field.onChange(parseInt(e.target.value) || undefined)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="has_elevator"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Does the property have an elevator?</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="space-y-6 pt-6">
        <CheckboxGroup name="amenities" label="Common Amenities" options={amenitiesOptions} />
        <CheckboxGroup name="shared_utilities" label="Shared Utilities" options={utilitiesOptions} />
        <CheckboxGroup name="features" label="Features" options={featuresOptions} />
      </div>
    </div>
  );
};

export default PropertyStepStructureDetails;

import React from 'react';
import { useFormContext, useFieldArray, UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepUnitsProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepUnits: React.FC<PropertyStepUnitsProps> = ({ form }) => {
  const { control, watch } = useFormContext<PropertyFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "units",
  });

  const blocks = watch("blocks") ?? [];
  const showBlockSelector = blocks.length > 0;

  const paymentCycles = ['monthly', 'quarterly', 'annually'];
  const rentDueDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const addNewUnit = () => {
    append({
      unitNumber: "",
      blockName: blocks.length > 0 ? blocks[0].name : undefined,
      bedrooms: 1,
      bathrooms: 1,
      size: undefined,
      rent: undefined,
      deposit: undefined,
      isNegotiable: false,
      paymentCycle: 'monthly',
      rentDueDay: 1,
      isOccupied: false,
      availableFrom: new Date().toISOString().split('T')[0],
      tenantId: undefined,
      notes: "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Units Breakdown</h2>
      <p className="text-gray-600">Define the individual units within the property. Add as many units as needed.</p>

      {fields.map((item, index) => (
        <div key={item.id} className="border p-4 rounded-lg space-y-4 relative">
          <div className="absolute top-2 right-2">
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`units.${index}.unitNumber`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Number / Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., A101, Penthouse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showBlockSelector && (
              <FormField
                control={control}
                name={`units.${index}.blockName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a block" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {blocks.map((block) => (
                          <SelectItem key={block.name} value={block.name}>
                            {block.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name={`units.${index}.bedrooms`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 3" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`units.${index}.bathrooms`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 2" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`units.${index}.size`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size (sqm)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 85" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`units.${index}.rent`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent (Monthly)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`units.${index}.deposit`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name={`units.${index}.isNegotiable`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Is rent negotiable?</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`units.${index}.paymentCycle`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Cycle</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cycle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentCycles.map(cycle => (
                        <SelectItem key={cycle} value={cycle}>{cycle.charAt(0).toUpperCase() + cycle.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`units.${index}.rentDueDay`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Due Day</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value, 10))} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rentDueDays.map(day => (
                        <SelectItem key={day} value={day.toString()}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name={`units.${index}.isOccupied`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Is this unit currently occupied?</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {!watch(`units.${index}.isOccupied`) && (
            <FormField
              control={control}
              name={`units.${index}.availableFrom`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available From</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watch(`units.${index}.isOccupied`) && (
             <FormField
              control={control}
              name={`units.${index}.tenantId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenant ID (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tenant ID if known" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={control}
            name={`units.${index}.notes`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any private notes about this unit..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addNewUnit} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Another Unit
      </Button>
    </div>
  );
};

export default PropertyStepUnits;

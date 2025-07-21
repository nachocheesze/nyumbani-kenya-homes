import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepLocationDetailsProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepLocationDetails: React.FC<PropertyStepLocationDetailsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Location Details</h2>
      <p className="text-gray-600">Provide precise location information for the property.</p>

      {/* Address */}
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input placeholder="Enter full address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* City */}
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="Enter city" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* County */}
      <FormField
        control={form.control}
        name="county"
        render={({ field }) => (
          <FormItem>
            <FormLabel>County</FormLabel>
            <FormControl>
              <Input placeholder="Enter county" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Neighborhood */}
      <FormField
        control={form.control}
        name="neighborhood"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Neighborhood (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Kilimani, Westlands" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Nearest Landmark */}
      <FormField
        control={form.control}
        name="nearest_landmark"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nearest Landmark (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Near ABC Mall, Opposite XYZ School" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Coordinates (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder="e.g., -1.286389"
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
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder="e.g., 36.817223"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PropertyStepLocationDetails;
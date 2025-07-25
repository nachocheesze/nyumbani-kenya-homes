import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PropertyFormData } from '../PropertyOnboardingForm';

interface PropertyStepDetailsProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepDetails: React.FC<PropertyStepDetailsProps> = ({ form }) => {
  const propertyTypes = ['apartment', 'house', 'commercial', 'land'];
  const propertyCategories = ['residential', 'commercial', 'industrial', 'land'];
  const managedByOptions = ['owner', 'agent', 'caretaker', 'developer'];
  const propertyStatusOptions = ['available', 'occupied', 'under_renovation', 'coming_soon'];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Basic Property Information</h2>
      <p className="text-gray-600">Provide the essential details about your property.</p>

      {/* Property Name */}
      <FormField
        control={form.control}
        name="property_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Serene Gardens Apartments" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide a detailed description of the property..."
                className="resize-y"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Property Type */}
      <FormField
        control={form.control}
        name="property_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertyTypes.map((type) => (
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

      {/* Property Category */}
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select property category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertyCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Managed By */}
      <FormField
        control={form.control}
        name="managed_by"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Managed By</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Who manages this property?" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {managedByOptions.map((manager) => (
                  <SelectItem key={manager} value={manager}>
                    {manager.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Property Status */}
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Current status of the property" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertyStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Optional Tags */}
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., luxury, furnished, pet-friendly (comma-separated)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyStepDetails;

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
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const { fields: floorPlanFields, append: appendFloorPlan, remove: removeFloorPlan } = useFieldArray({
    control: form.control,
    name: "floor_plans",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Property Media</h2>
      <p className="text-gray-600">Upload photos, floor plans, and add links to virtual tours.</p>

      {/* Images */}
      <div className="space-y-4 border p-4 rounded-md">
        <FormLabel>Property Images</FormLabel>
        {imageFields.map((item, index) => (
          <div key={item.id} className="flex items-end space-x-2">
            <FormField
              control={form.control}
              name={`images.${index}.file`}
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
              name={`images.${index}.caption`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Caption (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="outline" size="icon" onClick={() => removeImage(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => appendImage({ file: null, caption: "" })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Image
        </Button>
      </div>

      {/* Floor Plans */}
      <div className="space-y-4 border p-4 rounded-md">
        <FormLabel>Floor Plans</FormLabel>
        {floorPlanFields.map((item, index) => (
          <div key={item.id} className="flex items-end space-x-2">
            <FormField
              control={form.control}
              name={`floor_plans.${index}.file`}
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(event) => onChange(event.target.files && event.target.files[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`floor_plans.${index}.caption`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Caption (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="outline" size="icon" onClick={() => removeFloorPlan(index)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => appendFloorPlan({ file: null, caption: "" })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Floor Plan
        </Button>
      </div>

      {/* Video Tour URL */}
      <FormField
        control={form.control}
        name="video_tour_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Video Tour URL (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., https://youtube.com/watch?v=example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Virtual Tour URL */}
      <FormField
        control={form.control}
        name="virtual_tour_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Virtual Tour URL (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., https://my.matterport.com/show/?m=example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PropertyStepMedia;

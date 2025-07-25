import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';

interface CheckboxGroupProps {
  name: string;
  options: string[];
  label: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, options, label }) => {
  const { control, watch, setValue } = useFormContext();
  const selectedValues = watch(name, []);
  const [otherValue, setOtherValue] = useState('');
  const isOtherSelected = selectedValues.includes('Other');

  const handleCheckboxChange = (option: string, checked: boolean) => {
    let newValues = [...selectedValues];
    if (checked) {
      newValues.push(option);
    } else {
      newValues = newValues.filter(v => v !== option && !v.startsWith('Other:'));
      if (option === 'Other') {
        setOtherValue('');
      }
    }
    setValue(name, newValues, { shouldValidate: true });
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherValue(value);
    const otherEntry = `Other: ${value}`;
    const newValues = selectedValues.filter((v: string) => !v.startsWith('Other:'));
    newValues.push(otherEntry);
    setValue(name, newValues, { shouldValidate: true });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-lg font-semibold">{label}</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {options.map((option) => (
              <FormItem key={option} className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={selectedValues.includes(option)}
                    onCheckedChange={(checked) => handleCheckboxChange(option, !!checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal">{option}</FormLabel>
              </FormItem>
            ))}
          </div>
          {isOtherSelected && (
            <Input
              placeholder="Please specify other"
              value={otherValue}
              onChange={handleOtherInputChange}
              className="mt-2"
            />
          )}
        </FormItem>
      )}
    />
  );
};

export default CheckboxGroup;

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { TenantFormData } from '../TenantOnboardingForm';

interface TenantStepCommunicationPreferencesProps {
  form: UseFormReturn<TenantFormData>;
}

const TenantStepCommunicationPreferences: React.FC<TenantStepCommunicationPreferencesProps> = ({ form }) => {
  const notificationOptions = [
    { name: 'rent_reminders', label: 'Rent Reminders' },
    { name: 'maintenance_updates', label: 'Maintenance Updates' },
    { name: 'promotions', label: 'Promotional Offers' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Communication Preferences</h2>
      <FormField
        control={form.control}
        name="contact_method"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Contact Method</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contact method" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="phone_call">Phone Call</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="language_preference"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Language Preference</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="sw">Swahili</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>Notification Opt-ins</FormLabel>
        <div className="space-y-2">
          {notificationOptions.map((option) => (
            <FormField
              key={option.name}
              control={form.control}
              name={`notification_opt_ins.${option.name}` as `notification_opt_ins.${keyof TenantFormData['notification_opt_ins']}`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{option.label}</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          ))}
        </div>
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default TenantStepCommunicationPreferences;

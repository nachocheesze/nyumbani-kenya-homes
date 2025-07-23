
import React from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyFormData } from '../PropertyOnboardingForm';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface PropertyStepPaymentsProps {
  form: UseFormReturn<PropertyFormData>;
}

const KENYAN_BANKS = [
    "Absa Bank Kenya", "KCB Bank", "Equity Bank", "Co-operative Bank", "NCBA Bank",
    "Standard Chartered", "Stanbic Bank", "I&M Bank", "Family Bank", "DTB (Diamond Trust Bank)",
    "Sidian Bank", "EcoBank", "Gulf African Bank", "Bank of Africa", "Housing Finance Bank",
    "PostBank", "National Bank of Kenya", "Credit Bank", "Chase Bank", "SBM Bank"
];


const PropertyStepPayments: React.FC<PropertyStepPaymentsProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'payments',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Payment Method {index + 1}</h4>
                <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`payments.${index}.methodType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mobile_money">Mobile Money</SelectItem>
                        <SelectItem value="bank">Bank Account</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch(`payments.${index}.methodType`) === 'mobile_money' && (
                // Mobile Money Fields
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`payments.${index}.provider`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Money Provider</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mpesa">MPESA</SelectItem>
                            <SelectItem value="airtel">Airtel Money</SelectItem>
                            <SelectItem value="t-kash">T-Kash</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch(`payments.${index}.provider`) === 'mpesa' && (
                    <FormField
                      control={form.control}
                      name={`payments.${index}.channel`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MPESA Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select MPESA type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="paybill">Paybill</SelectItem>
                              <SelectItem value="till_number">Till Number</SelectItem>
                              <SelectItem value="phone">Phone Number</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {/* Conditional inputs for MPESA */}
                  {form.watch(`payments.${index}.provider`) === 'mpesa' && form.watch(`payments.${index}.channel`) === 'paybill' && (
                    <>
                      <FormField
                        control={form.control}
                        name={`payments.${index}.accountNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Paybill Number</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 123456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`payments.${index}.accountName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Rent" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  {form.watch(`payments.${index}.provider`) === 'mpesa' && form.watch(`payments.${index}.channel`) === 'till_number' && (
                    <FormField
                      control={form.control}
                      name={`payments.${index}.accountNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Till Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {form.watch(`payments.${index}.provider`) === 'mpesa' && form.watch(`payments.${index}.channel`) === 'phone' && (
                    <FormField
                      control={form.control}
                      name={`payments.${index}.accountNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MPESA Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 0712345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {form.watch(`payments.${index}.provider`) === 'airtel' && (
                    <FormField
                      control={form.control}
                      name={`payments.${index}.accountNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Airtel Money Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 0733123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {form.watch(`payments.${index}.provider`) === 't-kash' && (
                    <FormField
                      control={form.control}
                      name={`payments.${index}.accountNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>T-Kash Wallet Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 0790123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {form.watch(`payments.${index}.methodType`) === 'bank' && (
                // Bank Account Fields
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`payments.${index}.bankName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a bank" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {KENYAN_BANKS.map(bank => (
                                    <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`payments.${index}.branch`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Westlands" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`payments.${index}.accountName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`payments.${index}.accountNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`payments.${index}.swiftCode`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SWIFT Code (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. KCBLKENX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {form.watch(`payments.${index}.methodType`) === 'other' && (
                // Other Fields
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name={`payments.${index}.accountName`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Method Name</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g. PayPal" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`payments.${index}.notes`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions / Notes</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g. paypal.me/johndoe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => append({ methodType: 'mobile_money', provider: null, channel: null, accountName: '', accountNumber: '', bankName: '', swiftCode: '', branch: '', notes: '' })}
        >
          Add Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyStepPayments;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const propertyFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zip_code: z.string().min(5, { message: "Zip code must be at least 5 characters." }),
  price: z.preprocess(
      (a) => parseFloat(z.string().parse(a)),
      z.number().positive({ message: "Price must be a positive number." })
  ),
  bedrooms: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().int().min(0, { message: "Bedrooms must be a non-negative number." })
  ),
  bathrooms: z.preprocess(
      (a) => parseFloat(z.string().parse(a)),
      z.number().min(0, { message: "Bathrooms must be a non-negative number." })
  ),
  square_feet: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().int().positive({ message: "Square feet must be a positive number." })
  ),
  property_type: z.enum(["apartment", "house", "condo", "townhouse", "land"]),
  status: z.enum(["available", "sold", "pending"]),
  year_built: z.preprocess(
      (a) => (a === "" || a === undefined ? null : parseInt(z.string().parse(a), 10)),
      z.number().int().min(1800).max(new Date().getFullYear()).nullable().optional()
  ),
  lot_size: z.preprocess(
      (a) => (a === "" || a === undefined ? null : parseFloat(z.string().parse(a))),
      z.number().positive().nullable().optional()
  ),
  image_urls: z.array(z.string().url()).optional().default([]),
  amenities: z.array(z.string()).optional().default([]),
  landlord_id: z.string().uuid().optional(),
  agent_id: z.string().uuid().optional(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
  editingProperty?: Partial<PropertyFormValues> & { id?: string };
  onSave: (data: PropertyFormValues) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function PropertyForm({ editingProperty, onSave, onCancel, isSubmitting }: PropertyFormProps) {
  const { toast } = useToast();
  const [imageUrls, setImageUrls] = useState<string[]>(editingProperty?.image_urls || []);
  const [amenities, setAmenities] = useState<string[]>(editingProperty?.amenities || []);
  const [newAmenity, setNewAmenity] = useState("");

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      square_feet: 0,
      property_type: "apartment",
      status: "available",
      year_built: undefined,
      lot_size: undefined,
      landlord_id: undefined,
      agent_id: undefined,
      ...editingProperty,
      image_urls: editingProperty?.image_urls || [],
      amenities: editingProperty?.amenities || [],
    },
  });

  useEffect(() => {
    form.reset({
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        square_feet: 0,
        property_type: "apartment",
        status: "available",
        year_built: undefined,
        lot_size: undefined,
        landlord_id: undefined,
        agent_id: undefined,
        ...editingProperty,
        image_urls: editingProperty?.image_urls || [],
        amenities: editingProperty?.amenities || [],
    });
    setImageUrls(editingProperty?.image_urls || []);
    setAmenities(editingProperty?.amenities || []);
  }, [editingProperty, form]);


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("property-images")
      .upload(fileName, file);

    if (error) {
      toast({ title: "Image Upload Failed", description: error.message, variant: "destructive" });
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("property-images").getPublicUrl(data.path);
    
    if (publicUrl) {
        const updatedImageUrls = [...imageUrls, publicUrl];
        setImageUrls(updatedImageUrls);
        form.setValue("image_urls", updatedImageUrls, { shouldValidate: true });
        toast({ title: "Image Uploaded", description: "The image has been successfully uploaded." });
    }
  };

  const removeImage = (url: string) => {
    const updatedImageUrls = imageUrls.filter((u) => u !== url);
    setImageUrls(updatedImageUrls);
    form.setValue("image_urls", updatedImageUrls, { shouldValidate: true });
  };

  const addAmenity = () => {
    if (newAmenity.trim() !== "" && !amenities.includes(newAmenity.trim())) {
      const updatedAmenities = [...amenities, newAmenity.trim()];
      setAmenities(updatedAmenities);
      form.setValue("amenities", updatedAmenities, { shouldValidate: true });
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity: string) => {
    const updatedAmenities = amenities.filter((a) => a !== amenity);
    setAmenities(updatedAmenities);
    form.setValue("amenities", updatedAmenities, { shouldValidate: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingProperty ? "Edit Property" : "Add New Property"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Name</FormLabel>
                  <FormControl><Input placeholder="e.g., The Grand Villa" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl><Input placeholder="e.g., 123 Main St" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl><Input placeholder="e.g., Nairobi" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem>
                  <FormLabel>State / County</FormLabel>
                  <FormControl><Input placeholder="e.g., Nairobi County" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="zip_code" render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl><Input placeholder="e.g., 00100" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (KES)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 15000000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="property_type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="bedrooms" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 4" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="bathrooms" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 3" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="square_feet" render={({ field }) => (
                <FormItem>
                  <FormLabel>Square Feet</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 2500" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="year_built" render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Built</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 2010" {...field} onChange={e => field.onChange(e.target.value === '' ? null : parseInt(e.target.value, 10))} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="Detailed description of the property" className="min-h-[100px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Image Upload Section */}
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </FormControl>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageUrls.map((url) => (
                  <div key={url} className="relative">
                    <img src={url} alt="Property" className="w-full h-32 object-cover rounded-md" />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => removeImage(url)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <FormMessage>{form.formState.errors.image_urls?.message}</FormMessage>
            </FormItem>

            {/* Amenities Section */}
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <div className="flex items-center gap-2">
                <Input value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)} placeholder="e.g., Swimming Pool" />
                <Button type="button" onClick={addAmenity}>Add</Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                    {amenity}
                    <button type="button" onClick={() => removeAmenity(amenity)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <FormMessage>{form.formState.errors.amenities?.message}</FormMessage>
            </FormItem>

            <div className="flex justify-end gap-4">
                {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : (editingProperty ? "Save Changes" : "Create Property")}
                </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

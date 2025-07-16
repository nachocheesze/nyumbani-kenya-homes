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
import { Switch } from "@/components/ui/switch";

// Updated Zod schema to match the database
const propertyFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  county: z.string().min(2, { message: "County must be at least 2 characters." }),
  property_type: z.enum(["apartment", "house", "commercial", "land"]),
  
  rent_amount: z.preprocess(
      (a) => parseFloat(z.string().parse(a)),
      z.number().positive({ message: "Rent must be a positive number." })
  ),
  deposit_amount: z.preprocess(
      (a) => parseFloat(z.string().parse(a)),
      z.number().positive().nullable().optional()
  ),
  
  bedrooms: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().int().min(0, { message: "Bedrooms must be a non-negative number." })
  ),
  bathrooms: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().int().min(0, { message: "Bathrooms must be a non-negative number." })
  ),

  available_from: z.string().optional(),
  is_available: z.boolean().default(true),

  features: z.array(z.string()).optional().default([]),
  amenities: z.array(z.string()).optional().default([]),
  images: z.array(z.string().url()).optional().default([]),

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
  const [images, setImages] = useState<string[]>(editingProperty?.images || []);
  const [amenities, setAmenities] = useState<string[]>(editingProperty?.amenities || []);
  const [newAmenity, setNewAmenity] = useState("");
  const [features, setFeatures] = useState<string[]>(editingProperty?.features || []);
  const [newFeature, setNewFeature] = useState("");

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      city: "",
      county: "",
      property_type: "apartment",
      rent_amount: 0,
      is_available: true,
      ...editingProperty,
      images: editingProperty?.images || [],
      amenities: editingProperty?.amenities || [],
      features: editingProperty?.features || [],
    },
  });

  useEffect(() => {
    form.reset({
      title: "",
      description: "",
      address: "",
      city: "",
      county: "",
      property_type: "apartment",
      rent_amount: 0,
      is_available: true,
      ...editingProperty,
      images: editingProperty?.images || [],
      amenities: editingProperty?.amenities || [],
      features: editingProperty?.features || [],
    });
    setImages(editingProperty?.images || []);
    setAmenities(editingProperty?.amenities || []);
    setFeatures(editingProperty?.features || []);
  }, [editingProperty, form]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Upload Failed", description: "You must be logged in to upload images.", variant: "destructive" });
      return;
    }
    form.setValue('landlord_id', user.id);

    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("property-images").upload(fileName, file, { upsert: true });

    if (error) {
      toast({ title: "Image Upload Failed", description: error.message, variant: "destructive" });
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("property-images").getPublicUrl(data.path);
    if (publicUrl) {
      const updatedImages = [...images, publicUrl];
      setImages(updatedImages);
      form.setValue("images", updatedImages, { shouldValidate: true });
      toast({ title: "Image Uploaded", description: "The image has been successfully uploaded." });
    }
  };

  const removeImage = (url: string) => {
    const updatedImages = images.filter((u) => u !== url);
    setImages(updatedImages);
    form.setValue("images", updatedImages, { shouldValidate: true });
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

  const addFeature = () => {
    if (newFeature.trim() !== "" && !features.includes(newFeature.trim())) {
      const updatedFeatures = [...features, newFeature.trim()];
      setFeatures(updatedFeatures);
      form.setValue("features", updatedFeatures, { shouldValidate: true });
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    const updatedFeatures = features.filter((f) => f !== feature);
    setFeatures(updatedFeatures);
    form.setValue("features", updatedFeatures, { shouldValidate: true });
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
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title</FormLabel>
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
              <FormField control={form.control} name="county" render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <FormControl><Input placeholder="e.g., Nairobi County" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="rent_amount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount (KES)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 150000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="deposit_amount" render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Amount (KES)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 150000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl>
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
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
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
                  <FormControl><Input type="number" placeholder="e.g., 3" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="available_from" render={({ field }) => (
                <FormItem>
                  <FormLabel>Available From</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="is_available" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Available for Rent</FormLabel>
                    <p className="text-sm text-muted-foreground">Mark this property as currently available.</p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
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

            {/* Features Section */}
            <FormItem>
              <FormLabel>Features</FormLabel>
              <div className="flex items-center gap-2">
                <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="e.g., Balcony" />
                <Button type="button" onClick={addFeature}>Add</Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                    {feature}
                    <button type="button" onClick={() => removeFeature(feature)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
              <FormMessage>{form.formState.errors.features?.message}</FormMessage>
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
                    <button type="button" onClick={() => removeAmenity(amenity)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
              <FormMessage>{form.formState.errors.amenities?.message}</FormMessage>
            </FormItem>

            {/* Image Upload Section */}
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </FormControl>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((url) => (
                  <div key={url} className="relative">
                    <img src={url} alt="Property" className="w-full h-32 object-cover rounded-md" />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => removeImage(url)}><X className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
              <FormMessage>{form.formState.errors.images?.message}</FormMessage>
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
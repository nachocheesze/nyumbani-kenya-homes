
import { QuickAddPropertyForm } from "@/components/onboarding/quick-add/QuickAddPropertyForm";
import { QuickAddTenantForm } from "@/components/onboarding/quick-add/QuickAddTenantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function QuickAdd() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Quick Add</h1>
        <p className="text-muted-foreground mb-8">Quickly add a new property or tenant to your portfolio.</p>
      <Tabs defaultValue="property" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="property">Add Property</TabsTrigger>
          <TabsTrigger value="tenant">Add Tenant</TabsTrigger>
        </TabsList>
        <TabsContent value="property">
          <QuickAddPropertyForm />
        </TabsContent>
        <TabsContent value="tenant">
          <QuickAddTenantForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

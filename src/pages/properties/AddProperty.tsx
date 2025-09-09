
import { QuickAddPropertyForm } from "@/components/onboarding/quick-add/QuickAddPropertyForm";

export default function AddProperty() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Add a New Property</h1>
        <p className="text-muted-foreground mb-8">
          Start by entering the basic details of your property. You can add more information later.
        </p>
        <QuickAddPropertyForm />
      </div>
    </div>
  );
}

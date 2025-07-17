import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from '../PropertyOnboardingForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PropertyStepReviewProps {
  form: UseFormReturn<PropertyFormData>;
}

const PropertyStepReview: React.FC<PropertyStepReviewProps> = ({ form }) => {
  const formData = form.watch();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Property Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Property Overview</h3>
          <p><strong>Property Name:</strong> {formData.property_name || 'N/A'}</p>
          <p><strong>Structure Type:</strong> {formData.structure_type || 'N/A'}</p>
          <p><strong>Total Units:</strong> {formData.total_units || 'N/A'}</p>
          <p><strong>Description:</strong> {formData.description || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Location Details</h3>
          <p><strong>Address:</strong> {formData.address || 'N/A'}</p>
          <p><strong>City:</strong> {formData.city || 'N/A'}</p>
          <p><strong>County:</strong> {formData.county || 'N/A'}</p>
          <p><strong>Nearby Landmarks:</strong> {formData.nearby_landmarks || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Property Details</h3>
          <p><strong>Property Type:</strong> {formData.property_type || 'N/A'}</p>
          <p><strong>Bedrooms:</strong> {formData.bedrooms || 'N/A'}</p>
          <p><strong>Bathrooms:</strong> {formData.bathrooms || 'N/A'}</p>
          <p><strong>Features:</strong> {formData.features && formData.features.length > 0 ? formData.features.join(', ') : 'None'}</p>
          <p><strong>Amenities:</strong> {formData.amenities && formData.amenities.length > 0 ? formData.amenities.join(', ') : 'None'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Units Setup</h3>
          {formData.units && formData.units.length > 0 ? (
            <ul>
              {formData.units.map((unit, index) => (
                <li key={index}>
                  <strong>Unit {index + 1}:</strong> {unit.unit_name || 'N/A'} - Rent: KES {unit.rent_amount?.toLocaleString() || 'N/A'}, Deposit: KES {unit.deposit_amount?.toLocaleString() || 'N/A'}, Available: {unit.is_available ? 'Yes' : 'No'}
                </li>
              ))}
            </ul>
          ) : (
            <p>No units configured.</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Media Upload</h3>
          {formData.media_files && formData.media_files.length > 0 ? (
            <ul>
              {formData.media_files.map((media, index) => (
                <li key={index}><strong>File:</strong> {media.file?.name || 'N/A'} {media.caption && `(Caption: ${media.caption})`}</li>
              ))}
            </ul>
          ) : (
            <p>No images uploaded.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyStepReview;
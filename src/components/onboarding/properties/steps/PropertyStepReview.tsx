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
      <CardContent className="space-y-6">
        {/* Property Structure */}
        <div>
          <h3 className="text-lg font-semibold">Property Structure</h3>
          <p><strong>Property Name:</strong> {formData.property_name || 'N/A'}</p>
          <p><strong>Structure Type:</strong> {formData.structure_type || 'N/A'}</p>
          <p><strong>Has Blocks:</strong> {formData.has_blocks !== undefined ? (formData.has_blocks ? 'Yes' : 'No') : 'N/A'}</p>
          <p><strong>Number of Blocks:</strong> {formData.number_of_blocks || 'N/A'}</p>
          <p><strong>Has Unit Variations:</strong> {formData.has_unit_variations !== undefined ? (formData.has_unit_variations ? 'Yes' : 'No') : 'N/A'}</p>
          <p><strong>Approximate Unit Count:</strong> {formData.approx_unit_count || 'N/A'}</p>
          <p><strong>Description:</strong> {formData.description || 'N/A'}</p>
        </div>

        {/* Basic Property Info */}
        <div>
          <h3 className="text-lg font-semibold">Basic Property Info</h3>
          <p><strong>Property Type:</strong> {formData.property_type || 'N/A'}</p>
          <p><strong>Category:</strong> {formData.category || 'N/A'}</p>
          <p><strong>Managed By:</strong> {formData.managed_by || 'N/A'}</p>
          <p><strong>Status:</strong> {formData.status || 'N/A'}</p>
          <p><strong>Tags:</strong> {formData.tags || 'N/A'}</p>
        </div>

        {/* Location Details */}
        <div>
          <h3 className="text-lg font-semibold">Location Details</h3>
          <p><strong>Address:</strong> {formData.address || 'N/A'}</p>
          <p><strong>City:</strong> {formData.city || 'N/A'}</p>
          <p><strong>County:</strong> {formData.county || 'N/A'}</p>
          <p><strong>Neighborhood:</strong> {formData.neighborhood || 'N/A'}</p>
          <p><strong>Nearest Landmark:</strong> {formData.nearest_landmark || 'N/A'}</p>
          <p><strong>Coordinates:</strong> {formData.latitude || 'N/A'}, {formData.longitude || 'N/A'}</p>
        </div>

        {/* Structural Details */}
        <div>
          <h3 className="text-lg font-semibold">Structural Details</h3>
          <p><strong>Floor Count:</strong> {formData.floor_count || 'N/A'}</p>
          <p><strong>Has Elevator:</strong> {formData.has_elevator !== undefined ? (formData.has_elevator ? 'Yes' : 'No') : 'N/A'}</p>
          <p><strong>Amenities:</strong> {formData.amenities && formData.amenities.length > 0 ? formData.amenities.join(', ') : 'None'}</p>
          <p><strong>Shared Utilities:</strong> {formData.shared_utilities && formData.shared_utilities.length > 0 ? formData.shared_utilities.join(', ') : 'None'}</p>
          
          <p><strong>Features:</strong> {formData.features && formData.features.length > 0 ? formData.features.join(', ') : 'None'}</p>
          <p><strong>Total Units:</strong> {formData.total_units || 'N/A'}</p>
          {formData.blocks && formData.blocks.length > 0 && (
            <div>
              <h4 className="text-md font-semibold mt-4">Blocks:</h4>
              <ul className="list-disc list-inside ml-4">
                {formData.blocks.map((block, index) => (
                  <li key={index}>
                    <strong>Block {index + 1}:</strong> {block.name}
                    {block.floorCount !== undefined && `, Floors: ${block.floorCount}`}
                    {`, Has Elevator: ${block.hasElevator ? 'Yes' : 'No'}`}
                    {`, Units in Block: ${block.unitsInBlock}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Units Setup */}
        <div>
          <h3 className="text-lg font-semibold">Units Setup</h3>
          {formData.units && formData.units.length > 0 ? (
            <ul className="list-disc list-inside">
              {formData.units.map((unit, index) => (
                <li key={index}>
                  <strong>Unit {index + 1}:</strong>
                  {unit.blockName && ` Block: ${unit.blockName},`}
                  {unit.unitName && ` Unit Name: ${unit.unitName},`}
                  {unit.bedrooms !== undefined && ` Bedrooms: ${unit.bedrooms},`}
                  {unit.bathrooms !== undefined && ` Bathrooms: ${unit.bathrooms},`}
                  {unit.size !== undefined && ` Size: ${unit.size},`}
                  {unit.rent !== undefined && ` Rent: KES ${unit.rent.toLocaleString()},`}
                  {unit.deposit !== undefined && ` Deposit: KES ${unit.deposit.toLocaleString()},`}
                  {unit.isNegotiable !== undefined && ` Negotiable: ${unit.isNegotiable ? 'Yes' : 'No'},`}
                  {unit.paymentCycle && ` Cycle: ${unit.paymentCycle},`}
                  {unit.rentDueDay !== undefined && ` Due Day: ${unit.rentDueDay},`}
                  {unit.isOccupied !== undefined && ` Occupied: ${unit.isOccupied ? 'Yes' : 'No'},`}
                  {unit.availableFrom && ` Available From: ${unit.availableFrom},`}
                  {unit.tenantId && ` Tenant ID: ${unit.tenantId},`}
                  
                </li>
              ))}
            </ul>
          ) : (
            <p>No units configured.</p>
          )}
        </div>

        {/* Media Upload */}
        <div>
          <h3 className="text-lg font-semibold">Media Upload</h3>
          <p><strong>Video Tour URL:</strong> {formData.video_tour_url || 'N/A'}</p>
          <p><strong>Virtual Tour URL:</strong> {formData.virtual_tour_url || 'N/A'}</p>
          <p><strong>Images:</strong> {formData.images && formData.images.length > 0 ? `${formData.images.length} file(s)` : 'None'}</p>
          <p><strong>Floor Plans:</strong> {formData.floor_plans && formData.floor_plans.length > 0 ? `${formData.floor_plans.length} file(s)` : 'None'}</p>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-semibold">Payment Information</h3>
          {formData.payments && formData.payments.length > 0 ? (
            <ul className="list-disc list-inside">
              {formData.payments.map((payment, index) => (
                <li key={index}>
                  <strong>Method {index + 1}:</strong>
                  {payment.methodType && ` Type: ${payment.methodType},`}
                  {payment.provider && ` Provider: ${payment.provider},`}
                  {payment.channel && ` Channel: ${payment.channel},`}
                  {payment.accountName && ` Account Name: ${payment.accountName},`}
                  {payment.accountNumber && ` Account Number: ${payment.accountNumber},`}
                  {payment.bankName && ` Bank Name: ${payment.bankName},`}
                  {payment.branch && ` Branch: ${payment.branch},`}
                  {payment.swiftCode && ` Swift Code: ${payment.swiftCode},`}
                  {payment.notes && ` Notes: ${payment.notes}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No payment methods configured.</p>
          )}
        </div>

        {/* Legal & Documents */}
        <div>
          <h3 className="text-lg font-semibold">Legal & Documents</h3>
          <p><strong>Ownership Type:</strong> {formData.ownership_type || 'N/A'}</p>
          <p><strong>Title Deed:</strong> {formData.title_deed_file?.name || 'N/A'}</p>
          <p><strong>Lease Template:</strong> {formData.lease_template_file?.name || 'N/A'}</p>
          <p><strong>Construction Permits:</strong> {formData.construction_permit_file?.name || 'N/A'}</p>
          <p><strong>NEMA Certificate:</strong> {formData.nema_certificate_file?.name || 'N/A'}</p>
        </div>

        {/* Management & Ownership */}
        <div>
          <h3 className="text-lg font-semibold">Management & Ownership</h3>
          <p><strong>Landlord ID:</strong> {formData.landlord_id || 'N/A'}</p>
          <p><strong>Agent ID:</strong> {formData.agent_id || 'N/A'}</p>
          <p><strong>Caretaker ID:</strong> {formData.caretaker_id || 'N/A'}</p>
          <p><strong>Internal Notes:</strong> {formData.internal_notes || 'N/A'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyStepReview;

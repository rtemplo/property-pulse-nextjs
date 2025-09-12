import PropertyEditForm from '@/components/PropertyEditForm';
import connectDB from '@/config/database';
import Property, { PropertyDocument } from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

type PageProps = {
  params: Promise<{ id: string }>;
};

const PropertyEditPage: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params;
  await connectDB(`/properties/${id}/edit`);

  const propertyDoc = (await Property.findById(id).lean()) as PropertyDocument;

  if (!propertyDoc) {
    return <h1 className="text-center text-2xl font-bold mt-10">Property not found</h1>;
  }

  const property = convertToSerializeableObject(propertyDoc);

  return (
    <div className="bg-blue-500">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertyEditPage;

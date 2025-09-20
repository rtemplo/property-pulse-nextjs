import connectDB from '@/config/database';
import Property, { PropertyDocument, SerializableProperty } from '@/models/Property';
import FeaturedPropertyCard from './FeaturedPropertyCard';
import { convertToSerializableObject } from '@/utils/convertToObject';

const FeaturedProperties: React.FC = async () => {
  await connectDB();
  const propertyDocs = await Property.find({ is_featured: true }).lean();
  const properties = propertyDocs.map(
    convertToSerializableObject<PropertyDocument, SerializableProperty>
  );

  return properties.length === 0 ? null : (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

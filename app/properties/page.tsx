import PropertyCard from '@/components/PropertyCard';
// import properties from '@/properties.json';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { parsePropertyData } from '@/utils/typeGuards';

// Add artificial delay to see loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const PropertiesPage = async () => {
  // Add .3 second delay to see loading component
  // await delay(300);

  await connectDB();
  const propertiesData: unknown = await Property.find({}).lean();
  const properties = parsePropertyData(propertiesData);

  return (
    <section className="px-4 py-8">
      <div className="container-xl lg:container m-auto px-4 py-4">
        {properties.length === 0 ? (
          'No properties found'
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;

import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types';
import properties from '@/properties.json';

export default function PropertiesPage() {
  return (
    <section className="px-4 py-8">
      <div className="container-xl lg:container m-auto px-4 py-4">
        {properties.length === 0 ? (
          'No properties found'
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property: Property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

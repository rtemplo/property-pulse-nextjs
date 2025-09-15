import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';

// import properties from '@/properties.json';
import connectDB from '@/config/database';
import Property, { PropertyDocument, SerializeableProperty } from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

// Add artificial delay to see loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface PropertiesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
}

const PropertiesPage: React.FC<PropertiesPageProps> = async ({ searchParams }) => {
  const { page = '1', pageSize = '6' } = await searchParams;
  await connectDB('/properties');

  // Add .3 second delay to see loading component
  // await delay(300);

  const _page = parseInt(page as string, 10);
  const _pageSize = parseInt(pageSize as string, 10);
  const validPage = isNaN(_page) || _page < 1 ? 1 : _page;
  const validPageSize = isNaN(_pageSize) || _pageSize < 1 ? 2 : _pageSize;

  const skip = (validPage - 1) * validPageSize;
  const limit = validPageSize;

  const totalItems = await Property.countDocuments();
  const propertyDocs = await Property.find({}).skip(skip).limit(limit).lean();
  const properties = propertyDocs.map(
    convertToSerializeableObject<PropertyDocument, SerializeableProperty>
  );

  const showPagination = totalItems > validPageSize;

  return (
    <section className="px-4 py-8">
      <div className="container-xl lg:container m-auto px-4 py-4">
        {properties.length === 0 ? (
          'No properties found'
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id.toString()} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination page={validPage} pageSize={validPageSize} totalItems={totalItems} />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;

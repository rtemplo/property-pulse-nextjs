import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

interface PageProps {
  searchParams: {
    location?: string;
    propertyType?: string;
  };
}

const SearchResultsPage: React.FC<PageProps> = async ({ searchParams }) => {
  await connectDB('/properties/search-results');

  const { location, propertyType } = await searchParams;

  const locationPattern = location ? new RegExp(location, 'i') : /.*/;
  const propertyTypePattern =
    propertyType && propertyType !== 'All' ? new RegExp(propertyType, 'i') : /.*/;

  const query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.address': locationPattern }
    ],
    type: propertyTypePattern
  };

  const propertyQueryResults = await Property.find(query).lean();
  const properties = propertyQueryResults.map(convertToSerializeableObject);
  console.log(properties);

  return (
    <>
      <section className="bg-blue-400 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
            <FaArrowAltCircleLeft className="mr-2 mb-1" />
            Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id.toString()} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;

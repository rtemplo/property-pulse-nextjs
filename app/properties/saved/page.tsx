import PropertyCard from '@/components/PropertyCard';
import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import User from '@/models/User';
import { PropertyDocument } from '@/models/Property';

const SavedPropertiesPage: React.FC = async () => {
  await connectDB('/properties/saved');
  const { userId } = await getSessionUser();

  if (!userId) {
    return <div>Please log in to view your saved properties.</div>;
  }

  const user = await User.findById(userId).populate('bookmarks').lean();

  if (!user) {
    return <div>User not found.</div>;
  }

  // Type assertion because populate() replaces ObjectIds with actual Property documents
  const bookmarks = user.bookmarks as unknown as PropertyDocument[];

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>You have no saved properties.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;

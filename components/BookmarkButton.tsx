'use client';

import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

import { PropertyDocument } from '@/models/Property';

interface BookmarkButtonProps {
  property: PropertyDocument;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchBookmarkStatus = async () => {
      const isBookmarked = await checkBookmarkStatus(property._id.toString());
      setIsBookmarked(isBookmarked);
      setIsLoading(false);
    };

    fetchBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You must be logged in to bookmark properties');
      return;
    }

    try {
      const { message, isBookmarked: _isBookmarked } = await bookmarkProperty(
        property._id.toString()
      );
      setIsBookmarked(_isBookmarked);
      toast.success(message);
    } catch (error) {
      console.error('Error bookmarking property:', error);
      toast.error('An error occurred while bookmarking the property');
      return;
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <button
      onClick={handleClick}
      className={`bg-${
        isBookmarked ? 'red' : 'blue'
      }-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;

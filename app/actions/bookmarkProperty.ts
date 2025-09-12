'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { Types } from 'mongoose';

async function bookmarkProperty(propertyId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser?.userId) {
    throw new Error('User not authenticated');
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  let isBookmarked = user.bookmarks.map((id) => id.toString()).includes(propertyId);

  let message: string = '';

  if (isBookmarked) {
    // Remove the bookmark - filter out the matching ObjectId
    const objectId = new Types.ObjectId(propertyId);
    user.bookmarks = user.bookmarks.filter((bookmark) => !bookmark.equals(objectId));
    isBookmarked = false;
    message = 'Bookmark Removed';
  } else {
    // Add the bookmark - convert string to ObjectId
    const objectId = new Types.ObjectId(propertyId);
    user.bookmarks.push(objectId);
    isBookmarked = true;
    message = 'Bookmark Added';
  }

  await user.save();
  revalidatePath('/properties/saved', 'page');

  return { message, isBookmarked };
}

export default bookmarkProperty;

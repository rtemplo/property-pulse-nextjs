'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { Types } from 'mongoose';

async function checkBookmarkStatus(propertyId: string) {
  await connectDB('checkBookmarkStatus');

  const sessionUser = await getSessionUser();
  const userId = sessionUser.user?.id;

  if (!userId) {
    throw new Error('You must be authenticated to check bookmark status');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const isBookmarked = user.bookmarks.includes(new Types.ObjectId(propertyId));

  return isBookmarked;
}

export default checkBookmarkStatus;

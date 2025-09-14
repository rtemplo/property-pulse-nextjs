'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUnreadMessageCount() {
  await connectDB('getUnreadMessageCount');

  const sessionUser = await getSessionUser();
  const userId = sessionUser.user?.id;

  if (!userId) {
    throw new Error('You must be authenticated to mark messages as read.');
  }

  const unreadMessagesCount = await Message.countDocuments({
    recipient: userId,
    read: false
  });

  return unreadMessagesCount;
}

export default getUnreadMessageCount;

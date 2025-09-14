'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId: string) {
  await connectDB('markMessageAsRead');

  const sessionUser = await getSessionUser();
  const userId = sessionUser.user?.id;

  if (!userId) {
    throw new Error('You must be authenticated to mark messages as read.');
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message not found');
  }

  if (message.recipient.toString() !== userId) {
    throw new Error('You are not authorized to mark this message as read.');
  }

  message.read = !message.read;

  revalidatePath('/messages', 'page');

  await message.save();

  return message.read;
}

export default markMessageAsRead;

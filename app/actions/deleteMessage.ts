'use server';
import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId: string) {
  await connectDB('deleteMessage');
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('You must be logged in to delete a property.');
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message not found.');
  }

  if (message.recipient.toString() !== userId) {
    console.log(message.recipient.toString(), userId);
    throw new Error('You are not authorized to delete this message.');
  }

  await message.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteMessage;

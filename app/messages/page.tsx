import Messages, { MessageDocument, SerializableMessage } from '@/models/Message';
import MessageCard from '@/components/MessageCard';

import connectDB from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializableObject } from '@/utils/convertToObject';

import { SerializableUser, UserDocument } from '@/models/User';
import { PropertyDocument, SerializableProperty } from '@/models/Property';

const MessagesPage: React.FC = async () => {
  await connectDB('/messages');

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  if (!userId) throw new Error('User not authenticated');

  const readMessagesData = await Messages.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unreadMessagesData = await Messages.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages = [...unreadMessagesData, ...readMessagesData] as MessageDocument[];
  const serializedMessages = messages.map((msg) => {
    const serializableMessage = convertToSerializableObject<MessageDocument, SerializableMessage>(
      msg
    );

    serializableMessage.sender = convertToSerializableObject<UserDocument, SerializableUser>(
      msg.sender as unknown as UserDocument
    );

    serializableMessage.recipient = convertToSerializableObject<UserDocument, SerializableUser>(
      msg.recipient as unknown as UserDocument
    );

    serializableMessage.property = convertToSerializableObject<
      PropertyDocument,
      SerializableProperty
    >(msg.property as unknown as PropertyDocument);

    return serializableMessage;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 mx-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {serializedMessages.length === 0 ? (
              <p className="text-gray-600">You have no messages.</p>
            ) : (
              serializedMessages.map((message, index) => (
                <MessageCard key={index} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;

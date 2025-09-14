'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';
import { useGlobalContext } from '@/context/GlobalContext';

import { SerializeableMessage } from '@/models/Message';
import { SerializeableProperty } from '@/models/Property';

interface MessageCardProps {
  message: SerializeableMessage;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const isRead = await markMessageAsRead(message._id);
      setUnreadCount((prev) => (isRead ? prev - 1 : prev + 1));
      toast.success(`Marked as ${isRead ? 'read' : 'unread'}`);
    } catch (error) {
      toast.error(`Failed to update message read status: ${(error as Error).message}`);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteMessage(message._id);
      setIsDeleted(true);
      setUnreadCount((prev) => prev - 1);
      toast.success('Message deleted successfully');
    } catch (error) {
      setIsDeleted(false);
      toast.error(`Failed to delete message: ${(error as Error).message}`);
    }
  };

  if (isDeleted) {
    return <p>Message deleted</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!message.read && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white py-1 px-2 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{' '}
        {(message.property as SerializeableProperty).name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className="text-blue-500 hover:underline">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className="text-blue-500 hover:underline">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
        onClick={handleReadClick}
      >
        {message.read ? 'Mark as Unread' : 'Mark as Read'}
      </button>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;

import { Schema, model, models, Model, InferSchemaType, Types } from 'mongoose';
import { SerializeableUser } from './User';
import { SerializeableProperty } from './Property';

// TypeScript interface for User document
const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    phone: String,
    body: String,
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export type MessageType = InferSchemaType<typeof MessageSchema>;

export type MessageDocument = MessageType & {
  _id: Types.ObjectId;
};

export type SerializeableMessage = Omit<MessageType, 'sender' | 'recipient' | 'property'> & {
  _id: string;
  sender: SerializeableUser | string;
  recipient: SerializeableUser | string;
  property: SerializeableProperty | string;
};

const Message =
  (models.Message as Model<MessageDocument>) || model<MessageDocument>('Message', MessageSchema);

export default Message;

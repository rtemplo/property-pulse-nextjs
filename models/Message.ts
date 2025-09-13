import { Schema, model, models, Model, InferSchemaType, Types } from 'mongoose';

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

// Type with owner as string and amenities as string[]
export type SerializableMessage = Omit<MessageType, 'sender' | 'recipient' | 'property'> & {
  _id: string;
  sender: string;
  recipient: string;
  property: string;
};

const Message =
  (models.Message as Model<MessageDocument>) || model<MessageDocument>('Message', MessageSchema);

export default Message;

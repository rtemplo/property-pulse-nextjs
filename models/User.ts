import { Schema, model, models, Model, InferSchemaType, Types } from 'mongoose';

// TypeScript interface for User document
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required']
    },
    username: {
      type: String,
      unique: [true, 'Username already exists'],
      required: [true, 'Username is required']
    },
    image: {
      type: String
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property'
      }
    ]
  },
  {
    timestamps: true
  }
);

export type UserType = InferSchemaType<typeof UserSchema>;

export type UserDocument = UserType & {
  _id: Types.ObjectId;
};

export type SerializableUser = Omit<UserType, 'bookmarks'> & {
  _id: string;
  bookmarks: string[];
};

const User = (models.User as Model<UserDocument>) || model<UserDocument>('User', UserSchema);

export default User;

import { Schema, model, models, Document, Model } from 'mongoose';

// TypeScript interface for User document
export interface IUser extends Document {
  email: string;
  username: string;
  image?: string;
  bookmarks?: Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
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

const User = (models.User as Model<IUser>) || model<IUser>('User', UserSchema);

export default User;

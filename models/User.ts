import { Schema, model, models, Model, InferSchemaType } from 'mongoose';

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
const User = (models.User as Model<UserType>) || model<UserType>('User', UserSchema);

export default User;

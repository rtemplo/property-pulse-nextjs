import { Schema, model, models, InferSchemaType, Model, Types } from 'mongoose';

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String
    },
    beds: {
      type: Number,
      required: true
    },
    baths: {
      type: Number,
      required: true
    },
    square_feet: {
      type: Number,
      required: true
    },
    amenities: [
      {
        type: String
      }
    ],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number
    },
    seller_info: {
      name: String,
      email: String,
      phone: String
    },
    images: [
      {
        type: String
      }
    ],
    is_featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export type PropertyType = InferSchemaType<typeof PropertySchema>;

// Type for the actual document with MongoDB _id
export type PropertyDocument = PropertyType & {
  _id: Types.ObjectId;
};

// Type with owner as string and amenities as string[]
export type LeanPropertyType = Omit<PropertyType, 'owner' | 'amenities'> & {
  owner: string;
  amenities: string[];
};

const Property =
  (models.Property as Model<PropertyType>) || model<PropertyType>('Property', PropertySchema);

export default Property;

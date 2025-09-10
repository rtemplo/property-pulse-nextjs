import { IPropertyPulseSession } from '@/types';
import { SerializableProperty } from '@/models/Property';
/**
 * Type guard to validate if an unknown object matches the IPropertyPulseSession interface
 * @param obj - The object to validate
 * @returns true if the object is a valid IPropertyPulseSession, false otherwise
 */
export function isIPropertyPulseSession(obj: unknown): obj is IPropertyPulseSession {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const session = obj as Record<string, unknown>;

  // Check if user object exists and has the expected structure
  if (session.user !== undefined) {
    if (typeof session.user !== 'object' || session.user === null) {
      return false;
    }

    const user = session.user as Record<string, unknown>;

    // Validate user properties (all are optional but must be correct type if present)
    if (user.id !== undefined && typeof user.id !== 'string' && user.id !== null) {
      return false;
    }
    if (user.name !== undefined && typeof user.name !== 'string' && user.name !== null) {
      return false;
    }
    if (user.email !== undefined && typeof user.email !== 'string' && user.email !== null) {
      return false;
    }
    if (user.image !== undefined && typeof user.image !== 'string' && user.image !== null) {
      return false;
    }
  }

  // Basic session properties validation (extends Session from next-auth)
  return (
    typeof session.expires === 'string' ||
    session.expires instanceof Date ||
    typeof session.expires === 'undefined'
  );
}

/**
 * Safely converts Schema.Types.ObjectId type fields to string format
 * For _id and owner fields
 */
export function toStringValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'toString' in value) {
    return (value as { toString(): string }).toString();
  }
  return String(value);
}

/**
 * Safely converts a date value to ISO string format
 * For createdAt and updatedAt fields
 */
export function toISOStringValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  if (value && typeof value === 'object' && 'toISOString' in value) {
    return (value as { toISOString(): string }).toISOString();
  }
  // If it's already a string or other format, return as string
  return String(value);
}

/**
 * Type guard to validate if an unknown object matches the SerializableProperty interface
 * @param obj - The object to validate
 * @returns true if the object is a valid SerializableProperty, false otherwise
 */
// export function isSerializableProperty(obj: unknown): obj is SerializableProperty {
//   if (typeof obj !== 'object' || obj === null) {
//     return false;
//   }

//   const property = obj as Record<string, unknown>;

//   // Check required string fields
//   if (typeof property._id !== 'string') return false;
//   if (typeof property.type !== 'string') return false;
//   if (typeof property.owner !== 'string') return false;
//   if (typeof property.name !== 'string') return false;

//   // Check required number fields
//   if (typeof property.beds !== 'number') return false;
//   if (typeof property.baths !== 'number') return false;
//   if (typeof property.square_feet !== 'number') return false;

//   // Check required array fields
//   if (!Array.isArray(property.amenities)) return false;
//   if (!property.amenities.every((item) => typeof item === 'string')) return false;

//   if (!Array.isArray(property.images)) return false;
//   if (!property.images.every((item) => typeof item === 'string')) return false;

//   // Check required boolean field
//   if (typeof property.is_featured !== 'boolean') return false;

//   // Check optional string field
//   if (property.description !== undefined && typeof property.description !== 'string') {
//     return false;
//   }

//   // Check optional location object
//   if (property.location !== undefined) {
//     if (typeof property.location !== 'object' || property.location === null) {
//       return false;
//     }
//     const location = property.location as Record<string, unknown>;

//     if (location.street !== undefined && typeof location.street !== 'string') return false;
//     if (location.city !== undefined && typeof location.city !== 'string') return false;
//     if (location.state !== undefined && typeof location.state !== 'string') return false;
//     if (location.zipcode !== undefined && typeof location.zipcode !== 'string') return false;
//   }

//   // Check optional rates object
//   if (property.rates !== undefined) {
//     if (typeof property.rates !== 'object' || property.rates === null) {
//       return false;
//     }
//     const rates = property.rates as Record<string, unknown>;

//     if (rates.nightly !== undefined && typeof rates.nightly !== 'number') return false;
//     if (rates.weekly !== undefined && typeof rates.weekly !== 'number') return false;
//     if (rates.monthly !== undefined && typeof rates.monthly !== 'number') return false;
//   }

//   // Check optional seller_info object
//   if (property.seller_info !== undefined) {
//     if (typeof property.seller_info !== 'object' || property.seller_info === null) {
//       return false;
//     }
//     const sellerInfo = property.seller_info as Record<string, unknown>;

//     if (sellerInfo.name !== undefined && typeof sellerInfo.name !== 'string') return false;
//     if (sellerInfo.email !== undefined && typeof sellerInfo.email !== 'string') return false;
//     if (sellerInfo.phone !== undefined && typeof sellerInfo.phone !== 'string') return false;
//   }

//   return true;
// }

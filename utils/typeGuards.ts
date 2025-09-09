import { IPropertyPulseSession } from '@/types';
import { PropertyType } from '@/models/Property';
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

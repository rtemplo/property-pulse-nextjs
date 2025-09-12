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

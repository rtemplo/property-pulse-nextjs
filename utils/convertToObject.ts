import { PropertyDocument, SerializableProperty } from '@/models/Property';
import { MessageDocument, SerializableMessage } from '@/models/Message';
import { SerializableUser, UserDocument } from '@/models/User';

export function convertToSerializableObject<
  T extends PropertyDocument | UserDocument | MessageDocument,
  U extends SerializableProperty | SerializableUser | SerializableMessage
>(leanDocument: T): U {
  const isConvertibleObject = (
    value: unknown
  ): value is { toJSON: () => unknown; toString: () => string } => {
    return Boolean(value && typeof value === 'object' && 'toJSON' in value && 'toString' in value);
  };

  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key as keyof T];
    if (isConvertibleObject(value)) {
      (leanDocument[key as keyof T] as unknown) = value.toString();
    }

    if (Array.isArray(value)) {
      (leanDocument[key as keyof T] as unknown) = value
        .map((item) => (isConvertibleObject(item) ? item.toString() : item))
        .filter((item): item is string => item !== null);
    }
  }
  return leanDocument as unknown as U;
}

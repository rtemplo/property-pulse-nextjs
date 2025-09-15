import { PropertyDocument, SerializeableProperty } from '@/models/Property';
import { MessageDocument, SerializeableMessage } from '@/models/Message';
import { SerializeableUser, UserDocument } from '@/models/User';

export function convertToSerializeableObject<
  T extends PropertyDocument | UserDocument | MessageDocument,
  U extends SerializeableProperty | SerializeableUser | SerializeableMessage
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

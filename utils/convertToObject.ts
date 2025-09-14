import { PropertyDocument, SerializableProperty } from '@/models/Property';
import { MessageDocument, SerializableMessage } from '@/models/Message';
import { SerializableUser, UserDocument } from '@/models/User';

export function convertToSerializeableObject<
  T extends PropertyDocument | UserDocument | MessageDocument,
  U extends SerializableProperty | SerializableUser | SerializableMessage
>(leanDocument: T): U {
  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key as keyof T];
    if (value && typeof value === 'object' && 'toJSON' in value && 'toString' in value) {
      (leanDocument[key as keyof T] as unknown) = value.toString();
    }

    if (Array.isArray(value)) {
      (leanDocument[key as keyof T] as unknown) = value
        .map((item) =>
          item && typeof item === 'object' && 'toJSON' in item && 'toString' in item
            ? item.toString()
            : null
        )
        .filter((item): item is string => item !== null);
    }
  }
  return leanDocument as unknown as U;
}

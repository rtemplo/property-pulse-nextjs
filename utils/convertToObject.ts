import { PropertyDocument } from '@/models/Property';

export function convertToSerializeableObject(leanDocument: PropertyDocument) {
  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key as keyof PropertyDocument];
    if (value && typeof value === 'object' && 'toJSON' in value && 'toString' in value) {
      (leanDocument[key as keyof PropertyDocument] as unknown) = value.toString();
    }
  }
  return leanDocument;
}

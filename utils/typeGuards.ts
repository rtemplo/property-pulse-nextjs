import { IProperty } from '@/types';

/**
 * Type guard to validate if an unknown object matches the IProperty interface
 * @param obj - The object to validate
 * @returns true if the object is a valid IProperty, false otherwise
 */
export function isIProperty(obj: unknown): obj is IProperty {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const prop = obj as Record<string, unknown>;

  // Validate location object
  if (typeof prop.location !== 'object' || prop.location === null) {
    return false;
  }
  const location = prop.location as Record<string, unknown>;

  // Validate rates object
  if (typeof prop.rates !== 'object' || prop.rates === null) {
    return false;
  }
  const rates = prop.rates as Record<string, unknown>;

  // Validate optional rate properties (they should be numbers if present)
  if (rates.nightly !== undefined && typeof rates.nightly !== 'number') {
    return false;
  }
  if (rates.weekly !== undefined && typeof rates.weekly !== 'number') {
    return false;
  }
  if (rates.monthly !== undefined && typeof rates.monthly !== 'number') {
    return false;
  }

  // Validate seller_info object
  if (typeof prop.seller_info !== 'object' || prop.seller_info === null) {
    return false;
  }
  const seller_info = prop.seller_info as Record<string, unknown>;

  // Validate amenities array (must be array of strings)
  if (!Array.isArray(prop.amenities) || !prop.amenities.every((item) => typeof item === 'string')) {
    return false;
  }

  // Validate images array (must be array of strings)
  if (!Array.isArray(prop.images) || !prop.images.every((item) => typeof item === 'string')) {
    return false;
  }

  return (
    typeof prop._id === 'string' &&
    typeof prop.owner === 'string' &&
    typeof prop.name === 'string' &&
    typeof prop.type === 'string' &&
    typeof prop.description === 'string' &&
    typeof location.street === 'string' &&
    typeof location.city === 'string' &&
    typeof location.state === 'string' &&
    typeof location.zipcode === 'string' &&
    typeof prop.beds === 'number' &&
    typeof prop.baths === 'number' &&
    typeof prop.square_feet === 'number' &&
    typeof seller_info.name === 'string' &&
    typeof seller_info.email === 'string' &&
    typeof seller_info.phone === 'string' &&
    typeof prop.is_featured === 'boolean' &&
    typeof prop.createdAt === 'string' &&
    typeof prop.updatedAt === 'string'
  );
}

/**
 * Type guard to validate if an unknown value is an array of IProperty objects
 * @param data - The data to validate
 * @returns true if the data is a valid IProperty array, false otherwise
 */
export function isIPropertyArray(data: unknown): data is IProperty[] {
  return Array.isArray(data) && data.every(isIProperty);
}

/**
 * Safely converts a value to string format for _id and owner fields
 */
function toStringValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'toString' in value) {
    return (value as { toString(): string }).toString();
  }
  return String(value);
}

/**
 * Safely converts a date value to ISO string format
 */
function toISOStringValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  if (value && typeof value === 'object' && 'toISOString' in value) {
    return (value as { toISOString(): string }).toISOString();
  }
  // If it's already a string or other format, return as string
  return String(value);
}

/**
 * Converts MongoDB document to IProperty format
 * @param mongoDoc - Raw MongoDB document (flexible typing to handle .lean() variations)
 * @returns IProperty object with converted types
 */
function convertMongoDocToIProperty(mongoDoc: Record<string, unknown>): IProperty {
  return {
    _id: toStringValue(mongoDoc._id),
    owner: toStringValue(mongoDoc.owner),
    name: mongoDoc.name as string,
    type: mongoDoc.type as string,
    description: mongoDoc.description as string,
    location: mongoDoc.location as {
      street: string;
      city: string;
      state: string;
      zipcode: string;
    },
    beds: mongoDoc.beds as number,
    baths: mongoDoc.baths as number,
    square_feet: mongoDoc.square_feet as number,
    amenities: mongoDoc.amenities as string[],
    rates: mongoDoc.rates as {
      nightly?: number;
      weekly?: number;
      monthly?: number;
    },
    seller_info: mongoDoc.seller_info as {
      name: string;
      email: string;
      phone: string;
    },
    images: mongoDoc.images as string[],
    is_featured: mongoDoc.is_featured as boolean,
    createdAt: toISOStringValue(mongoDoc.createdAt),
    updatedAt: toISOStringValue(mongoDoc.updatedAt)
  };
}

/**
 * Helper function to safely parse property data from external sources
 * @param data - The raw data from database or API
 * @returns Validated IProperty array
 * @throws Error if data doesn't match expected structure
 */
export function parsePropertyData(data: unknown): IProperty[] {
  if (!Array.isArray(data)) {
    console.log('Data is not an array:', data);
    throw new Error(
      'Invalid property data: Expected array of IProperty objects (data is not an array)'
    );
  }

  try {
    // Convert MongoDB documents to IProperty format
    const convertedData = data.map((item, index) => {
      try {
        return convertMongoDocToIProperty(item);
      } catch (error) {
        throw new Error(`Failed to convert MongoDB document at index ${index}: ${error}`);
      }
    });

    // Now validate the converted data
    for (let i = 0; i < convertedData.length; i++) {
      const item = convertedData[i];
      if (!isIProperty(item)) {
        console.log(`Converted item ${i} failed validation:`, JSON.stringify(item, null, 2));
        throw new Error(`Invalid property data: Converted item ${i} failed validation`);
      }
    }

    return convertedData;
  } catch (error) {
    console.error('Error in parsePropertyData:', error);
    throw error;
  }
}

/**
 * Helper function to safely parse a single property from external sources
 * @param data - The raw data from database or API for a single property
 * @returns Validated IProperty object
 * @throws Error if data doesn't match expected structure
 */
export function parseSinglePropertyData(data: unknown): IProperty {
  if (!data) {
    throw new Error('Property not found: Data is null or undefined');
  }

  try {
    // Convert MongoDB document to IProperty format
    const convertedData = convertMongoDocToIProperty(data as Record<string, unknown>);

    // Validate the converted data
    if (!isIProperty(convertedData)) {
      console.log('Converted property failed validation:', JSON.stringify(convertedData, null, 2));
      throw new Error('Invalid property data: Property failed validation');
    }

    return convertedData;
  } catch (error) {
    console.error('Error in parseSinglePropertyData:', error);
    throw error;
  }
}

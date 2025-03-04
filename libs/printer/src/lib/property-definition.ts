import type { PropertyOptions } from '@puq/type';
import { propertyType } from './property-type.js';
import { isDefinedOrThrow } from '@puq/is';
import { getOptionalMarker } from './get-optional-marker.js';

/**
 * Return property definition
 * @param options - {@link PropertyOptions}
 * @returns - {@link string} property definition such as `name: string;`
 */
export function propertyDefinition(options: PropertyOptions): string {
  const name = isDefinedOrThrow(options.name);
  return `${name}${getOptionalMarker(options)}: ${propertyType(options)};`;
}

import type { PropertyOptions } from '@puq/type';
import { propertyType } from './property-type.js';
import { rval } from '@puq/is';
import { getOptionalMarker } from './get-optional-marker.js';

/**
 * Generates a TypeScript-like property definition (e.g., `name: string;`).
 *
 * @param {PropertyOptions} options - The property options including name, type, and optionality.
 * @returns {string} A formatted property definition string.
 */

export function propertyDefinition(options: PropertyOptions): string {
  const name = rval(options.name);
  return `${name}${getOptionalMarker(options)}: ${propertyType(options)};`;
}

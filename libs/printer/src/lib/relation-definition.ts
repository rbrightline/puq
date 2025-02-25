import { RelationOptions } from '@puq/type';
import { rval } from '@puq/is';
import { getOptionalMarker } from './get-optional-marker.js';
import { relationType } from './relation-type.js';

/**
 * Generates a TypeScript-like relation definition (e.g., `product: Product;`).
 *
 * @param {RelationOptions} options - The relation options including name, type, and target.
 * @returns {string} A formatted relation definition.
 */
export function relationDefinition(options: RelationOptions): string {
  const name = rval(options.name);
  return `${name}${getOptionalMarker(options)}: ${relationType(options)};`;
}

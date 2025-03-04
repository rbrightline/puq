import type { RelationOptions } from '@puq/type';
import { isDefinedOrThrow } from '@puq/is';
import { getOptionalMarker } from './get-optional-marker.js';
import { relationType } from './relation-type.js';

/**
 * Return relation property definition such as `category: Category;`
 * @param options - {@link RelationOptions}
 * @returns - {@link string}
 */
export function relationDefinition(options: RelationOptions): string {
  const name = isDefinedOrThrow(options.name);
  return `${name}${getOptionalMarker(options)}: ${relationType(options)};`;
}

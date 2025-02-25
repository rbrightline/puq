import { RelationOptions } from '@puq/type';
import { rval } from '@puq/is';
import { isRequired } from './is-required-property.js';
import { relationType } from './relation-type.js';

/**
 * print relation definition such as `product: Product;`
 * @param options
 */
export function relationDefinition(options: RelationOptions): string {
  const name = rval(options.name);
  return `${name}${isRequired(options)}: ${relationType(options)};`;
}

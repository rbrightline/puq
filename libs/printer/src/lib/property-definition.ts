import { PropertyOptions } from '@puq/type';
import { propertyType } from './property-type.js';
import { rval } from '@puq/is';
import { isRequired } from './is-required-property.js';

/**
 * print property definition such as `name :string;`
 * @param options
 */
export function propertyDefinition(options: PropertyOptions): string {
  const name = rval(options.name);
  return `${name}${isRequired(options)}: ${propertyType(options)};`;
}

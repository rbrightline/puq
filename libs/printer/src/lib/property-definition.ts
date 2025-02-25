import { PropertyOptions } from '@puq/type';
import { propertyType } from './property-type.js';
import { rval } from '@puq/is';

/**
 * print property definition such as `name :string;`
 * @param options
 */
export function propertyDefinition(options: PropertyOptions): string {
  const type = propertyType(options);
  const required = options.required === true ? '' : '?';
  const name = rval(options.name);
  return `${name}${required}: ${type};`;
}

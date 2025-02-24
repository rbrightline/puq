import { PropertyOptions } from '@puq/type';
import { propertyType } from './property-type.js';

/**
 * print property definition such as `name :string;`
 * @param options
 */
export function propertyDefinition(options: PropertyOptions): string {
  const type = propertyType(options);
  const required = options.required === true ? '' : '?';

  return `${(options as any)['name']}${required}: ${type};`;
}

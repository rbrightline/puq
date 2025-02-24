import { PropertyOptions } from '@puq/type';
import { pickPropertyType } from './pick-property-type.js';

/**
 * print property definition such as `name :string;`
 * @param options
 */
export function printProperty(options: PropertyOptions): string {
  const type = pickPropertyType(options);
  const required = options.required === true ? '' : '?';

  return `${(options as any)['name']}${required}: ${type};`;
}

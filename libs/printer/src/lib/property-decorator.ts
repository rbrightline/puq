import type { PropertyOptions } from '@puq/type';
import { propertyDecoratorOptions } from './property-decorator-options.js';

/**
 * Return property decorator definition
 * @param decoratorName - {@link string} such as Property, Column, Entity
 * @param options - {@link PropertyOptions}
 * @returns - {@link string} decorator definition such as @Property({ type:"string" })
 */
export function propertyDecorator(
  decoratorName: string,
  options: PropertyOptions,
): string {
  return `@${decoratorName}(${propertyDecoratorOptions(options)})`;
}

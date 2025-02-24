import { PropertyOptions } from '@puq/type';
import { propertyDecoratorOptions } from './property-decorator-options.js';

/**
 * Print property decorator
 * @param decoratorName decorator name
 * @param options {@link PropertyOptions}
 * @returns
 */
export function propertyDecorator(
  decoratorName: string,
  options: PropertyOptions
): string {
  return `@${decoratorName}(${JSON.stringify(
    propertyDecoratorOptions(options)
  )})`;
}

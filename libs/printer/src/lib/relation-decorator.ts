import { PropertyOptions, RelationOptions } from '@puq/type';
import { propertyDecoratorOptions } from './property-decorator-options.js';

/**
 * Print property decorator
 * @param decoratorName decorator name
 * @param options {@link PropertyOptions}
 * @returns
 */
export function propertyDecorator<T>(
  decoratorName: string,
  options: RelationOptions
): string {
  return `@${decoratorName}(${JSON.stringify(
    propertyDecoratorOptions(options)
  )})`;
}

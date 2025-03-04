import type { RelationOptions } from '@puq/type';
import { relationDecoratorOptions } from './relation-decorator-options.js';

/**
 * Return relation decorator definition
 * @param decoratorName - {@link string}
 * @param options - {@link RelationOptions}
 * @returns - {@link string} decorator definition
 */
export function relationDecorator(
  decoratorName: string,
  options: RelationOptions,
): string {
  return `@${decoratorName}(${relationDecoratorOptions(options)})`;
}

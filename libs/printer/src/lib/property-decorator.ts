import type { PropertyOptions } from '@puq/type';
import { propertyDecoratorOptions } from './property-decorator-options.js';

/**
 * Generates a TypeScript-like property decorator (e.g., `@Property({ type: 'string' })`).
 *
 * @param {string} decoratorName - The name of the decorator (e.g.,'Property', 'ViewColumn', 'Column').
 * @param {PropertyOptions} options - The property options used in the decorator.
 * @returns {string} A formatted decorator string.
 */
export function propertyDecorator(
  decoratorName: string,
  options: PropertyOptions,
): string {
  return `@${decoratorName}(${propertyDecoratorOptions(options)})`;
}

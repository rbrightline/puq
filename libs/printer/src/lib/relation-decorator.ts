import { RelationOptions } from '@puq/type';
import { relationDecoratorOptions } from './relation-decorator-options.js';

/**
 * Generates a relation decorator string (e.g., `@OneToMany({ type:"many-to-many", target:()=>Product , eager: true})`).
 *
 * @param {string} decoratorName - The name of the decorator (e.g., `OneToMany`).
 * @param {RelationOptions} options - The relation options.
 * @returns {string}
 */
export function relationDecorator(
  decoratorName: string,
  options: RelationOptions
): string {
  return `@${decoratorName}(${relationDecoratorOptions(options)})`;
}

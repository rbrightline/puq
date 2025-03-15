import type { PropertyOptions, RelationOptions } from '@puq/type';
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

export function convertRelationOptionsToPropertyOptions(
  options: RelationOptions,
): PropertyOptions {
  switch (options.type) {
    case 'many-to-many':
    case 'one-to-many':
      return {
        name: options.name,
        type: 'array',
        items: { type: 'object', target: 'IDDto' },
        required: options.required,
      };
    case 'many-to-one':
    case 'one-to-one':
      return {
        name: options.name,
        type: 'object',
        target: 'IDDto',
        required: options.required,
      };
  }
}

export function propertyDecoratorForRelations(
  decoratorName: string,
  options: RelationOptions,
) {
  return `@${decoratorName}(${propertyDecoratorOptions(convertRelationOptionsToPropertyOptions(options))})`;
}

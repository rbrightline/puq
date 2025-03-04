import type { PropertyOptions } from '@puq/type';

/**
 * Resolve the type options in {@link PropertyOptions} into actual typescript property type and return it
 * @param options - {@link PropertyOptions}
 * @returns - {@link string}
 */
export function propertyType(options: PropertyOptions): string {
  switch (options.type) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'bigint':
      return options.type;

    case 'object':
      return options.target.toString();
    case 'integer':
      return 'number';

    case 'date':
      return 'string';

    case 'array':
      return `${propertyType(options.items)}[]`;
  }
}

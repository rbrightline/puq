import type { PropertyOptions } from '@puq/type';

/**
 * Determines the TypeScript-compatible property type based on the given options.
 *
 * @param {PropertyOptions} options - The property options including type and target.
 * @returns {string} A TypeScript-like type definition (e.g., 'string', 'number', 'SomeObject[]').
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

import { PropertyOptions } from '@puq/type';

/**
 * Print property type such as 'string', 'number', 'stirng[]', 'SomeObject[]'
 * @param options
 * @returns
 */
export function propertyType(options: PropertyOptions): string {
  switch (options.type) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'bigint':
      return options.type;

    case 'object':
      return options.target as unknown as string;
    case 'integer':
      return 'number';

    case 'date':
      return 'string';

    case 'array':
      return `${propertyType(options.items)}[]`;
  }
}

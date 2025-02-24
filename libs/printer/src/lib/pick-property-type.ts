import { PropertyOptions } from '@puq/type';

/**
 * Pick typescript property type such as `string`, `number`, `string[]`
 * @param options
 * @returns
 */
export function pickPropertyType(options: PropertyOptions): string {
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
      return `${pickPropertyType(options.items)}[]`;
  }
}

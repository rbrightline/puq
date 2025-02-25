import { rval } from '@puq/is';
import { PropertyOptions } from '@puq/type';

/**
 * Print property type such as 'string', 'number', 'stirng[]', 'SomeObject[]'
 * @param options
 * @returns
 */
export function propertyType(options: PropertyOptions): string {
  rval(options);
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

import { PropertyOptions } from '@puq/type';

/**
 * Print property options (JSON.stringify)
 * @param options {@link PropertyOptions}
 * @returns
 */
export function propertyDecoratorOptions(
  options: PropertyOptions
): PropertyOptions {
  switch (options.type) {
    case 'string':
    case 'number':
    case 'bigint':
    case 'boolean':
    case 'integer':
    case 'date':
      break;
    case 'object': {
      const { target } = options;
      (options as any).target = `()=>${target as unknown as string}`;
      break;
    }
    case 'array': {
      if (options.items.type === 'object') {
        options = {
          ...options,
          items: propertyDecoratorOptions(options.items),
        };
      }
      break;
    }
  }

  return options;
}

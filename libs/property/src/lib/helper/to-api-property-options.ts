import type { ApiPropertyOptions } from '@nestjs/swagger';
import type { PropertyOptions } from '@puq/type';
import { isString } from '@puq/is';

export function toApiPropertyOptions(
  options: PropertyOptions,
): ApiPropertyOptions {
  const required = options.required === true;
  const nullable = !required;

  switch (options.type) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'integer':
      return { ...options, required, nullable };

    case 'bigint':
      return { ...options, type: 'string', required, nullable };
    case 'date':
      return { ...options, type: 'string', format: 'date', required, nullable };
    case 'object': {
      const { target, ...rest } = options;
      if (isString(target))
        throw new Error(
          'options.target should be a function returning class type',
        );
      return { ...rest, type: target(), required, nullable };
    }

    case 'array': {
      if (options.items.type === 'object') {
        const { ...itemsRest } = toApiPropertyOptions(options.items);
        if (typeof options.items.target === 'string') {
          throw new Error(
            `options.items.target should be a function that returns the class typeF`,
          );
        }

        return {
          ...options,
          type: [options.items.target()],
          items: itemsRest as any,
          required,
          nullable,
        };
      }
      return {
        ...options,
        items: toApiPropertyOptions(options.items) as any,
        required,
        nullable,
      };
    }
  }
}

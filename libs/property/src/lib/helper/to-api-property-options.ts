import type { ApiPropertyOptions } from '@nestjs/swagger';
import type { PropertyOptions } from '@puq/type';

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
      return { ...rest, type: target(), required, nullable };
    }

    case 'array': {
      if (options.items.type === 'object') {
        const { ...itemsRest } = toApiPropertyOptions(options.items);
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

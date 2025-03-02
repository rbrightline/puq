import type { PropertyOptions } from '@puq/type';
import { ApiProperty as __ApiProperty } from '@nestjs/swagger';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface.js';
import { Exclude, Expose } from 'class-transformer';

/**
 * Swagger {@link ApiProperty} decorator wrapper
 * @param options
 * @returns
 */
export function ApiProperty(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    const { type } = options;
    const required = options.required == true;
    const nullable = options.required != true;

    if (options.expose == false) {
      Exclude()(t, p);
    } else {
      Expose()(t, p);
    }
    switch (type) {
      case 'string':
      case 'number':
      case 'integer':
      case 'boolean':
        __ApiProperty({ ...options, required, nullable })(t, p);
        break;

      case 'bigint': {
        const { ...rest } = options as Omit<PropertyOptions, 'type'>;
        __ApiProperty({ ...rest, type: 'string', required, nullable })(t, p);
        break;
      }

      case 'date': {
        const { ...rest } = options as Omit<PropertyOptions, 'type'>;
        __ApiProperty({
          ...rest,
          type: 'string',
          format: 'date',
          required,
          nullable,
        })(t, p);
        break;
      }

      case 'object': {
        const { target, ...rest } = options;
        __ApiProperty({ ...rest, type: target(), required, nullable })(t, p);
        break;
      }
      case 'array': {
        const { items, ...optionsRest } = options;
        if (items.type === 'object') {
          const { target, ...itemsRest } = items;
          __ApiProperty({
            ...optionsRest,
            type: [target()],
            items: {
              ...(itemsRest as SchemaObject),
              nullable: items.required !== true,
            },
            required,
            nullable,
          })(t, p);
        } else {
          __ApiProperty({
            ...options,
            items: {
              ...(options.items as SchemaObject),
            },
            required,
            nullable,
          })(t, p);
        }
        break;
      }
    }
  };
}

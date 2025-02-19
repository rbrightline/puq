import { PropertyOptions } from '@puq/type';
import { ApiProperty as __ApiProperty } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface.js';

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

    switch (type) {
      case 'string':
      case 'number':
      case 'integer':
      case 'boolean':
        __ApiProperty({ ...options, required, nullable })(t, p);
        break;
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
            required,
            nullable,
            items: { ...(itemsRest as SchemaObject) },
          })(t, p);
        } else {
          const { required } = options.items;

          __ApiProperty({
            ...options,
            nullable,
            required,
            items: { ...(options.items as SchemaObject) },
          })(t, p);
        }
        break;
      }
    }
  };
}

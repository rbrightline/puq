import type { PropertyDecoratorParam, PropertyOptions } from '@puq/type';
import { ApiProperty as __ApiProperty } from '@nestjs/swagger';
import { toApiPropertyOptions } from '../helper/to-api-property-options.js';

/**
 * Swagger {@link ApiProperty} decorator wrapper
 * @param options
 * @returns
 */
export function ApiProperty(options: PropertyOptions): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    __ApiProperty(toApiPropertyOptions(options))(...args);
  };
}

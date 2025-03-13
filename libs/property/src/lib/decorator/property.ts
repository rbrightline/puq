import type { PropertyDecoratorParam, PropertyOptions } from '@puq/type';
import { PropertyValidation } from '@puq/validation';
import { ApiProperty } from './api-property.js';

/**
 * Dto property decorator
 */
export function Property(options: PropertyOptions): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    ApiProperty(options)(...args);
    PropertyValidation(options)(...args);
  };
}

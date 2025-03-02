import type { PropertyOptions } from '@puq/type';
import { PropertyValidation } from '@puq/validation';
import { ApiProperty } from './api-property.js';

/**
 * Dto property decorator
 */
export function Property(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    ApiProperty(options)(t, p);
    PropertyValidation(options)(t, p);
  };
}

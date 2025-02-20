import { PropertyOptions } from '@puq/type';
import { PropertyValidation } from '@puq/validation';
import { ApiProperty } from './api-property.js';

/**
 * Property decorator for DTOs
 */
export function Property(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    ApiProperty(options)(t, p);
    PropertyValidation(options)(t, p);
  };
}

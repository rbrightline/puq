import type { PropertyDecoratorParam } from '@puq/type';
import { Transform } from 'class-transformer';

/**
 * Transform the select query param into string array
 * @returns- property decorator
 */
export function SelectTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return [value];
      }
      return value;
    })(...args);
  };
}

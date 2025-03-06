import type { PropertyDecoratorParam } from '@puq/type';
import { Transform } from 'class-transformer';
import { TrimTransformer } from './trim.js';

export function StringTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      return value;
    })(...args);

    TrimTransformer()(...args);
  };
}

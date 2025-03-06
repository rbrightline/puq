import type { PropertyDecoratorParam } from '@puq/type';
import { TrimTransformer } from './trim.js';

export function StringTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    TrimTransformer()(...args);
  };
}

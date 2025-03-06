import type { PropertyDecoratorParam, Some } from '@puq/type';
import { Transform } from 'class-transformer';
import { isNotDefined, isString } from '@puq/is';
import { isArray } from 'class-validator';

export function booleanTransformer(value: Some<boolean>) {
  if (value == 'true') {
    return true;
  } else if (value == 'false') {
    return false;
  }

  return value;
}

export function BooleanTransformer(): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) return value;
      if (isString(value)) return booleanTransformer(value);
      if (isArray(value)) return value.map(booleanTransformer);

      return value;
    })(...args);
  };
}

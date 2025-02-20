import { OrderOptions } from '@puq/type';
import { Transform } from 'class-transformer';

export function parseOrderString(orderString: string): OrderOptions {
  const [property, direction, nulls] = orderString.split(':');
  return {
    property,
    direction,
    nulls,
  } as OrderOptions;
}

export function OrderTransformer(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        parseOrderString(value);
      }
      return value;
    })(t, p);
  };
}

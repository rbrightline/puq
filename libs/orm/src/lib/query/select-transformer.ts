import { Transform } from 'class-transformer';

export function SelectTransformer(): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return [value];
      }
      return value;
    })(t, p);
  };
}

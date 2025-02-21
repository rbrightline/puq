import { Transform } from 'class-transformer';

/**
 * Transform the select query param into string array
 * @returns
 */
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

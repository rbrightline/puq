import { Transform } from 'class-transformer';
import { ILike } from 'typeorm';

export function QueryTransformer(columns: string[]): PropertyDecorator {
  return (t, p) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return columns.map((e) => {
          return { [e]: ILike(`%${value}%`) };
        });
      }
      return value;
    })(t, p);
  };
}

import { Property } from '@puq/property';
import { PropertyOptions } from '@puq/type';
import { ViewColumn as __ViewColumn } from 'typeorm';

export function ViewColumn(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    Property(options)(t, p);
    __ViewColumn()(t, p);
  };
}

import { Property } from '@puq/property';
import { PropertyOptions } from '@puq/type';
import { ViewColumn as __ViewColumn } from 'typeorm';

/**
 * TypeORM {@link __ViewColumn} decorator with `documentation` capability
 * @param options property options {@link PropertyOptions}
 * @returns - {@link PropertyDecorator}
 */
export function ViewColumn(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    Property(options)(t, p);
    __ViewColumn()(t, p);
  };
}

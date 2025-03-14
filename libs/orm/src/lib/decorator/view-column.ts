import type { PropertyDecoratorParam, PropertyOptions } from '@puq/type';
import { Property } from '@puq/property';
import { ViewColumn as __ViewColumn } from 'typeorm';

/**
 * TypeORM {@link __ViewColumn} decorator with `documentation` capability
 * @param options property options {@link PropertyOptions}
 * @returns - {@link PropertyDecorator}
 */
export function ViewColumn(options: PropertyOptions): PropertyDecorator {
  return (...args: PropertyDecoratorParam) => {
    Property(options)(...args);
    __ViewColumn()(...args);
  };
}

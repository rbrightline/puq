import { Property } from '@puq/property';
import type { PropertyOptions } from '@puq/type';
import { Column as __Column } from 'typeorm';
import { pickColumnType } from '../common/pick-column-type.js';
import { pickTransformer } from '../common/pick-transformer.js';

/**
 * Typeorm Column decorator with `validation` and `documentation` capabilities.
 * @param options proeprty options {@link PropertyOptions}
 * @returns proeprty decorator {@link PropertyDecorator}
 */
export function Column(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    const {
      unique,
      required,
      readonly: __readonly,
      default: __default,
    } = options;
    const nullable = required != true;
    const update = __readonly == true ? false : undefined;

    const type = pickColumnType(options);
    const transformer = pickTransformer(options);

    Property(options)(t, p);

    __Column({
      type,
      array: options.type === 'array',
      nullable,
      unique,
      update,
      default: __default,
      transformer,
    })(t, p);
  };
}

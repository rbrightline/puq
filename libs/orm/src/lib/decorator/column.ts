import { Property } from '@puq/property';
import { PropertyOptions } from '@puq/type';
import { Column as __Column } from 'typeorm';
import { pickColumnType } from '../utils/pick-column-type.js';

export function Column(options: PropertyOptions): PropertyDecorator {
  return (t, p) => {
    const {
      type,
      unique,
      required,
      readonly: __readonly,
      default: __default,
    } = options;
    const nullable = required != true;
    const update = __readonly == true ? false : undefined;

    Property(options)(t, p);

    switch (type) {
      case 'string':
        __Column({
          type: 'varchar',
          nullable,
          unique,
          update,
          default: __default,
        })(t, p);
        break;
      case 'number':
        __Column({
          type: 'real',
          nullable,
          unique,
          update,
          default: __default,
        })(t, p);
        break;
      case 'integer':
        __Column({
          type: 'integer',
          nullable,
          unique,
          update,
          default: __default,
        })(t, p);
        break;
      case 'bigint':
        __Column({
          type: 'bigint',
          nullable,
          unique,
          update,
          default: __default,
        })(t, p);
        break;
      case 'boolean':
        __Column({
          type: 'boolean',
          nullable,
          unique,
          update,
          default: __default,
        })(t, p);
        break;
      case 'object':
        __Column({
          type: 'json',
          nullable,
          unique,
          update,
          default: __default,
        })(t, p);
        break;
      case 'date':
        __Column({
          type: 'varchar',
          length: 30,
          unique,
          nullable,
          update,
          default: __default,
        })(t, p);
        break;
      case 'array':
        __Column({
          type: pickColumnType(options),
          array: true,
          nullable,
          unique,
          update,
          default: __default,
        })(t, p);
        break;
    }
  };
}

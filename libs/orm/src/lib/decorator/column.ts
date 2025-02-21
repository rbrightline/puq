import { Property } from '@puq/property';
import { PropertyOptions } from '@puq/type';
import { Column as __Column, ColumnType, ValueTransformer } from 'typeorm';

/**
 * Pick column data type based on provided data type and database driver
 * @param options
 * @returns
 */
export function pickDataType(options: PropertyOptions): ColumnType {
  const { type, databaseType } = options;

  switch (databaseType) {
    case 'better-sqlite3':
    case 'sqlite':
      switch (type) {
        case 'string':
        case 'date':
          return 'text';
        case 'number':
          return 'real';
        case 'integer':
          return 'integer';
        case 'bigint':
          return 'integer';
        case 'boolean':
          return 'boolean';
        case 'object':
        case 'array':
          return 'text';

        default:
          throw new Error(`Invalid column type ${type}`);
      }

    default:
      switch (type) {
        case 'string':
        case 'date':
          return 'varchar';
        case 'number':
          return 'numeric';
        case 'integer':
          return 'integer';
        case 'bigint':
          return 'bigint';
        case 'boolean':
          return 'boolean';
        case 'object':
          return 'jsonb';
        case 'array':
          return pickDataType(options.items);
        default:
          throw new Error(`Invalid column type ${type}`);
      }
  }
}

/**
 * Pick transformer based on the given data type and database driver
 * @param options
 * @returns
 */
export function pickTransformer(
  options: PropertyOptions
): ValueTransformer | undefined {
  if (options.databaseType?.includes('sqlite')) {
    if (options.type === 'object' || options.type === 'array') {
      return {
        from(value) {
          if (value != undefined) return JSON.parse(value);
          return value;
        },
        to(value) {
          if (value != undefined) return JSON.stringify(value);

          return value;
        },
      };
    }
  }
  return undefined;
}

/**
 * Typeorm Column decorator with validation and documentaion capability
 * @param options
 * @returns
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

    const type = pickDataType(options);
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

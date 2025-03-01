import { type PropertyOptions } from '@puq/type';
import { type ColumnType } from 'typeorm';

/**
 * Pick column type based on provided data type and database driver
 * @param options
 * @returns
 */
export function pickColumnType(options: PropertyOptions): ColumnType {
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
          return pickColumnType(options.items);
        default:
          throw new Error(`Invalid column type ${type}`);
      }
  }
}

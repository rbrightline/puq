import { PropertyOptions } from '@puq/type';
import { ColumnType } from 'typeorm';

export function pickColumnType(options: PropertyOptions): ColumnType {
  const { type } = options;

  switch (type) {
    case 'string':
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
    case 'date':
      return 'date';
    case 'array':
      return pickColumnType(options.items);
  }
}

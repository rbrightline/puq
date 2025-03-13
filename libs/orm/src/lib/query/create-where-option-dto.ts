import type { BaseModel, KeyOf, Type } from '@puq/type';
import type { WhereOption } from '@puq/query';
import { Dto, Property } from '@puq/property';
import { QueryOperator } from '@puq/query';
import { keys } from '@puq/is';
import type { CreateQueryOptions } from './create-query-options.js';

/**
 * Create where option dto
 * @param options - {@link CreateQueryOptions}
 * @returns - where option dto
 */
export function CreateWhereOptionDto<T extends BaseModel, Value>(
  options: CreateQueryOptions<T>,
): Type<WhereOption<T, Value>> {
  const { entity } = options;
  const columns = keys(entity);

  @Dto()
  class WhereOptionDto implements WhereOption<T, Value> {
    @Property({ type: 'string', required: true, enum: columns as string[] })
    property: KeyOf<T>;

    @Property({ type: 'string', required: true, enum: QueryOperator })
    operator: QueryOperator;

    @Property({ type: 'string', required: true, minLength: 1, maxLength: 100 })
    query: Value;
  }

  return WhereOptionDto;
}

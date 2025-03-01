import { ApiProperty, Dto } from '@puq/property';
import { type FindOptionsWhere } from 'typeorm';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { type QueryCount } from '@puq/query';
import { CommonQueryDto } from './common-query-dto.js';
import type { Keys, Type } from '@puq/type';

export type CreateQueryCountDtoOptions<T> = {
  columns: Keys<T>;
};

/**
 * Create a count query dto for the entity
 * @param options {@link CreateQueryCountDtoOptions}
 * @returns
 */
export function CreateQueryCountDto<Entity>(
  options: CreateQueryCountDtoOptions<Entity>
): Type {
  const { columns } = options;

  @Dto()
  class QueryCountDto<T>
    extends CommonQueryDto
    implements QueryCount<FindOptionsWhere<T>[]>
  {
    @WhereQueryTransformer(columns)
    @ApiProperty({ type: 'array', items: { type: 'string' } })
    where?: FindOptionsWhere<T>[];
  }

  return QueryCountDto;
}

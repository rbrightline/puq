import type { FindOptionsWhere } from 'typeorm';
import type { Type } from '@puq/type';
import type { QueryCount } from '@puq/query';
import { ApiProperty, Dto } from '@puq/property';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { CommonQueryDto } from './common-query-dto.js';
import type { CreateQueryOptions } from './create-query-options.js';

/**
 * Create a query count dto
 * @param options - {@link CreateQueryOptions}
 * @returns - query dto
 */
export function CreateQueryCountDto<Entity>(
  options: CreateQueryOptions<Entity>,
): Type {
  @Dto()
  class QueryCountDto<T>
    extends CommonQueryDto
    implements QueryCount<FindOptionsWhere<T>[]>
  {
    @WhereQueryTransformer(options)
    @ApiProperty({ type: 'array', items: { type: 'string' } })
    where?: FindOptionsWhere<T>[];
  }

  return QueryCountDto;
}

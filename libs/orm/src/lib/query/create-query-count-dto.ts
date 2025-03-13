import type { FindOptionsWhere } from 'typeorm';
import type { BaseModel, Type } from '@puq/type';
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
export function CreateQueryCountDto<T extends BaseModel>(
  options: CreateQueryOptions<T>,
): Type {
  @Dto()
  class QueryCountDto
    extends CommonQueryDto
    implements QueryCount<FindOptionsWhere<T>[]>
  {
    @WhereQueryTransformer(options)
    @ApiProperty({ type: 'array', items: { type: 'string' } })
    where?: FindOptionsWhere<T>[];
  }

  return QueryCountDto;
}

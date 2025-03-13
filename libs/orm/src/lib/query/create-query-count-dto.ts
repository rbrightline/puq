import type { FindOptionsWhere } from 'typeorm';
import type { BaseModel, Type } from '@puq/type';
import type { QueryCount } from '@puq/query';
import { Dto } from '@puq/property';
import { CommonQueryDto } from './common-query-dto.js';
import type { CreateQueryOptions } from './create-query-options.js';
import { WhereProperty } from './where-property.js';

/**
 * Create a query count dto
 * @param options - {@link CreateQueryOptions}
 * @returns - query dto
 */
export function CreateQueryCountDto<T extends BaseModel>(
  options: Pick<CreateQueryOptions<T>, 'entity'>,
): Type {
  @Dto()
  class QueryCountDto
    extends CommonQueryDto
    implements QueryCount<FindOptionsWhere<T>[]>
  {
    @WhereProperty(options)
    where?: FindOptionsWhere<T>[];
  }

  return QueryCountDto;
}

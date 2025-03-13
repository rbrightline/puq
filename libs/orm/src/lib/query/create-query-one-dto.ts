import type { Keys, Type } from '@puq/type';
import type { FindOptionsWhere } from 'typeorm';
import type { QueryOne } from '@puq/query';
import type { CreateQueryOptions } from './create-query-options.js';
import { ApiProperty, Dto, Property } from '@puq/property';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { CommonQueryDto } from './common-query-dto.js';
import { keys } from '@puq/is';

/**
 * Create query dto to query a single entity
 * @param options - {@link CreateQueryOptions}
 * @returns- query dto
 */
export function CreateQueryOneDto<T>(
  options: CreateQueryOptions<T>,
): Type<QueryOne<T, FindOptionsWhere<T>[]>> {
  const { entity, maxSelectSize, isSelectRequired } = options;
  const columns = keys(entity);

  @Dto()
  class QueryOneDto
    extends CommonQueryDto
    implements QueryOne<T, FindOptionsWhere<T>[]>
  {
    @Property({
      type: 'array',
      maxSize: maxSelectSize,
      required: isSelectRequired,
      items: {
        type: 'string',
        required: true,
        enum: columns,
      },
    })
    select?: Keys<T>;

    @WhereQueryTransformer(options)
    @ApiProperty({ type: 'array', items: { type: 'string' } })
    where?: FindOptionsWhere<T>[];
  }

  return QueryOneDto;
}

import type { Keys, Type } from '@puq/type';
import type { FindOptionsWhere } from 'typeorm';
import type { QueryOne } from '@puq/query';
import { ApiProperty, Dto, Property } from '@puq/property';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { CommonQueryDto } from './common-query-dto.js';
import { keys } from '@puq/is';
import type { CreateQueryOptions } from './create-query-options.js';

/**
 * Create query dto to query a single entity
 * @param options - {@link CreateQueryOptions}
 * @returns- query dto
 */
export function CreateQueryOneDto<Entity>(
  options: CreateQueryOptions<Entity>,
): Type<QueryOne<Entity, FindOptionsWhere<Entity>[]>> {
  const { entity, maxSelectSize, isSelectRequired } = options;
  const columns = keys(entity);

  @Dto()
  class QueryOneDto<T1>
    extends CommonQueryDto
    implements QueryOne<T1, FindOptionsWhere<T1>[]>
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
    select?: Keys<T1>;

    @WhereQueryTransformer(options)
    @ApiProperty({ type: 'array', items: { type: 'string' } })
    where?: FindOptionsWhere<T1>[];
  }

  return QueryOneDto;
}

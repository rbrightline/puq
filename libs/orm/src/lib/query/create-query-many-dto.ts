import type { FindOptionsWhere } from 'typeorm';
import type { KeyOf, Keys, Type } from '@puq/type';
import type { QueryMany } from '@puq/query';
import { ApiProperty, Dto, Property } from '@puq/property';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { OrderDirection, OrderNulls } from '@puq/query';
import { CommonQueryDto } from './common-query-dto.js';
import { keys } from '@puq/is';
import type { CreateQueryOptions } from './create-query-options.js';

/**
 * Create query dto to query many entities
 * @param options - {@link CreateQueryOptions}
 * @returns - query dto
 */
export function CreateQueryManyDto<Entity>(
  options: CreateQueryOptions<Entity>,
): Type<QueryMany<Entity, FindOptionsWhere<Entity>[]>> {
  const { entity, maxSelectSize, isSelectRequired, maxTake, defaultTake } =
    options;

  const columns = keys(entity);
  @Dto()
  class QueryManyDto<T1>
    extends CommonQueryDto
    implements QueryMany<T1, FindOptionsWhere<T1>[]>
  {
    @Property({
      type: 'integer',
      description: 'Take the number of items',
      integerFormat: 'positive',
      maximum: maxTake,
      minimum: 1,
      default: defaultTake,
      acceptString: true,
    })
    take?: number;

    @Property({
      type: 'integer',
      description: 'Skip the number of items',
      integerFormat: 'positive',
      default: 0,
      minimum: 0,
      acceptString: true,
    })
    skip?: number;

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

    @Property({
      type: 'string',
      enum: columns,
      default: 'id',
    })
    orderBy?: KeyOf<T1>;

    @Property({
      type: 'string',
      enum: OrderDirection,
      default: 'asc',
    })
    orderDir?: OrderDirection;

    @Property({
      type: 'string',
      enum: OrderNulls,
      default: 'last',
    })
    orderNulls?: OrderNulls;

    @WhereQueryTransformer(options)
    @ApiProperty({ type: 'array', items: { type: 'string', required: true } })
    where?: FindOptionsWhere<T1>[];
  }

  return QueryManyDto;
}

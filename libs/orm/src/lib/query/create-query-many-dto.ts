import type { FindOptionsWhere } from 'typeorm';
import type { BaseModel, KeyOf, Keys, Type } from '@puq/type';
import type { QueryMany } from '@puq/query';
import type { CreateQueryOptions } from './create-query-options.js';
import { Dto, Property } from '@puq/property';
import { OrderDirection, OrderNulls } from '@puq/query';
import { CommonQueryDto } from './common-query-dto.js';
import { keys } from '@puq/is';
import { WhereProperty } from './where-property.js';

/**
 * Create query dto to query many entities
 * @param options - {@link CreateQueryOptions}
 * @returns - query dto
 */
export function CreateQueryManyDto<T extends BaseModel>(
  options: CreateQueryOptions<T>,
): Type<QueryMany<T, FindOptionsWhere<T>[]>> {
  const { entity, maxSelectSize, isSelectRequired, maxTake, defaultTake } =
    options;

  const columns = keys(entity);

  @Dto()
  class QueryManyDto
    extends CommonQueryDto
    implements QueryMany<T, FindOptionsWhere<T>[]>
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
    select?: Keys<T>;

    @Property({
      type: 'string',
      enum: columns,
      default: 'id',
    })
    orderBy?: KeyOf<T>;

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

    @WhereProperty(options)
    where?: FindOptionsWhere<T>[];
  }

  return QueryManyDto;
}

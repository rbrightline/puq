import { Dto, Property } from '@puq/property';
import { KeyOf, Keys } from '@puq/type';
import { FindOptionsWhere } from 'typeorm';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { SelectTransformer } from './select-transformer.js';
import { OrderDirection, OrderNulls, QueryMany } from '@puq/query';
import { QueryOneDtoOptions } from './create-query-one-dto.js';
import { QueryTransformer } from './query-transformer.js';

export type QueryManyDtoOptions<Entity, Where> = QueryOneDtoOptions<
  Entity,
  Where
> & {
  maximumSelectableColumns?: number;
  maximumTake?: number;
  defaultTake?: number;
};

export function CreateQueryManyDto<Entity, Where>(
  options: QueryManyDtoOptions<Entity, Where>
) {
  const {
    whereDto,
    queryDto,
    columns,
    maximumSelectableColumns,
    maximumTake,
    defaultTake,
    isSelectRequired,
  } = options;

  @Dto()
  class QueryManyDto<T>
    implements QueryMany<T, FindOptionsWhere<T>[], FindOptionsWhere<T>[]>
  {
    @Property({
      type: 'integer',
      description: 'Take the number of items',
      integerFormat: 'positive',
      maximum: maximumTake,
      default: defaultTake,
      acceptString: true,
    })
    take?: number;

    @Property({
      type: 'integer',
      description: 'Skip the number of items',
      integerFormat: 'positive',
      default: 0,

      acceptString: true,
    })
    skip?: number;

    @SelectTransformer()
    @Property({
      type: 'array',
      maxSize: maximumSelectableColumns,
      required: isSelectRequired,
      items: {
        type: 'string',
        required: true,
        enum: columns as string[],
      },
    })
    select?: Keys<T>;

    @Property({
      type: 'string',
      required: true,
      enum: columns as string[],
      default: 'id',
    })
    orderBy?: KeyOf<T>;

    @Property({
      type: 'string',
      required: true,
      enum: OrderDirection,
      default: 'asc',
    })
    orderDir?: OrderDirection;

    @Property({
      type: 'string',
      required: true,
      enum: OrderNulls,
      default: 'last',
    })
    orderNulls?: OrderNulls;

    @WhereQueryTransformer()
    @Property({
      type: 'array',
      items: { type: 'object', target: () => whereDto },
    })
    where?: FindOptionsWhere<T>[];

    @QueryTransformer(columns as string[])
    @Property({
      type: 'array',
      items: { type: 'object', target: () => queryDto },
    })
    query?: FindOptionsWhere<T>[];
  }

  return QueryManyDto;
}

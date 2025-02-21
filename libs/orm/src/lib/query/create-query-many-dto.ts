import { ApiProperty, Dto, Property } from '@puq/property';
import { KeyOf, Keys, Type } from '@puq/type';
import { FindOptionsWhere } from 'typeorm';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { SelectTransformer } from './select-transformer.js';
import { OrderDirection, OrderNulls, QueryMany } from '@puq/query';
import { QueryOneDtoOptions } from './create-query-one-dto.js';
import { QueryTransformer } from './query-transformer.js';
import { CommonQueryDto } from './common-query-dto.js';

export type QueryManyDtoOptions<Entity> = QueryOneDtoOptions<Entity> & {
  maximumSelectableColumns?: number;
  maximumTake?: number;
  defaultTake?: number;
};

export function CreateQueryManyDto<T>(
  options: QueryManyDtoOptions<T>
): Type<QueryMany<T, FindOptionsWhere<T>[]>> {
  const {
    columns,
    maximumSelectableColumns,
    maximumTake,
    defaultTake,
    isSelectRequired,
  } = options;

  @Dto()
  class QueryManyDto<T>
    extends CommonQueryDto
    implements QueryMany<T, FindOptionsWhere<T>[]>
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
    @ApiProperty({ type: 'array', items: { type: 'string', required: true } })
    where?: FindOptionsWhere<T>[];

    @QueryTransformer(columns as string[])
    @ApiProperty({ type: 'array', items: { type: 'string', required: true } })
    query?: FindOptionsWhere<T>[];
  }

  return QueryManyDto;
}

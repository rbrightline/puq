import type { FindOptionsWhere } from 'typeorm';
import type { KeyOf, Keys, Type } from '@puq/type';
import type { QueryMany } from '@puq/query';
import type { QueryOneDtoOptions } from './create-query-one-dto.js';
import { ApiProperty, Dto, Property } from '@puq/property';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { OrderDirection, OrderNulls } from '@puq/query';
import { CommonQueryDto } from './common-query-dto.js';

export type QueryManyDtoOptions<Entity> = QueryOneDtoOptions<Entity> & {
  /**
   * Limit the number of columns to be selected. If set 1 for example, the user must select only 1 column such as id.
   */
  maximumSelectedColumns?: number;

  /**
   * Limit the maximum page length
   */
  maximumTake?: number;

  /**
   * Default page length
   */
  defaultTake?: number;
};

/**
 * Create {@link QueryMany} dto
 * @param options {@link QueryManyDtoOptions}
 * @returns
 */
export function CreateQueryManyDto<T>(
  options: QueryManyDtoOptions<T>,
): Type<QueryMany<T, FindOptionsWhere<T>[]>> {
  const {
    columns,
    maximumSelectedColumns,
    maximumTake,
    defaultTake,
    isSelectRequired,
  } = options;

  @Dto()
  class QueryManyDto<T1>
    extends CommonQueryDto
    implements QueryMany<T1, FindOptionsWhere<T1>[]>
  {
    @Property({
      type: 'integer',
      description: 'Take the number of items',
      integerFormat: 'positive',
      maximum: maximumTake,
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
      maxSize: maximumSelectedColumns,
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

    @WhereQueryTransformer(columns)
    @ApiProperty({ type: 'array', items: { type: 'string', required: true } })
    where?: FindOptionsWhere<T1>[];
  }

  return QueryManyDto;
}

import type { Keys, Type } from '@puq/type';
import type { FindOptionsWhere } from 'typeorm';
import type { QueryOne } from '@puq/query';
import { ApiProperty, Dto, Property } from '@puq/property';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { CommonQueryDto } from './common-query-dto.js';

export type QueryOneDtoOptions<T> = {
  columns: Keys<T>;
  maxColumns?: number;
  isSelectRequired?: boolean;
};

/**
 * Create {@link QueryOne} dto
 * @param options {@link QueryOneDtoOptions}
 * @returns
 */
export function CreateQueryOneDto<T>(
  options: QueryOneDtoOptions<T>,
): Type<QueryOne<T, FindOptionsWhere<T>[]>> {
  const { columns, maxColumns, isSelectRequired } = options;

  @Dto()
  class QueryOneDto<T1>
    extends CommonQueryDto
    implements QueryOne<T1, FindOptionsWhere<T1>[]>
  {
    @Property({
      type: 'array',
      maxSize: maxColumns,
      required: isSelectRequired,
      items: {
        type: 'string',
        required: true,
        enum: columns,
      },
    })
    select?: Keys<T1>;

    @WhereQueryTransformer(columns)
    @ApiProperty({ type: 'array', items: { type: 'string' } })
    where?: FindOptionsWhere<T1>[];
  }

  return QueryOneDto;
}

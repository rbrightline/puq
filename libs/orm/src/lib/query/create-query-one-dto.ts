import { ApiProperty, Dto, Property } from '@puq/property';
import { Keys, Type } from '@puq/type';
import { FindOptionsWhere } from 'typeorm';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { QueryOne } from '@puq/query';
import { QueryTransformer } from './query-transformer.js';
import { CommonQueryDto } from './common-query-dto.js';

export type QueryOneDtoOptions<T> = {
  columns: Keys<T>;
  maxColumns?: number;
  isSelectRequired?: boolean;
};

export function CreateQueryOneDto<T>(
  options: QueryOneDtoOptions<T>
): Type<QueryOne<T, FindOptionsWhere<T>[]>> {
  const { columns, maxColumns, isSelectRequired } = options;

  @Dto()
  class QueryOneDto<T>
    extends CommonQueryDto
    implements QueryOne<T, FindOptionsWhere<T>[]>
  {
    @Property({
      type: 'array',
      maxSize: maxColumns,
      required: isSelectRequired,
      items: {
        type: 'string',
        required: true,
        enum: columns as string[],
      },
    })
    select?: Keys<T>;

    @WhereQueryTransformer()
    @ApiProperty({ type: 'array', items: { type: 'string' } })
    where?: FindOptionsWhere<T>[];

    @QueryTransformer(columns as string[])
    @ApiProperty({ type: 'array', items: { type: 'string' } })
    query?: FindOptionsWhere<T>[];
  }

  return QueryOneDto;
}

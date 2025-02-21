import { Dto, Property } from '@puq/property';
import { Keys, Type } from '@puq/type';
import { FindOptionsWhere } from 'typeorm';
import { WhereQueryTransformer } from './where-query-transformer.js';
import { QueryOne } from '@puq/query';
import { QueryTransformer } from './query-transformer.js';

export type QueryOneDtoOptions<Entity, Where> = {
  whereDto: Type<Where>;
  queryDto: Type<Where>;
  columns: Keys<Entity>;
  maxColumns?: number;
  isSelectRequired?: boolean;
};

export function CreateQueryOneDto<T>(
  options: QueryOneDtoOptions<T, FindOptionsWhere<T>>
) {
  const { whereDto, queryDto, columns, maxColumns, isSelectRequired } = options;

  @Dto()
  class QueryOneDto<T>
    implements QueryOne<T, FindOptionsWhere<T>[], FindOptionsWhere<T>[]>
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

  return QueryOneDto;
}

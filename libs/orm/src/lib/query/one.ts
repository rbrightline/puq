// import { Dto } from '@puq/property';
// import { Keys } from '@puq/type';
// import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

// @Dto()
// export class QueryOneDto<T> {
//   select: Keys<T>;
//   query: string;
//   where: FindOptionsWhere<T>[];
//   withDeleted: boolean;
// }
import { Dto, Property } from '@puq/property';
import { Keys, QueryMany, Type } from '@puq/type';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { WhereTransformer } from './where-transformer.js';

export type QueryOneDtoOptions<Entity, Where> = {
  advanceQueryDto: Type<Where>;
  queryDto: Type<Where>;
  selectableColumns: Keys<Entity>;
  maximumSelectableColumns?: number;
  isSelectRequired?: boolean;
};

export function CreateQueryOneDto<Entity, Where>(
  options: QueryOneDtoOptions<Entity, Where>
) {
  const {
    advanceQueryDto,
    queryDto,
    selectableColumns,
    maximumSelectableColumns,

    isSelectRequired,
  } = options;

  @Dto()
  class QueryOneDto<T>
    implements QueryMany<T, FindOptionsWhere<T>[], FindOptionsOrder<T>>
  {
    @Property({ type: 'object', target: () => queryDto })
    query?: FindOptionsWhere<T>[];

    @Property({
      type: 'array',
      maxSize: maximumSelectableColumns,
      required: isSelectRequired,
      items: {
        type: 'string',
        required: true,
        enum: selectableColumns as string[],
      },
    })
    select?: Keys<T>;

    @WhereTransformer()
    @Property({ type: 'object', target: () => advanceQueryDto })
    where?: FindOptionsWhere<T>[];

    @Property({
      type: 'boolean',
      description: 'Include deleted items to the load',
      default: false,
      acceptString: true,
    })
    withDeleted?: boolean;
  }

  return QueryOneDto;
}

import { Dto, Property } from '@puq/property';
import { Keys, OrderOptions, QueryMany, Type } from '@puq/type';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { WhereTransformer } from './where-transformer.js';
import { SelectTransformer } from './select-transformer.js';

export type QueryManyDtoOptions<Entity, Where> = {
  advanceQueryDto: Type<Where>;
  queryDto: Type<Where>;
  orderDto: Type<OrderOptions>;
  selectableColumns: Keys<Entity>;
  maximumSelectableColumns?: number;
  maximumTake?: number;
  defaultTake?: number;
  isSelectRequired?: boolean;
};

export function CreateQueryManyDto<Entity, Where>(
  options: QueryManyDtoOptions<Entity, Where>
) {
  const {
    advanceQueryDto,
    queryDto,
    orderDto,
    selectableColumns,
    maximumSelectableColumns,
    maximumTake,
    defaultTake,
    isSelectRequired,
  } = options;

  @Dto()
  class QueryManyDto<T>
    implements QueryMany<T, FindOptionsWhere<T>[], FindOptionsOrder<T>>
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

    @Property({
      type: 'boolean',
      description: 'Include deleted items to the load',
      default: false,
      acceptString: true,
    })
    withDeleted?: boolean;

    @Property({ type: 'object', target: () => orderDto })
    order?: FindOptionsOrder<T>;

    @Property({ type: 'object', target: () => queryDto })
    query?: FindOptionsWhere<T>[];

    @SelectTransformer()
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
  }

  return QueryManyDto;
}

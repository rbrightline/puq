import type { KeyOf, Keys, Type } from '@puq/type';
import type { WhereOption } from '@puq/query';
import { Dto, Property } from '@puq/property';
import { QueryOperator } from '@puq/query';

/**
 * Create {@link WhereOption} query dto for the entity
 * @template - {@link T} target entity class
 * @param columns - {@link Keys<T>} columns that allows query operations
 * @returns
 */
export function CreateWhereOptionDto<T, V>(
  columns: Keys<T>,
): Type<WhereOption<T, V>> {
  @Dto()
  class WhereOptionDto implements WhereOption<T, V> {
    @Property({ type: 'string', required: true, enum: columns as string[] })
    property: KeyOf<T>;

    @Property({ type: 'string', required: true, enum: QueryOperator })
    operator: QueryOperator;

    @Property({ type: 'string', required: true, minLength: 1, maxLength: 100 })
    query: V;
  }

  return WhereOptionDto;
}

import { Dto, Property } from '@puq/property';
import { QueryOperator, WhereOption } from '@puq/query';
import { KeyOf, Keys, Type } from '@puq/type';

export function CreateWhereOptionDto<T, V>(
  columns: Keys
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

import type { Keys, RelationParam, Type } from '@puq/type';
import { Dto, Property } from '@puq/property';

/**
 * Create `DTO` for {@link RelationParam}
 * @param relations relation names of the entity
 * @returns Class {@link  Type}
 */
export function CreateRelationParamDto<T>(
  relations: Keys<T>,
): Type<RelationParam> {
  @Dto()
  class RelationParamDto implements RelationParam {
    @Property({ type: 'integer', required: true, acceptString: true })
    id: number;

    @Property({ type: 'string', required: true, enum: relations })
    relationName: string;

    @Property({ type: 'integer', required: true, acceptString: true })
    rid: number;
  }

  return RelationParamDto;
}

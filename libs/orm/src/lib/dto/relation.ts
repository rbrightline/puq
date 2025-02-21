import { Dto, Property } from '@puq/property';
import { Keys, RelationParam, Type, UnsetRelationParam } from '@puq/type';

/**
 * Create {@link UnsetRelationParam} dto for the entity
 * @param relations relation names
 */
export function CreateUnsetRelationParamDto<T>(
  relations: Keys<T>
): Type<UnsetRelationParam> {
  @Dto()
  class UnsetRelationParamDto implements UnsetRelationParam {
    @Property({ type: 'integer', required: true, acceptString: true })
    id: number;

    @Property({ type: 'string', required: true, enum: relations })
    rn: string;
  }

  return UnsetRelationParamDto;
}

/**
 * Create {@link RelationParam} dto for the entity
 * @param relations relation names
 */
export function CreateRelationParamDto<T>(
  relations: Keys<T>
): Type<RelationParam> {
  @Dto()
  class RelationParamDto implements RelationParam {
    @Property({ type: 'integer', required: true, acceptString: true })
    id: number;

    @Property({ type: 'string', required: true, enum: relations })
    rn: string;

    @Property({ type: 'integer', required: true, acceptString: true })
    rid: number;
  }

  return RelationParamDto;
}

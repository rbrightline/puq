import { Dto, Property } from '@puq/property';
import type { Keys, Type, UnsetRelationParam } from '@puq/type';

/**
 * Create `DTO` for {@link UnsetRelationParam}
 * @param relations relation names of the entity
 * @returns Class {@link  Type}
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

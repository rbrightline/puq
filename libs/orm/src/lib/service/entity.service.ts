import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';
import type {
  BaseModel,
  RelationParam,
  UnsetRelationParam,
  UpdateResult,
} from '@puq/type';
import { EntityQueryService } from './entity-query.service.js';
import type { DeepPartial } from 'typeorm';

/**
 * Write service
 */
export class EntityService<T extends BaseModel> extends EntityQueryService<T> {
  save(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  saveMany(entities: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(entities);
  }

  update(id: number, entity: QueryDeepPartialEntity<T>) {
    return this.repository.update(id, entity);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }

  softDelete(id: number) {
    return this.repository.softDelete(id);
  }

  async addRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, relationId, relationName } = relation;
    await this.repository
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .add(relationId);
    return { affected: 1 };
  }

  async removeRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, relationId, relationName: relationName } = relation;
    await this.repository
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .remove(relationId);
    return { affected: 1 };
  }

  async setRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, relationId, relationName } = relation;
    await this.repository
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(relationId);
    return { affected: 1 };
  }

  async unsetRelation(relation: UnsetRelationParam): Promise<UpdateResult> {
    const { id, relationName } = relation;
    await this.repository
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(null);
    return { affected: 1 };
  }
}

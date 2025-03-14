import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';
import type {
  BaseModel,
  DecrementParam,
  IDModel,
  IncrementParam,
  RelationParam,
  UnsetRelationParam,
  UpdateResult,
} from '@puq/type';
import { EntityQueryService } from './entity-query.service.js';
import type { FindOptionsWhere } from 'typeorm';
import { In, type DeepPartial } from 'typeorm';

/**
 * Write service
 */
export class EntityService<T extends BaseModel> extends EntityQueryService<T> {
  /**
   * Save entity
   * @param entity
   * @returns
   */
  save(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  /**
   * Save many entities
   * @param entities
   * @returns
   */
  saveMany(entities: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(entities);
  }

  /**
   * Update entity
   * @param id
   * @param entity
   * @returns
   */
  update(objectId: IDModel, entity: QueryDeepPartialEntity<T>) {
    return this.repository.update(objectId.id, entity);
  }

  /**
   * Hard delete entity
   * @param id
   * @returns
   */
  delete(objectId: IDModel) {
    return this.repository.delete(objectId.id);
  }

  /**
   * Soft delete entity by id
   * @param id
   * @returns
   */
  softDelete(objectId: IDModel) {
    return this.repository.softDelete(objectId.id);
  }

  /**
   * Restore entity by id
   * @param id
   * @returns
   */
  restore(objectId: IDModel) {
    return this.repository.restore(objectId.id);
  }

  /**
   * Increment property by value
   * @param param
   * @returns
   */
  increment(param: IDModel, body: IncrementParam) {
    const { property, value } = body;
    return this.repository.increment(
      { id: In([param.id]) } as FindOptionsWhere<T>,
      property,
      value ?? 1,
    );
  }

  /**
   * Decrement property by value
   * @param param
   * @returns
   */
  decrement(param: IDModel, body: DecrementParam) {
    const { property, value } = body;
    return this.repository.decrement(
      { id: In([param.id]) } as FindOptionsWhere<T>,
      property,
      value ?? 1,
    );
  }

  /**
   * Add relation (*-to-many) to the entity
   * @param relation
   * @returns
   */
  async addRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, relationId, relationName } = relation;
    await this.repository
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .add(relationId);
    return { affected: 1 };
  }

  /**
   * Remove relation (*-to-many) to the entity
   * @param relation
   * @returns
   */
  async removeRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, relationId, relationName: relationName } = relation;
    await this.repository
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .remove(relationId);
    return { affected: 1 };
  }

  /**
   * Set relation (*-to-one) to the entity
   * @param relation
   * @returns
   */
  async setRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, relationId, relationName } = relation;
    await this.repository
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(relationId);
    return { affected: 1 };
  }

  /**
   * Unset relation (*-to-one) to the entity
   * @param relation
   * @returns
   */
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

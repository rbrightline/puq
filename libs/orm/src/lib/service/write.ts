import type { BaseEntity } from '../entity/base.js';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';
import type {
  RelationParam,
  UnsetRelationParam,
  UpdateResult,
} from '@puq/type';
import { EntityReadService } from './read.js';

/**
 * Write service
 */
export class EntityWriteService<
  T extends BaseEntity,
> extends EntityReadService<T> {
  save(entity: T): Promise<T> {
    return this.repo.save(entity);
  }

  saveMany(entities: T[]): Promise<T[]> {
    return this.repo.save(entities);
  }

  update(id: number, entity: QueryDeepPartialEntity<T>) {
    return this.repo.update(id, entity);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  softDelete(id: number) {
    return this.repo.softDelete(id);
  }

  async addRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, rid, relationName: rn } = relation;
    await this.repo.createQueryBuilder().relation(relationName).of(id).add(rid);
    return { affected: 1 };
  }

  async removeRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, rid, relationName: rn } = relation;
    await this.repo.createQueryBuilder().relation(rn).of(id).remove(rid);
    return { affected: 1 };
  }

  async setRelation(relation: RelationParam): Promise<UpdateResult> {
    const { id, rid, relationName: rn } = relation;
    await this.repo.createQueryBuilder().relation(rn).of(id).set(rid);
    return { affected: 1 };
  }

  async unsetRelation(relation: UnsetRelationParam): Promise<UpdateResult> {
    const { id, relationName: rn } = relation;
    await this.repo
      .createQueryBuilder()
      .relation(relationName)
      .of(id)
      .set(null);
    return { affected: 1 };
  }
}

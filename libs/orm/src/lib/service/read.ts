import type { FindOptionsWhere } from 'typeorm';
import type { CountResult } from '@puq/type';
import { QueryCount, QueryMany, QueryOne } from '@puq/query';
import { BaseEntity } from '../entity/base.js';
import { BaseEntityService } from './base.js';

/**
 * Read service
 */
export class EntityReadService<
  T extends BaseEntity
> extends BaseEntityService<T> {
  /**
   * Query all entities
   */
  find(query: QueryMany<T, FindOptionsWhere<T>[]>) {
    return this.repo.find(query);
  }

  /**
   * Query one entity
   * @param query {@linkk QueryOne}
   * @returns
   */
  findOne(query: QueryOne<T, FindOptionsWhere<T>[]>) {
    return this.repo.findOne(query);
  }

  findOneById(id: number) {
    return this.repo.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async count(query: QueryCount<FindOptionsWhere<T>[]>): Promise<CountResult> {
    return { count: await this.repo.count(query) };
  }
}

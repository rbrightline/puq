import type { FindOptionsWhere } from 'typeorm';
import type { CountResult } from '@puq/type';
import type { QueryCount, QueryMany, QueryOne } from '@puq/query';
import type { BaseEntity } from '../entity/base.js';
import { BaseEntityService } from './base-entity.service.js';

/**
 * Read service
 */
export class EntityQueryService<
  T extends BaseEntity,
> extends BaseEntityService<T> {
  /**
   * Query all entities
   */
  find(query: QueryMany<T, FindOptionsWhere<T>[]>) {
    return this.repository.find(query);
  }

  /**
   * Query one entity
   * @param query {@link QueryOne}
   * @returns
   */
  findOne(query: QueryOne<T, FindOptionsWhere<T>[]>) {
    return this.repository.findOne(query);
  }

  findOneById(id: number) {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async count(query: QueryCount<FindOptionsWhere<T>[]>): Promise<CountResult> {
    return { count: await this.repository.count(query) };
  }
}

import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entity/base.js';
import { QueryCount, QueryMany, QueryOne } from '@puq/query';

export class EntityReadService<T extends BaseEntity> {
  constructor(protected readonly repo: Repository<T>) {}

  /**
   * Read all entities by query
   */
  read(query: QueryMany<T, FindOptionsWhere<T>[]>) {
    return this.repo.find(query);
  }

  readOne(query: QueryOne<T, FindOptionsWhere<T>[]>) {
    return this.repo.findOne(query);
  }

  readOneById(id: number) {
    return this.repo.findOneBy({ id } as FindOptionsWhere<T>);
  }

  count(query: QueryCount<FindOptionsWhere<T>[]>) {
    return this.repo.count(query);
  }
}

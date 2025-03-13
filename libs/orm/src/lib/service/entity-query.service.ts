import type { FindOptionsWhere } from 'typeorm';
import { In } from 'typeorm';
import type { BaseModel, CountResult } from '@puq/type';
import type { QueryCount, QueryMany, QueryOne } from '@puq/query';
import { BaseEntityService } from './base-entity.service.js';
import { NotFoundException } from '@nestjs/common';

/**
 * Read service
 */
export class EntityQueryService<
  T extends BaseModel,
> extends BaseEntityService<T> {
  /**
   * Query all entities QueryMany<T, FindOptionsWhere<T>[]>
   */
  find(query: QueryMany<T, any[]>) {
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

  /**
   * Query one entity
   * @param query {@link QueryOne}
   * @returns
   */
  async findOneOrThrow(query: QueryOne<T, FindOptionsWhere<T>[]>) {
    const found = await this.repository.findOne(query);
    if (!found) throw new NotFoundException();
    return found;
  }

  findOneById(id: number) {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async findOneByIdOrThrow(id: T['id']) {
    const found = await this.repository.findOneBy({
      id: In([id]),
    } as FindOptionsWhere<T>);

    if (!found) throw new NotFoundException();

    return found;
  }

  async count(query: QueryCount<FindOptionsWhere<T>[]>): Promise<CountResult> {
    return { count: await this.repository.count(query) };
  }
}

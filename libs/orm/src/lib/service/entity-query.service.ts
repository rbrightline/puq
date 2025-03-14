import type { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { In } from 'typeorm';
import type { BaseModel, CountResult, IDModel } from '@puq/type';
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
    const { orderBy, orderDir, orderNulls, ...restQuery } = query;

    return this.repository.find({
      ...restQuery,
      order: {
        [orderBy ?? 'id']: {
          direction: orderDir ?? 'asc',
          nulls: orderNulls ?? 'LAST',
        },
      } as FindOptionsOrder<T>,
    });
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

  /**
   * Find one by id
   * @param id
   * @returns
   */
  async findOneById(param: IDModel, query: QueryOne<T, FindOptionsWhere<T>[]>) {
    return await this.findOneOrThrow({
      where: [{ id: In([param.id]) } as FindOptionsWhere<T>],
      ...query,
    });
  }

  /**
   * Find one by id or throw error
   * @param id
   * @returns
   */
  async findOneByIdOrThrow(
    param: IDModel,
    query: QueryOne<T, FindOptionsWhere<any>[]>,
  ) {
    const found = await this.findOneById(param, query);
    if (!found) throw new NotFoundException();
    return found;
  }

  /**
   * Count
   * @param query
   * @returns
   */
  async count(query: QueryCount<FindOptionsWhere<T>[]>): Promise<CountResult> {
    return { count: await this.repository.count(query) };
  }
}

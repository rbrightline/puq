import { Repository } from 'typeorm';
import { BaseEntity } from '../entity/base.js';

export class EntityReadService<T extends BaseEntity> {
  constructor(protected readonly repo: Repository<T>) {}

  /**
   * Read all entities by query
   */
  read() {
    this.repo.find({ order: { id: { direction: 'ASC', nulls: 'LAST' }.toString , });
  }
}

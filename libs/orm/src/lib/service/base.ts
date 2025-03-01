import type { Repository } from 'typeorm';
import type { BaseEntity } from '../entity/base.js';

export class BaseEntityService<T extends BaseEntity> {
  constructor(protected readonly repo: Repository<T>) {}
}

import { Repository } from 'typeorm';
import { BaseEntity } from '../entity/base.js';

export class BaseEntityService<T extends BaseEntity> {
  constructor(protected readonly repo: Repository<T>) {}
}

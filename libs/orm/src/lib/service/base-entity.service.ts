import type { Repository } from 'typeorm';
import type { BaseModel } from '@puq/type';

export class BaseEntityService<T extends BaseModel> {
  constructor(protected readonly repository: Repository<T>) {}
}
